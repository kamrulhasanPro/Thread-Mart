import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

export const useAuth = () => {
  return useContext(AuthContext);
};
