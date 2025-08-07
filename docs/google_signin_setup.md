# Configuration Google Sign-In avec @react-native-google-signin/google-signin

## 📋 Étapes d'installation

### 1. Installer le package

```bash
npm install @react-native-google-signin/google-signin
```

### 2. Configuration app.json

Le fichier `app.json` a été configuré avec :

```json
{
  "expo": {
    "plugins": [
      "expo-router",
      [
        "expo-splash-screen",
        {
          "image": "./assets/images/splash-icon.png",
          "imageWidth": 200,
          "resizeMode": "contain",
          "backgroundColor": "#ffffff"
        }
      ],
      "@react-native-google-signin/google-signin"
    ],
    "android": {
      "googleServicesFile": "./google-services.json"
    },
    "ios": {
      "googleServicesFile": "./GoogleService-Info.plist"
    }
  }
}
```

### 3. Fichiers Firebase requis

#### Pour Android
- Télécharger `google-services.json` depuis Firebase Console
- Placer le fichier à la racine du projet

#### Pour iOS
- Télécharger `GoogleService-Info.plist` depuis Firebase Console
- Placer le fichier à la racine du projet

### 4. Configuration Google Cloud Console

#### Client OAuth 2.0 Android
- **Package name** : `com.anonymous.questionpouruncatho2`
- **SHA-1 fingerprint** : `AE:10:DD:74:96:F6:98:D5:51:4F:2A:65:35:6A:DF:28:3D:90:C0:C8`
- **Client ID** : `9483993562-fvk8nb3l2uie5hh0iot7nk7t1melir3h.apps.googleusercontent.com`

#### Client OAuth 2.0 Web
- **Client ID** : `9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com`
- **Authorized redirect URIs** : 
  ```
  questionpouruncatho2://auth/callback
  exp://localhost:19000/--/auth/callback
  ```

### 5. Rebuild de l'app

```bash
# Nettoyer et reconstruire
npx expo prebuild --clean

# Rebuild pour Android et iOS
npx expo run:android
npx expo run:ios
```

## 🔧 Utilisation dans le code

### Configuration initiale

```typescript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Dans votre App.tsx ou fichier d'initialisation
GoogleSignin.configure({
  webClientId: '9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

### Authentification

```typescript
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const signIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('Utilisateur connecté:', userInfo);
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('Authentification annulée');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Authentification en cours');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Google Play Services non disponible');
    } else {
      console.log('Erreur:', error);
    }
  }
};
```

### Déconnexion

```typescript
const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    console.log('Déconnexion réussie');
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error);
  }
};
```

### Vérifier l'état de connexion

```typescript
const checkSignInStatus = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (isSignedIn) {
      const userInfo = await GoogleSignin.getCurrentUser();
      console.log('Utilisateur connecté:', userInfo);
    } else {
      console.log('Aucun utilisateur connecté');
    }
  } catch (error) {
    console.error('Erreur:', error);
  }
};
```

## 🚨 Limitations importantes

### Expo Go
- **Ne fonctionne PAS** avec Expo Go
- Nécessite un **development build** ou **production build**
- Utiliser `expo run:android` ou `expo run:ios`

### Configuration requise
- Fichiers Firebase (`google-services.json`, `GoogleService-Info.plist`)
- Client OAuth 2.0 configuré dans Google Cloud Console
- SHA-1 fingerprint correct pour Android

## 🔍 Dépannage

### Erreur "Google Play Services not available"
- Vérifier que Google Play Services est installé sur l'appareil
- Tester sur un émulateur avec Google Play Services

### Erreur "Sign in required"
- L'utilisateur doit se connecter manuellement
- Vérifier la configuration OAuth dans Google Cloud Console

### Erreur "Network error"
- Vérifier la connexion internet
- Vérifier que les services Google sont accessibles

## 📚 Ressources

- [Documentation officielle](https://react-native-google-signin.github.io/docs/setting-up/expo)
- [Guide Firebase](https://firebase.google.com/docs/auth/android/google-signin)
- [Google Cloud Console](https://console.cloud.google.com/)

## ✅ Avantages de cette solution

- ✅ Authentification native Google
- ✅ Support complet Android/iOS
- ✅ Intégration Firebase
- ✅ Gestion des tokens automatique
- ✅ Support offline
- ✅ Gestion d'erreurs robuste 