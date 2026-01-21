# Module : Gestion d'Équipe et Utilisateurs

## Rôle
Ce module permet de visualiser les membres de l'espace de travail (utilisateurs inscrits) et présente l'équipe de développement (page statique).

## Fichiers Principaux
- `src/pages/Team.jsx` : Page listant les utilisateurs de l'application.
- `src/pages/LandingTeam.jsx` : Page statique de présentation de l'équipe (Vitrine).
- `src/services/user.js` : Service API pour récupérer les utilisateurs.

## Entrées et Sorties

### Liste des Utilisateurs (Team.jsx)
- **Entrées** : Aucune.
- **Sorties** : Liste des cartes utilisateurs (Avatar, Nom, Email, ID).

## Logique Interne

1.  **Récupération (Team.jsx)** :
    - Utilise `fetchUsers` qui appelle l'endpoint `/users`.
    - Affiche un état de chargement (`Loader2`) pendant la requête.
    ```javascript
    // src/services/user.js
    export const fetchUsers = async () => {
        try {
            const response = await api.get('/users'); 
            return response.data;
        } catch (error) {
            console.warn("Could not fetch users", error);
            return [];
        }
    };
    ```
    ```javascript
    // src/pages/Team.jsx
    useEffect(() => {
        const loadUsers = async () => {
          try {
            setLoading(true);
            const data = await fetchUsers();
            setUsers(Array.isArray(data) ? data : data.data || []);
          } catch (error) {
            // ...
          } finally {
            setLoading(false);
          }
        };
        loadUsers();
    }, []);
    ```

2.  **Affichage** :
    - Présente les utilisateurs sous forme de grille de cartes.
    - Génère un avatar basé sur l'initiale du nom si aucune image n'est fournie.
    ```javascript
    // src/pages/Team.jsx
    {users.map((user) => (
        <div key={user.id} ...>
           <div ...>
             {user.name ? user.name.charAt(0).toUpperCase() : <User ... />}
           </div>
           {/* ... */}
        </div>
    ))}
    ```
