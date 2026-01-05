import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/tasks.api";
import { useParams } from "react-router-dom";

export const useTasks = () => {
  // Récupération de l'ID depuis l'URL
  const { projectId } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch // force une mise à jour manuelle
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
    // ne lance la requête que si projectId existe
    enabled: !!projectId, 
    // garde les anciennes données pendant le chargement d'un nouvel ID
    placeholderData: (previousData) => previousData,
  });

  return {
    tasks: data?.data || [], 
    isLoading: isLoading && !!projectId, // Évite un état loading si l'ID est manquant
    isError,
    error,
    refetch,
    projectId // On renvoie l'ID pour pouvoir l'utiliser facilement dans les composants
  };
};