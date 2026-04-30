type TransformOptions = {
  width?: number;
  height?: number;
  quality?: string | number;
  fit?: "fill" | "fit" | "cover" | "limit";
};

const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

function normalizePublicId(value: string) {
  return value
    .split("/")
    .pop()
    ?.replace(/\?.*$/, "")
    .replace(/\.[^.]+$/, "") || value;
}

export function cloudinaryImage(
  source: string,
  options: TransformOptions = {},
) {
  if (!cloudName) return source;

  const transforms = [
    "f_auto",
    `q_${options.quality ?? "auto"}`,
    options.width ? `w_${options.width}` : "",
    options.height ? `h_${options.height}` : "",
    options.fit ? `c_${options.fit}` : "c_fill",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/fetch/${transforms}/${encodeURIComponent(source)}`;
}

export function cloudinaryProjectImage(
  folder: string,
  image: string,
  options: TransformOptions = {},
) {
  if (!cloudName) return cloudinaryImage(image, options);

  const publicId = normalizePublicId(image);
  const transforms = [
    "f_auto",
    `q_${options.quality ?? "auto"}`,
    options.width ? `w_${options.width}` : "",
    options.height ? `h_${options.height}` : "",
    options.fit ? `c_${options.fit}` : "c_fill",
  ]
    .filter(Boolean)
    .join(",");

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transforms}/CrystalInteriors/projects/${folder}/${publicId}`;
}

export function galleryImages(
  images: string[],
  altPrefix: string,
  folder?: string,
) {
  return images.map((src, index) => ({
    thumb: folder
      ? cloudinaryProjectImage(folder, src, {
          width: 900,
          height: 700,
          fit: "fill",
        })
      : cloudinaryImage(src, { width: 900, height: 700, fit: "fill" }),
    full: folder
      ? cloudinaryProjectImage(folder, src, { width: 1800, quality: "auto" })
      : cloudinaryImage(src, { width: 1800, quality: "auto" }),
    alt: `${altPrefix} ${index + 1}`,
  }));
}
