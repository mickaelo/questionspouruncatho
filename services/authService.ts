import { AuthUser, LoginCredentials, RegisterData, SSOConfig, SSOLoginResult } from '../types/auth';
import { googleAuthService } from './googleAuthService';

// Configuration SSO avec les vraies clés Google
const SSO_CONFIG: SSOConfig = {
  google: {
    clientId: '9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com',
    enabled: true,
  },
  facebook: {
    appId: 'your-facebook-app-id',
    enabled: true,
  },
  apple: {
    clientId: 'your-apple-client-id',
    enabled: true,
  },
  microsoft: {
    clientId: 'your-microsoft-client-id',
    enabled: true,
  },
};

// Simulation de base de données utilisateurs
let users: AuthUser[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Utilisateur Démo',
    avatar: 'https://via.placeholder.com/150',
    provider: 'email',
    type: 'user',
    emailVerified: true,
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
  },
];

class AuthService {
  private currentUser: AuthUser | null = null;

  // Connexion SSO Google
  async loginWithGoogle(): Promise<SSOLoginResult> {
    try {
      // Utiliser le service d'authentification Google OAuth
      const result = await googleAuthService.loginWithGoogle();
      
      if (result.success && result.user) {
        // Vérifier si l'utilisateur existe déjà dans notre base locale
        const existingUser = users.find(u => u.email === result.user!.email);
        
        if (existingUser) {
          // Mettre à jour la dernière connexion et les informations
          existingUser.lastLoginAt = new Date();
          existingUser.name = result.user.name;
          existingUser.avatar = result.user.avatar;
          existingUser.emailVerified = result.user.emailVerified;
          this.currentUser = existingUser;
          
          return {
            success: true,
            user: existingUser,
            isNewUser: false,
          };
        } else {
          // Créer un nouvel utilisateur dans notre base locale
          const newUser = {
            ...result.user,
            id: `user-${Date.now()}`,
          };
          users.push(newUser);
          this.currentUser = newUser;
          
          return {
            success: true,
            user: newUser,
            isNewUser: true,
          };
        }
      }
      
      return result;
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion avec Google',
      };
    }
  }

  // Connexion SSO Facebook
  async loginWithFacebook(): Promise<SSOLoginResult> {
    try {
      const mockFacebookUser = {
        id: 'facebook-456',
        email: 'user@facebook.com',
        name: 'Utilisateur Facebook',
        avatar: 'https://via.placeholder.com/150',
        provider: 'facebook' as const,
        type: 'user',
        providerId: 'facebook-456',
        emailVerified: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      const existingUser = users.find(u => u.email === mockFacebookUser.email);
      
      if (existingUser) {
        existingUser.lastLoginAt = new Date();
        this.currentUser = existingUser;
        return {
          success: true,
          user: existingUser,
          isNewUser: false,
        };
      } else {
        const newUser = {
          ...mockFacebookUser,
          id: `user-${Date.now()}`,
        };
        users.push(newUser);
        this.currentUser = newUser;
        
        return {
          success: true,
          user: newUser,
          isNewUser: true,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion avec Facebook',
      };
    }
  }

  // Connexion SSO Apple
  async loginWithApple(): Promise<SSOLoginResult> {
    try {
      const mockAppleUser = {
        id: 'apple-789',
        email: 'user@icloud.com',
        name: 'Utilisateur Apple',
        avatar: 'https://via.placeholder.com/150',
        provider: 'apple' as const,
        type: 'user',
        providerId: 'apple-789',
        emailVerified: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      const existingUser = users.find(u => u.email === mockAppleUser.email);
      
      if (existingUser) {
        existingUser.lastLoginAt = new Date();
        this.currentUser = existingUser;
        return {
          success: true,
          user: existingUser,
          isNewUser: false,
        };
      } else {
        const newUser = {
          ...mockAppleUser,
          id: `user-${Date.now()}`,
        };
        users.push(newUser);
        this.currentUser = newUser;
        
        return {
          success: true,
          user: newUser,
          isNewUser: true,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion avec Apple',
      };
    }
  }

  // Connexion SSO Microsoft
  async loginWithMicrosoft(): Promise<SSOLoginResult> {
    try {
      const mockMicrosoftUser = {
        id: 'microsoft-101',
        email: 'user@outlook.com',
        name: 'Utilisateur Microsoft',
        avatar: 'https://via.placeholder.com/150',
        provider: 'microsoft' as const,
        type: 'user',
        providerId: 'microsoft-101',
        emailVerified: true,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      const existingUser = users.find(u => u.email === mockMicrosoftUser.email);
      
      if (existingUser) {
        existingUser.lastLoginAt = new Date();
        this.currentUser = existingUser;
        return {
          success: true,
          user: existingUser,
          isNewUser: false,
        };
      } else {
        const newUser = {
          ...mockMicrosoftUser,
          id: `user-${Date.now()}`,
        };
        users.push(newUser);
        this.currentUser = newUser;
        
        return {
          success: true,
          user: newUser,
          isNewUser: true,
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion avec Microsoft',
      };
    }
  }

  // Connexion avec email/mot de passe
  async loginWithEmail(credentials: LoginCredentials): Promise<SSOLoginResult> {
    try {
      const user = users.find(u => u.email === credentials.email);
      if (user && user.provider === 'email') {
        user.lastLoginAt = new Date();
        this.currentUser = user;
        return {
          success: true,
          user,
          isNewUser: false,
        };
      } else {
        return {
          success: false,
          error: 'Email ou mot de passe incorrect',
        };
      }
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de la connexion',
      };
    }
  }

  // Inscription avec email/mot de passe
  async registerWithEmail(data: RegisterData): Promise<SSOLoginResult> {
    try {
      // Vérifier si l'utilisateur existe déjà
      const existingUser = users.find(u => u.email === data.email);
      
      if (existingUser) {
        return {
          success: false,
          error: 'Un compte avec cet email existe déjà',
        };
      }

      // Créer un nouvel utilisateur
      const newUser: AuthUser = {
        id: `user-${Date.now()}`,
        email: data.email,
        type: 'user',
        name: data.name,
        provider: 'email',
        emailVerified: false,
        createdAt: new Date(),
        lastLoginAt: new Date(),
      };

      users.push(newUser);
      this.currentUser = newUser;
      
      return {
        success: true,
        user: newUser,
        isNewUser: true,
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erreur lors de l\'inscription',
      };
    }
  }

  // Déconnexion
  async logout(): Promise<void> {
    this.currentUser = null;
  }

  // Obtenir l'utilisateur actuel
  getCurrentUser(): AuthUser | null {
    return this.currentUser;
  }

  // Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Obtenir la configuration SSO
  getSSOConfig(): SSOConfig {
    return SSO_CONFIG;
  }

  // Mettre à jour le profil utilisateur
  async updateProfile(userId: string, updates: Partial<AuthUser>): Promise<AuthUser | null> {
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      if (this.currentUser?.id === userId) {
        this.currentUser = users[userIndex];
      }
      return users[userIndex];
    }
    
    return null;
  }
}

export const authService = new AuthService(); 