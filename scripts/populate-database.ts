import { importCoursesToFirebase } from './import-courses-to-firebase';
import { importDataToFirebase } from './import-to-firebase';

async function populateDatabase() {
  console.log('🚀 Début du peuplement de la base de données Firebase...');
  console.log('=' .repeat(60));

  try {
    // 1. Importer les cours
    console.log('📚 ÉTAPE 1: Importation des cours...');
    await importCoursesToFirebase();
    console.log('✅ Cours importés avec succès');
    console.log('');

    // 2. Importer les questions et quiz
    console.log('📝 ÉTAPE 2: Importation des questions et quiz...');
    await importDataToFirebase();
    console.log('✅ Questions et quiz importés avec succès');
    console.log('');

    console.log('🎉 Peuplement de la base de données terminé avec succès !');
    console.log('📊 Toutes les données sont maintenant disponibles dans Firebase');
    
  } catch (error) {
    console.error('❌ Erreur lors du peuplement de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  populateDatabase();
}

export { populateDatabase };

