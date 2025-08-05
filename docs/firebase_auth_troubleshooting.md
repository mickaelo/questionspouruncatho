# Guide de dépannage - Erreurs d'authentification Firebase

## Erreur 400 Bad Request

### Symptômes
- Erreur 400 Bad Request lors de la tentative de connexion avec email/mot de passe
- URL de l'erreur : `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=...`

### Causes possibles et solutions

#### 1. **Authentification par email/mot de passe non activée**

**Problème** : L'authentification par email/mot de passe n'est pas activée dans la console Firebase.

**Solution** :
1. Aller dans la [Console Firebase](https://console.firebase.google.com/)
2. Sélectionner votre projet `questionspouruncatho`
3. Aller dans **Authentication** > **Sign-in method**
4. Activer **Email/Password** si ce n'est pas déjà fait
5. Sauvegarder les changements

#### 2. **Clé API Firebase incorrecte ou expirée**

**Problème** : La clé API Firebase dans la configuration n'est pas valide.

**Solution** :
1. Vérifier la clé API dans `config/firebase.ts`
2. Aller dans la console Firebase > **Project Settings** > **General**
3. Copier la nouvelle clé API Web
4. Mettre à jour `apiKey` dans la configuration

#### 3. **Format d'email invalide**

**Problème** : L'email fourni n'est pas dans un format valide.

**Solution** :
- Vérifier que l'email contient `@` et un domaine valide
- Nettoyer les espaces avant/après l'email
- Utiliser un email valide (ex: `test@example.com`)

#### 4. **Mot de passe trop court**

**Problème** : Le mot de passe ne respecte pas les exigences minimales.

**Solution** :
- Le mot de passe doit contenir au moins 6 caractères
- Vérifier qu'il n'y a pas d'espaces en début/fin

#### 5. **Compte utilisateur inexistant**

**Problème** : L'utilisateur n'existe pas dans Firebase.

**Solution** :
1. Créer un compte d'abord via l'inscription
2. Ou créer un utilisateur de test dans la console Firebase

#### 6. **Problèmes de réseau**

**Problème** : Problèmes de connectivité réseau.

**Solution** :
- Vérifier la connexion internet
- Essayer sur un autre réseau
- Vérifier les paramètres de proxy/firewall

### Diagnostic automatique

Le code inclut maintenant un système de diagnostic automatique qui s'affiche dans la console lors des erreurs.

### Tests à effectuer

1. **Test avec un utilisateur existant** :
   ```javascript
   // Utiliser un email/mot de passe qui existe déjà
   email: "test@example.com"
   password: "password123"
   ```

2. **Test avec un nouvel utilisateur** :
   - Créer un compte via l'inscription d'abord
   - Puis essayer de se connecter

3. **Test de validation** :
   - Essayer avec un email invalide
   - Essayer avec un mot de passe trop court

### Logs à vérifier

Dans la console de développement, vérifier les logs suivants :
- `🔐 Tentative de connexion avec email:`
- `✅ Validation des données réussie`
- `❌ Erreur lors de la connexion:`
- `🔍 Code d'erreur Firebase:`
- `🔍 Diagnostic:`

### Configuration Firebase requise

Assurez-vous que votre projet Firebase a la configuration suivante :

1. **Authentication** activé
2. **Email/Password** sign-in method activé
3. **Firestore** activé
4. **Règles Firestore** permettant la lecture/écriture des documents utilisateurs

### Exemple de règles Firestore

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Contact support

Si le problème persiste après avoir essayé toutes ces solutions, vérifier :
1. Les logs de la console Firebase
2. Les métriques d'utilisation
3. Les erreurs dans la console de développement 