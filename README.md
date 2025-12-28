# Application de Gestion de Projets & Tâches Kanban

<div style="display: flex; justify-content: "center"; align-items: "center"; gap: 8px;">
  <img src="./src/assets/icon.png" width="150px">
  <h1 style="font-size: 96px;">Rudix</h1>
</div>

## Contexte académique

Ce projet est réalisé dans le cadre d’un **projet scolaire**. Il consiste à développer le **frontend en React** d’une application de **gestion de projets et de tâches** de type **Kanban**, en consommant une **API REST développée avec Laravel** et une base de données **SQLite**.

**Date de rendu finale : 19 janvier 2026**

---

## Objectifs du projet

- Créer une application web moderne et fonctionnelle
- Implémenter une gestion de projets et de tâches type Kanban
- Consommer une API REST sécurisée (Bearer Token)
- Travailler en équipe avec Git (branches, pull requests)
- Appliquer les bonnes pratiques de développement frontend

---

## Fonctionnalités principales

### Authentification

- Inscription utilisateur
- Connexion utilisateur
- Gestion du token Bearer

### Projets

- Liste des projets
- Création de projets
- Accès au tableau Kanban par projet

### Tableau Kanban

- Colonnes : Todo / Doing / Done
- Drag & Drop des tâches
- Mise à jour du statut en temps réel

### Tâches

- Création / modification / suppression
- Assignation à un membre 
- Priorités (low / medium / high)
- Deadlines

### Collaboration

- Commentaires sur les tâches
- Rapport de productivité 

### Fichiers

- Upload de pièces jointes
- Consultation et suppression de fichiers

---

## Stack technique

### Frontend

- **React**
- **JavaScript**
- **Vite**
- **TailwindCSS**
- **React Router**
- **TanStack Query**
- **Axios**
- **@dnd-kit/core** (Drag & Drop)
- **@dnd-kit/modifiers**
- **@dnd-kit/sortable**

### Backend (fourni)

- **Laravel**
- **SQLite**
- **API REST**
- **Authentification Bearer Token**

---

## Structure du projet Frontend

```bash
src/
│
├── api/
│   ├── auth.api.js
│   ├── projects.api.js
│   ├── tasks.api.js
│   └── upload.api.js
│
├── components/
│   ├── kanban/
│   │   ├── Board.jsx
│   │   ├── Column.jsx
│   │   └── TaskCard.jsx
│   └── ui/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Projects.jsx
│   └── ProjectBoard.jsx
│
├── hooks/
│   ├── useAuth.js
│   ├── useProjects.js
│   └── useTasks.js
│
├── contexts/
│   └── AuthContext.jsx
│
├── App.jsx
└── main.jsx
```

---

## Endpoints API utilisés

### Authentification

```http
POST /api/groupe-5/auth/register
POST /api/groupe-5/auth/login
```

### Projets

```http
GET  /api/groupe-5/projects
POST /api/groupe-5/projects
```

### Tâches

```http
POST   /api/groupe-5/tasks
PUT    /api/groupe-5/tasks/{id}
DELETE /api/groupe-5/tasks/{id}
```

### Kanban

```http
GET /api/groupe-5/board/{projectId}
```

### Fichiers

```http
POST /api/upload/image
GET  /api/upload/files
DEL  /api/upload/file/{uuid}
```

---

## Organisation de l’équipe (11 personnes)

|Équipe|Domaine|Membres|
|---|---|---|
|Équipe 1|Authentification|1|
|Équipe 2|Projets|2|
|Équipe 3|Kanban Board|3|
|Équipe 4|Tâches|3|
|Équipe 5|Collaboration|2|
|Équipe 6|UI / UX & Intégration|2|

---

## Workflow Git

### Branches principales

- `main` → version stable
- `develop` → intégration générale

### Branches de fonctionnalités

```bash
feature/auth
feature/projects
feature/kanban
feature/tasks
feature/comments
feature/ui
```

### Règles

- Pas de push direct sur `main`
- Pull Request obligatoire vers `develop`
- Code review requise

<a href="./docs/git-command.md">Lire plus</a>

---

## Installation & lancement du projet

### Prérequis

- Node.js ≥ 18
- npm ou pnpm

### Clone repository

```bash
git clone https://github.com/MartinMahonga/kanban-app.git
```

### Installation

```bash
npm install
```

### Lancement en développement

```bash
npm run dev
```

---

## Planning prévisionnel

- **Phase 1** : Setup & Authentification
- **Phase 2** : Projets & Kanban
- **Phase 3** : Collaboration & Upload 
- **Phase 4** : Tests, corrections et démo finale
