import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FiCheck, FiEdit2, FiX } from "react-icons/fi";

export function EditableField({ label, icon, value, placeholder, type = "text", onSave, saving }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  const handleSave = async () => {
    await onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(value ?? "");
    setEditing(false);
  };

  return (
    <div className="flex items-start gap-3 py-4 border-b border-border dark:border-border-dark last:border-0">
      <div className="w-8 h-8 rounded-lg bg-primary-light dark:bg-primary/10 flex items-center justify-center text-primary shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-1">{label}</p>
        {editing ? (
          <div className="flex items-center gap-2">
            <input
              type={type}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              autoFocus
              className="flex-1 px-3 py-1.5 text-sm rounded-xl border border-primary bg-background-light dark:bg-background-dark text-foreground dark:text-foreground-dark outline-none font-body"
            />
            <button
              onClick={handleSave}
              disabled={saving}
              className="p-1.5 rounded-lg bg-primary text-white hover:bg-primary-hover disabled:opacity-50 transition-colors"
            >
              {saving ? <AiOutlineLoading3Quarters size={13} className="animate-spin" /> : <FiCheck size={13} />}
            </button>
            <button
              onClick={handleCancel}
              className="p-1.5 rounded-lg border border-border dark:border-border-dark text-muted dark:text-muted-dark hover:text-foreground dark:hover:text-foreground-dark transition-colors"
            >
              <FiX size={13} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <p
              className={`text-sm font-body ${value ? "text-foreground dark:text-foreground-dark font-medium" : "text-muted dark:text-muted-dark italic"}`}
            >
              {value || placeholder}
            </p>
            <button
              onClick={() => setEditing(true)}
              className="shrink-0 text-xs font-body font-semibold text-primary hover:text-primary-hover transition-colors flex items-center gap-1"
            >
              <FiEdit2 size={11} /> Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
