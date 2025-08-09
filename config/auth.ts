// Configuration d'authentification
export const AUTH_CONFIG = {
  google: {
    clientId: '9483993562-g23qrpbscnc934u05i9uolhgkir3sbkf.apps.googleusercontent.com', // Web
    androidClientId: '9483993562-g23qrpbscnc934u05i9uolhgkir3sbkf.apps.googleusercontent.com', // Android
    projectId: 'helical-theater-308116', // Project ID Google Cloud
    clientSecret: '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',
    scopes: ['openid', 'profile', 'email'],
    redirectUri: 'http://localhost:8081',
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
    authProviderX509CertUrl: 'https://www.googleapis.com/oauth2/v1/certs',
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