import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { AUTH_CONFIG, AUTH_ERRORS, OAUTH_ENDPOINTS } from '../config/auth';
import { WEB_CONFIG, detectCORSIssues, getCORSSuggestions } from '../config/web';
import { AuthUser, SSOLoginResult } from '../types/auth';

// Configuration des redirections
const redirectUri = AuthSession.makeRedirectUri({
  scheme: 'questionpouruncatho2',
  path: 'auth/callback',
});

// Configuration de la requête d'authentification
const discovery = {
  authorizationEndpoint: OAUTH_ENDPOINTS.google.authorization,
  tokenEndpoint: OAUTH_ENDPOINTS.google.token,
  revocationEndpoint: OAUTH_ENDPOINTS.google.revocation,
};

class GoogleAuthService {
  private currentUser: AuthUser | null = null;

  // Initialiser l'authentification
  async initialize(): Promise<void> {
    if (Platform.OS === 'web') {
      try {
        WebBrowser.maybeCompleteAuthSession();
      } catch (error) {
        console.log('⚠️ WebBrowser.maybeCompleteAuthSession() non supporté sur cette plateforme web');
      }
    }
  }

  // Connexion avec Google
  async loginWithGoogle(): Promise<SSOLoginResult> {
    try {
      // Initialiser l'authentification
      await this.initialize();

      console.log('🚀 Début authentification Google OAuth');
      console.log('📱 Plateforme:', Platform.OS);
      console.log('🔗 URL de redirection:', redirectUri);

      // Créer une nouvelle requête d'authentification avec PKCE
      const request = new AuthSession.AuthRequest({
        clientId: AUTH_CONFIG.google.clientId,
        scopes: AUTH_CONFIG.google.scopes,
        redirectUri,
        responseType: AuthSession.ResponseType.Code,
        usePKCE: true, // Utiliser PKCE pour plus de sécurité
        extraParams: {
          access_type: 'offline',
        },
      });

      // Lancer la requête d'authentification
      console.log('🔐 Lancement de la requête d\'authentification...');
      
      // Vérifier les problèmes CORS potentiels
      if (Platform.OS === 'web' && detectCORSIssues()) {
        console.warn('⚠️ Problèmes CORS détectés');
        const suggestions = getCORSSuggestions();
        return {
          success: false,
          error: `${WEB_CONFIG.errors.CORS_ERROR}\n\nSuggestions:\n${suggestions.join('\n')}`,
        };
      }

      let result;
      try {
        result = await request.promptAsync(discovery);
      } catch (error) {
        console.error('❌ Erreur lors du lancement de l\'authentification:', error);
        if (error instanceof Error && error.message.includes('Cross-Origin-Opener-Policy')) {
          const suggestions = getCORSSuggestions();
          return {
            success: false,
            error: `${WEB_CONFIG.errors.CORS_ERROR}\n\nSuggestions:\n${suggestions.join('\n')}`,
          };
        }
        throw error;
      }
      
      console.log('📋 Résultat authentification:', result.type);

      if (result.type === 'success' && result.params.code) {
        console.log('✅ Code d\'autorisation reçu, échange en cours...');
        // Échanger le code contre un token
        let tokenResult;
        try {
          tokenResult = await AuthSession.exchangeCodeAsync(
            {
              clientId: AUTH_CONFIG.google.clientId,
              code: result.params.code,
              redirectUri,
              extraParams: {
                code_verifier: request.codeVerifier || '',
              },
            },
            discovery
          );
        } catch (error) {
          console.error('❌ Erreur lors de l\'échange du code:', error);
          return {
            success: false,
            error: 'Erreur lors de l\'échange du code d\'autorisation. Veuillez réessayer.',
          };
        }

        if (tokenResult.accessToken) {
          console.log('🎫 Token d\'accès reçu:', tokenResult.accessToken ? 'OUI' : 'NON');
          // Récupérer les informations de l'utilisateur
          console.log('👤 Récupération des informations utilisateur...');
          const userInfo = await this.getUserInfo(tokenResult.accessToken);
          
          if (userInfo) {
            console.log('✅ Informations utilisateur récupérées:', userInfo.email);
            // Créer ou récupérer l'utilisateur
            const user = await this.createOrUpdateUser(userInfo);
            this.currentUser = user;
            console.log('🎉 Authentification Google réussie !');
            return {
              success: true,
              user,
              isNewUser: false, // On ne peut pas déterminer si c'est un nouvel utilisateur sans base de données
            };
          }
        }
      } else if (result.type === 'cancel') {
        return {
          success: false,
          error: AUTH_ERRORS.CANCELLED,
        };
      }

      return {
        success: false,
        error: AUTH_ERRORS.GOOGLE_AUTH_FAILED,
      };
    } catch (error) {
      console.error('Erreur lors de l\'authentification Google:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur inconnue',
      };
    }
  }

  // Récupérer les informations de l'utilisateur depuis Google
  private async getUserInfo(accessToken: string): Promise<any> {
    try {
      const response = await fetch(OAUTH_ENDPOINTS.google.userInfo, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(AUTH_ERRORS.GOOGLE_USER_INFO_FAILED);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des informations utilisateur:', error);
      throw error;
    }
  }

  // Créer ou mettre à jour l'utilisateur
  private async createOrUpdateUser(googleUserInfo: any): Promise<AuthUser> {
    // Pour l'instant, on simule la création/mise à jour d'un utilisateur
    // Dans une vraie application, vous devriez sauvegarder ces informations dans une base de données
    
    const user: AuthUser = {
      id: googleUserInfo.id || `google-${Date.now()}`,
      email: googleUserInfo.email,
      type: 'user',
      name: googleUserInfo.name || googleUserInfo.given_name + ' ' + googleUserInfo.family_name,
      avatar: googleUserInfo.picture,
      provider: 'google',
      providerId: googleUserInfo.id,
      emailVerified: googleUserInfo.verified_email || false,
      createdAt: new Date(),
      lastLoginAt: new Date(),
    };

    return user;
  }

  // Déconnexion
  async logout(): Promise<void> {
    this.currentUser = null;
    // Optionnel : révoquer le token Google
    // await this.revokeToken();
  }

  // Révoquer le token Google (optionnel)
  private async revokeToken(): Promise<void> {
    try {
      // Cette fonction nécessiterait de stocker le token d'accès
      // pour pouvoir le révoquer lors de la déconnexion
      console.log('Token révoqué avec succès');
    } catch (error) {
      console.error('Erreur lors de la révocation du token:', error);
    }
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }
}

export const googleAuthService = new GoogleAuthService(); 