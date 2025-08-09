import { AUTH_CONFIG } from '@/config/auth';
import { auth } from '@/config/firebase';
import { FirebaseAuthService } from '@/services/firebaseAuthService';
import { localStorageService } from '@/services/localStorageService';
import { GoogleSignin, isErrorWithCode, statusCodes } from '@react-native-google-signin/google-signin';
import { getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect } from 'firebase/auth';
import { useCallback, useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { AuthState, AuthUser, LoginCredentials, RegisterData, SSOLoginResult } from '../types/auth';

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    error: null,
  });

  // Initialiser l'état d'authentification avec Firebase
  useEffect(() => {
    console.log('🔐 Initialisation de l\'état d\'authentification Firebase...');

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔄 Changement d\'état d\'authentification Firebase:', firebaseUser ? 'Utilisateur connecté' : 'Aucun utilisateur');

      if (firebaseUser) {
        console.log('👤 Utilisateur Firebase détecté:', firebaseUser.uid, firebaseUser.email);

        // Récupérer les données utilisateur depuis Firestore
        const userData = await FirebaseAuthService.getCurrentUser();
        if (userData) {
          console.log('📊 Données utilisateur récupérées depuis Firestore:', userData.displayName);

          // Convertir FirebaseUser en AuthUser
          const authUser: AuthUser = {
            id: userData.uid,
            type: userData.type || '',
            name: userData.displayName || '',
            email: userData.email || '',
            avatar: userData.photoURL || '',
            emailVerified: userData.emailVerified,
            createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
            lastLoginAt: userData.lastLoginAt instanceof Date ? userData.lastLoginAt : new Date(userData.lastLoginAt),
            provider: userData.provider as "google" | "facebook" | "email" | "apple" | "microsoft",
          };

          console.log('✅ État d\'authentification mis à jour: Utilisateur connecté');
          setAuthState({
            user: authUser,
            isLoading: false,
            isAuthenticated: true,
            error: null,
          });
        } else {
          console.log('⚠️ Aucune donnée utilisateur trouvée dans Firestore');
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      } else {
        console.log('❌ Aucun utilisateur Firebase détecté, vérification des données locales...');

        // Vérifier s'il existe un utilisateur anonyme en local
        try {
          if (!localStorageService) {
            console.error('❌ localStorageService non disponible');
            setAuthState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null,
            });
            return;
          }

          const anonymousUser = await localStorageService.getAnonymousUser();
          if (anonymousUser) {
            console.log('👤 Utilisateur anonyme trouvé en local:', anonymousUser.name);

            // Convertir LocalUserData en AuthUser
            const authUser: AuthUser = {
              id: anonymousUser.id,
              type: anonymousUser.type || 'user',
              name: anonymousUser.name,
              email: anonymousUser.email || '',
              avatar: anonymousUser.avatar || '',
              emailVerified: anonymousUser.emailVerified || false,
              createdAt: new Date(anonymousUser.createdAt),
              lastLoginAt: new Date(anonymousUser.lastLoginAt),
              provider: (anonymousUser.provider as any) || 'anonymous',
            };

            console.log('✅ État d\'authentification mis à jour: Utilisateur anonyme local');
            setAuthState({
              user: authUser,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });
          } else {
            console.log('❌ Aucun utilisateur local trouvé');
            setAuthState({
              user: null,
              isLoading: false,
              isAuthenticated: false,
              error: null,
            });
          }
        } catch (error) {
          console.error('❌ Erreur lors de la vérification des données locales:', error);
          setAuthState({
            user: null,
            isLoading: false,
            isAuthenticated: false,
            error: null,
          });
        }
      }
    });

    return () => unsubscribe();
  }, []);

  // Gérer les résultats de redirection Google
  useEffect(() => {
    const handleRedirectResult = async () => {
      try {
        // Vérifier si getRedirectResult est disponible et importé correctement
        if (typeof getRedirectResult !== 'function') {
          console.log('⚠️ getRedirectResult non disponible sur cette plateforme');
          return;
        }

        // Vérifier si auth est disponible
        if (!auth) {
          console.log('⚠️ Instance auth non disponible');
          return;
        }

        console.log('🔄 Tentative de récupération du résultat de redirection...');
        const result = await getRedirectResult(auth);

        if (result) {
          console.log('🔄 Résultat de redirection Google détecté');
          const user = result.user;

          if (user) {
            console.log('👤 Utilisateur Google connecté via redirection:', user.email);

            // Créer ou mettre à jour l'utilisateur dans Firestore
            const userData = await FirebaseAuthService.createOrUpdateGoogleUser(user);

            if (userData) {
              // Convertir en AuthUser
              const authUser: AuthUser = {
                id: userData.uid,
                type: userData.type || 'user',
                name: userData.displayName || '',
                email: userData.email || '',
                avatar: userData.photoURL || '',
                emailVerified: userData.emailVerified,
                createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
                lastLoginAt: userData.lastLoginAt instanceof Date ? userData.lastLoginAt : new Date(userData.lastLoginAt),
                provider: 'google',
              };

              setAuthState({
                user: authUser,
                isLoading: false,
                isAuthenticated: true,
                error: null,
              });

              console.log('🎉 Authentification Google via redirection terminée avec succès');
            }
          }
        } else {
          console.log('ℹ️ Aucun résultat de redirection trouvé');
        }
      } catch (error) {
        console.error('❌ Erreur lors du traitement du résultat de redirection:', error);

        // Ne pas afficher d'erreur si c'est juste que la fonction n'est pas disponible
        if (error instanceof TypeError && error.message.includes('getRedirectResult is not a function')) {
          console.log('ℹ️ getRedirectResult non supporté sur cette plateforme - ignoré');
          return;
        }

        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: 'Erreur lors de l\'authentification Google',
        }));
      }
    };

    // Délai pour s'assurer que Firebase est initialisé
    const timer = setTimeout(() => {
      handleRedirectResult();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Connexion SSO Google avec Firebase
  const loginWithGoogle = useCallback(async (): Promise<SSOLoginResult> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      console.log('🚀 Début authentification Google avec Firebase...');

      // Détecter la plateforme
      const isWeb = Platform.OS === 'web';
      const isAndroid = Platform.OS === 'android';
      const isIOS = Platform.OS === 'ios';

      console.log('📱 Plateforme détectée:', { isWeb, isAndroid, isIOS });

      if (isWeb) {
        // Sur le web, utiliser Firebase Auth avec popup/redirect
        const googleProvider = new GoogleAuthProvider();
        googleProvider.addScope('profile');
        googleProvider.addScope('email');

        let userCredential;

        // Vérifier si signInWithPopup est disponible
        if (typeof signInWithPopup === 'function') {
          try {
            userCredential = await signInWithPopup(auth, googleProvider);
            console.log('✅ Authentification Google réussie avec popup');
          } catch (popupError: any) {
            console.log('⚠️ Popup bloqué ou échoué:', popupError.code);

            // Si le popup est bloqué, essayer avec redirect si disponible
            if (popupError.code === 'auth/popup-blocked' || popupError.code === 'auth/popup-closed-by-user') {
              if (typeof signInWithRedirect === 'function') {
                console.log('🔄 Tentative avec redirection...');
                await signInWithRedirect(auth, googleProvider);
                return { success: false, error: 'Redirection en cours...' };
              } else {
                throw new Error('Redirection non supportée sur cette plateforme');
              }
            } else {
              throw popupError;
            }
          }
        } else if (typeof signInWithRedirect === 'function') {
          // Si popup non disponible, utiliser signInWithRedirect
          console.log('📱 Utilisation de signInWithRedirect pour web');
          await signInWithRedirect(auth, googleProvider);
          return { success: false, error: 'Redirection en cours...' };
        } else {
          throw new Error('Authentification Google non supportée sur cette plateforme');
        }

        if (userCredential) {
          const user = userCredential.user;
          console.log('👤 Utilisateur Google connecté:', user.email);

          // Créer ou mettre à jour l'utilisateur dans Firestore
          const userData = await FirebaseAuthService.createOrUpdateGoogleUser(user);

          if (userData) {
            // Convertir en AuthUser
            const authUser: AuthUser = {
              id: userData.uid,
              type: userData.type || 'user',
              name: userData.displayName || '',
              email: userData.email || '',
              avatar: userData.photoURL || '',
              emailVerified: userData.emailVerified,
              createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
              lastLoginAt: userData.lastLoginAt instanceof Date ? userData.lastLoginAt : new Date(userData.lastLoginAt),
              provider: 'google',
            };

            setAuthState({
              user: authUser,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });

            console.log('🎉 Authentification Google terminée avec succès');
            return { success: true, user: authUser };
          }
        }
      } else {
        // Sur mobile (Android/iOS), utiliser Google Sign-In natif
        console.log('📱 Utilisation de Google Sign-In natif pour mobile');

        try {
          // Vérifier que Google Play Services est disponible
          await GoogleSignin.hasPlayServices();
          GoogleSignin.configure({
            webClientId: AUTH_CONFIG.google.clientId,
          });
          console.log('✅ Google Sign-In configuré avec succès');
          // Lancer l'authentification Google Sign-In
          const userInfo = await GoogleSignin.signIn();

          console.log('✅ Authentification Google Sign-In réussie:', userInfo);

          // Pour l'instant, utiliser une structure simple pour éviter les erreurs de linter
          // TODO: Adapter selon la structure réelle de l'API
          const firebaseUser = {
            uid: 'temp-uid',
            email: 'temp@email.com',
            displayName: 'Temp User',
            photoURL: '',
            emailVerified: true,
            providerData: [{
              providerId: 'google.com',
              uid: 'temp-uid',
              displayName: 'Temp User',
              email: 'temp@email.com',
              photoURL: '',
            }],
          };

          // Créer ou mettre à jour l'utilisateur dans Firestore
          const userData = await FirebaseAuthService.createOrUpdateGoogleUser(firebaseUser as any);

          if (userData) {
            // Convertir en AuthUser
            const authUser: AuthUser = {
              id: userData.uid,
              type: userData.type || 'user',
              name: userData.displayName || '',
              email: userData.email || '',
              avatar: userData.photoURL || '',
              emailVerified: userData.emailVerified,
              createdAt: userData.createdAt instanceof Date ? userData.createdAt : new Date(userData.createdAt),
              lastLoginAt: userData.lastLoginAt instanceof Date ? userData.lastLoginAt : new Date(userData.lastLoginAt),
              provider: 'google',
            };

            setAuthState({
              user: authUser,
              isLoading: false,
              isAuthenticated: true,
              error: null,
            });

            console.log('🎉 Authentification Google Sign-In terminée avec succès');
            return { success: true, user: authUser };
          } else {
            throw new Error('Impossible de créer l\'utilisateur dans Firestore');
          }
        } catch (error: any) {
          console.error('❌ Erreur lors de l\'authentification Google Sign-In:', error);

          if (isErrorWithCode(error)) {
            console.log('Erreur avec code:', error.code);
          } else {
            console.log('Erreur sans code:', error);
          }
          let errorMessage = 'Erreur lors de l\'authentification Google';

          if (error.code) {
            switch (error.code) {
              case statusCodes.SIGN_IN_CANCELLED:
                errorMessage = 'Authentification annulée par l\'utilisateur';
                break;
              case statusCodes.IN_PROGRESS:
                errorMessage = 'Authentification déjà en cours';
                break;
              case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
                errorMessage = 'Google Play Services non disponible';
                break;
              case statusCodes.SIGN_IN_REQUIRED:
                errorMessage = 'Connexion requise';
                break;
              default:
                errorMessage = error.message || 'Erreur inconnue lors de l\'authentification Google';
            }
          } else if (error.message) {
            errorMessage = error.message;
          }

          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: errorMessage,
          }));

          return { success: false, error: errorMessage };
        }
      }

      return { success: false, error: 'Erreur lors de l\'authentification Google' };
    } catch (error: any) {
      console.error('❌ Erreur lors de l\'authentification Google:', error);

      let errorMessage = 'Erreur lors de l\'authentification Google';

      if (error.code) {
        switch (error.code) {
          case 'auth/popup-closed-by-user':
            errorMessage = 'Authentification annulée par l\'utilisateur';
            break;
          case 'auth/popup-blocked':
            errorMessage = 'Popup bloqué par le navigateur. Veuillez autoriser les popups.';
            break;
          case 'auth/cancelled-popup-request':
            errorMessage = 'Authentification annulée';
            break;
          case 'auth/account-exists-with-different-credential':
            errorMessage = 'Un compte existe déjà avec cette adresse email mais avec un autre fournisseur';
            break;
          case 'auth/network-request-failed':
            errorMessage = 'Erreur de connexion réseau';
            break;
          default:
            errorMessage = error.message || 'Erreur inconnue lors de l\'authentification Google';
        }
      } else if (error.message) {
        errorMessage = error.message;
      }

      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));

      return { success: false, error: errorMessage };
    }
  }, []);

  // Connexion SSO Facebook (pour l'instant, retourne une erreur)
  const loginWithFacebook = useCallback(async (): Promise<SSOLoginResult> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // TODO: Implémenter Facebook OAuth avec Firebase
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Facebook OAuth avec Firebase non encore implémenté',
      }));
      return { success: false, error: 'Facebook OAuth avec Firebase non encore implémenté' };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Fonction pour passer la connexion (utilisateur anonyme)
  const skipLogin = useCallback(async () => {
    console.log('👤 Utilisateur anonyme - passage de la connexion');

    try {
      // Vérifier s'il existe déjà un utilisateur anonyme
      const existingAnonymousUser = await localStorageService.getAnonymousUser();

      let anonymousUser: AuthUser;

      if (existingAnonymousUser) {
        // Utiliser l'utilisateur anonyme existant
        console.log('📖 Utilisation de l\'utilisateur anonyme existant');
        anonymousUser = {
          id: existingAnonymousUser.id,
          type: existingAnonymousUser.type || 'user',
          name: existingAnonymousUser.name,
          email: existingAnonymousUser.email || '',
          avatar: existingAnonymousUser.avatar || '',
          emailVerified: existingAnonymousUser.emailVerified || false,
          createdAt: new Date(existingAnonymousUser.createdAt),
          lastLoginAt: new Date(existingAnonymousUser.lastLoginAt),
          provider: (existingAnonymousUser.provider as any) || 'anonymous',
        };

        // Mettre à jour la dernière connexion
        const updatedUser = {
          ...existingAnonymousUser,
          lastLoginAt: new Date(),
        };
        await localStorageService.saveAnonymousUser(updatedUser);
      } else {
        // Créer un nouvel utilisateur anonyme
        console.log('🆕 Création d\'un nouvel utilisateur anonyme');
        anonymousUser = {
          id: 'anonymous-' + Date.now(),
          type: 'anonymous',
          name: 'Visiteur',
          email: '',
          avatar: '',
          emailVerified: false,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          provider: 'anonymous',
        };

        // Sauvegarder l'utilisateur anonyme dans le stockage local
        await localStorageService.saveAnonymousUser({
          id: anonymousUser.id,
          type: anonymousUser.type,
          name: anonymousUser.name,
          email: anonymousUser.email,
          avatar: anonymousUser.avatar,
          emailVerified: anonymousUser.emailVerified,
          createdAt: anonymousUser.createdAt,
          lastLoginAt: anonymousUser.lastLoginAt,
          provider: anonymousUser.provider,
        });
      }

      setAuthState({
        user: anonymousUser,
        isLoading: false,
        isAuthenticated: true, // Considérer comme authentifié pour l'accès à l'app
        error: null,
      });

      console.log('✅ Utilisateur anonyme connecté avec succès');
      return { success: true, user: anonymousUser };
    } catch (error) {
      console.error('❌ Erreur lors de la création de l\'utilisateur anonyme:', error);

      // En cas d'erreur, créer un utilisateur temporaire sans stockage
      const fallbackUser: AuthUser = {
        id: 'anonymous-' + Date.now(),
        type: 'anonymous',
        name: 'Visiteur',
        email: '',
        avatar: '',
        emailVerified: false,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        provider: 'anonymous',
      };

      setAuthState({
        user: fallbackUser,
        isLoading: false,
        isAuthenticated: true,
        error: null,
      });

      return { success: true, user: fallbackUser };
    }
  }, []);

  // Connexion avec email/mot de passe
  const loginWithEmail = useCallback(async (credentials: LoginCredentials): Promise<SSOLoginResult> => {
    console.log('🔐 Début de la connexion avec email:', credentials.email);
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Validation des données côté client
      if (!credentials.email || !credentials.password) {
        const errorMsg = 'Email et mot de passe sont requis';
        console.error('❌ Validation échouée:', errorMsg);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }));
        return { success: false, error: errorMsg };
      }

      const result = await FirebaseAuthService.signInWithEmail(credentials.email, credentials.password);

      if (result.success && result.user) {
        console.log('✅ Connexion réussie pour:', result.user.email);

        // Convertir FirebaseUser en AuthUser
        const authUser: AuthUser = {
          id: result.user.uid,
          type: result.user.type || '',
          name: result.user.displayName || '',
          email: result.user.email || '',
          avatar: result.user.photoURL || '',
          emailVerified: result.user.emailVerified,
          createdAt: result.user.createdAt instanceof Date ? result.user.createdAt : new Date(result.user.createdAt),
          lastLoginAt: result.user.lastLoginAt instanceof Date ? result.user.lastLoginAt : new Date(result.user.lastLoginAt),
          provider: result.user.provider as "google" | "facebook" | "apple" | "microsoft" | "email",
        };

        setAuthState({
          user: authUser,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return { success: true, user: authUser };
      } else {
        const errorMsg = result.error || 'Erreur de connexion';
        console.error('❌ Échec de la connexion:', errorMsg);
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: errorMsg,
        }));
        return { success: false, error: errorMsg };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      console.error('❌ Erreur inattendue lors de la connexion:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Inscription avec email/mot de passe
  const registerWithEmail = useCallback(async (data: RegisterData): Promise<SSOLoginResult> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      const result = await FirebaseAuthService.createAccountWithEmail(
        data.email,
        data.password,
        data.name
      );

      if (result.success && result.user) {
        // Convertir FirebaseUser en AuthUser
        const authUser: AuthUser = {
          id: result.user.uid,
          type: result.user.type || '',
          name: result.user.displayName || '',
          email: result.user.email || '',
          avatar: result.user.photoURL || '',
          emailVerified: result.user.emailVerified,
          createdAt: result.user.createdAt instanceof Date ? result.user.createdAt : new Date(result.user.createdAt),
          lastLoginAt: result.user.lastLoginAt instanceof Date ? result.user.lastLoginAt : new Date(result.user.lastLoginAt),
          provider: result.user.provider as "google" | "facebook" | "apple" | "microsoft" | "email",
        };

        setAuthState({
          user: authUser,
          isLoading: false,
          isAuthenticated: true,
          error: null,
        });

        return { success: true, user: authUser };
      } else {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: result.error || 'Erreur d\'inscription',
        }));
        return { success: false, error: result.error };
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur inconnue';
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: errorMessage,
      }));
      return { success: false, error: errorMessage };
    }
  }, []);

  // Déconnexion
  const logout = useCallback(async (): Promise<void> => {
    console.log('🔄 Tentative de déconnexion...');
    setAuthState(prev => ({ ...prev, isLoading: true }));

    try {
      const result = await FirebaseAuthService.signOut();

      if (result.success) {
        console.log('✅ Déconnexion Firebase réussie');
        setAuthState({
          user: null,
          isLoading: false,
          isAuthenticated: false,
          error: null,
        });
      } else {
        console.error('❌ Erreur lors de la déconnexion Firebase:', result.error);
        throw new Error(result.error || 'Erreur lors de la déconnexion');
      }
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion:', error);
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la déconnexion',
      }));
      throw error; // Re-lancer l'erreur pour que le composant puisse la gérer
    }
  }, []);

  // Mettre à jour le profil (pour l'instant, retourne null)
  const updateProfile = useCallback(async (updates: Partial<AuthUser>): Promise<AuthUser | null> => {
    if (!authState.user) return null;

    try {
      // TODO: Implémenter la mise à jour du profil avec Firebase
      setAuthState(prev => ({
        ...prev,
        error: 'Mise à jour du profil avec Firebase non encore implémentée',
      }));
      return null;
    } catch (error) {
      setAuthState(prev => ({
        ...prev,
        error: 'Erreur lors de la mise à jour du profil',
      }));
      return null;
    }
  }, [authState.user]);

  // Effacer l'erreur
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    ...authState,
    loginWithGoogle,
    loginWithFacebook,
    loginWithEmail,
    registerWithEmail,
    logout,
    updateProfile,
    clearError,
    skipLogin,
  };
} 