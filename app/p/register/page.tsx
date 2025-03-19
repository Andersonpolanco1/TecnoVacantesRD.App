"use client";

import UserRegisterForm from "@/components/UserRegisterForm";
import { register } from "@/lib/services/userService";
import { useNotification } from "@/providers/notificationProvider";

const Page = () => {
  const { showNotification } = useNotification();
  const handleSubmit = async (formData: FormData) => {
    const result = await register(formData);
    if (result.success) {
      showNotification("success", "Registro exitoso!");
    } else {
      showNotification("danger", "Registro fallido!", result?.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <UserRegisterForm onSubmit={handleSubmit} />
    </div>
  );
};

export default Page;
