"use client";

import { FaPlus } from "react-icons/fa";
import { VacancyMode } from "@/types/VacancyMode";
import { useState, useEffect } from "react";
import RichText from "@/components/RichText";
import ProvinceSelect from "./ProvinceSelect";
import VacancyModeSelect from "./vacancyMode";
import CategorySelect from "./CategorySelect";

interface JobPostingFormProps {
  onSubmit: (formData: PublishVacancy) => Promise<void>;
  editMode?: boolean;
  initialData?: PublishVacancy;
}

const VacancyPost: React.FC<JobPostingFormProps> = ({
  onSubmit,
  editMode = false,
  initialData,
}) => {
  const [formData, setFormData] = useState<PublishVacancy>(
    initialData || {
      title: "",
      description: "",
      salary: 0,
      provinceId: 0,
      mode: 0,
      categoryId: 0,
    }
  );

  const [errors, setErrors] = useState<any>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

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
      newErrors.description = `La descripción debe tener entre 150 y 4000 caracteres. Actual ${formData.description.length}`;
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

    await onSubmit(formData);
  };

  return (
    <div className="container">
      <h2 className="my-4">
        {editMode ? "Edición de vacante" : "Registro de vacante"}
      </h2>
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

        {/* Provincia y Salario en la misma fila en pantallas medianas y grandes */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
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
            />
            {errors.salary && (
              <div className="text-danger">{errors.salary}</div>
            )}
          </div>
          <div className="col-12 col-md-6 mb-3">
            <ProvinceSelect
              flagRequired={false}
              onChange={(value) => handleSelectChange("provinceId", value)}
              value={formData.provinceId}
            />
            {errors.provinceId && (
              <div className="text-danger">{errors.provinceId}</div>
            )}
          </div>
        </div>

        {/* Categoría y Modalidad en la misma fila en pantallas medianas y grandes */}
        <div className="row">
          <div className="col-12 col-md-6 mb-3">
            <VacancyModeSelect
              flagRequired={true}
              onChange={(value) => handleSelectChange("mode", value)}
              value={formData.mode}
            />
            {errors.mode && <div className="text-danger">{errors.mode}</div>}
          </div>
          <div className="col-12 col-md-6 mb-3">
            <CategorySelect
              flagRequired={true}
              value={formData.categoryId}
              onChange={(value) => handleSelectChange("categoryId", value)}
            />
            {errors.categoryId && (
              <div className="text-danger">{errors.categoryId}</div>
            )}
          </div>
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
          <RichText
            readonly={false}
            value={formData.description}
            onChange={(value) => handleSelectChange("description", value)}
          />
          {errors.description && (
            <div className="text-danger">{errors.description}</div>
          )}
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            {editMode ? "Guardar Cambios" : "Registrar Vacante"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default VacancyPost;
