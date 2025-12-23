import { useQuery } from "@tanstack/react-query";
import { getProjects } from "@/api/projects.api";

export const useProjects = () => {
  const {
    data,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  return {
    projects : data || [],
    isLoading,
    isError,
    error,
  };
};