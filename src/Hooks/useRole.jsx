import React from "react";
import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "./axiosPublic";
import { useAuth } from "./useAuth";

const useRole = () => {
  const { user } = useAuth();

  const { data: role = "buyer", isLoading } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => (await axiosPublic(`/user-role/${user?.email}`)).data,
  });
  return { role, isLoading };
};

export default useRole;
