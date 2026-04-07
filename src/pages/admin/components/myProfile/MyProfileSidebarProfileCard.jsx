import { Mail, Shield } from "lucide-react";
import { SingleImageUploader } from "../../../../components/ui/ImageUploader";

export function MyProfileSidebarProfileCard({
  photoUrl,
  initials,
  name,
  email,
  onPhotoSave,
}) {
  return (
    <div className="bg-surface-light dark:bg-surface-dark rounded-2xl border border-border dark:border-border-dark p-8">
      <div className="flex flex-col items-center">
        <div className="relative">
          {photoUrl ? (
            <img
              src={photoUrl}
              className="w-32 h-32 rounded-full object-cover shadow-lg border-4 border-surface-light dark:border-surface-dark"
              alt="Avatar"
            />
          ) : (
            <div className="w-32 h-32 bg-linear-to-br from-primary to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white text-4xl font-display font-bold">{initials}</span>
            </div>
          )}
        </div>

        <div className="mt-4 w-full px-6">
          <SingleImageUploader
            value={photoUrl}
            onUploaded={onPhotoSave}
            folder="localease/profiles"
            label="Upload Photo"
          />
        </div>

        <div className="mt-6 text-center space-y-1.5">
          <h3 className="text-xl font-display font-bold text-foreground dark:text-foreground-dark">
            {name}
          </h3>
          <p className="text-sm font-body text-muted dark:text-muted-dark flex items-center justify-center gap-2">
            <Mail className="w-4 h-4 opacity-70" /> {email}
          </p>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-accent-light dark:bg-accent/10 text-accent-hover dark:text-blue-400 rounded-full mt-3 border border-blue-200 dark:border-blue-900/50">
            <Shield className="w-3.5 h-3.5" />
            <span className="text-[11px] font-body font-bold uppercase tracking-wider">Administrator</span>
          </div>
        </div>
      </div>
    </div>
  );
}
