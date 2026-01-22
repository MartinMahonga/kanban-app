# Rudix

Bienvenue sur le projet **Rudix**, une application de gestion de projet collaborative inspirée de la méthodologie Kanban.

## 📋 Présentation

Rudix permet aux équipes de visualiser leur travail, de maximiser l'efficacité et de s'améliorer continuellement. L'application offre une interface intuitive pour créer des projets, gérer des tâches par glisser-déposer, collaborer en temps réel et suivre la productivité.

## ✨ Fonctionnalités Clés

-   **Authentification Sécurisée** : Inscription, connexion et gestion de session via JWT.
-   **Gestion de Projets** : Création, édition et suivi de multiples projets.
-   **Tableau Kanban Interactif** :
    -   Organisation des tâches en colonnes (À faire, En cours, Terminé).
    -   **Drag & Drop** fluide pour changer les statuts.
-   **Gestion de Tâches Avancée** :
    -   Détails complets (Description, Priorité, Date limite).
    -   **Assignation Multiple** aux membres de l'équipe.
-   **Collaboration Sociale** :
    -   **Commentaires** temps réel sur les tâches.
    -   **Pièces Jointes** (Upload et téléchargement de fichiers).
-   **Statistiques et Rapports** : Visualisation de la productivité et de la répartition du travail.
-   **Équipe** : Visualisation des membres de l'espace de travail.

## 🏗️ Architecture et Documentation

Une analyse détaillée de l'architecture technique est disponible dans le dossier `docs/analysis/`.
Nous avons décomposé l'application en 5 modules majeurs :

1.  **[Authentification](docs/analysis/authentication.md)** : Gestion des utilisateurs et sécurité.
2.  **[Projets](docs/analysis/projects.md)** : Structure globale et listes de projets.
3.  **[Tâches & Kanban](docs/analysis/tasks.md)** : Cœur de l'application, incluant le Drag & Drop et les fonctionnalités sociales.
4.  **[Statistiques](docs/analysis/statistics.md)** : Analyse de données côté client.
5.  **[Gestion d'Équipe](docs/analysis/team.md)** : Membres et page vitrine.

## 🛠️ Stack Technique

-   **Frontend** : React.js (Vite)
-   **Langage** : JavaScript (ES6+)
-   **Styling** : Tailwind CSS
-   **Icônes** : Lucide React
-   **Graphiques** : Recharts
-   **Drag & Drop** : @hello-pangea/dnd

## 🚀 Installation et Démarrage

1.  **Cloner le dépôt**
    ```bash
    git clone <repository-url>
    cd kanban-app
    ```

2.  **Installer les dépendances**
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement**
    ```bash
    npm run dev
    ```

4.  **Accéder à l'application**
    Ouvrez `http://localhost:5173` dans votre navigateur.
