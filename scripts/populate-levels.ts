import { initializeApp } from 'firebase/app';
import { collection, doc, getDocs, getFirestore, writeBatch } from 'firebase/firestore';
import { courseContents } from '../data/courses';

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

const COURSES_COLLECTION = 'courses'; // Garder le nom de collection pour compatibilité

// Fonction pour nettoyer les données avant l'import
function cleanDataForFirestore(data: any): any {
  if (data === null || data === undefined) {
    return null;
  }
  
  if (Array.isArray(data)) {
    return data.map(item => cleanDataForFirestore(item));
  }
  
  if (typeof data === 'object') {
    const cleaned: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        cleaned[key] = cleanDataForFirestore(value);
      } else {
        cleaned[key] = null;
      }
    }
    return cleaned;
  }
  
  return data;
}

// Fonction pour convertir LevelContent en Course
function convertLevelContentToCourse(levelContent: any): any {
  return {
    name: levelContent.title,
    description: levelContent.description,
    color: levelContent.color,
    level: levelContent.level, // Garder le niveau pour référence
    targetAudience: levelContent.targetAudience,
    contentTypes: levelContent.contentTypes,
    requiredPoints: getRequiredPointsForLevel(levelContent.level),
    requiredQuizzes: getRequiredQuizzesForLevel(levelContent.level),
    requiredBadges: getRequiredBadgesForLevel(levelContent.level),
    unlockedBadges: [],
    quizzes: levelContent.quizzes || [],
    challenges: levelContent.challenges || []
  };
}

// Fonctions pour définir les prérequis selon le niveau
function getRequiredPointsForLevel(level: number): number {
  switch (level) {
    case 1: return 0;
    case 2: return 100;
    case 3: return 300;
    case 4: return 600;
    case 5: return 1000;
    case 6: return 800; // Parcours Saint Thomas
    default: return 0;
  }
}

function getRequiredQuizzesForLevel(level: number): number {
  switch (level) {
    case 1: return 0;
    case 2: return 5;
    case 3: return 15;
    case 4: return 30;
    case 5: return 50;
    case 6: return 25; // Parcours Saint Thomas
    default: return 0;
  }
}

function getRequiredBadgesForLevel(level: number): number {
  switch (level) {
    case 1: return 0;
    case 2: return 2;
    case 3: return 5;
    case 4: return 10;
    case 5: return 15;
    case 6: return 8; // Parcours Saint Thomas
    default: return 0;
  }
}

async function populateCourses() {
  console.log('🚀 Début de la population des parcours dans Firebase...');
  
  try {
    // Vérifier si des cours existent déjà
    console.log('📊 Vérification des parcours existants...');
    const existingCourses = await getExistingCourses();
    
    if (existingCourses.length > 0) {
      console.log(`⚠️  ${existingCourses.length} parcours existent déjà dans la base de données`);
      console.log('Les parcours existants seront conservés. Seuls les nouveaux seront ajoutés.');
    }
    
    // Convertir les courseContents en cours
    const coursesToImport = courseContents.map(convertLevelContentToCourse);
    
    console.log(`📝 Import de ${coursesToImport.length} parcours...`);
    const importedCourses = await importCourses(coursesToImport, existingCourses);
    
    console.log(`✅ ${importedCourses.length} parcours importés avec succès`);
    
    // Afficher un résumé détaillé
    await showImportSummary(importedCourses, existingCourses);
    
    console.log('🎉 Population des parcours terminée avec succès !');
    
  } catch (error) {
    console.error('❌ Erreur lors de la population des parcours:', error);
    throw error;
  }
}

async function getExistingCourses(): Promise<any[]> {
  try {
    const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des parcours existants:', error);
    return [];
  }
}

async function importCourses(coursesToImport: any[], existingCourses: any[]): Promise<string[]> {
  const batch = writeBatch(db);
  const importedIds: string[] = [];
  
  for (const course of coursesToImport) {
    // Vérifier si le cours existe déjà par son niveau
    const existingCourse = existingCourses.find(existing => existing.level === course.level);
    
    if (existingCourse) {
      console.log(`⏭️  Cours niveau ${course.level} (${course.name}) existe déjà, ignoré`);
      continue;
    }
    
    // Créer le document sans ID spécifique (Firebase générera un ID automatique)
    const courseRef = doc(collection(db, COURSES_COLLECTION));
    const cleanedData = cleanDataForFirestore(course);
    
    batch.set(courseRef, cleanedData);
    importedIds.push(courseRef.id);
    
    console.log(`✅ Cours niveau ${course.level} (${course.name}) ajouté au batch`);
  }
  
  if (importedIds.length > 0) {
    console.log(`💾 Écriture de ${importedIds.length} nouveaux parcours...`);
    await batch.commit();
    console.log('✅ Batch écrit avec succès');
  } else {
    console.log('ℹ️  Aucun nouveau parcours à importer');
  }
  
  return importedIds;
}

async function showImportSummary(importedCourses: string[], existingCourses: any[]) {
  console.log('\n📊 RÉSUMÉ DE L\'IMPORTATION DES PARCOURS');
  console.log('=' .repeat(60));
  
  console.log('\n📝 PARCOURS IMPORTÉS:');
  console.log(`  Nouveaux: ${importedCourses.length}`);
  console.log(`  Existants: ${existingCourses.length}`);
  console.log(`  Total: ${importedCourses.length + existingCourses.length}`);
  
  if (importedCourses.length > 0) {
    console.log('\n🆕 NOUVEAUX PARCOURS:');
    importedCourses.forEach((courseId, index) => {
      const course = courseContents.find(lc => lc.level === parseInt(courseId) || true);
      if (course) {
        console.log(`  ${index + 1}. Niveau ${course.level}: ${course.title}`);
      }
    });
  }
  
  if (existingCourses.length > 0) {
    console.log('\n📋 PARCOURS EXISTANTS:');
    existingCourses.forEach((course, index) => {
      console.log(`  ${index + 1}. Niveau ${course.level}: ${course.name}`);
    });
  }
  
  // Statistiques par niveau
  console.log('\n📈 STATISTIQUES PAR NIVEAU:');
  const allCourses = [...existingCourses, ...importedCourses.map(id => ({ id }))];
  const levelStats = allCourses.reduce((acc, course) => {
    const level = course.level || 'inconnu';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  Object.entries(levelStats).forEach(([levelId, count]) => {
    console.log(`  Niveau ${levelId}: ${count} parcours`);
  });
}

// Fonction pour vider la collection courses (optionnel)
async function clearCourses() {
  console.log('🗑️  Suppression de tous les parcours...');
  
  try {
    const querySnapshot = await getDocs(collection(db, COURSES_COLLECTION));
    const batch = writeBatch(db);
    
    querySnapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    
    await batch.commit();
    console.log(`✅ ${querySnapshot.docs.length} parcours supprimés`);
  } catch (error) {
    console.error('❌ Erreur lors de la suppression des parcours:', error);
    throw error;
  }
}

// Fonction principale
async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('--clear')) {
    await clearCourses();
    return;
  }
  
  await populateCourses();
}

// Exécuter le script
if (require.main === module) {
  main().catch(console.error);
}

export { clearCourses, populateCourses };

