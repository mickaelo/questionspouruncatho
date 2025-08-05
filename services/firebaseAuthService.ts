import { auth, db } from '@/config/firebase';
import {
    AuthError,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    User,
    UserCredential
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export interface FirebaseUser {
  uid: string;
  type: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date;
  provider: string;
}

export interface AuthResult {
  success: boolean;
  user?: FirebaseUser;
  error?: string;
}

export class FirebaseAuthService {
  // Créer un compte avec email/mot de passe
  static async createAccountWithEmail(
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResult> {
    try {
      console.log('Tentative de création de compte avec:', { email, displayName });
      
      // Validation des données
      if (!email || !password || !displayName) {
        return {
          success: false,
          error: 'Tous les champs sont requis'
        };
      }

      if (password.length < 6) {
        return {
          success: false,
          error: 'Le mot de passe doit contenir au moins 6 caractères'
        };
      }

      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('Compte Firebase créé avec succès:', userCredential.user.uid);

      const user = userCredential.user;

      // Mettre à jour le profil utilisateur
      try {
        await updateProfile(user, {
          displayName: displayName,
          photoURL: null
        });
        console.log('Profil utilisateur mis à jour');
      } catch (profileError) {
        console.warn('Erreur lors de la mise à jour du profil:', profileError);
        // Continuer même si la mise à jour du profil échoue
      }

      // Créer le document utilisateur dans Firestore
      const userData: FirebaseUser = {
        uid: user.uid,
        type: 'user', // Type par défaut pour les nouveaux utilisateurs
        email: user.email,
        displayName: displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
        createdAt: new Date(),
        lastLoginAt: new Date(),
        provider: 'email'
      };

      try {
        await setDoc(doc(db, 'users', user.uid), userData);
        console.log('Document Firestore créé avec succès');
      } catch (firestoreError) {
        console.error('Erreur lors de la création du document Firestore:', firestoreError);
        // Retourner quand même le succès car le compte Firebase a été créé
      }

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      console.error('Erreur lors de la création du compte:', error);
      const authError = error as AuthError;
      
      // Log détaillé de l'erreur
      if (authError.code) {
        console.error('Code d\'erreur Firebase:', authError.code);
        console.error('Message d\'erreur Firebase:', authError.message);
      }
      
      return {
        success: false,
        error: this.getErrorMessage(authError.code || 'unknown')
      };
    }
  }

  // Se connecter avec email/mot de passe
  static async signInWithEmail(
    email: string,
    password: string
  ): Promise<AuthResult> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      // Récupérer les données utilisateur depuis Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      let userData: FirebaseUser;

      if (userDoc.exists()) {
        userData = userDoc.data() as FirebaseUser;
        // Mettre à jour lastLoginAt
        userData.lastLoginAt = new Date();
        await setDoc(doc(db, 'users', user.uid), userData, { merge: true });
      } else {
        // Créer le document si il n'existe pas
        userData = {
          uid: user.uid,
          type: 'user', // Type par défaut pour les utilisateurs existants
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          provider: 'email'
        };
        await setDoc(doc(db, 'users', user.uid), userData);
      }

      return {
        success: true,
        user: userData
      };
    } catch (error) {
      const authError = error as AuthError;
      return {
        success: false,
        error: this.getErrorMessage(authError.code)
      };
    }
  }

  // Se déconnecter
  static async signOut(): Promise<AuthResult> {
    try {
      console.log('🔄 Tentative de déconnexion Firebase...');
      
      // Vérifier si un utilisateur est connecté
      if (!auth.currentUser) {
        console.log('⚠️ Aucun utilisateur connecté, déconnexion ignorée');
        return {
          success: true
        };
      }
      
      console.log('👤 Utilisateur à déconnecter:', auth.currentUser.email);
      await signOut(auth);
      
      console.log('✅ Déconnexion Firebase réussie');
      return {
        success: true
      };
    } catch (error) {
      console.error('❌ Erreur lors de la déconnexion Firebase:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Erreur lors de la déconnexion'
      };
    }
  }

  // Récupérer l'utilisateur actuel
  static async getCurrentUser(): Promise<FirebaseUser | null> {
    const user = auth.currentUser;
    if (!user) return null;

    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        return userDoc.data() as FirebaseUser;
      }
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
    }

    return null;
  }

  // Créer ou mettre à jour un utilisateur Google
  static async createOrUpdateGoogleUser(firebaseUser: User): Promise<FirebaseUser> {
    try {
      console.log('🔄 Création/mise à jour utilisateur Google:', firebaseUser.uid);
      
      // Vérifier si l'utilisateur existe déjà dans Firestore
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      
      let userData: FirebaseUser;
      
      if (userDoc.exists()) {
        // Mettre à jour l'utilisateur existant
        userData = userDoc.data() as FirebaseUser;
        userData.lastLoginAt = new Date();
        userData.displayName = firebaseUser.displayName || userData.displayName;
        userData.photoURL = firebaseUser.photoURL || userData.photoURL;
        userData.emailVerified = firebaseUser.emailVerified;
        
        console.log('📝 Mise à jour utilisateur Google existant');
      } else {
        // Créer un nouvel utilisateur Google
        userData = {
          uid: firebaseUser.uid,
          type: 'user',
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
          createdAt: new Date(),
          lastLoginAt: new Date(),
          provider: 'google'
        };
        
        console.log('🆕 Création nouvel utilisateur Google');
      }
      
      // Sauvegarder dans Firestore
      await setDoc(doc(db, 'users', firebaseUser.uid), userData, { merge: true });
      console.log('✅ Utilisateur Google sauvegardé dans Firestore');
      
      return userData;
    } catch (error) {
      console.error('❌ Erreur lors de la création/mise à jour utilisateur Google:', error);
      throw error;
    }
  }

  // Traduire les codes d'erreur Firebase
  private static getErrorMessage(errorCode: string): string {
    switch (errorCode) {
      case 'auth/email-already-in-use':
        return 'Cette adresse email est déjà utilisée';
      case 'auth/invalid-email':
        return 'Adresse email invalide';
      case 'auth/operation-not-allowed':
        return 'Cette opération n\'est pas autorisée';
      case 'auth/weak-password':
        return 'Le mot de passe est trop faible (minimum 6 caractères)';
      case 'auth/user-disabled':
        return 'Ce compte a été désactivé';
      case 'auth/user-not-found':
        return 'Aucun compte trouvé avec cette adresse email';
      case 'auth/wrong-password':
        return 'Mot de passe incorrect';
      case 'auth/too-many-requests':
        return 'Trop de tentatives. Veuillez réessayer plus tard';
      case 'auth/network-request-failed':
        return 'Erreur de connexion réseau';
      case 'auth/invalid-password':
        return 'Le mot de passe contient des caractères invalides';
      case 'auth/missing-password':
        return 'Le mot de passe est requis';
      case 'auth/missing-email':
        return 'L\'email est requis';
      case 'auth/invalid-credential':
        return 'Identifiants invalides';
      case 'auth/account-exists-with-different-credential':
        return 'Un compte existe déjà avec ces identifiants';
      case 'auth/requires-recent-login':
        return 'Cette opération nécessite une connexion récente';
      case 'auth/invalid-verification-code':
        return 'Code de vérification invalide';
      case 'auth/invalid-verification-id':
        return 'ID de vérification invalide';
      case 'auth/quota-exceeded':
        return 'Quota dépassé. Veuillez réessayer plus tard';
      case 'auth/unknown':
        return 'Erreur inconnue de Firebase';
      default:
        console.warn('Code d\'erreur Firebase non géré:', errorCode);
        return `Erreur Firebase: ${errorCode}`;
    }
  }
} 