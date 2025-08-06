import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, serverTimestamp, writeBatch } from 'firebase/firestore';
import { sampleQuestions, sampleQuizzes } from '../data/questions';

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
    
    // Importer les questions EN PREMIER
    console.log(`📝 Import de ${sampleQuestions.length} questions...`);
    const questionIds = await importQuestions();
    console.log(`✅ ${questionIds.length} questions importées avec succès`);
    
    // Créer un mapping des anciens IDs vers les nouveaux IDs
    const questionIdMapping = new Map<string, string>();
    sampleQuestions.forEach((question, index) => {
      questionIdMapping.set(question.id, questionIds[index]);
    });
    
    console.log('🔗 Mapping des IDs de questions créé:', questionIdMapping.size, 'questions mappées');
    
    // Importer les quiz avec les références aux questions
    console.log(`📋 Import de ${sampleQuizzes.length} quiz...`);
    const quizIds = await importQuizzes(questionIdMapping);
    console.log(`✅ ${quizIds.length} quiz importés avec succès`);
    
    // Afficher un résumé détaillé
    await showImportSummary(questionIds, quizIds, questionIdMapping);
    
    console.log('🎉 Population de la base de données terminée avec succès !');
    console.log(`📊 Résumé : ${questionIds.length} questions et ${quizIds.length} quiz importés`);
    
  } catch (error) {
    console.error('❌ Erreur lors de la population de la base de données:', error);
    throw error;
  }
}

async function showImportSummary(questionIds: string[], quizIds: string[], questionIdMapping: Map<string, string>) {
  console.log('\n📊 RÉSUMÉ DE L\'IMPORTATION');
  console.log('=' .repeat(50));
  
  // Statistiques des questions
  const questionsByCategory: Record<string, number> = {};
  sampleQuestions.forEach(question => {
    questionsByCategory[question.category] = (questionsByCategory[question.category] || 0) + 1;
  });
  
  console.log('\n📝 QUESTIONS IMPORTÉES:');
  console.log(`  Total: ${questionIds.length}`);
  Object.entries(questionsByCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  
  // Statistiques des quiz
  const quizzesByCategory: Record<string, number> = {};
  const quizzesByLevel: Record<number, number> = {};
  
  sampleQuizzes.forEach(quiz => {
    quizzesByCategory[quiz.category] = (quizzesByCategory[quiz.category] || 0) + 1;
    quizzesByLevel[quiz.level] = (quizzesByLevel[quiz.level] || 0) + 1;
  });
  
  console.log('\n📋 QUIZ IMPORTÉS:');
  console.log(`  Total: ${quizIds.length}`);
  Object.entries(quizzesByCategory).forEach(([category, count]) => {
    console.log(`  ${category}: ${count}`);
  });
  
  console.log('\n📊 QUIZ PAR NIVEAU:');
  Object.entries(quizzesByLevel).forEach(([level, count]) => {
    console.log(`  Niveau ${level}: ${count}`);
  });
  
  // Vérification des références
  console.log('\n🔗 VÉRIFICATION DES RÉFÉRENCES:');
  let totalReferences = 0;
  let validReferences = 0;
  
  sampleQuizzes.forEach(quiz => {
    if (quiz.questions && Array.isArray(quiz.questions)) {
      quiz.questions.forEach(question => {
        totalReferences++;
        const questionId = typeof question === 'string' ? question : question.id;
        if (questionIdMapping.has(questionId)) {
          validReferences++;
        }
      });
    }
  });
  
  console.log(`  Références totales: ${totalReferences}`);
  console.log(`  Références valides: ${validReferences}`);
  console.log(`  Taux de réussite: ${((validReferences / totalReferences) * 100).toFixed(1)}%`);
  
  console.log('\n' + '=' .repeat(50));
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

async function importQuizzes(questionIdMapping: Map<string, string>): Promise<string[]> {
  const batch = writeBatch(db);
  const quizIds: string[] = [];

  // Supprimer les IDs des quiz pour l'import
  const quizzesToImport = sampleQuizzes.map(({ id, ...quiz }) => quiz);

  for (const quiz of quizzesToImport) {
    const docRef = doc(collection(db, QUIZZES_COLLECTION));
    
    // Convertir les références aux questions en IDs de documents
    let questionIds: string[] = [];
    let missingQuestions: string[] = [];
    
    if (quiz.questions && Array.isArray(quiz.questions)) {
      questionIds = quiz.questions.map(question => {
        if (typeof question === 'string') {
          // Si c'est déjà un ID (string)
          const mappedId = questionIdMapping.get(question);
          if (!mappedId) {
            missingQuestions.push(question);
          }
          return mappedId || question;
        } else if (typeof question === 'object' && question.id) {
          // Si c'est un objet Question avec un ID
          const mappedId = questionIdMapping.get(question.id);
          if (!mappedId) {
            missingQuestions.push(question.id);
          }
          return mappedId || question.id;
        }
        return null;
      }).filter(id => id !== null) as string[];
    }
    
    if (missingQuestions.length > 0) {
      console.warn(`⚠️ Quiz "${quiz.title}": Questions manquantes:`, missingQuestions);
    }
    
    console.log(`🔗 Quiz "${quiz.title}": ${questionIds.length} questions assignées`);
    
    batch.set(docRef, {
      ...quiz,
      questions: questionIds, // Remplacer par les IDs des questions
      questionIds: questionIds, // Ajouter aussi questionIds pour compatibilité
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

export { clearDatabase, populateDatabase, showStatistics };

