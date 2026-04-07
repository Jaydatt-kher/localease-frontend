import { Loader2 } from "lucide-react";

export function SettingsLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-muted dark:text-muted-dark">
      <Loader2 className="w-8 h-8 animate-spin mb-4 text-primary" />
      <p className="text-sm font-body">Loading platform settings...</p>
    </div>
  );
}
