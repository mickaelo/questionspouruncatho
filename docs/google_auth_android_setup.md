# Configuration de l'authentification Google pour Android

## Problème résolu

Le problème était que `signInWithRedirect` ne fonctionne pas sur Android car c'est une méthode spécifique au web Firebase. Sur React Native/Expo, il faut utiliser `expo-auth-session` pour l'authentification OAuth.

## Solution implémentée

### 1. Modification du hook useAuth

Le hook `useAuth` a été modifié pour :
- Détecter la plateforme (web vs mobile)
- Utiliser Firebase Auth avec popup/redirect sur le web
- Utiliser `expo-auth-session` sur mobile (Android/iOS)

### 2. Configuration requise

#### Configuration Google OAuth

1. **Client ID** : Utilise le client ID configuré dans `config/auth.ts`
2. **Redirect URI** : Utilise le schéma `questionpouruncatho2://auth/callback`
3. **Endpoints OAuth** : Utilise les endpoints configurés dans `config/auth.ts`

#### Configuration Expo

Le plugin `expo-auth-session` a été ajouté dans `app.json` avec le schéma de redirection.

### 3. Flux d'authentification sur Android

1. L'utilisateur clique sur "Se connecter avec Google"
2. `expo-auth-session` ouvre le navigateur avec l'URL d'autorisation Google
3. L'utilisateur s'authentifie sur Google
4. Google redirige vers `questionpouruncatho2://auth/callback`
5. L'app récupère le code d'autorisation
6. Le code est échangé contre un token d'accès
7. Les informations utilisateur sont récupérées via l'API Google
8. L'utilisateur est créé/mis à jour dans Firestore
9. L'utilisateur est connecté dans l'app

### 4. Configuration Google Cloud Console

Pour que l'authentification fonctionne, vous devez configurer dans Google Cloud Console :

#### 4.1 Créer un client OAuth 2.0 pour Android

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Sélectionnez votre projet Firebase
3. Allez dans "APIs & Services" > "Credentials"
4. Cliquez sur "Create Credentials" > "OAuth 2.0 Client IDs"
5. Sélectionnez "Android" comme type d'application

#### 4.2 Configuration du client Android

**Package name :** `com.anonymous.questionpouruncatho2`

**SHA-1 fingerprint :** `AE:10:DD:74:96:F6:98:D5:51:4F:2A:65:35:6A:DF:28:3D:90:C0:C8`

**Client ID Android :** `9483993562-fvk8nb3l2uie5hh0iot7nk7t1melir3h.apps.googleusercontent.com`

> **Note :** Ce SHA-1 est pour le keystore de debug. Pour la production, vous devrez utiliser le SHA-1 de votre keystore de production.

#### 4.3 URI de redirection autorisés

Ajoutez cette URI dans la section "Authorized redirect URIs" :
```
questionpouruncatho2://auth/callback
```

### 5. Obtenir le SHA-1 fingerprint

#### Pour le développement (debug keystore)

```bash
# Windows PowerShell
keytool -list -v -keystore $env:USERPROFILE\.android\debug.keystore -alias androiddebugkey -storepass android -keypass android

# macOS/Linux
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android
```

#### Pour la production (keystore de production)

```bash
keytool -list -v -keystore path-to-your-production-keystore -alias your-key-alias
```

### 6. Test de l'authentification

Pour tester l'authentification Google sur Android :

1. Construire l'app : `expo run:android`
2. Lancer l'app sur un émulateur ou appareil Android
3. Aller à la page de connexion
4. Cliquer sur "Se connecter avec Google"
5. Vérifier que l'authentification fonctionne

### 7. Dépannage

#### Erreur "redirect_uri_mismatch"
- Vérifier que l'URI de redirection dans Google Cloud Console correspond exactement à `questionpouruncatho2://auth/callback`

#### Erreur "invalid_client"
- Vérifier que le client ID dans `config/auth.ts` correspond à celui de Google Cloud Console
- Vérifier que le package name et SHA-1 fingerprint sont corrects

#### Erreur 400 : "invalid request" - DÉPANNAGE DÉTAILLÉ

Cette erreur est très courante sur Android. Voici les solutions par ordre de priorité :

**1. Vérifier les logs de l'app**
- Regarder les logs dans la console pour voir :
  - Le `Redirect URI` généré
  - Le `Client ID` utilisé
  - Si `Expo Go` est détecté

**2. Vérifier la configuration Google Cloud Console**
- Le client OAuth doit être de type **Android** (pas Web)
- Le package name doit être exactement : `com.anonymous.questionpouruncatho2`
- Le SHA-1 doit correspondre au keystore utilisé

**3. Vérifier les URI de redirection autorisés**
- Dans Google Cloud Console > Credentials > OAuth 2.0 Client IDs
- Ajouter ces URI :
  ```
  questionpouruncatho2://auth/callback
  exp://localhost:19000/--/auth/callback
  ```

**4. Tester avec Expo Go vs Build natif**
- **Expo Go** : Utilise le proxy Expo (`exp://localhost:19000/--/auth/callback`)
- **Build natif** : Utilise le schéma natif (`questionpouruncatho2://auth/callback`)

**5. Vérifier les paramètres OAuth**
- L'URL d'autorisation doit être : `https://accounts.google.com/o/oauth2/v2/auth`
- Les scopes doivent inclure : `openid`, `profile`, `email`

**6. Solution de contournement temporaire**
Si l'erreur persiste, essayer de :
- Supprimer et recréer le client OAuth Android dans Google Cloud Console
- Attendre 5-10 minutes après les modifications (Google met du temps à propager)
- Tester sur un émulateur différent ou un appareil physique

**7. Vérifier les paramètres d'acquittement**
- Les paramètres `ack_oob_shutdown` et `ack_loopback_shutdown` sont automatiquement ajoutés
- Ces paramètres sont requis par Google pour éviter l'erreur 400

#### L'authentification ne se lance pas
- Vérifier que `expo-auth-session` est bien installé et configuré
- Vérifier que le schéma `questionpouruncatho2` est bien configuré dans `app.json`

### 8. Avantages de cette solution

- ✅ Fonctionne sur Android et iOS
- ✅ Utilise les standards OAuth 2.0
- ✅ Intégration transparente avec Firebase
- ✅ Gestion des erreurs robuste
- ✅ Support du mode hors ligne avec `access_type: 'offline'`

### 9. Fichiers modifiés

- `hooks/useAuth.ts` : Logique d'authentification multiplateforme
- `services/firebaseAuthService.ts` : Support des utilisateurs OAuth
- `app.json` : Configuration du plugin expo-auth-session
- `app/auth/callback.tsx` : Page de callback (déjà existante)

### 10. Informations spécifiques à ce projet

**Package name :** `com.anonymous.questionpouruncatho2`
**SHA-1 Debug :** `AE:10:DD:74:96:F6:98:D5:51:4F:2A:65:35:6A:DF:28:3D:90:C0:C8`
**Client ID Android :** `9483993562-fvk8nb3l2uie5hh0iot7nk7t1melir3h.apps.googleusercontent.com`
**Client ID Web :** `9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com`
**Project ID :** `helical-theater-308116`
**Auth URI :** `https://accounts.google.com/o/oauth2/v2/auth`
**Token URI :** `https://oauth2.googleapis.com/token`
**Auth Provider X509 Cert URL :** `https://www.googleapis.com/oauth2/v1/certs`
**Redirect URI :** `questionpouruncatho2://auth/callback` 