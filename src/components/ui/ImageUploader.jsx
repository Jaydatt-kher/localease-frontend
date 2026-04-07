import { useState, useRef } from "react";
import { uploadToCloudinary, getCloudinaryThumb } from "../../utils/cloudinary";
import { FiUploadCloud, FiX, FiImage } from "react-icons/fi";
import { MdOutlineCheckCircle } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export function SingleImageUploader({ value, onUploaded, folder = "localease/profiles", label = "Upload Photo" }) {
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState(0);
  const [error,      setError]      = useState("");
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setError("");
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadToCloudinary(file, folder, setProgress);
      onUploaded(url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      {}
      <div
        className="relative w-28 h-28 rounded-full border-2 border-dashed border-border dark:border-border-dark overflow-hidden bg-background-light dark:bg-surface-alt flex items-center justify-center cursor-pointer hover:border-primary transition-colors group"
        onClick={() => !uploading && inputRef.current?.click()}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
      >
        {value ? (
          <>
            <img src={getCloudinaryThumb(value, 200, 200)} alt="Profile" className="w-full h-full object-cover" />
            {}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <FiUploadCloud size={24} className="text-white" />
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-1 text-muted dark:text-muted-dark">
            {uploading
              ? <AiOutlineLoading3Quarters size={28} className="text-primary animate-spin" />
              : <FiImage size={28} />
            }
            <span className="text-[10px] font-body text-center px-2">
              {uploading ? `${progress}%` : "Click or drag"}
            </span>
          </div>
        )}

        {}
        {value && !uploading && (
          <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-accent flex items-center justify-center border-2 border-white dark:border-surface-dark">
            <MdOutlineCheckCircle size={16} className="text-white" />
          </div>
        )}
      </div>

      {}
      <button type="button" onClick={() => !uploading && inputRef.current?.click()}
        disabled={uploading}
        className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors disabled:opacity-50 font-body">
        {uploading
          ? <><AiOutlineLoading3Quarters size={14} className="animate-spin" /> Uploading {progress}%</>
          : <><FiUploadCloud size={14} /> {value ? "Change Photo" : label}</>
        }
      </button>

      {}
      {value && !uploading && (
        <button type="button" onClick={() => onUploaded("")}
          className="text-xs text-red-500 hover:text-red-600 transition-colors font-body">
          Remove photo
        </button>
      )}

      {error && <p className="text-xs text-red-500 font-body text-center">{error}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
        className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
    </div>
  );
}

export function GalleryUploader({ values = [], onUploaded, folder = "localease/gallery", maxImages = 6 }) {
  const [uploading,  setUploading]  = useState(false);
  const [progress,   setProgress]   = useState({});
  const [error,      setError]      = useState("");
  const inputRef = useRef(null);

  const handleFiles = async (files) => {
    const remaining = maxImages - values.length;
    if (remaining <= 0) { setError(`Maximum ${maxImages} images allowed.`); return; }
    const toUpload = Array.from(files).slice(0, remaining);
    setError("");
    setUploading(true);

    try {
      const urls = await Promise.all(
        toUpload.map((file, i) =>
          uploadToCloudinary(file, folder, (p) =>
            setProgress((prev) => ({ ...prev, [i]: p }))
          )
        )
      );
      onUploaded([...values, ...urls]);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
      setProgress({});
    }
  };

  const handleRemove = (idx) => {
    onUploaded(values.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-3">
      {}
      {values.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {values.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border dark:border-border-dark group">
              <img src={getCloudinaryThumb(url, 200, 200)} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => handleRemove(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600">
                <FiX size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {}
      {values.length < maxImages && (
        <div
          className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors
            ${uploading ? "border-primary bg-primary-light dark:bg-primary/10" : "border-border dark:border-border-dark hover:border-primary bg-background-light dark:bg-surface-alt"}`}
          onClick={() => !uploading && inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          {uploading ? (
            <>
              <AiOutlineLoading3Quarters size={28} className="text-primary animate-spin" />
              <p className="text-sm font-semibold text-primary font-body">
                Uploading {Object.values(progress).join("% / ")}%…
              </p>
            </>
          ) : (
            <>
              <FiUploadCloud size={28} className="text-muted dark:text-muted-dark" />
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body">
                  Click or drag images here
                </p>
                <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
                  JPG, PNG, WebP · Max 5MB each · {maxImages - values.length} slot{maxImages - values.length !== 1 ? "s" : ""} remaining
                </p>
              </div>
            </>
          )}
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-body">{error}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
        multiple className="hidden"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}

export function LocalGalleryUploader({ existingImages = [], newFiles = [], onExistingChange, onNewFilesChange, maxImages = 6 }) {
  const [error, setError] = useState("");
  const inputRef = useRef(null);
  
  const totalCount = existingImages.length + newFiles.length;

  const handleFiles = (files) => {
    const remaining = maxImages - totalCount;
    if (remaining <= 0) { setError(`Maximum ${maxImages} images allowed.`); return; }
    const toAdd = Array.from(files).slice(0, remaining);
    setError("");
    if (onNewFilesChange) onNewFilesChange([...newFiles, ...toAdd]);
  };

  const handleRemoveExisting = (idx) => {
    if (onExistingChange) onExistingChange(existingImages.filter((_, i) => i !== idx));
  };

  const handleRemoveNew = (idx) => {
    if (onNewFilesChange) onNewFilesChange(newFiles.filter((_, i) => i !== idx));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files) handleFiles(e.dataTransfer.files);
  };

  return (
    <div className="flex flex-col gap-3">
      {}
      {totalCount > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {}
          {existingImages.map((url, i) => (
            <div key={`existing-${i}`} className="relative aspect-square rounded-xl overflow-hidden border border-border dark:border-border-dark group">
              <img src={getCloudinaryThumb(url, 200, 200)} alt={`Gallery existing ${i + 1}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => handleRemoveExisting(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600">
                <FiX size={12} />
              </button>
            </div>
          ))}
          {}
          {newFiles.map((file, i) => (
            <div key={`new-${i}`} className="relative aspect-square rounded-xl overflow-hidden border border-border dark:border-border-dark group">
              <img src={URL.createObjectURL(file)} alt={`Gallery new ${i + 1}`} className="w-full h-full object-cover" />
              <button type="button" onClick={() => handleRemoveNew(i)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center hover:bg-red-600">
                <FiX size={12} />
              </button>
              <div className="absolute bottom-1 left-1 bg-black/50 text-white text-[9px] px-1.5 py-0.5 rounded">New</div>
            </div>
          ))}
        </div>
      )}

      {}
      {totalCount < maxImages && (
        <div
          className="border-2 border-dashed border-border dark:border-border-dark hover:border-primary bg-background-light dark:bg-surface-alt rounded-2xl p-6 flex flex-col items-center gap-3 cursor-pointer transition-colors"
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
        >
          <FiUploadCloud size={28} className="text-muted dark:text-muted-dark" />
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body">
              Click or drag images here
            </p>
            <p className="text-xs text-muted dark:text-muted-dark font-body mt-0.5">
              JPG, PNG, WebP · Max 5MB each · {maxImages - totalCount} slot{maxImages - totalCount !== 1 ? "s" : ""} remaining
            </p>
          </div>
        </div>
      )}

      {error && <p className="text-xs text-red-500 font-body">{error}</p>}

      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp"
        multiple className="hidden"
        onChange={(e) => handleFiles(e.target.files)} />
    </div>
  );
}