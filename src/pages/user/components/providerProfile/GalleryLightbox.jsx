export default function GalleryLightbox({
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) {
  if (currentIndex === null || !images?.length) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-3xl w-full" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[currentIndex]}
          alt={`Portfolio ${currentIndex + 1}`}
          className="w-full max-h-[80vh] object-contain rounded-2xl"
        />

        <div className="absolute inset-y-0 left-0 flex items-center">
          <button
            onClick={onPrev}
            className="ml-2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg"
          >
            ‹
          </button>
        </div>
        <div className="absolute inset-y-0 right-0 flex items-center">
          <button
            onClick={onNext}
            className="mr-2 w-9 h-9 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors text-lg"
          >
            ›
          </button>
        </div>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
        >
          ✕
        </button>

        <p className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs text-white/70 font-body">
          {currentIndex + 1} / {images.length}
        </p>
      </div>
    </div>
  );
}
