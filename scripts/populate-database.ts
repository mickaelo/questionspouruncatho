import { importDataToFirebase } from './import-to-firebase';

async function populateDatabase() {
  console.log('🚀 Début du peuplement/mise à jour de la base de données Firebase...');
  console.log('='.repeat(60));

  try {
    // Importer/mettre à jour toutes les données (questions, quiz et cours)
    console.log('📝 Importation/mise à jour de toutes les données...');
    await importDataToFirebase(true);

    console.log('✅ Toutes les données traitées avec succès (créées + mises à jour)');
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

