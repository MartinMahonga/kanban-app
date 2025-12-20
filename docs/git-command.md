Cette page présente **toutes les commandes Git nécessaires**, à l'organisation et à la réalisation du projet

[[https://youtu.be/2-Lwq8I0T_4?si=f2KJAwxGJiMUj8le]]

---

# Initialisation du dépôt

```bash
git init
git branch -M main
git add .
git commit -m "chore: initial project setup"
```

`main` = branche **stable / rendu final**

---

# Création des branches principales

```bash
git checkout -b develop
git push -u origin develop
```

| Branche     | Rôle                          |
| ----------- | ----------------------------- |
| `main`      | Version finale (rendu)        |
| `develop`   | Intégration globale           |
| `feature/*` | Développement fonctionnalités |
| `fix/*`     | Corrections                   |
| `release/*` | Pré-rendu                     |

---

# Branches par équipe (14 personnes)

### Authentification & Sécurité

```bash
git checkout -b feature/auth
```

### Dashboard & Projets

```bash
git checkout -b feature/projects
```

### Kanban Board

```bash
git checkout -b feature/kanban
```

### Tâches & Modals

```bash
git checkout -b feature/tasks
```

### Collaboration & Commentaires

```bash
git checkout -b feature/comments
```

### UI / UX & Design

```bash
git checkout -b feature/ui
```

---

# Workflow quotidien (TRÈS IMPORTANT)

### Récupérer la dernière version

```bash
git checkout develop
git pull origin develop
```

### Créer une branche de travail

```bash
git checkout -b feature/kanban-drag-drop
```

### Travailler et commit

```bash
git add .
git commit -m "feat: add drag and drop to kanban board"
```

### Push

```bash
git push origin feature/kanban-drag-drop
```

### Pull Request → `develop`

**Review obligatoire**

---

# Convention de commits

| Type       | Exemple                 |
| ---------- | ----------------------- |
| `feat`     | nouvelle fonctionnalité |
| `fix`      | correction de bug       |
| `chore`    | config, nettoyage       |
| `style`    | UI / CSS                |
| `docs`     | documentation           |
| `refactor` | refacto                 |

```bash
git commit -m "feat: create project modal"
git commit -m "fix: token refresh issue"
```

---

# Résolution de conflits

```bash
git pull origin develop
# résoudre conflits
git add .
git commit -m "fix: resolve merge conflicts"
```

---

# Préparation du rendu final

```bash
git checkout develop
git checkout -b release/v1.0
```

Tests finaux → corrections

```bash
git checkout main
git merge release/v1.0
git tag v1.0
git push origin main --tags
```

---

# Annuler / corriger

### Annuler fichier modifié

```bash
git checkout -- fichier.js
```

### Annuler dernier commit (local)

```bash
git reset --soft HEAD~1
```

### Modifier message de commit

```bash
git commit --amend
```

---

# Résumé rapide

| Action           | Commande                      |
| ---------------- | ----------------------------- |
| Nouvelle branche | `git checkout -b feature/xxx` |
| Sauvegarder      | `git commit -m "feat: ..."`   |
| Envoyer          | `git push origin feature/xxx` |
| Mettre à jour    | `git pull origin develop`     |
| Fusionner        | Pull Request                  |
