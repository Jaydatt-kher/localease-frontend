import { FiInfo } from "react-icons/fi";
import { IoCheckmarkCircle } from "react-icons/io5";
import {
  GalleryUploader,
  SingleImageUploader,
} from "../../../../components/ui/ImageUploader";
import { SectionCard } from "./BecomeProviderShared";

export function StepPhotos({ data, onChange }) {
  const tips = [
    "Use a clear, well-lit headshot or professional photo",
    "Face the camera directly with a neutral background",
    "JPG, PNG or WebP · Maximum size 5 MB",
    "Square photos work best (1:1 ratio)",
  ];

  return (
    <div className="space-y-5">
      <SectionCard title="Profile Photo" subtitle="A clear professional photo builds trust with customers">
        <div className="flex flex-col sm:flex-row items-center gap-6">
          <SingleImageUploader
            value={data.profilePicture}
            onUploaded={(url) => onChange("profilePicture", url)}
            folder="localease/profiles"
            label="Upload Profile Photo"
          />
          <div className="flex-1 space-y-2">
            <p className="text-sm font-semibold text-foreground dark:text-foreground-dark font-body">Photo tips:</p>
            {tips.map((tip) => (
              <div key={tip} className="flex items-start gap-2">
                <IoCheckmarkCircle size={14} className="text-accent shrink-0 mt-0.5" />
                <p className="text-xs text-muted dark:text-muted-dark font-body">{tip}</p>
              </div>
            ))}
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Portfolio Gallery" subtitle="Showcase your work - customers trust providers with real examples">
        <GalleryUploader
          values={data.gallery}
          onUploaded={(urls) => onChange("gallery", urls)}
          folder="localease/gallery"
          maxImages={6}
        />
        <p className="text-xs text-muted dark:text-muted-dark mt-3 font-body">
          Upload up to 6 photos of your past work. Good portfolio images significantly increase bookings.
        </p>
      </SectionCard>

      <SectionCard title="Verification Documents" subtitle="Optional - upload ID or certifications to get a verified badge faster">
        <GalleryUploader
          values={data.documents}
          onUploaded={(urls) => onChange("documents", urls)}
          folder="localease/documents"
          maxImages={3}
        />
        <div className="flex items-start gap-2 mt-3 p-3 rounded-xl bg-background-light dark:bg-surface-alt border border-border dark:border-border-dark">
          <FiInfo size={14} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-muted dark:text-muted-dark font-body">
            Documents are kept private and only reviewed by our admin team for verification purposes.
          </p>
        </div>
      </SectionCard>
    </div>
  );
}
