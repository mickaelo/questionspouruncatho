// Configuration de développement pour Android
export const DEV_CONFIG = {
  // Configuration Firestore pour Android
  firestore: {
    cacheSizeBytes: 50 * 1024 * 1024, // 50 MB cache
    experimentalForceLongPolling: true, // Force long polling pour Android
    useFetchStreams: false, // Désactiver les fetch streams
    ignoreUndefinedProperties: true, // Ignorer les propriétés undefined
  },
  
  // Configuration réseau
  network: {
    timeout: 30000, // 30 secondes de timeout
    retryAttempts: 3, // 3 tentatives de reconnexion
  },
  
  // Configuration de débogage
  debug: {
    enableFirestoreLogs: true,
    enableAuthLogs: true,
    enableNetworkLogs: true,
  }
};

// Fonction pour configurer Firestore pour Android
export const configureFirestoreForAndroid = (db: any) => {
  console.log('🔧 Configuration Firestore pour Android...');
  
  // Activer les logs de débogage si nécessaire
  if (__DEV__) {
    console.log('📱 Mode développement détecté');
    console.log('🔗 Configuration Firestore:', DEV_CONFIG.firestore);
  }
  
  return db;
};

// Fonction pour vérifier la connectivité
export const checkConnectivity = async () => {
  try {
    console.log('🌐 Vérification de la connectivité...');
    
    // Test simple de connectivité
    const response = await fetch('https://www.google.com', {
      method: 'HEAD',
      mode: 'no-cors',
    });
    
    console.log('✅ Connectivité réseau OK');
    return true;
  } catch (error) {
    console.error('❌ Problème de connectivité:', error);
    return false;
  }
}; 