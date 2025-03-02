import Image from "next/image";
import { signIn } from "next-auth/react";
import { useLoading } from "@/providers/loadingProvider";

const authProviders = [
  {
    name: "google",
    label: "Iniciar con Google",
    logo: "/google-logo.png",
    css: "btn-outline-danger",
  },
  {
    name: "linkedin",
    label: "Iniciar con LinkedIn",
    logo: "/linkedin-logo.png",
    css: "btn-outline-primary",
  },
  {
    name: "github",
    label: "Iniciar con GitHub",
    logo: "/github-logo.png",
    css: "btn-outline-dark",
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
          className={`btn ${provider.css} w-100 mb-2 d-flex align-items-center justify-content-center`}
        >
          <Image
            src={provider.logo}
            alt={provider.name}
            width={20}
            height={20}
          />
          <span className="ms-2">{provider.label}</span>
        </button>
      ))}
    </>
  );
};

export default AuthButtons;
