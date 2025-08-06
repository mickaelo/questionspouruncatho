import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  writeBatch
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, Quiz } from '../types/quiz';

// Collection names
const QUESTIONS_COLLECTION = 'questions';
const QUIZZES_COLLECTION = 'quizzes';

export interface QuizAdminService {
  // Question management
  createQuestion(question: Omit<Question, 'id'>): Promise<string>;
  updateQuestion(id: string, question: Partial<Question>): Promise<void>;
  deleteQuestion(id: string): Promise<void>;
  getQuestion(id: string): Promise<Question | null>;
  getAllQuestions(): Promise<Question[]>;
  getQuestionsByCategory(category: string): Promise<Question[]>;
  getQuestionsByDifficulty(difficulty: string): Promise<Question[]>;

  // Quiz management
  createQuiz(quiz: Omit<Quiz, 'id'>): Promise<string>;
  updateQuiz(id: string, quiz: Partial<Quiz>): Promise<void>;
  updateQuizQuestions(id: string, questionIds: string[]): Promise<void>;
  deleteQuiz(id: string): Promise<void>;
  getQuiz(id: string): Promise<Quiz | null>;
  getAllQuizzes(): Promise<Quiz[]>;
  getQuizzesByCategory(category: string): Promise<Quiz[]>;
  getQuizzesByCourse(level: number): Promise<Quiz[]>;

  // Bulk operations
  importQuestionsFromData(questions: Omit<Question, 'id'>[]): Promise<string[]>;
  importQuizzesFromData(quizzes: Omit<Quiz, 'id'>[]): Promise<string[]>;
  deleteAllQuestions(): Promise<void>;
  deleteAllQuizzes(): Promise<void>;

  // Statistics
  getQuizStatistics(): Promise<{
    totalQuestions: number;
    totalQuizzes: number;
    questionsByCategory: Record<string, number>;
    questionsByDifficulty: Record<string, number>;
    quizzesByLevel: Record<number, number>;
  }>;
}

class QuizAdminServiceImpl implements QuizAdminService {

  // Question management
  async createQuestion(question: Omit<Question, 'id'>): Promise<string> {
    try {
      console.log('🔄 Service: Création de question en cours...', question);
      
      // Validation des données requises
      if (!question.question || !question.category) {
        throw new Error('Question et catégorie sont requises');
      }

      const questionData = {
        ...question,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      console.log('🔄 Service: Données de la question à sauvegarder:', questionData);
      
      const docRef = await addDoc(collection(db, QUESTIONS_COLLECTION), questionData);
      
      console.log('✅ Service: Question créée avec succès, ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Service: Erreur lors de la création de la question:', error);
      throw new Error(`Failed to create question: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async updateQuestion(id: string, question: Partial<Question>): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id);
      await updateDoc(docRef, {
        ...question,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating question:', error);
      throw new Error('Failed to update question');
    }
  }

  async deleteQuestion(id: string): Promise<void> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting question:', error);
      throw new Error('Failed to delete question');
    }
  }

  async getQuestion(id: string): Promise<Question | null> {
    try {
      const docRef = doc(db, QUESTIONS_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Question;
      }
      return null;
    } catch (error) {
      console.error('Error getting question:', error);
      throw new Error('Failed to get question');
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    try {
      const q = query(collection(db, QUESTIONS_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      console.error('Error getting all questions:', error);
      throw new Error('Failed to get questions');
    }
  }

  async getQuestionsByCategory(category: string): Promise<Question[]> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      console.error('Error getting questions by category:', error);
      throw new Error('Failed to get questions by category');
    }
  }

  async getQuestionsByDifficulty(difficulty: string): Promise<Question[]> {
    try {
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('difficulty', '==', difficulty),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];
    } catch (error) {
      console.error('Error getting questions by difficulty:', error);
      throw new Error('Failed to get questions by difficulty');
    }
  }

  // Quiz management
  async createQuiz(quiz: Omit<Quiz, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, QUIZZES_COLLECTION), {
        ...quiz,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating quiz:', error);
      throw new Error('Failed to create quiz');
    }
  }

  async updateQuiz(id: string, quiz: Partial<Quiz>): Promise<void> {
    try {
      const docRef = doc(db, QUIZZES_COLLECTION, id);
   
      await updateDoc(docRef, {
        ...quiz,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating quiz:', error);
      throw new Error('Failed to update quiz');
    }
  }

  async updateQuizQuestions(id: string, questionIds: string[]): Promise<void> {
    try {
      // Rechercher le document par la propriété id
      const docRef = doc(db, QUIZZES_COLLECTION, id);
      await updateDoc(docRef, {
        questionIds: questionIds,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating quiz questions:', error);
      throw new Error('Failed to update quiz questions');
    }
  }

  async deleteQuiz(id: string): Promise<void> {
    try {
      // Rechercher le document par la propriété id
      const docRef = doc(db, QUIZZES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
      await deleteDoc(docRef);
      }
    } catch (error) {
      console.error('Error deleting quiz:', error);
      throw new Error('Failed to delete quiz');
    }
  }

  async getQuiz(id: string): Promise<Quiz | null> {
    try {
      const quizzesRef = collection(db, QUIZZES_COLLECTION);
      const q = query(quizzesRef, where("id", "==", id));
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return null;
      }
      
      const doc = querySnapshot.docs[0];
      return {
        id: doc.id,
        ...doc.data()
      } as Quiz;
    } catch (error) {
      console.error('Error getting quiz:', error);
      throw new Error('Failed to get quiz');
    }
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      const q = query(collection(db, QUIZZES_COLLECTION), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Quiz[];
    } catch (error) {
      console.error('Error getting all quizzes:', error);
      throw new Error('Failed to get quizzes');
    }
  }

  async getQuizzesByCategory(category: string): Promise<Quiz[]> {
    try {
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('category', '==', category),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Quiz[];
    } catch (error) {
      console.error('Error getting quizzes by category:', error);
      throw new Error('Failed to get quizzes by category');
    }
  }

  async getQuizzesByCourse(level: number): Promise<Quiz[]> {
    try {
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('level', '==', level),
        orderBy('createdAt', 'desc')
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Quiz[];
    } catch (error) {
      console.error('Error getting quizzes by level:', error);
      throw new Error('Failed to get quizzes by level');
    }
  }

  // Bulk operations
  async importQuestionsFromData(questions: Omit<Question, 'id'>[]): Promise<string[]> {
    try {
      const batch = writeBatch(db);
      const questionIds: string[] = [];

      for (const question of questions) {
        const docRef = doc(collection(db, QUESTIONS_COLLECTION));
        batch.set(docRef, {
          ...question,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        questionIds.push(docRef.id);
      }

      await batch.commit();
      return questionIds;
    } catch (error) {
      console.error('Error importing questions:', error);
      throw new Error('Failed to import questions');
    }
  }

  async importQuizzesFromData(quizzes: Omit<Quiz, 'id'>[]): Promise<string[]> {
    try {
      const batch = writeBatch(db);
      const quizIds: string[] = [];

      for (const quiz of quizzes) {
        const docRef = doc(collection(db, QUIZZES_COLLECTION));
        batch.set(docRef, {
          ...quiz,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        quizIds.push(docRef.id);
      }

      await batch.commit();
      return quizIds;
    } catch (error) {
      console.error('Error importing quizzes:', error);
      throw new Error('Failed to import quizzes');
    }
  }

  async deleteAllQuestions(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, QUESTIONS_COLLECTION));
      const batch = writeBatch(db);

      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting all questions:', error);
      throw new Error('Failed to delete all questions');
    }
  }

  async deleteAllQuizzes(): Promise<void> {
    try {
      const querySnapshot = await getDocs(collection(db, QUIZZES_COLLECTION));
      const batch = writeBatch(db);

      querySnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
    } catch (error) {
      console.error('Error deleting all quizzes:', error);
      throw new Error('Failed to delete all quizzes');
    }
  }

  // Statistics
  async getQuizStatistics(): Promise<{
    totalQuestions: number;
    totalQuizzes: number;
    questionsByCategory: Record<string, number>;
    questionsByDifficulty: Record<string, number>;
    quizzesByLevel: Record<number, number>;
  }> {
    try {
      const questions = await this.getAllQuestions();
      const quizzes = await this.getAllQuizzes();

      const questionsByCategory: Record<string, number> = {};
      const questionsByDifficulty: Record<string, number> = {};
      const quizzesByLevel: Record<number, number> = {};

      // Count questions by category and difficulty
      questions.forEach(question => {
        questionsByCategory[question.category] = (questionsByCategory[question.category] || 0) + 1;
        questionsByDifficulty[question.difficulty] = (questionsByDifficulty[question.difficulty] || 0) + 1;
      });

      // Count quizzes by level
      quizzes.forEach(quiz => {
        quizzesByLevel[quiz.level] = (quizzesByLevel[quiz.level] || 0) + 1;
      });

      return {
        totalQuestions: questions.length,
        totalQuizzes: quizzes.length,
        questionsByCategory,
        questionsByDifficulty,
        quizzesByLevel
      };
    } catch (error) {
      console.error('Error getting quiz statistics:', error);
      throw new Error('Failed to get quiz statistics');
    }
  }
}

export const quizAdminService = new QuizAdminServiceImpl(); 