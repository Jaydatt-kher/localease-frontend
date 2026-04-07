import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useGetAllCategoriesQuery, useGetCitiesQuery } from "../../api/serviceApi";
import {
  useCreateAdminServiceMutation,
  useGetAdminServicesQuery,
  useUpdateAdminServiceMutation,
} from "../../api/adminApi";
import { AddServiceActions } from "./components/addService/AddServiceActions";
import { AddServiceHeader } from "./components/addService/AddServiceHeader";
import {
  AddServiceLoading,
  BasicInfoSection,
  CategoryLocationSection,
  ImagesSection,
  ServiceStatusSection,
} from "./components/addService/AddServiceSections";

export default function AddServicePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    name: "",
    category: "",
    city: "",
    description: "",
    duration: 60,
    isAvailable: true,
  });
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [custom, setCustom] = useState(false);
  const [ready, setReady] = useState(!isEdit);

  const { data: categories = [], isLoading: catsLoading } = useGetAllCategoriesQuery();
  const { data: cities = [], isLoading: citiesLoading } = useGetCitiesQuery();

  const { data: existingData } = useGetAdminServicesQuery({ page: 1, limit: 1, search: "" }, { skip: !isEdit });

  const [createService, { isLoading: creating }] = useCreateAdminServiceMutation();
  const [updateService, { isLoading: updating }] = useUpdateAdminServiceMutation();

  const submitting = creating || updating;

  useEffect(() => {
    if (!isEdit || !existingData?.data?.length) return;

    const service = existingData.data.find((item) => item._id === id);
    if (!service) return;

    setForm({
      name: service.name ?? "",
      category: service.category ?? "",
      city: service.city ?? "",
      description: service.description ?? "",
      duration: service.duration ?? 60,
      isAvailable: service.isAvailable ?? true,
    });
    setExistingImages(service.images ?? []);
    setNewImages([]);
    setReady(true);
  }, [isEdit, id, existingData]);

  const setField = (key, val) => {
    setForm((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Service name is required.";
    if (!form.category) nextErrors.category = "Please select a category.";
    if (!form.city) nextErrors.city = "Please select a city.";
    if (!form.description.trim()) nextErrors.description = "Description is required.";
    if (!form.duration || form.duration < 1) nextErrors.duration = "Enter a valid duration.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    try {
      const formData = new FormData();
      formData.append("name", form.name.trim());
      formData.append("category", form.category);
      formData.append("city", form.city);
      formData.append("description", form.description.trim());
      formData.append("duration", Number(form.duration));
      formData.append("isAvailable", form.isAvailable);

      if (isEdit) {
        existingImages.forEach((url) => formData.append("existingImages", url));
      }

      newImages.forEach((file) => formData.append("images", file));

      if (isEdit) {
        await updateService({ id, formData }).unwrap();
        toast.success("Service updated successfully!");
      } else {
        await createService(formData).unwrap();
        toast.success("Service created successfully!");
      }

      navigate("/admin/services");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to save service.");
    }
  };

  const handleCancel = () => {
    if (form.name || form.description || existingImages.length || newImages.length) {
      if (!window.confirm("Discard changes?")) return;
    }
    navigate("/admin/services");
  };

  if (isEdit && !ready) {
    return <AddServiceLoading />;
  }

  return (
    <div className="space-y-6">
      <AddServiceHeader
        isEdit={isEdit}
        onBack={() => navigate("/admin/services")}
        onGoDashboard={() => navigate("/admin")}
        onGoServices={() => navigate("/admin/services")}
      />

      <form onSubmit={handleSubmit} className="space-y-5">
        <BasicInfoSection
          form={form}
          errors={errors}
          custom={custom}
          onToggleCustom={() => setCustom((prev) => !prev)}
          onFieldChange={setField}
        />

        <CategoryLocationSection
          form={form}
          errors={errors}
          categories={categories}
          cities={cities}
          catsLoading={catsLoading}
          citiesLoading={citiesLoading}
          onFieldChange={setField}
        />

        <ImagesSection
          existingImages={existingImages}
          newImages={newImages}
          onExistingChange={setExistingImages}
          onNewChange={setNewImages}
        />

        <ServiceStatusSection form={form} onFieldChange={setField} />

        <AddServiceActions isEdit={isEdit} submitting={submitting} onCancel={handleCancel} />
      </form>
    </div>
  );
}
