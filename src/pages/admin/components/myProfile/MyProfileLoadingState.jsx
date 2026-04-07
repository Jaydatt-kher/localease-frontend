import { Loader2 } from "lucide-react";

export function MyProfileLoadingState() {
  return (
    <div className="flex items-center justify-center py-20 text-muted dark:text-muted-dark">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
}
