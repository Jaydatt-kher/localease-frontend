import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCreateAdminCategoryMutation } from "../../api/adminApi";
import { AddCategoryActions } from "./components/addCategory/AddCategoryActions";
import { AddCategoryHeader } from "./components/addCategory/AddCategoryHeader";
import { AddCategoryPreview } from "./components/addCategory/AddCategoryPreview";
import {
  BasicInfoSection,
  IconSection,
  OrderSection,
  VisibilitySection,
} from "./components/addCategory/AddCategorySections";

export default function AddCategoryPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    slug: "",
    icon: "",
    description: "",
    displayOrder: 0,
    isActive: true,
    featured: false,
  });
  const [errors, setErrors] = useState({});
  const [slugManual, setSlugManual] = useState(false);

  useEffect(() => {
    if (!slugManual && form.name) {
      const generated = form.name
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
      setForm((prev) => ({ ...prev, slug: generated }));
    }
  }, [form.name, slugManual]);

  const [createCategory, { isLoading: creating }] = useCreateAdminCategoryMutation();

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: "" }));
    }
  };

  const handleSlugChange = (value) => {
    setSlugManual(true);
    setField("slug", value.toLowerCase().replace(/[^a-z0-9-]/g, ""));
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) nextErrors.name = "Category name is required.";
    if (!form.icon.trim()) nextErrors.icon = "Icon (emoji or URL) is required.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      await createCategory({
        name: form.name.trim(),
        icon: form.icon.trim(),
        description: form.description.trim(),
        displayOrder: Number(form.displayOrder),
        isActive: form.isActive,
        featured: form.featured,
      }).unwrap();
      toast.success("Category created successfully!");
      navigate("/admin/categories");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to create category.");
    }
  };

  const handleCancel = () => {
    if (form.name || form.description) {
      if (!window.confirm("Discard changes?")) return;
    }
    navigate("/admin/categories");
  };

  const descLen = form.description.length;

  return (
    <div className="space-y-6">
      <AddCategoryHeader
        onBack={() => navigate("/admin/categories")}
        onGoDashboard={() => navigate("/admin")}
        onGoCategories={() => navigate("/admin/categories")}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <BasicInfoSection
          form={form}
          errors={errors}
          descLen={descLen}
          onFieldChange={setField}
          onSlugChange={handleSlugChange}
        />

        <IconSection form={form} errors={errors} onFieldChange={setField} />

        <OrderSection form={form} onFieldChange={setField} />

        <VisibilitySection form={form} onFieldChange={setField} />

        <AddCategoryPreview form={form} />

        <AddCategoryActions creating={creating} onCancel={handleCancel} />
      </form>
    </div>
  );
}
