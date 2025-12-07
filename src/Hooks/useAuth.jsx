import React, { useContext } from "react";
import { AuthContext } from "../Providers/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
