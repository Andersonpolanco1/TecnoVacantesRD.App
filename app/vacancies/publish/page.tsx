"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import ProvinceSelect from "@/components/province/ProvinceSelect";
import VacancyModeSelect from "@/components/Mode/vacancyMode";
import CategorySelect from "@/components/category/CategorySelect";
import { publish } from "@/lib/services/vacanciesService";
import { useNotification } from "@/providers/notificationContext";
import { NOTIFICATION_COLORS } from "@/types/Notification";
import { VacancyMode } from "@/types/VacancyMode";
import { useSession } from "next-auth/react";

const JobPostingForm = () => {
  const { showNotification } = useNotification();
  const { data: session } = useSession();

  const [formData, setFormData] = useState<PublishVacancy>({
    title: "",
    description: "",
    salary: 0,
    provinceId: 0,
    mode: 0,
    categoryId: 0,
  });

  const [errors, setErrors] = useState<any>({});

  const handleSelectChange = (fieldName: string, value: any) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    handleSelectChange(name, value);
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (formData.title.length < 10 || formData.title.length > 150) {
      newErrors.title = "El título debe tener entre 10 y 150 caracteres.";
    }

    if (
      formData.description.length < 150 ||
      formData.description.length > 4000
    ) {
      newErrors.description =
        "La descripción debe tener entre 150 y 4000 caracteres.";
    }

    if (formData.salary < 0) {
      newErrors.salary = "El salario no puede ser un valor negativo.";
    }

    if (
      (formData.mode === VacancyMode.HYBRID ||
        formData.mode === VacancyMode.ON_SITE) &&
      !formData.provinceId
    ) {
      newErrors.provinceId = "Seleccione una provincia.";
    }

    if (!formData.mode) {
      newErrors.mode = "Seleccione un modo de vacante.";
    }

    if (!formData.categoryId) {
      newErrors.categoryId = "Seleccione una categoría.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const result = await publish(formData, session?.accessToken as string);
    if (result.success)
      showNotification(
        NOTIFICATION_COLORS.success,
        "Vacante publicada",
        result.message
      );
    else
      showNotification(
        NOTIFICATION_COLORS.warning,
        "No se ha publicado la vacante",
        result.message
      );
  };

  return (
    <div className="container">
      <h2 className="my-4">Registro de Nueva Vacante</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            <span className="text-danger">*</span> Título <FaPlus />
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.title && <div className="text-danger">{errors.title}</div>}
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            <span className="text-danger">*</span> Descripción{" "}
            <small
              className="text-muted font-italic"
              style={{ fontSize: "0.75rem" }}
            >
              (Mínimo 150 caracteres)
            </small>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="form-control"
            rows={5}
            required
          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="salary" className="form-label">
            Salario
          </label>
          <input
            min={0}
            type="number"
            id="salary"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            className="form-control"
            required
          />
          {errors.salary && <div className="text-danger">{errors.salary}</div>}
        </div>
        <div className="mb-3">
          <ProvinceSelect
            flagRequired={false}
            onChange={(value) => handleSelectChange("provinceId", value)}
            value={formData.provinceId}
          />
          {errors.provinceId && (
            <div className="text-danger">{errors.provinceId}</div>
          )}
        </div>
        <div className="mb-3">
          <VacancyModeSelect
            flagRequired={true}
            onChange={(value) => handleSelectChange("mode", value)}
            value={formData.mode}
          />
          {errors.mode && <div className="text-danger">{errors.mode}</div>}
        </div>
        <div className="mb-3">
          <CategorySelect
            flagRequired={true}
            value={formData.categoryId}
            onChange={(value) => handleSelectChange("categoryId", value)}
          />
          {errors.categoryId && (
            <div className="text-danger">{errors.categoryId}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Registrar Vacante
        </button>
      </form>
    </div>
  );
};

export default JobPostingForm;
