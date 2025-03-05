"use client";

import LoadingModal from "@/components/public/LoadingModal";
import { createContext, useState, useContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  showLoading: () => void;
  hideLoading: () => void;
}

const defaultContextValue: LoadingContextType = {
  isLoading: false,
  showLoading: () => {},
  hideLoading: () => {},
};

const LoadingContext = createContext<LoadingContextType>(defaultContextValue);

export const useLoading = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);

  const showLoading = () => setIsLoading(true);
  const hideLoading = () => setIsLoading(false);

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading }}>
      {children}
      {/* Modal Spinner */}
      {isLoading && <LoadingModal />}
    </LoadingContext.Provider>
  );
};
