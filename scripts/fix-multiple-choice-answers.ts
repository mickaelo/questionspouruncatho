#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Script pour transformer les correctAnswer des questions multiple-choice
 * en arrays de nombres si ce ne sont pas déjà des arrays
 */

const QUESTIONS_FILE = join(process.cwd(), 'data/questions.ts');

interface Question {
  id: string;
  questionType: string;
  correctAnswer: number | number[];
  multipleCorrectAnswers?: boolean;
}

function main() {
  console.log('🚀 Début de la transformation des questions multiple-choice...\n');

  try {
    // Lire le contenu du fichier
    const content = readFileSync(QUESTIONS_FILE, 'utf-8');
    
    // Diviser le contenu en lignes pour traitement
    const lines = content.split('\n');
    
    let transformedCount = 0;
    let multipleChoiceCount = 0;
    let currentQuestionType = '';
    let inQuestion = false;
    let questionId = '';
    
    const transformedLines: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Détecter le début d'une nouvelle question
      if (line.trim().match(/^\{\s*$/)) {
        inQuestion = true;
        questionId = '';
        currentQuestionType = '';
      }
      
      // Détecter la fin d'une question
      if (line.trim().match(/^\},?\s*$/)) {
        inQuestion = false;
      }
      
      // Extraire l'ID de la question
      if (inQuestion && line.includes("id: '")) {
        const match = line.match(/id: '([^']+)'/);
        if (match) {
          questionId = match[1];
        }
      }
      
      // Détecter le type de question
      if (inQuestion && line.includes("questionType: 'multiple-choice'")) {
        currentQuestionType = 'multiple-choice';
        multipleChoiceCount++;
      }
      
      // Transformer les correctAnswer pour les questions multiple-choice
      if (inQuestion && 
          currentQuestionType === 'multiple-choice' && 
          line.includes('correctAnswer:') && 
          !line.includes('[')) {
        
        // Extraire le nombre de la ligne
        const match = line.match(/correctAnswer:\s*(\d+),?/);
        if (match) {
          const answerNumber = parseInt(match[1]);
          const indent = line.match(/^(\s*)/)?.[1] || '';
          
          // Remplacer par un array
          const newLine = line.replace(
            /correctAnswer:\s*\d+,?/,
            `correctAnswer: [${answerNumber}],`
          );
          
          transformedLines.push(newLine);
          transformedCount++;
          
          console.log(`✅ Question ${questionId}: correctAnswer: ${answerNumber} → [${answerNumber}]`);
          
          // Ajouter multipleCorrectAnswers: false si pas déjà présent
          const nextLine = lines[i + 1];
          if (nextLine && !nextLine.includes('multipleCorrectAnswers')) {
            transformedLines.push(`${indent}multipleCorrectAnswers: false,`);
          }
          
          continue;
        }
      }
      
      transformedLines.push(line);
    }
    
    // Écrire le fichier transformé
    const newContent = transformedLines.join('\n');
    writeFileSync(QUESTIONS_FILE, newContent, 'utf-8');
    
    console.log('\n📊 Résumé de la transformation:');
    console.log(`   • Questions multiple-choice trouvées: ${multipleChoiceCount}`);
    console.log(`   • Questions transformées: ${transformedCount}`);
    console.log(`   • Fichier mis à jour: ${QUESTIONS_FILE}`);
    
    if (transformedCount > 0) {
      console.log('\n✅ Transformation terminée avec succès!');
    } else {
      console.log('\nℹ️  Aucune transformation nécessaire - toutes les questions semblent déjà correctement formatées.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la transformation:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

export { main };

