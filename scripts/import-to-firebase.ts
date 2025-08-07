import { sampleQuestions, sampleQuizzes } from '../data/questions';
import { quizAdminService } from '../services/quizAdminService';

async function importDataToFirebase(clearExisting: boolean = false) {
  console.log('🚀 Début de l\'importation des données vers Firebase...');

  try {
    if (clearExisting) {
      // Supprimer toutes les données existantes
      console.log('🗑️ Suppression des données existantes...');
      await quizAdminService.deleteAllQuestions();
      await quizAdminService.deleteAllQuizzes();
      console.log('✅ Données existantes supprimées');

      // Importer toutes les questions
      console.log('📝 Importation des questions...');
      const questionIds = await quizAdminService.importQuestionsFromData(sampleQuestions);
      console.log(`✅ ${questionIds.length} questions importées`);

      // Créer un mapping des anciens IDs vers les nouveaux IDs Firebase
      const questionIdMapping = new Map<string, string>();
      sampleQuestions.forEach((question, index) => {
        if (questionIds[index]) {
          questionIdMapping.set(question.id, questionIds[index]);
          console.log(`🔗 Mapping: ${question.id} → ${questionIds[index]}`);
        }
      });

      // Préparer les quiz avec les IDs des questions
      console.log('📋 Préparation des quiz...');
      const quizzesWithQuestionIds = sampleQuizzes.map(quiz => {
        // Trouver les nouveaux IDs des questions pour ce quiz en utilisant le mapping
        const questionIds = quiz.questions.map(q => {
          const newId = questionIdMapping.get(q.id);
          if (!newId) {
            console.warn(`⚠️ ID de question non trouvé dans le mapping: ${q.id} pour le quiz "${quiz.title}"`);
          }
          return newId;
        }).filter(id => id !== undefined) as string[]; // Filtrer les IDs non trouvés

        console.log(`📋 Quiz "${quiz.title}": ${questionIds.length} questions mappées sur ${quiz.questions.length} questions originales`);

        // Supprimer l'ID du quiz et ajouter les nouveaux IDs des questions
        const { id, ...quizWithoutId } = quiz;
        return {
          ...quizWithoutId,
          questionIds // Ajouter les nouveaux IDs des questions
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
      return;
    }

    // Récupérer les données existantes
    console.log('🔍 Récupération des données existantes...');
    const existingQuestions = await quizAdminService.getAllQuestions();
    const existingQuizzes = await quizAdminService.getAllQuizzes();
    console.log(`📊 ${existingQuestions.length} questions existantes trouvées`);
    console.log(`📊 ${existingQuizzes.length} quiz existants trouvés`);

    // Créer des maps pour une recherche rapide
    // Utiliser le contenu de la question comme clé unique
    const existingQuestionsMap = new Map(
      existingQuestions.map(q => [q.question, q])
    );
    const existingQuizzesMap = new Map(
      existingQuizzes.map(q => [q.title, q])
    );

    // Créer un map pour faire correspondre les anciens IDs avec les nouveaux
    const questionIdMapping = new Map<string, string>();

    // Importer ou mettre à jour les questions
    console.log('📝 Importation/mise à jour des questions...');
    let questionsCreated = 0;
    let questionsUpdated = 0;

    for (const question of sampleQuestions) {
      try {
        const existingQuestion = existingQuestionsMap.get(question.question);

        if (existingQuestion) {
          // Vérifier si la question existe réellement dans Firebase
          const questionInFirebase = await quizAdminService.getQuestion(existingQuestion.id);

          // La question n'existe pas dans Firebase, la créer
          const { id, ...questionWithoutId } = question;
          const questionId = await quizAdminService.createQuestion(questionWithoutId);
          questionIdMapping.set(question.id, questionId);
          questionsCreated++;
          console.log(`✅ Question "${question.question.substring(0, 50)}..." créée (était dans le map mais pas dans Firebase)`);
        } else {
          // Créer une nouvelle question
          const { id, ...questionWithoutId } = question;
          const questionId = await quizAdminService.createQuestion(questionWithoutId);
          questionIdMapping.set(question.id, questionId);
          questionsCreated++;
          console.log(`✅ Question "${question.question.substring(0, 50)}..." créée`);
        }
      } catch (error) {
        console.error(`❌ Erreur lors de l'importation de la question:`, error);
        // Continuer avec la question suivante au lieu d'arrêter le processus
      }
    }

    // Préparer les quiz avec les nouveaux IDs des questions
    console.log('📋 Préparation des quiz...');
    const quizzesWithQuestionIds = sampleQuizzes.map(quiz => {
      // Trouver les nouveaux IDs des questions pour ce quiz en utilisant le mapping
      const questionIds = quiz.questions.map(q => {
        const newId = questionIdMapping.get(q.id);
        if (!newId) {
          console.warn(`⚠️ ID de question non trouvé dans le mapping: ${q.id} pour le quiz "${quiz.title}"`);
        }
        return newId;
      }).filter(id => id !== undefined) as string[]; // Filtrer les IDs non trouvés

      console.log(`📋 Quiz "${quiz.title}": ${questionIds.length} questions mappées sur ${quiz.questions.length} questions originales`);

      const { id, ...quizWithoutId } = quiz;
      return {
        ...quizWithoutId,
        questionIds // Ajouter les nouveaux IDs des questions
      };
    });

    // Importer ou mettre à jour les quiz
    console.log('🎯 Importation/mise à jour des quiz...');
    let quizzesCreated = 0;
    let quizzesUpdated = 0;

    for (const quiz of quizzesWithQuestionIds) {
      try {
        const existingQuiz = existingQuizzesMap.get(quiz.title);

        if (existingQuiz) {
          // Vérifier si le quiz existe réellement dans Firebase
          const quizInFirebase = await quizAdminService.getQuiz(existingQuiz.id);

          if (quizInFirebase) {
            // Mettre à jour le quiz existant
            await quizAdminService.updateQuiz(existingQuiz.id, quiz);
            quizzesUpdated++;
            console.log(`🔄 Quiz "${quiz.title}" mis à jour`);
          } else {
            // Le quiz n'existe pas dans Firebase, le créer
            const quizId = await quizAdminService.createQuiz(quiz);
            quizzesCreated++;
            console.log(`✅ Quiz "${quiz.title}" créé (était dans le map mais pas dans Firebase)`);
          }
        } else {
          // Créer un nouveau quiz
          const quizId = await quizAdminService.createQuiz(quiz);
          quizzesCreated++;
          console.log(`✅ Quiz "${quiz.title}" créé`);
        }
      } catch (error) {
        console.error(`❌ Erreur lors de l'importation du quiz "${quiz.title}":`, error);
        // Continuer avec le quiz suivant au lieu d'arrêter le processus
      }
    }

    // Afficher les statistiques
    console.log('📊 Récupération des statistiques...');
    const stats = await quizAdminService.getQuizStatistics();
    console.log('📈 Statistiques finales:');
    console.log(`   - Questions créées: ${questionsCreated}`);
    console.log(`   - Questions mises à jour: ${questionsUpdated}`);
    console.log(`   - Quiz créés: ${quizzesCreated}`);
    console.log(`   - Quiz mis à jour: ${quizzesUpdated}`);
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
  // Utiliser clearExisting = true pour supprimer d'abord toutes les données
  importDataToFirebase(true);
}

export { importDataToFirebase };

