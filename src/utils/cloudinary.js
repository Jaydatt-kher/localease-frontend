const CLOUD_NAME    = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const UPLOAD_URL    = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
  console.warn(
    "[Cloudinary] Missing env vars.\n" +
    "Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file."
  );
}

export const uploadToCloudinary = (file, folder = "localease", onProgress) => {
  return new Promise((resolve, reject) => {
    if (!file) { reject(new Error("No file provided")); return; }

        const ALLOWED = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!ALLOWED.includes(file.type)) {
      reject(new Error(`File type "${file.type}" is not allowed. Use JPG, PNG, or WebP.`));
      return;
    }

        if (file.size > 5 * 1024 * 1024) {
      reject(new Error("File size exceeds 5 MB. Please compress the image."));
      return;
    }

    const formData = new FormData();
    formData.append("file",           file);
    formData.append("upload_preset",  UPLOAD_PRESET);
    formData.append("folder",         folder);

        const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve(data.secure_url);
        } catch {
          reject(new Error("Invalid response from Cloudinary"));
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err?.error?.message || "Cloudinary upload failed"));
        } catch {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      }
    });

    xhr.addEventListener("error",  () => reject(new Error("Network error during upload")));
    xhr.addEventListener("abort",  () => reject(new Error("Upload was cancelled")));

    xhr.open("POST", UPLOAD_URL);
    xhr.send(formData);
  });
};

export const uploadMultipleToCloudinary = async (files, folder = "localease", onProgress) => {
  const promises = files.map((file, i) =>
    uploadToCloudinary(file, folder, (p) => onProgress?.(i, p))
  );
  return Promise.all(promises);
};

export const getCloudinaryThumb = (url, width = 200, height = 200) => {
  if (!url || !url.includes("cloudinary.com")) return url;
  return url.replace(
    "/upload/",
    `/upload/c_fill,w_${width},h_${height},q_auto,f_auto/`
  );
};