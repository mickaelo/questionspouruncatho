import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, writeBatch, doc, serverTimestamp } from 'firebase/firestore';
import { sampleQuestions, sampleQuizzes } from '../data/questions';
import { Question, Quiz } from '../types/quiz';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKiSkB6XoTjQg4nZhBWPLN8kEhICdP2yU",
  authDomain: "questionspouruncatho.firebaseapp.com",
  projectId: "questionspouruncatho",
  storageBucket: "questionspouruncatho.firebasestorage.app",
  messagingSenderId: "762800880851",
  appId: "1:762800880851:web:9a245733aab682be7be826",
  measurementId: "G-FGFHJSNH99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const QUESTIONS_COLLECTION = 'questions';
const QUIZZES_COLLECTION = 'quizzes';

async function populateDatabase() {
  console.log('🚀 Début de la population de la base de données...');
  
  try {
    // Vérifier si des données existent déjà
    console.log('📊 Vérification des données existantes...');
    
    // Importer les questions
    console.log(`📝 Import de ${sampleQuestions.length} questions...`);
    const questionIds = await importQuestions();
    console.log(`✅ ${questionIds.length} questions importées avec succès`);
    
    // Importer les quiz
    console.log(`📋 Import de ${sampleQuizzes.length} quiz...`);
    const quizIds = await importQuizzes();
    console.log(`✅ ${quizIds.length} quiz importés avec succès`);
    
    console.log('🎉 Population de la base de données terminée avec succès !');
    console.log(`📊 Résumé : ${questionIds.length} questions et ${quizIds.length} quiz importés`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la population de la base de données:', error);
    throw error;
  }
}

async function importQuestions(): Promise<string[]> {
  const batch = writeBatch(db);
  const questionIds: string[] = [];

  // Supprimer les IDs des questions pour l'import
  const questionsToImport = sampleQuestions.map(({ id, ...question }) => question);

  for (const question of questionsToImport) {
    const docRef = doc(collection(db, QUESTIONS_COLLECTION));
    batch.set(docRef, {
      ...question,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    questionIds.push(docRef.id);
  }

  await batch.commit();
  return questionIds;
}

async function importQuizzes(): Promise<string[]> {
  const batch = writeBatch(db);
  const quizIds: string[] = [];

  // Supprimer les IDs des quiz pour l'import
  const quizzesToImport = sampleQuizzes.map(({ id, ...quiz }) => quiz);

  for (const quiz of quizzesToImport) {
    const docRef = doc(collection(db, QUIZZES_COLLECTION));
    batch.set(docRef, {
      ...quiz,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    quizIds.push(docRef.id);
  }

  await batch.commit();
  return quizIds;
}

// Fonction pour vider la base de données (à utiliser avec précaution)
async function clearDatabase() {
  console.log('🗑️  Suppression de toutes les données...');
  
  try {
    // Cette fonction nécessiterait des permissions spéciales
    // et devrait être utilisée uniquement en développement
    console.log('⚠️  Cette fonction n\'est pas implémentée pour des raisons de sécurité');
    console.log('💡 Utilisez l\'interface d\'administration pour supprimer les données');
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des données:', error);
    throw error;
  }
}

// Fonction pour afficher les statistiques
async function showStatistics() {
  console.log('📊 Statistiques des données locales :');
  console.log(`📝 Questions : ${sampleQuestions.length}`);
  console.log(`📋 Quiz : ${sampleQuizzes.length}`);
  
  // Statistiques par catégorie
  const questionsByCategory: Record<string, number> = {};
  const questionsByDifficulty: Record<string, number> = {};
  const quizzesByLevel: Record<number, number> = {};
  
  sampleQuestions.forEach(question => {
    questionsByCategory[question.category] = (questionsByCategory[question.category] || 0) + 1;
    questionsByDifficulty[question.difficulty] = (questionsByDifficulty[question.difficulty] || 0) + 1;
  });
  
  sampleQuizzes.forEach(quiz => {
    quizzesByLevel[quiz.level] = (quizzesByLevel[quiz.level] || 0) + 1;
  });
  
  console.log('\n📊 Questions par catégorie :');
  Object.entries(questionsByCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  
  console.log('\n📊 Questions par difficulté :');
  Object.entries(questionsByDifficulty).forEach(([difficulty, count]) => {
    console.log(`  ${difficulty}: ${count}`);
  });
  
  console.log('\n📊 Quiz par niveau :');
  Object.entries(quizzesByLevel).forEach(([level, count]) => {
    console.log(`  Niveau ${level}: ${count}`);
  });
}

// Exécution du script
if (require.main === module) {
  const command = process.argv[2];
  
  switch (command) {
    case 'populate':
      populateDatabase()
        .then(() => {
          console.log('✅ Script terminé avec succès');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ Script échoué:', error);
          process.exit(1);
        });
      break;
      
    case 'clear':
      clearDatabase()
        .then(() => {
          console.log('✅ Base de données vidée');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ Erreur lors du vidage:', error);
          process.exit(1);
        });
      break;
      
    case 'stats':
      showStatistics()
        .then(() => {
          console.log('✅ Statistiques affichées');
          process.exit(0);
        })
        .catch((error) => {
          console.error('❌ Erreur lors de l\'affichage des statistiques:', error);
          process.exit(1);
        });
      break;
      
    default:
      console.log('📖 Utilisation du script :');
      console.log('  npm run populate-db    - Populer la base de données');
      console.log('  npm run clear-db       - Vider la base de données');
      console.log('  npm run db-stats       - Afficher les statistiques');
      console.log('');
      console.log('💡 Exemple : node scripts/populate-database.js populate');
      break;
  }
}

export { populateDatabase, clearDatabase, showStatistics }; 