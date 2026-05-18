import type { APIRoute } from "astro";
import { readSession } from "@/lib/auth";
import { buildUploadSignature } from "@/lib/cloudinary-admin";

export const prerender = false;

const json = (body: unknown, status = 200): Response =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async (context) => {
  const session = await readSession(context);
  if (!session) return json({ error: "Unauthorized" }, 401);

  let body: { folder?: string; tags?: string[]; uploadPreset?: string };
  try {
    body = (await context.request.json()) as typeof body;
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  const folder = body.folder?.toString().trim();
  if (!folder) return json({ error: "folder is required" }, 400);

  // Restrict folder writes to the references namespace so a leaked session
  // cookie cannot scribble over unrelated parts of the Cloudinary library.
  if (!/^crystal-interiors\/references\/[a-z0-9-]+$/.test(folder)) {
    return json({ error: "Disallowed folder path" }, 400);
  }

  try {
    const signed = await buildUploadSignature(context.locals, {
      folder,
      tags: body.tags,
      uploadPreset: body.uploadPreset,
    });
    return json(signed);
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Sign failed" },
      500,
    );
  }
};
