# Module : Gestion des Projets

## Rôle
Ce module permet aux utilisateurs de créer, visionner, modifier et supprimer des projets. Il agit comme le conteneur principal pour les tâches.

## Fichiers Principaux
- `src/pages/ProjectList.jsx` : Page principale listant les projets.
- `src/services/project.js` : Service API pour les opérations CRUD sur les projets.
- `src/components/projects/ProjectCard.jsx` : Composant d'affichage d'un projet en mode grille.
- `src/components/projects/ProjectListItem.jsx` : Composant d'affichage en mode liste.

## Entrées et Sorties

### Création de Projet
- **Entrées** : Nom du projet, Description.
- **Sorties** : Nouveau projet enregistré en base de données et ajouté à la liste locale.

### Liste des Projets
- **Entrées** : Aucune (chargement initial) ou requête de recherche.
- **Sorties** : Liste filtrée de projets, enrichie avec des statistiques de progression.

## Logique Interne

1.  **Récupération des Données** :
    - `fetchProjects` est appelé au montage du composant `ProjectList`.
    - Pour chaque projet récupéré, le code effectue un appel supplémentaire (`fetchTasks(project.id)`) pour calculer la progression.
    ```javascript
    // src/pages/ProjectList.jsx
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        const loadedProjects = Array.isArray(data) ? data : data.data || [];

        // Calculate progress for each project
        const projectsWithStats = await Promise.all(
          loadedProjects.map(async (project) => {
             // ... appel à fetchTasks et calcul
             const tasksData = await fetchTasks(project.id);
             // ...
          })
        );
        setProjects(projectsWithStats);
      } catch (error) {
         // ...
      }
    };
    ```

2.  **Affichage** :
    - Deux modes d'affichage gérés par l'état `viewMode` : 'list' ou 'grid'.
    - Une barre de recherche filtre dynamiquement la liste `projects` côté client.
    ```javascript
    // src/pages/ProjectList.jsx
    const filteredProjects = projects.filter(
      (p) =>
        p.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description &&
          p.description.toLowerCase().includes(searchQuery.toLowerCase())),
    );
    ```

3.  **Gestion des Modales** :
    - Une modale unique est utilisée pour la création et l'édition, distinguée par l'état `editingProject`.
    ```javascript
    // src/pages/ProjectList.jsx
    const handleSubmit = async (e) => {
      e.preventDefault();
      // ...
      if (editingProject) {
        await updateProject(editingProject.id, { ... });
      } else {
        await createProject(projectName, projectDesc);
      }
      // ...
    };
    ```

4.  **Calcul de Progression** :
    - La progression est calculée dynamiquement côté frontend en itérant sur les tâches récupérées pour chaque projet.
