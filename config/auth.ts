// Configuration d'authentification
export const AUTH_CONFIG = {
  google: {
    clientId: '9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com',
    clientSecret: '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',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: 'http://localhost:8081/auth/callback',
  },
  // Autres fournisseurs SSO
  facebook: {
    appId: 'your-facebook-app-id',
    enabled: false,
  },
  apple: {
    clientId: 'your-apple-client-id',
    enabled: false,
  },
  microsoft: {
    clientId: 'your-microsoft-client-id',
    enabled: false,
  },
};

// URLs des endpoints OAuth
export const OAUTH_ENDPOINTS = {
  google: {
    authorization: 'https://accounts.google.com/o/oauth2/v2/auth',
    token: 'https://oauth2.googleapis.com/token',
    userInfo: 'https://www.googleapis.com/oauth2/v2/userinfo',
    revocation: 'https://oauth2.googleapis.com/revoke',
  },
};

// Messages d'erreur
export const AUTH_ERRORS = {
  GOOGLE_AUTH_FAILED: 'Échec de l\'authentification Google',
  GOOGLE_USER_INFO_FAILED: 'Impossible de récupérer les informations utilisateur',
  NETWORK_ERROR: 'Erreur de réseau',
  UNKNOWN_ERROR: 'Erreur inconnue',
  CANCELLED: 'Authentification annulée',
}; 