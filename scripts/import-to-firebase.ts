import { sampleQuestions, sampleQuizzes } from '../data/questions';
import { quizAdminService } from '../services/quizAdminService';

async function importDataToFirebase() {
  console.log('🚀 Début de l\'importation des données vers Firebase...');

  try {
    // Supprimer toutes les données existantes
    console.log('🗑️ Suppression des données existantes...');
    await quizAdminService.deleteAllQuestions();
    await quizAdminService.deleteAllQuizzes();
    console.log('✅ Données existantes supprimées');

    // Importer les questions
    console.log('📝 Importation des questions...');
    const questionIds = await quizAdminService.importQuestionsFromData(sampleQuestions);
    console.log(`✅ ${questionIds.length} questions importées`);

    // Préparer les quiz avec les IDs des questions
    console.log('📋 Préparation des quiz...');
    const quizzesWithQuestionIds = sampleQuizzes.map(quiz => {
      // Trouver les IDs des questions pour ce quiz
      const questionIds = quiz.questions.map(q => q.id);
      return {
        ...quiz,
        questionIds // Ajouter les IDs des questions
      };
    });

    // Importer les quiz
    console.log('🎯 Importation des quiz...');
    const quizIds = await quizAdminService.importQuizzesFromData(quizzesWithQuestionIds);
    console.log(`✅ ${quizIds.length} quiz importés`);

    // Afficher les statistiques
    console.log('📊 Récupération des statistiques...');
    const stats = await quizAdminService.getQuizStatistics();
    console.log('📈 Statistiques finales:');
    console.log(`   - Questions totales: ${stats.totalQuestions}`);
    console.log(`   - Quiz totaux: ${stats.totalQuizzes}`);
    console.log(`   - Questions par catégorie:`, stats.questionsByCategory);
    console.log(`   - Questions par difficulté:`, stats.questionsByDifficulty);
    console.log(`   - Quiz par niveau:`, stats.quizzesByLevel);

    console.log('🎉 Importation terminée avec succès !');
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  importDataToFirebase();
}

export { importDataToFirebase }; 