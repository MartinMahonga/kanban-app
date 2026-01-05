import { useQuery } from "@tanstack/react-query";
import { getTasks } from "@/api/tasks.api";
import { useParams } from "react-router-dom";

export const useTasks = () => {
  // 1. Récupération de l'ID depuis l'URL
  const { projectId } = useParams();

  const {
    data,
    isLoading,
    isError,
    error,
    refetch // Utile pour forcer une mise à jour manuelle
  } = useQuery({
    queryKey: ["tasks", projectId],
    queryFn: () => getTasks(projectId),
    // 2. Sécurité : ne lance la requête que si projectId existe
    enabled: !!projectId, 
    // 3. Optionnel : garde les anciennes données pendant le chargement d'un nouvel ID
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