import { importDataToFirebase } from './import-to-firebase';

async function testImport() {
  console.log('🧪 Test de l\'importation des données...');
  
  try {
    // Test avec clearExisting = true pour vider les tables
    await importDataToFirebase(true);
    console.log('✅ Test réussi !');
  } catch (error) {
    console.error('❌ Test échoué:', error);
  }
}

// Exécuter le test
testImport();
