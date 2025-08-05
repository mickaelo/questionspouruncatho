# Dépannage des problèmes de connectivité Firestore

## Problème : "Could not reach Cloud Firestore backend"

Cette erreur indique que l'application ne peut pas se connecter au backend Firestore. Voici les solutions à essayer :

### 1. Vérifier la connectivité réseau

```bash
# Tester la connectivité internet
ping google.com

# Vérifier que Firebase est accessible
curl -I https://firestore.googleapis.com
```

### 2. Vérifier les règles Firestore

Allez dans Firebase Console → Firestore Database → Rules et assurez-vous que les règles permettent la lecture/écriture :

```javascript
// Règles temporaires pour le développement (À NE PAS UTILISER EN PRODUCTION)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### 3. Vérifier la configuration Firebase

Assurez-vous que votre configuration Firebase est correcte dans `config/firebase.ts` :

```typescript
const firebaseConfig = {
  apiKey: "votre-api-key",
  authDomain: "votre-projet.firebaseapp.com",
  projectId: "votre-projet-id",
  // ... autres champs
};
```

### 4. Solutions spécifiques à Android

#### A. Redémarrer l'émulateur Android
```bash
# Arrêter l'émulateur
adb emu kill

# Redémarrer l'émulateur
emulator -avd [nom_de_votre_avd]
```

#### B. Vider le cache de l'application
```bash
# Vider le cache React Native
npx react-native start --reset-cache

# Ou pour Expo
expo start --clear
```

#### C. Vérifier les permissions réseau
Assurez-vous que votre application a les permissions réseau dans `android/app/src/main/AndroidManifest.xml` :

```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
```

### 5. Configuration Firestore optimisée

La configuration actuelle utilise des paramètres optimisés pour Android :

```typescript
export const db = initializeFirestore(app, {
  cacheSizeBytes: 50 * 1024 * 1024, // 50 MB cache
  experimentalForceLongPolling: true, // Force long polling pour Android
  useFetchStreams: false, // Désactiver les fetch streams
  ignoreUndefinedProperties: true, // Ignorer les propriétés undefined
});
```

### 6. Diagnostic automatique

Utilisez le composant `FirebaseDiagnostic` pour identifier les problèmes :

```typescript
import { FirebaseDiagnostic } from '@/components/FirebaseDiagnostic';

// Dans votre écran de développement
<FirebaseDiagnostic />
```

### 7. Solutions alternatives

#### A. Utiliser l'émulateur Firestore local
```bash
# Installer Firebase CLI
npm install -g firebase-tools

# Démarrer l'émulateur
firebase emulators:start --only firestore
```

Puis dans votre code :
```typescript
import { connectFirestoreEmulator } from 'firebase/firestore';

if (__DEV__) {
  connectFirestoreEmulator(db, 'localhost', 8080);
}
```

#### B. Augmenter les timeouts
```typescript
// Dans config/development.ts
export const DEV_CONFIG = {
  firestore: {
    // ... autres paramètres
    timeout: 60000, // 60 secondes
  },
};
```

### 8. Vérifications supplémentaires

1. **Projet Firebase actif** : Vérifiez que votre projet Firebase n'est pas en pause
2. **Quotas** : Vérifiez que vous n'avez pas dépassé les quotas Firestore
3. **Version Firebase** : Assurez-vous d'utiliser une version compatible
4. **Réseau d'entreprise** : Certains réseaux d'entreprise bloquent Firebase

### 9. Logs de débogage

Activez les logs détaillés pour identifier le problème :

```typescript
// Dans config/development.ts
export const DEV_CONFIG = {
  debug: {
    enableFirestoreLogs: true,
    enableAuthLogs: true,
    enableNetworkLogs: true,
  }
};
```

### 10. Contact support

Si le problème persiste :
1. Vérifiez les [statuts Firebase](https://status.firebase.google.com/)
2. Consultez la [documentation Firebase](https://firebase.google.com/docs/firestore)
3. Contactez le support Firebase si nécessaire

## Problèmes courants et solutions

| Problème | Solution |
|----------|----------|
| Timeout après 10 secondes | Augmenter le timeout, vérifier la connectivité |
| Erreur de règles | Vérifier les règles Firestore |
| Problème Android spécifique | Utiliser `experimentalForceLongPolling: true` |
| Cache corrompu | Vider le cache de l'application |
| Problème réseau | Vérifier les permissions et la connectivité | 