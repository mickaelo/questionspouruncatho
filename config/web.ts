// Configuration spécifique pour le web
export const WEB_CONFIG = {
  // Configuration pour éviter les problèmes CORS
  cors: {
    // Headers à ajouter pour éviter les problèmes de politique
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin-allow-popups',
      'Cross-Origin-Embedder-Policy': 'unsafe-none',
    },
  },
  
  // Configuration pour l'authentification web
  auth: {
    // Utiliser une approche différente pour le web si nécessaire
    usePopup: false, // Utiliser une redirection complète plutôt qu'une popup
    timeout: 30000, // Timeout en millisecondes
  },
  
  // Messages d'erreur spécifiques au web
  errors: {
    CORS_ERROR: 'Erreur de politique CORS. Essayez de désactiver les extensions de navigateur ou utilisez un autre navigateur.',
    POPUP_BLOCKED: 'La popup a été bloquée. Autorisez les popups pour ce site.',
    TIMEOUT: 'Délai d\'attente dépassé. Veuillez réessayer.',
  },
};

// Fonction pour détecter les problèmes CORS
export const detectCORSIssues = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  // Vérifier si nous sommes dans un iframe (peut causer des problèmes CORS)
  try {
    return window.self !== window.top;
  } catch {
    return true; // Si on ne peut pas accéder à window.top, c'est probablement un problème CORS
  }
};

// Fonction pour obtenir des suggestions de résolution
export const getCORSSuggestions = (): string[] => {
  return [
    'Désactivez les extensions de navigateur (adblockers, etc.)',
    'Essayez un autre navigateur (Chrome, Firefox, Edge)',
    'Videz le cache et les cookies du navigateur',
    'Utilisez le mode navigation privée',
    'Vérifiez que vous n\'êtes pas dans un iframe',
  ];
}; 