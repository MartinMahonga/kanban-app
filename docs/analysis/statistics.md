# Module : Statistiques

## Rôle
Ce module fournit une vue analytique de la productivité globale de l'utilisateur à travers tous les projets. Il agrège les données pour présenter des métriques clés et des graphiques.

## Fichiers Principaux
- `src/pages/Stats.jsx` : Page unique contenant toute la logique de récupération et de visualisation des statistiques.

## Entrées et Sorties

- **Entrées** : L'ensemble des projets et leurs tâches respectives.
- **Sorties** :
    - Compteurs globaux (Total, Complétées, En cours, À faire).
    - Distribution par priorité (Haute, Moyenne, Basse).
    - Activité hebdomadaire (Tâches créées par jour).

## Logique Interne

1.  **Agrégation de Données (Côté Client)** :
    - Au chargement, le module récupère *tous* les projets via `fetchProjects`.
    - Il itère ensuite sur chaque projet pour récupérer ses tâches via `fetchTasks`.
    ```javascript
    // src/pages/Stats.jsx
    const loadData = async () => {
        // ...
        const projectsData = await fetchProjects();
        // ...
        let allTasks = [];
        await Promise.all(
          projects.map(async (project) => {
             const tasksData = await fetchTasks(project.id);
             // ... extraction ...
             allTasks = [...allTasks, ...projectTasks];
          })
        );
        processStats(allTasks);
    };
    ```

2.  **Traitement des Statistiques (`processStats`)** :
    - **Compteurs** : Filtre le tableau global des tâches selon le statut.
    - **Prorités** : Normalise les priorités et compte les occurrences.
    ```javascript
    // src/pages/Stats.jsx
    const processStats = (tasks) => {
        // 1. Counts
        const completed = tasks.filter(t => t.status === "done" || t.status === "DONE").length;
        // ...
        
        // 2. Priority Distribution
        tasks.forEach((task) => {
           const p = (task.priorite || "medium").toLowerCase();
           if (p === "high" || p === "haute") priorities["Haute"]++;
           // ...
        });
        
        // 3. Weekly Activity
        // ...
        setStats({ ... });
    };
    ```

3.  **Visualisation** :
    - Utilise la librairie `recharts` pour le rendu des graphiques (BarChart pour l'activité, PieChart pour les priorités).
    - Affiche des cartes résumés (StatCard) avec des icônes et des codes couleurs.
