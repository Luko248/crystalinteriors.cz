type TransformOptions = {
  width?: number;
  height?: number;
  quality?: string | number;
  fit?: "fill" | "fit" | "cover" | "limit";
};

const cloudName = import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;

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
