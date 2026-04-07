import { CheckCircle, FolderTree, Hash, Image as ImageIcon } from "lucide-react";
import {
  FieldLabel,
  ICON_QUICK_PICKS,
  IconPreview,
  inputCls,
  ORDER_PRESETS,
  SectionCard,
} from "./AddCategoryShared";

export function BasicInfoSection({ form, errors, descLen, onFieldChange, onSlugChange }) {
  return (
    <SectionCard
      icon={FolderTree}
      title="Basic Information"
      subtitle="Name, slug, and description of the category"
      iconBg="bg-primary-light dark:bg-primary/10"
      iconColor="text-primary dark:text-blue-400"
    >
      <div className="space-y-5">
        <div>
          <FieldLabel required>Category Name</FieldLabel>
          <input
            type="text"
            value={form.name}
            onChange={(e) => onFieldChange("name", e.target.value)}
            placeholder="e.g. Plumbing, Cleaning, Electrical"
            maxLength={60}
            className={inputCls(errors.name)}
          />
          {errors.name ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.name}</p> : null}
        </div>

        <div>
          <FieldLabel hint="URL-friendly version - auto-generated from name. Edit only if needed.">Slug</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-mono text-muted dark:text-muted-dark select-none">
              /
            </span>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => onSlugChange(e.target.value)}
              placeholder="auto-generated"
              className={`${inputCls(false)} pl-6 font-mono`}
            />
          </div>
          <p className="text-[10px] font-body text-muted dark:text-muted-dark mt-1">
            Preview: <span className="text-primary font-semibold">/category/{form.slug || "your-slug"}</span>
          </p>
        </div>

        <div>
          <FieldLabel required hint="Tell customers what services this category covers.">
            Description
          </FieldLabel>
          <textarea
            rows={4}
            value={form.description}
            onChange={(e) => onFieldChange("description", e.target.value)}
            placeholder="Describe the services in this category, e.g. 'Expert plumbing solutions for repairs, installations and emergencies.'"
            className={`${inputCls(errors.description)} resize-none`}
          />
          <p className="text-[11px] text-right text-muted dark:text-muted-dark font-body mt-1">{descLen} chars</p>
          {errors.description ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.description}</p> : null}
        </div>
      </div>
    </SectionCard>
  );
}

export function IconSection({ form, errors, onFieldChange }) {
  return (
    <SectionCard
      icon={ImageIcon}
      title="Category Icon"
      subtitle="Emoji or image URL to represent this category"
      iconBg="bg-purple-50 dark:bg-purple-900/20"
      iconColor="text-purple-600 dark:text-purple-400"
    >
      <div className="flex items-start gap-6">
        <div className="shrink-0">
          <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-2">Preview</p>
          <IconPreview icon={form.icon} />
        </div>

        <div className="flex-1 space-y-3">
          <div>
            <FieldLabel required hint="Type an emoji (🔧) or paste an image URL">Icon</FieldLabel>
            <input
              type="text"
              value={form.icon}
              onChange={(e) => onFieldChange("icon", e.target.value)}
              placeholder="🔧 or https://cdn.example.com/icon.png"
              className={inputCls(errors.icon)}
            />
            {errors.icon ? <p className="text-[11px] text-red-500 font-body mt-1">{errors.icon}</p> : null}
          </div>

          <div>
            <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-2">Quick picks</p>
            <div className="flex flex-wrap gap-2">
              {ICON_QUICK_PICKS.map((emoji) => (
                <button
                  key={emoji}
                  type="button"
                  onClick={() => onFieldChange("icon", emoji)}
                  className={`w-9 h-9 rounded-xl border text-lg flex items-center justify-center transition-all hover:scale-110
                        ${
                          form.icon === emoji
                            ? "border-primary bg-primary-light dark:bg-primary/10 ring-2 ring-primary/20"
                            : "border-border dark:border-border-dark bg-background-light dark:bg-surface-alt"
                        }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
}

export function OrderSection({ form, onFieldChange }) {
  return (
    <SectionCard
      icon={Hash}
      title="Display Order"
      subtitle="Controls the order categories appear in listings (lower = higher priority)"
      iconBg="bg-blue-50 dark:bg-blue-900/20"
      iconColor="text-blue-600 dark:text-blue-400"
    >
      <div className="space-y-3">
        <div>
          <p className="text-xs font-body font-semibold text-muted dark:text-muted-dark mb-2">Select order</p>
          <div className="flex flex-wrap gap-2">
            {ORDER_PRESETS.map((order) => (
              <button
                key={order}
                type="button"
                onClick={() => onFieldChange("displayOrder", order)}
                className={`px-3.5 py-1.5 rounded-xl border text-xs font-body font-semibold transition-all
                      ${
                        form.displayOrder === order
                          ? "bg-primary border-primary text-white"
                          : "border-border dark:border-border-dark text-muted dark:text-muted-dark hover:border-primary hover:text-primary bg-background-light dark:bg-surface-alt"
                      }`}
              >
                {order === 0 ? "0 (First)" : order}
              </button>
            ))}
          </div>
        </div>

        <div>
          <FieldLabel hint="Or enter a custom value">Custom order</FieldLabel>
          <input
            type="number"
            min={0}
            value={form.displayOrder}
            onChange={(e) => onFieldChange("displayOrder", Number(e.target.value))}
            className={`${inputCls(false)} max-w-40`}
          />
        </div>
      </div>
    </SectionCard>
  );
}

export function VisibilitySection({ form, onFieldChange }) {
  return (
    <SectionCard
      icon={CheckCircle}
      title="Visibility and Promotion"
      subtitle="Control whether this category is active and featured on the homepage"
      iconBg="bg-accent-light dark:bg-accent/10"
      iconColor="text-accent-hover dark:text-green-400"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-surface-alt rounded-xl border border-border dark:border-border-dark">
          <div>
            <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">
              {form.isActive ? "Active" : "Inactive"}
            </p>
            <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
              {form.isActive
                ? "Category is visible to customers in browse and search."
                : "Category is hidden - customers cannot see or browse it."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFieldChange("isActive", !form.isActive)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0
                  ${form.isActive ? "bg-accent" : "bg-border dark:bg-border-dark"}`}
            role="switch"
            aria-checked={form.isActive}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
                    ${form.isActive ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-background-light dark:bg-surface-alt rounded-xl border border-border dark:border-border-dark">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-sm font-body font-semibold text-foreground dark:text-foreground-dark">Featured</p>
              {form.featured ? (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 mt-1 inline-block">
                  Featured
                </span>
              ) : null}
            </div>
            <p className="text-xs font-body text-muted dark:text-muted-dark mt-0.5">
              Featured categories appear prominently on the homepage and in search highlights.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onFieldChange("featured", !form.featured)}
            className={`relative w-11 h-6 rounded-full transition-colors shrink-0
                  ${form.featured ? "bg-amber-500" : "bg-border dark:bg-border-dark"}`}
            role="switch"
            aria-checked={form.featured}
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform
                    ${form.featured ? "translate-x-5" : "translate-x-0"}`}
            />
          </button>
        </div>
      </div>
    </SectionCard>
  );
}
