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
    if (!validateForm()) return;
    await onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {editMode ? "Edición de vacante" : "Registro de vacante"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">
            Título <span className="text-red-500">*</span>
          </label>
          <div className="relative flex items-center">
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
            />
            <FaPlus className="absolute right-3 text-gray-400" />
          </div>
          {errors.title && (
            <p className="text-red-500 text-sm">{errors.title}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 font-medium">Salario</label>
            <input
              type="number"
              min={0}
              name="salary"
              value={formData.salary}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
            />
            {errors.salary && (
              <p className="text-red-500 text-sm">{errors.salary}</p>
            )}
          </div>
          <div>
            <ProvinceSelect
              flagRequired={false}
              onChange={(value) => handleSelectChange("provinceId", value)}
              value={formData.provinceId}
            />
            {errors.provinceId && (
              <p className="text-red-500 text-sm">{errors.provinceId}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <VacancyModeSelect
            flagRequired={true}
            onChange={(value) => handleSelectChange("mode", value)}
            value={formData.mode}
          />
          <CategorySelect
            flagRequired={true}
            value={formData.categoryId}
            onChange={(value) => handleSelectChange("categoryId", value)}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">
            Descripción <span className="text-red-500">*</span>
            <span className="text-sm text-gray-500">
              (Mínimo 150 caracteres)
            </span>
          </label>
          <RichText
            readonly={false}
            value={formData.description}
            onChange={(value) => handleSelectChange("description", value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          {editMode ? "Guardar Cambios" : "Registrar Vacante"}
        </button>
      </form>
    </div>
  );
};

export default VacancyPost;
