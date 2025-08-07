// Test simple pour vérifier l'API Google Sign-In
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configuration
GoogleSignin.configure({
  webClientId: '9483993562-09gt4nvdru9bcapscbevfngn3i37ohco.apps.googleusercontent.com',
  offlineAccess: true,
  forceCodeForRefreshToken: true,
});

// Test de l'authentification
const testSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log('UserInfo:', userInfo);
    console.log('UserInfo type:', typeof userInfo);
    console.log('UserInfo keys:', Object.keys(userInfo));
    
    if (userInfo.user) {
      console.log('User:', userInfo.user);
      console.log('User keys:', Object.keys(userInfo.user));
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export { testSignIn };

