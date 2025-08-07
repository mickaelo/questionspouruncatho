import { importCoursesToFirebase } from './import-courses-to-firebase';
import { importDataToFirebase } from './import-to-firebase';

async function populateDatabase() {
  console.log('🚀 Début du peuplement/mise à jour de la base de données Firebase...');
  console.log('='.repeat(60));

  try {

    // 2. Importer/mettre à jour les questions et quiz
    console.log('📝 ÉTAPE 2: Importation/mise à jour des questions et quiz...');
    await importDataToFirebase(true);
    // 1. Importer/mettre à jour les cours
    console.log('📚 ÉTAPE 1: Importation/mise à jour des cours...');
    await importCoursesToFirebase();
    console.log('✅ Cours traités avec succès (créés + mis à jour)');
    console.log('');


    console.log('✅ Questions et quiz traités avec succès (créés + mis à jour)');
    console.log('');

    console.log('🎉 Peuplement/mise à jour de la base de données terminé avec succès !');
    console.log('📊 Toutes les données sont maintenant à jour dans Firebase');

  } catch (error) {
    console.error('❌ Erreur lors du peuplement/mise à jour de la base de données:', error);
    process.exit(1);
  }
}

// Exécuter le script si appelé directement
if (require.main === module) {
  populateDatabase();
}

export { populateDatabase };

