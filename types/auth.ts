export interface SSOProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
  enabled: boolean;
}

export interface SSOConfig {
  google: {
    clientId: string;
    enabled: boolean;
  };
  facebook: {
    appId: string;
    enabled: boolean;
  };
}

export interface AuthUser {
  id: string;
  type: string;
  email: string;
  name: string;
  avatar?: string;
  provider: 'google' | 'facebook' | 'email' | 'apple' | 'microsoft' | 'anonymous';
  providerId?: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
}

export interface AuthState {
  user: AuthUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface SSOLoginResult {
  success: boolean;
  user?: AuthUser;
  error?: string;
  isNewUser?: boolean;
} 