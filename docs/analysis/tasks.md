# Module : Gestion des Tâches (Tableau Kanban)

## Rôle
Ce module est le cœur de l'application, permettant la gestion visuelle des tâches via un tableau Kanban. Il gère le cycle de vie des tâches (création, mise à jour de statut, assignation).

## Fichiers Principaux
- `src/pages/BoardPage.jsx` : Page contrôleur pour une vue de projet spécifique.
- `src/components/kanban/Board.jsx` : Composant d'affichage des colonnes et du Drag & Drop.
- `src/services/task.js` : Service API pour les tâches.
- `src/components/kanban/TaskDetailsPanel.jsx` : Panneau latéral pour les détails et l'édition d'une tâche.

## Entrées et Sorties

### Chargement du Tableau
- **Entrées** : ID du projet (via URL param).
- **Sorties** : Objet Projet et Liste des tâches associées.

### Manipulation de Tâche
- **Création** : Titre, Description, Statut, Priorité, Deadline, Assignation.
- **Mise à jour statut** : Nouvel état (ex: 'todo' -> 'doing').
- **Assignation** : ID utilisateurs.

## Logique Interne

1.  **Initialisation (`BoardPage`)** :
    - Récupère l'ID du projet depuis l'URL.
    - Charge en parallèle les détails du projet et la liste des tâches.
    - Gère une extraction "robuste" des tâches pour supporter différents formats de réponse API.
    ```javascript
    // src/pages/BoardPage.jsx
    const loadData = async (silent = false) => {
        // ...
        const [projectData, tasksData] = await Promise.all([
          fetchProject(id),
          fetchTasks(id),
        ]);
        // ... Robust extraction logic ...
        let loadedTasks = [];
        if (Array.isArray(tasksData)) {
           loadedTasks = tasksData;
        } else if (tasksData && Array.isArray(tasksData.data)) {
           loadedTasks = tasksData.data;
        }
        // ...
    };
    ```

2.  **Gestion Kanban** :
    - Les tâches sont passées au composant `Board`.
    - Le déplacement d'une tâche (Drag & Drop) déclenche une mise à jour optimiste.
    - Le changement de colonne appelle `updateTaskStatus` api.
    ```javascript
    // src/components/kanban/Board.jsx
    const onDragEnd = async (result) => {
        // ... logic to reorder columns ...
        
        // Optimistic Update
        setColumns({ ... });

        // Call API
        try {
          await updateTaskStatus(projectId, task.id, finishColumnId);
        } catch (error) {
          console.error("Failed to update status", error);
        }
    };
    ```

3.  **Détails et Édition** :
    - Cliquer sur une tâche ouvre `TaskDetailsPanel`.
    - Les modifications dans ce panneau sont propagées via `handleTaskUpdate`.
    ```javascript
    // src/pages/BoardPage.jsx
    const handleTaskUpdate = (updatedTask) => {
        if (!updatedTask) {
          loadData(true);
          return;
        }
        setTasks((prevTasks) =>
          prevTasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)),
        );
        setSelectedTask(updatedTask);
    };
    ```

4.  **Interactions Kanban (Drag & Drop)** :
    - Implémenté via `@hello-pangea/dnd`.
    - **Logique de Déplacement (`onDragEnd`)** :
        1.  Vérifie si la destination est valide.
        2.  *Même colonne* : Réordonne localement le tableau `columns[id]`.
        3.  *Changement de colonne* :
            - Supprime de la colonne source, ajoute à la colonne destination.
            - Met à jour l'état local immédiatement (Optimistic UI) pour éviter l'attente serveur.
            - Déclenche `updateTaskStatus` en arrière-plan.
            ```javascript
            // src/components/kanban/Board.jsx
            const onDragEnd = async (result) => {
                // ... validation ...
                
                // Optimistic Update
                setColumns({
                  ...columns,
                  [startColumnId]: newStartTasks,
                  [finishColumnId]: newFinishTasks,
                });
            
                // Call API without triggering full reload/flash
                try {
                  await updateTaskStatus(projectId, task.id, finishColumnId);
                } catch (error) {
                  console.error("Failed to update status", error);
                }
            };
            ```

5.  **Fonctionnalités Sociales (Détails de Tâche)** :
    - Le panneau latéral (`TaskDetailsPanel`) gère trois onglets principaux :
    
    a. **Détails** : Édition des champs standards.
    
    b. **Commentaires (`CommentSection`)** :
       - Récupération et ajout via service dédié.
       ```javascript
       // src/services/comment.js
       export const addComment = async (taskId, content) => {
         const response = await api.post(`/taches/${taskId}/commentaires`, { contenu: content });
         return response.data;
       };
       ```
    
    c. **Pièces Jointes (`AttachmentSection`)** :
       - Upload via `FormData`.
       ```javascript
       // src/services/attachment.js
       export const uploadAttachment = async (taskId, file) => {
         const formData = new FormData();
         formData.append('fichier', file);
         
         const response = await api.post(`/taches/${taskId}/pieces-jointes`, formData, {
           headers: { 'Content-Type': 'multipart/form-data' },
         });
         return response.data;
       };
       ```

6.  **Modales** :
    - `CreateTaskModal` permet d'ajouter une tâche directement dans une colonne spécifique (statut pré-rempli).
