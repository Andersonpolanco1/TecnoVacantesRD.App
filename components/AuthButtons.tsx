import Image from "next/image";
import { signIn } from "next-auth/react";
import { useLoading } from "@/providers/loadingProvider";

const authProviders = [
  {
    name: "google",
    label: "Iniciar con Google",
    logo: "/google-logo.png",
    bgColor: "bg-red-700",
    hoverColor: "hover:bg-red-600",
    focusColor: "focus:ring-red-500",
  },
  {
    name: "linkedin",
    label: "Iniciar con LinkedIn",
    logo: "/linkedin-logo.png",
    bgColor: "bg-sky-700",
    hoverColor: "hover:bg-sky-600",
    focusColor: "focus:ring-sky-600",
  },
  {
    name: "github",
    label: "Iniciar con GitHub",
    logo: "/github-logo.png",
    bgColor: "bg-gray-700",
    hoverColor: "hover:bg-gray-600",
    focusColor: "focus:ring-gray-600",
  },
];

const AuthButtons = () => {
  const { showLoading, hideLoading } = useLoading();

  const handleAuth = async (providerName: string) => {
    showLoading();
    try {
      await signIn(providerName);
    } finally {
      hideLoading();
    }
  };

  return (
    <>
      {authProviders.map((provider) => (
        <button
          key={provider.name}
          onClick={() => handleAuth(provider.name)}
          className={`w-full mb-2 py-2 rounded-lg flex items-center justify-center space-x-3 ${provider.bgColor} ${provider.hoverColor} text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${provider.focusColor} focus:ring-transparent`}
        >
          <Image
            src={provider.logo}
            alt={provider.name}
            width={20}
            height={20}
          />
          <span>{provider.label}</span>
        </button>
      ))}
    </>
  );
};

export default AuthButtons;
