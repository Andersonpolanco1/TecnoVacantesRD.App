"use client";

import { useState } from "react";

interface UserRegistrationFormProps {
  onSubmit: (formData: FormData) => Promise<void>;
}

const UserRegistrationForm: React.FC<UserRegistrationFormProps> = ({
  onSubmit,
}) => {
  const GetEmptyFormData = () => {
    return {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      profilePicture: null,
    };
  };
  const [formData, setFormData] = useState<UserRegistration>(
    GetEmptyFormData()
  );

  const [errors, setErrors] = useState<any>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      // Validación de tipo de archivo
      const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          profilePicture: "Solo se permiten archivos JPG, PNG o JPEG.",
        }));
        return;
      }

      // Validación de tamaño (Máx: 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors: any) => ({
          ...prevErrors,
          profilePicture: "El archivo debe ser menor a 2MB.",
        }));
        return;
      }
    }

    setErrors((prevErrors: any) => ({ ...prevErrors, profilePicture: null }));
    setFormData((prevState) => ({
      ...prevState,
      profilePicture: file,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio.";
    if (!formData.email.trim())
      newErrors.email = "El correo electrónico es obligatorio.";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "El correo electrónico no es válido.";

    if (!formData.password)
      newErrors.password = "La contraseña es obligatoria.";
    else if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres.";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    if (!formData.phoneNumber.trim())
      newErrors.phoneNumber = "El teléfono es obligatorio.";
    else if (!/^\d{10,15}$/.test(formData.phoneNumber))
      newErrors.phoneNumber = "Formato incorrecto.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Crear un FormData para enviar el archivo junto con los otros datos
    const formDataToSend = new FormData();
    formDataToSend.append("Name", formData.name);
    formDataToSend.append("Email", formData.email);
    formDataToSend.append("Password", formData.password);
    formDataToSend.append("phoneNumber", formData.phoneNumber);
    if (formData.profilePicture) {
      formDataToSend.append("ProfilePicture", formData.profilePicture);
    }

    await onSubmit(formDataToSend);
    setFormData(GetEmptyFormData());
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Registro de Usuario
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label className="block text-gray-700 font-medium">
            Nombre <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        {/* Correo electrónico */}
        <div>
          <label className="block text-gray-700 font-medium">
            Correo electrónico <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Contraseña */}
        <div>
          <label className="block text-gray-700 font-medium">
            Contraseña <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>

        {/* Confirmar contraseña */}
        <div>
          <label className="block text-gray-700 font-medium">
            Confirmar contraseña <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
          )}
        </div>

        {/* Teléfono */}
        <div>
          <label className="block text-gray-700 font-medium">
            Teléfono <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
          )}
        </div>

        {/* Foto de perfil */}
        <div>
          <label className="block text-gray-700 font-medium">
            Foto de perfil{" "}
            <small className="ms-2">archivos JPG, PNG o JPEG</small>
          </label>
          <input
            type="file"
            name="profilePicture"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded-xl focus:ring focus:ring-blue-200"
          />
          {errors.profilePicture && (
            <p className="text-red-500 text-sm">{errors.profilePicture}</p>
          )}
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
        >
          Registrar
        </button>
      </form>
    </div>
  );
};

export default UserRegistrationForm;
