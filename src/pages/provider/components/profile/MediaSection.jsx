import { GalleryUploader, SingleImageUploader } from "../../../../components/ui/ImageUploader";
import { SectionCard } from "./ProfileShared";

export function MediaSection({ formData, onChange }) {
  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="h-full">
        <SectionCard title="Profile Photo" subtitle="Your main display image">
          <div className="flex flex-col items-center">
            <SingleImageUploader
              value={formData.profilePicture}
              onUploaded={(url) => onChange("profilePicture", url)}
              folder="localease/profiles"
              label="Update Photo"
            />
            <p className="text-xs text-muted dark:text-muted-dark mt-3 text-center !leading-relaxed px-4">
              Use a clear photo of yourself or your business logo to build trust with customers.
            </p>
          </div>
        </SectionCard>
      </div>

      <div className="h-full">
        <SectionCard title="Portfolio Gallery" subtitle="Showcase your past work">
          <GalleryUploader
            values={formData.gallery}
            onUploaded={(urls) => onChange("gallery", urls)}
            folder="localease/gallery"
            maxImages={6}
          />
          <p className="text-xs text-muted dark:text-muted-dark mt-3 px-2">
            Up to 6 photos. Good portfolio images increase bookings.
          </p>
        </SectionCard>
      </div>
    </div>
  );
}
