# Configuration de l'authentification Google

## Prérequis

1. Un projet Firebase configuré
2. L'authentification Google activée dans Firebase Console

## Étapes de configuration

### 1. Activer l'authentification Google dans Firebase Console

1. Allez sur [Firebase Console](https://console.firebase.google.com/)
2. Sélectionnez votre projet
3. Dans le menu de gauche, cliquez sur "Authentication"
4. Cliquez sur l'onglet "Sign-in method"
5. Cliquez sur "Google" dans la liste des fournisseurs
6. Activez Google en cliquant sur le bouton "Enable"
7. Ajoutez votre adresse email de support
8. Cliquez sur "Save"

### 2. Configuration des domaines autorisés

Pour le développement web :
- Ajoutez `localhost` dans la liste des domaines autorisés
- Ajoutez votre domaine de production quand vous déployez

### 3. Configuration pour les applications mobiles

Pour React Native/Expo :
- L'authentification Google fonctionne automatiquement avec la configuration Firebase
- Aucune configuration supplémentaire n'est nécessaire

## Utilisation dans l'application

L'authentification Google est maintenant implémentée et fonctionnelle :

### Fonctionnalités

- ✅ Connexion avec popup (web)
- ✅ Connexion avec redirection (mobile/web si popup bloqué)
- ✅ Gestion des erreurs
- ✅ Stockage des données utilisateur dans Firestore
- ✅ Gestion des utilisateurs existants/nouveaux

### Code d'utilisation

```typescript
import { useAuth } from '@/hooks/useAuth';

const { loginWithGoogle, isLoading, error } = useAuth();

const handleGoogleLogin = async () => {
  const result = await loginWithGoogle();
  if (result.success) {
    console.log('Connexion réussie:', result.user);
  } else {
    console.error('Erreur:', result.error);
  }
};
```

### Gestion des erreurs

L'application gère automatiquement les erreurs courantes :
- Popup bloqué par le navigateur
- Authentification annulée par l'utilisateur
- Erreurs de réseau
- Comptes existants avec d'autres fournisseurs

## Test de l'authentification

1. Lancez l'application
2. Allez sur l'écran de connexion
3. Cliquez sur "Continuer avec Google"
4. Suivez le processus d'authentification Google
5. Vérifiez que vous êtes connecté et redirigé

## Dépannage

### Erreur "Popup blocked"
- Le navigateur bloque les popups
- L'application bascule automatiquement vers la redirection

### Erreur "Network request failed"
- Vérifiez votre connexion internet
- Vérifiez que Firebase est correctement configuré

### Erreur "Account exists with different credential"
- Un compte existe déjà avec cette adresse email mais avec un autre fournisseur
- L'utilisateur doit se connecter avec le bon fournisseur

## Sécurité

- L'authentification utilise PKCE pour plus de sécurité
- Les tokens sont gérés automatiquement par Firebase
- Les données utilisateur sont stockées de manière sécurisée dans Firestore 