export const PROFILE_IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const PROFILE_IMAGE_ACCEPT = "image/png,image/jpeg";
export const PROFILE_IMAGE_MIME_TYPES = new Set(["image/png", "image/jpeg"]);

function formatBytes(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)}MB`;
}

export function validateProfileImage(file: File): string | null {
  if (!PROFILE_IMAGE_MIME_TYPES.has(file.type)) {
    return "Only JPG and PNG images are allowed.";
  }
  if (file.size > PROFILE_IMAGE_MAX_BYTES) {
    return `Image must be ${formatBytes(PROFILE_IMAGE_MAX_BYTES)} or smaller.`;
  }
  return null;
}
