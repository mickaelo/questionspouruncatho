import { formationCourses } from '../data/courses';
import { sampleQuestions, sampleQuizzes } from '../data/questions';
import { courseService } from '../services/courseService';
import { quizAdminService } from '../services/quizAdminService';
import { Course } from '../types/quiz';

// Type temporaire pour l'import avec des IDs de quiz
type CourseForImport = Omit<Course, 'quizzes'> & {
  quizzes: string[];
};

async function importDataToFirebase(clearExisting: boolean = false) {
  console.log('🚀 Début de l\'importation des données vers Firebase...');
  console.log('='.repeat(60));

  try {
    // ÉTAPE 1: Vider les trois tables si demandé
    if (clearExisting) {
      console.log('🗑️ ÉTAPE 1: Suppression de toutes les données existantes...');
      
      // Supprimer tous les cours
      console.log('📚 Suppression des cours...');
      const existingCourses = await courseService.getAllCourses();
      for (const course of existingCourses) {
        await courseService.deleteCourse(course.id);
        console.log(`🗑️ Cours "${course.title}" supprimé`);
      }
      console.log(`✅ ${existingCourses.length} cours supprimés`);

      // Supprimer tous les quiz
      console.log('🎯 Suppression des quiz...');
      await quizAdminService.deleteAllQuizzes();
      console.log('✅ Tous les quiz supprimés');

      // Supprimer toutes les questions
      console.log('📝 Suppression des questions...');
      await quizAdminService.deleteAllQuestions();
      console.log('✅ Toutes les questions supprimées');

      console.log('✅ Toutes les tables sont maintenant vides');
      console.log('');
    }

    // ÉTAPE 2: Importer les questions
    console.log('📝 ÉTAPE 2: Importation des questions...');
    
    // Supprimer les IDs des questions avant l'import et ajouter slug
    const questionsWithoutIds = sampleQuestions.map(question => {
      const { id, ...questionWithoutId } = question;
      return {
        ...questionWithoutId,
        slug: id // Ajouter l'ID original comme slug
      };
    });
    
    const questionIds = await quizAdminService.importQuestionsFromData(questionsWithoutIds);
    console.log(`✅ ${questionIds.length} questions importées`);

    // Créer un mapping des anciens IDs vers les nouveaux IDs Firebase
    const questionIdMapping = new Map<string, string>();
    sampleQuestions.forEach((question, index) => {
      if (questionIds[index]) {
        questionIdMapping.set(question.id, questionIds[index]);
        console.log(`🔗 Mapping question: ${question.id} → ${questionIds[index]}`);
      }
    });
    console.log('');

    // ÉTAPE 3: Importer les quiz avec les IDs Firebase des questions
    console.log('🎯 ÉTAPE 3: Importation des quiz...');
    
    // Préparer les quiz avec les IDs Firebase des questions
    const quizzesWithQuestionIds = sampleQuizzes.map(quiz => {
      // Trouver les IDs Firebase des questions pour ce quiz
      const firebaseQuestionIds = quiz.questions.map(q => {
        const firebaseId = questionIdMapping.get(q.id);
        if (!firebaseId) {
          console.warn(`⚠️ ID Firebase de question non trouvé pour: ${q.id} dans le quiz "${quiz.title}"`);
        }
        return firebaseId;
      }).filter(id => id !== undefined) as string[];

      console.log(`📋 Quiz "${quiz.title}": ${firebaseQuestionIds.length} questions mappées sur ${quiz.questions.length} questions originales`);

      // Supprimer l'ID du quiz et ajouter les IDs Firebase des questions + slug
      const { id, ...quizWithoutId } = quiz;
      return {
        ...quizWithoutId,
        slug: id, // Ajouter l'ID original comme slug
        questionIds: firebaseQuestionIds // Utiliser les IDs Firebase des questions
      };
    });

    // Importer les quiz
    const quizIds = await quizAdminService.importQuizzesFromData(quizzesWithQuestionIds);
    console.log(`✅ ${quizIds.length} quiz importés`);

    // Créer un mapping des anciens IDs de quiz vers les nouveaux IDs Firebase
    const quizIdMapping = new Map<string, string>();
    sampleQuizzes.forEach((quiz, index) => {
      if (quizIds[index]) {
        quizIdMapping.set(quiz.id, quizIds[index]);
        console.log(`🔗 Mapping quiz: ${quiz.id} → ${quizIds[index]}`);
      }
    });
    console.log('');

    // ÉTAPE 4: Importer les cours avec les IDs Firebase des quiz
    console.log('📚 ÉTAPE 4: Importation des cours...');
    
    let coursesCreated = 0;
    for (const course of formationCourses as CourseForImport[]) {
      try {
        // Trouver les IDs Firebase des quiz pour ce cours
        const firebaseQuizIds = course.quizzes.map(quizId => {
          const firebaseId = quizIdMapping.get(quizId);
          if (!firebaseId) {
            console.warn(`⚠️ ID Firebase de quiz non trouvé pour: ${quizId} dans le cours "${course.title}"`);
          }
          return firebaseId;
        }).filter(id => id !== undefined) as string[];

        console.log(`📋 Cours "${course.title}": ${firebaseQuizIds.length} quiz mappés sur ${course.quizzes.length} quiz originaux`);

        // Créer le cours avec les IDs Firebase des quiz + slug
        const { id, quizzes, ...courseWithoutId } = course;
        const courseId = await courseService.createCourse({ 
          ...courseWithoutId,
          slug: id, // Ajouter l'ID original comme slug
          quizzes: firebaseQuizIds as any // Cast temporaire pour satisfaire le type
        });
        coursesCreated++;
        console.log(`✅ Cours "${course.title}" créé avec l'ID: ${courseId} (${firebaseQuizIds.length} quiz associés)`);
      } catch (error) {
        console.error(`❌ Erreur lors de l'importation du cours "${course.title}":`, error);
      }
    }

    // ÉTAPE 5: Afficher les statistiques finales
    console.log('');
    console.log('📊 ÉTAPE 5: Statistiques finales...');
    const stats = await quizAdminService.getQuizStatistics();
    console.log('📈 Résumé de l\'importation:');
    console.log(`   - Questions importées: ${questionIds.length}`);
    console.log(`   - Quiz importés: ${quizIds.length}`);
    console.log(`   - Cours créés: ${coursesCreated}`);
    console.log(`   - Questions totales en base: ${stats.totalQuestions}`);
    console.log(`   - Quiz totaux en base: ${stats.totalQuizzes}`);
    console.log(`   - Questions par catégorie:`, stats.questionsByCategory);
    console.log(`   - Questions par difficulté:`, stats.questionsByDifficulty);
    console.log(`   - Quiz par niveau:`, stats.quizzesByLevel);

    console.log('');
    console.log('🎉 Importation complète terminée avec succès !');
    console.log('📊 Toutes les données sont maintenant à jour dans Firebase avec les bons mappings d\'IDs');

  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  // Utiliser clearExisting = true pour vider d'abord toutes les tables
  importDataToFirebase(true);
}

export { importDataToFirebase };

