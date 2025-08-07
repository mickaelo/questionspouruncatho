import { formationCourses } from '../data/courses';
import { sampleQuizzes } from '../data/questions';
import { courseService } from '../services/courseService';
import { quizAdminService } from '../services/quizAdminService';
import { Course } from '../types/quiz';

// Type temporaire pour l'import avec des IDs de quiz
type CourseForImport = Omit<Course, 'quizzes'> & {
  quizzes: string[];
};

async function importCoursesToFirebase() {
  console.log('🚀 Début de l\'importation des cours vers Firebase...');

  try {
    // Supprimer tous les cours existants au début
    console.log('🗑️ Suppression de tous les cours existants...');
    const existingCourses = await courseService.getAllCourses();
    console.log(`📊 ${existingCourses.length} cours existants trouvés, suppression en cours...`);
    
    for (const course of existingCourses) {
      try {
        await courseService.deleteCourse(course.id);
        console.log(`🗑️ Cours "${course.title}" supprimé`);
      } catch (error) {
        console.error(`❌ Erreur lors de la suppression du cours "${course.title}":`, error);
      }
    }
    console.log('✅ Tous les cours existants supprimés');

    // Récupérer les quiz depuis Firebase pour obtenir leurs vrais IDs
    console.log('🔍 Récupération des quiz depuis Firebase...');
    const allQuizzes = await quizAdminService.getAllQuizzes();
    console.log(`📊 ${allQuizzes.length} quiz trouvés dans Firebase`);

    // Créer un map des quiz par titre pour une recherche rapide
    const quizMap = new Map(
      allQuizzes.map(quiz => [quiz.title, quiz])
    );

    // Créer un map des quiz par ID original depuis sampleQuizzes
    const quizTitles = new Map(
      sampleQuizzes.map(quiz => [quiz.id, quiz.title])
    );

    console.log('📋 Mapping des quiz créé:', Object.fromEntries(quizTitles));

    // Importer les cours
    console.log('📚 Importation des cours...');
    let createdCount = 0;
    
    for (const course of formationCourses as CourseForImport[]) {
      try {
        // Récupérer les vrais IDs des quiz depuis Firebase en utilisant les titres
        const realQuizIds: string[] = [];
        for (const quizId of course.quizzes) {
          // Chercher le quiz par son titre basé sur l'ID original depuis sampleQuizzes
          const quizTitle = quizTitles.get(quizId);
          if (quizTitle) {
            const quiz = quizMap.get(quizTitle);
            if (quiz) {
              realQuizIds.push(quiz.id);
              console.log(`🔗 Quiz "${quiz.title}" (ID: ${quiz.id}) associé au cours "${course.title}"`);
            } else {
              console.warn(`⚠️ Quiz "${quizTitle}" non trouvé dans Firebase pour le cours "${course.title}"`);
            }
          } else {
            console.warn(`⚠️ Titre de quiz non trouvé pour l'ID "${quizId}" dans sampleQuizzes pour le cours "${course.title}"`);
          }
        }

        // Créer un nouveau cours avec les vrais IDs des quiz
        const { id, quizzes, ...courseWithoutId } = course;
        const courseId = await courseService.createCourse({ 
          ...courseWithoutId, 
          quizzes: realQuizIds.map(quizId => (quizId as any)) // Cast temporaire pour satisfaire le type
        });
        createdCount++;
        console.log(`✅ Cours "${course.title}" créé avec l'ID: ${courseId} (${realQuizIds.length} quiz associés)`);
      } catch (error) {
        console.error(`❌ Erreur lors de l'importation du cours "${course.title}":`, error);
        // Continuer avec le cours suivant au lieu d'arrêter le processus
      }
    }

    // Afficher les statistiques
    console.log('📊 Récupération des statistiques...');
    console.log('📈 Statistiques finales:');
    console.log(`   - Cours créés: ${createdCount}`);
    console.log(`   - Total traité: ${createdCount}`);

    console.log('🎉 Importation des cours terminée avec succès !');
    console.log(`📝 ${createdCount} cours créés`);
  } catch (error) {
    console.error('❌ Erreur lors de l\'importation:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  importCoursesToFirebase();
}

export { importCoursesToFirebase };

