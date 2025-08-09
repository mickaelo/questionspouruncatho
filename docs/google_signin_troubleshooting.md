# Dépannage Google Sign-In - DEVELOPER_ERROR

## 🚨 Erreur DEVELOPER_ERROR

Cette erreur indique un problème de configuration dans Google Cloud Console ou dans l'app.

## 📋 Étapes de dépannage

### 1. Vérifier Google Cloud Console

#### 1.1 Client OAuth 2.0 Android
- Allez sur [Google Cloud Console](https://console.cloud.google.com/)
- Sélectionnez votre projet : `helical-theater-308116`
- APIs & Services > Credentials
- Vérifiez que vous avez un client OAuth 2.0 de type **Android**

**Configuration requise :**
- **Package name** : `com.anonymous.questionspouruncatho`
- **SHA-1 fingerprint** : `AE:10:DD:74:96:F6:98:D5:51:4F:2A:65:35:6A:DF:28:3D:90:C0:C8`
- **Client ID** : `9483993562-fvk8nb3l2uie5hh0iot7nk7t1melir3h.apps.googleusercontent.com`

#### 1.2 Client OAuth 2.0 Web
- Vérifiez que vous avez un client OAuth 2.0 de type **Web**
- **Client ID** : `9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com`

### 2. Vérifier les fichiers Firebase

#### 2.1 google-services.json (Android)
- Télécharger depuis [Firebase Console](https://console.firebase.google.com/)
- Projet : `helical-theater-308116`
- Project Settings > General > Your apps > Android
- Télécharger `google-services.json`
- Placer à la racine du projet

#### 2.2 GoogleService-Info.plist (iOS)
- Télécharger depuis Firebase Console
- Project Settings > General > Your apps > iOS
- Télécharger `GoogleService-Info.plist`
- Placer à la racine du projet

### 3. Vérifier la configuration app.json

```json
{
  "expo": {
    "plugins": [
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

### 4. Vérifier la configuration dans le code

```typescript
GoogleSignin.configure({
  webClientId: '9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});
```

### 5. Rebuild de l'app

```bash
# Nettoyer complètement
npx expo prebuild --clean

# Supprimer node_modules et réinstaller
rm -rf node_modules
npm install

# Rebuild
npx expo run:android
```

### 6. Vérifier les permissions

#### 6.1 Permissions Android
Dans `android/app/src/main/AndroidManifest.xml` :
```xml
<uses-permission android:name="android.permission.INTERNET" />
```

#### 6.2 Permissions iOS
Dans `ios/YourApp/Info.plist` :
```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLName</key>
    <string>google</string>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.9483993562-fvk8nb3l2uie5hh0iot7nk7t1melir3h</string>
    </array>
  </dict>
</array>
```

### 7. Vérifier l'émulateur/appareil

#### 7.1 Google Play Services
- Vérifier que Google Play Services est installé
- Tester sur un émulateur avec Google Play Services
- Ou tester sur un appareil physique

#### 7.2 Compte Google
- Vérifier qu'un compte Google est configuré sur l'appareil
- Vérifier que l'appareil est connecté à Internet

### 8. Debug avancé

#### 8.1 Vérifier les logs
```bash
npx expo run:android --device
```

#### 8.2 Vérifier la configuration
```typescript
// Ajouter dans votre code
console.log('Google Sign-In config:', GoogleSignin.configure);
console.log('Has Play Services:', await GoogleSignin.hasPlayServices());
```

### 9. Solutions alternatives

#### 9.1 Utiliser expo-auth-session (temporaire)
Si le problème persiste, revenir à expo-auth-session :

```typescript
// Dans useAuth.ts, remplacer la section mobile
// Utiliser expo-auth-session au lieu de Google Sign-In
```

#### 9.2 Vérifier les versions
```bash
npm list @react-native-google-signin/google-signin
npm list expo
```

## 🔍 Checklist de vérification

- [ ] Client OAuth 2.0 Android configuré
- [ ] Client OAuth 2.0 Web configuré
- [ ] google-services.json présent
- [ ] GoogleService-Info.plist présent
- [ ] app.json configuré
- [ ] App rebuildée avec `expo prebuild --clean`
- [ ] Google Play Services installé
- [ ] Compte Google configuré
- [ ] Connexion Internet active

## 📞 Support

Si le problème persiste :
1. Vérifier les logs complets
2. Tester sur un appareil différent
3. Vérifier la configuration Firebase
4. Consulter la [documentation officielle](https://react-native-google-signin.github.io/docs/troubleshooting) 