import { formationCourses } from '../data/courses';
import { courseService } from '../services/courseService';

async function importCoursesToFirebase() {
  console.log('🚀 Début de l\'importation des cours vers Firebase...');

  try {
    // Vérifier d'abord si des cours existent déjà
    console.log('🔍 Vérification des cours existants...');
    const existingCourses = await courseService.getAllCourses();
    console.log(`📊 ${existingCourses.length} cours existants trouvés`);

    if (existingCourses.length > 0) {
      console.log('⚠️ Des cours existent déjà dans Firebase');
      console.log('Pour réimporter, supprimez d\'abord les cours existants');
      return;
    }

    // Importer les cours
    console.log('📚 Importation des cours...');
    const courseIds: string[] = [];
    
    for (const course of formationCourses) {
      try {
        // Créer le cours sans l'ID (Firebase générera l'ID)
        const { id, ...courseWithoutId } = course;
        const courseId = await courseService.createCourse(courseWithoutId);
        courseIds.push(courseId);
        console.log(`✅ Cours "${course.title}" importé avec l'ID: ${courseId}`);
      } catch (error) {
        console.error(`❌ Erreur lors de l'importation du cours "${course.title}":`, error);
      }
    }

    // Afficher les statistiques
    console.log('📊 Récupération des statistiques...');
    // const stats = await courseService.getCourseStatistics();
    console.log('📈 Statistiques finales:');
    // console.log(`   - Cours totaux: ${stats.totalCourses}`);
    // console.log(`   - Cours par difficulté:`, stats.coursesByDifficulty);

    console.log('🎉 Importation des cours terminée avec succès !');
    console.log(`📝 ${courseIds.length} cours importés`);
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

