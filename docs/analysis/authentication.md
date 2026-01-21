# Module : Authentification

## Rôle
Ce module est responsable de la gestion des utilisateurs, incluant l'inscription, la connexion, la déconnexion et la persistance de la session utilisateur via un token Bearer. Il sécurise l'accès à l'application.

## Fichiers Principaux
- `src/context/AuthContext.jsx` : Contexte React gérant l'état global de l'utilisateur.
- `src/services/auth.js` : Service API pour les appels backend liés à l'authentification.
- `src/pages/Login.jsx` : Page de connexion.
- `src/pages/Register.jsx` : Page d'inscription.

## Entrées et Sorties

### Connexion (Login)
- **Entrées** : Email, Mot de passe.
- **Sorties** : 
  - Token d'accès (stocké dans `localStorage`).
  - Objet Utilisateur (stocké dans le contexte et `localStorage`).
  - Redirection vers le tableau de bord.

### Inscription (Register)
- **Entrées** : Nom, Email, Mot de passe, Confirmation de mot de passe.
- **Sorties** : 
  - Token d'accès.
  - Nouvel utilisateur créé.

## Logique Interne

1.  **Gestion de l'État (AuthContext)** :
    - Au chargement, le contexte vérifie `localStorage` pour voir si un token et un utilisateur existent déjà (`user`, `token`).
    - Utilise `useState` pour maintenir l'utilisateur courant et le token.
    ```javascript
    // src/context/AuthContext.jsx
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    ```

2.  **Processus de Connexion** :
    - L'utilisateur soumet le formulaire sur `Login.jsx`.
    - La fonction `login` du contexte appelle `authService.login(email, password)`.
    - Le service effectue une requête `POST /auth/login`.
    - Si succès, le token et l'utilisateur sont extraits de la réponse. `setToken` et `setUser` mettent à jour l'état global.
    ```javascript
    // src/context/AuthContext.jsx
    const login = async (email, password) => {
        setLoading(true);
        try {
            const data = await authService.login(email, password);
            const accessToken = data.access_token || data.token;
            setToken(accessToken);
            setUser(data.user); 
            return data;
        } catch (error) {
            throw error;
        } finally {
            setLoading(false);
        }
    };
    ```
    ```javascript
    // src/services/auth.js
    export const login = async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    };
    ```

3.  **Processus de Déconnexion** :
    - La fonction `logout` vide le `localStorage` et réinitialise l'état (`null`).
    ```javascript
    // src/context/AuthContext.jsx
    const logout = () => {
        authService.logout();
        setToken(null);
        setUser(null);
    };
    ```

4.  **Sécurité** :
    - Le token est stocké dans `localStorage`.
    ```javascript
    // src/context/AuthContext.jsx
    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
        } else {
            localStorage.removeItem('token');
        }
    }, [token]);
    ```
