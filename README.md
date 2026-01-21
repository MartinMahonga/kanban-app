# 📋 Exposé du Projet : Kanban Lab

## 1. Introduction
**Kanban Lab** est une application web moderne de gestion de projet basée sur la méthodologie Kanban. Elle permet aux équipes de visualiser leur flux de travail, d'organiser des tâches de manière collaborative et de suivre l'évolution de leurs projets en temps réel.

## 2. Architecture Technique
Le projet s'appuie sur une stack technologique performante et moderne :
- **Frontend** :
  - **React 19** : Bibliothèque principale pour l'interface utilisateur.
  - **Vite** : Outil de build ultra-rapide.
  - **Tailwind CSS 4** : Framework CSS pour un design responsive et élégant.
  - **React Router 7** : Gestion de la navigation et du routage.
  - **@hello-pangea/dnd** : Gestion robuste du glisser-déposer (Drag & Drop).
  - **Recharts** : Visualisation de données pour les statistiques.
- **Backend (API)** :
  - Services basés sur **Axios** pour la communication avec une API REST (Laravel/Symfony probable au vu des endpoints type `groupe-5`).
  - Authentification via **JWT (JSON Web Tokens)** stockés localement.

## 3. Fonctionnalités Principales
- **Tableau Kanban Interactif** : Déplacement fluide des tâches entre les colonnes (À faire, En cours, Terminé).
- **Gestion des Tâches Détaillée** : Ajout de labels, pièces jointes, commentaires et assignation de membres.
- **Gestion de Multi-Projets** : Tableau de bord permettant de créer, modifier et supprimer plusieurs projets.
- **Statistiques & Rapports** : Visualisation graphique de la progression et de la répartition des tâches.
- **Collaboration d'Équipe** : Gestion des membres par projet avec différents niveaux d'accès.
- **Interface Adaptive** : Design "Glassmorphism" moderne et entièrement responsive (mobile/desktop).

## 4. Focus Technique : Implémentation du Code

### A. Récupération des données avec `useEffect`
Le hook `useEffect` est utilisé de manière systématique pour synchroniser l'état local des composants avec la base de données via l'API.

Exemple typique dans `BoardPage.jsx` :
```javascript
useEffect(() => {
  const loadData = async () => {
    try {
      setLoading(true);
      const [projectData, tasksData] = await Promise.all([
        fetchProject(id),
        fetchTasks(id),
      ]);
      setProject(projectData);
      setTasks(tasksData.data || tasksData);
    } catch (error) {
      toast.error("Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };
  loadData();
}, [id]);
```
- **Dépendance `[id]`** : Le composant se recharge automatiquement dès que l'ID du projet dans l'URL change.
- **Gestion du chargement** : L'état `loading` assure une transition visuelle fluide via des Skeletons.

### B. Architecture du `AuthContext`
L'authentification est centralisée dans un `AuthContext` qui englobe l'application pour fournir les informations de session partout.

- **Persistance** : Utilise `localStorage` pour conserver le jeton JWT et les infos utilisateur entre les sessions.
- **Synchronisation** : Des `useEffect` surveillent les changements d'état `user` et `token` pour mettre à jour le stockage local instantanément.
- **Méthodes exposées** : `login`, `register`, et `logout` encapsulent les appels aux services API et gèrent la mise à jour de l'état global.

### C. Gestion d'Erreurs et Feedback
La résilience de l'application repose sur deux piliers :
1. **Intercepteurs Axios** : Injectent automatiquement le token Bearer et pourraient être étendus pour gérer globalement les erreurs 401 (redirection vers login).
2. **ToastContext & Toast System** : Une gestion de notifications "imperative style" (`toast.error()`, `toast.success()`) permet d'informer l'utilisateur des succès ou échecs sans bloquer l'interface.
3. **Mises à jour Optimistes** : Dans le `Board.jsx`, le Drag & Drop met à jour l'UI instantanément avant même que l'API n'ait répondu, offrant une sensation de rapidité unique.
