#!/usr/bin/env tsx

import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Script pour transformer les questions multiple-choice avec une seule correctAnswer
 * en questions single-choice
 */

const QUESTIONS_FILE = join(process.cwd(), 'data/questions.ts');

function main() {
  console.log('🚀 Début de la transformation des questions multiple-choice en single-choice...\n');

  try {
    // Lire le contenu du fichier
    const content = readFileSync(QUESTIONS_FILE, 'utf-8');
    
    // Utiliser des expressions régulières pour extraire les questions
    const questions = extractQuestions(content);
    
    let transformedCount = 0;
    let multipleChoiceCount = 0;
    
    console.log(`📋 Analyse de ${questions.length} questions trouvées...\n`);
    
    let newContent = content;
    
    for (const question of questions) {
      if (question.questionType === 'multiple-choice') {
        multipleChoiceCount++;
        
        // Vérifier si c'est une question à réponse unique
        if (shouldConvertToSingleChoice(question)) {
          console.log(`✅ Question ${question.id}: multiple-choice → single-choice`);
          
          // Remplacer le type de question
          newContent = newContent.replace(
            new RegExp(`(id: '${question.id}'[\\s\\S]*?)questionType: 'multiple-choice'`, 'm'),
            `$1questionType: 'single-choice'`
          );
          
          // Transformer correctAnswer si c'est un array avec un seul élément
          if (question.correctAnswer.startsWith('[') && question.correctAnswer.endsWith(']')) {
            const match = question.correctAnswer.match(/\[(\d+)\]/);
            if (match) {
              const singleAnswer = match[1];
              newContent = newContent.replace(
                new RegExp(`(id: '${question.id}'[\\s\\S]*?)correctAnswer: \\[${singleAnswer}\\]`, 'm'),
                `$1correctAnswer: ${singleAnswer}`
              );
              console.log(`   🔄 correctAnswer: [${singleAnswer}] → ${singleAnswer}`);
            }
          }
          
          // Supprimer multipleCorrectAnswers: false si présent
          newContent = newContent.replace(
            new RegExp(`(id: '${question.id}'[\\s\\S]*?)\\s*multipleCorrectAnswers: false,?\\s*`, 'm'),
            '$1'
          );
          
          transformedCount++;
        }
      }
    }
    
    // Écrire le fichier transformé
    writeFileSync(QUESTIONS_FILE, newContent, 'utf-8');
    
    console.log('\n📊 Résumé de la transformation:');
    console.log(`   • Questions total analysées: ${questions.length}`);
    console.log(`   • Questions multiple-choice trouvées: ${multipleChoiceCount}`);
    console.log(`   • Questions transformées en single-choice: ${transformedCount}`);
    console.log(`   • Fichier mis à jour: ${QUESTIONS_FILE}`);
    
    if (transformedCount > 0) {
      console.log('\n✅ Transformation terminée avec succès!');
    } else {
      console.log('\nℹ️  Aucune transformation nécessaire.');
    }
    
  } catch (error) {
    console.error('❌ Erreur lors de la transformation:', error);
    process.exit(1);
  }
}

function extractQuestions(content: string) {
  const questions: Array<{
    id: string;
    questionType: string;
    correctAnswer: string;
    hasMultipleCorrectAnswers: boolean;
  }> = [];
  
  // Regex pour extraire chaque question complète
  const questionRegex = /\{[\s\S]*?\}/g;
  const matches = content.match(questionRegex);
  
  if (matches) {
    for (const match of matches) {
      const idMatch = match.match(/id: '([^']+)'/);
      const typeMatch = match.match(/questionType: '([^']+)'/);
      const correctAnswerMatch = match.match(/correctAnswer: ([^,\n]+)/);
      const multipleMatch = match.includes('multipleCorrectAnswers: true');
      
      if (idMatch && typeMatch && correctAnswerMatch) {
        questions.push({
          id: idMatch[1],
          questionType: typeMatch[1],
          correctAnswer: correctAnswerMatch[1].trim(),
          hasMultipleCorrectAnswers: multipleMatch
        });
      }
    }
  }
  
  return questions;
}

function shouldConvertToSingleChoice(question: any): boolean {
  // Ne pas convertir si explicitement marqué comme ayant plusieurs réponses
  if (question.hasMultipleCorrectAnswers) {
    return false;
  }
  
  // Si correctAnswer est un nombre simple, convertir
  if (/^\d+$/.test(question.correctAnswer)) {
    return true;
  }
  
  // Si correctAnswer est un array avec un seul élément, convertir
  const arrayMatch = question.correctAnswer.match(/^\[(\d+)\]$/);
  if (arrayMatch) {
    return true;
  }
  
  return false;
}

if (require.main === module) {
  main();
}

export { main };

