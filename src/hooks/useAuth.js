import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth doit être utilisé dans un AuthProvider");
  }

  return context;
};
