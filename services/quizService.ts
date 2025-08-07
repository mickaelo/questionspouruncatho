import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Question, Quiz } from '../types/quiz';

// Collection names
const QUESTIONS_COLLECTION = 'questions';
const QUIZZES_COLLECTION = 'quizzes';

export interface QuizService {
  // Question retrieval
  getQuestion(id: string): Promise<Question | null>;
  getAllQuestions(): Promise<Question[]>;
  getQuestionsByCategory(category: string): Promise<Question[]>;
  getQuestionsByDifficulty(difficulty: string): Promise<Question[]>;
  getQuestionsByLevel(level: number): Promise<Question[]>;
  getQuestionsByQuizId(quizId: string): Promise<Question[]>;

  // Quiz retrieval
  getQuiz(id: string): Promise<Quiz | null>;
  getAllQuizzes(): Promise<Quiz[]>;
  getQuizzesByCategory(category: string): Promise<Quiz[]>;
  getQuizzesByCourse(courseId: string): Promise<Quiz[]>;
  getAvailableQuizzes(userLevel: number): Promise<Quiz[]>;
  getQuizzesByCategoryAndLevel(category: string, userLevel: number): Promise<Quiz[]>;

  // Statistics
  getQuizStatistics(): Promise<{
    totalQuestions: number;
    totalQuizzes: number;
    questionsByCategory: Record<string, number>;
    questionsByDifficulty: Record<string, number>;
    quizzesByLevel: Record<number, number>;
  }>;
}

class QuizServiceImpl implements QuizService {

  // Question retrieval
  async getQuestion(id: string): Promise<Question | null> {
    try {
      console.log('🔍 Recherche de la question avec ID:', id);

      // Rechercher par la propriété 'id' au lieu de l'ID du document
      const questionsRef = collection(db, QUESTIONS_COLLECTION);
      const q = query(questionsRef, where("id", "==", id));

      const querySnapshot = await getDocs(q);
      console.log('📄 Nombre de questions trouvées:', querySnapshot.docs.length);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Prendre le premier document trouvé
        const question = { id: doc.id, ...doc.data() } as Question;
        console.log('✅ Question trouvée:', question.id);
        return question;
      }

      console.log('❌ Aucune question trouvée avec la propriété id:', id);
      return null;
    } catch (error) {
      console.error('💥 Erreur lors de la récupération de la question:', error);
      throw new Error('Failed to get question');
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    try {
      const q = query(collection(db, QUESTIONS_COLLECTION));
      const querySnapshot = await getDocs(q);

      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      // Trier les questions par ID côté client
      return questions.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting all questions:', error);
      throw new Error('Failed to get questions');
    }
  }

  async getQuestionsByCategory(category: string): Promise<Question[]> {
    try {
      // Utiliser seulement le filtre where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);

      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      // Trier les questions par ID côté client
      return questions.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting questions by category:', error);
      throw new Error('Failed to get questions by category');
    }
  }

  async getQuestionsByDifficulty(difficulty: string): Promise<Question[]> {
    try {
      // Utiliser seulement le filtre where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('difficulty', '==', difficulty)
      );
      const querySnapshot = await getDocs(q);

      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      // Trier les questions par ID côté client
      return questions.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting questions by difficulty:', error);
      throw new Error('Failed to get questions by difficulty');
    }
  }

  async getQuestionsByLevel(level: number): Promise<Question[]> {
    try {
      // Utiliser seulement le filtre where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUESTIONS_COLLECTION),
        where('level', '<=', level)
      );
      const querySnapshot = await getDocs(q);

      const questions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Question[];

      // Trier les questions par niveau puis par ID côté client
      return questions.sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }
        return a.id.localeCompare(b.id);
      });
    } catch (error) {
      console.error('Error getting questions by level:', error);
      throw new Error('Failed to get questions by level');
    }
  }

  async getQuestionsByQuizId(quizId: string): Promise<Question[]> {
    try {
      // Récupérer directement le document quiz sans les questions pour éviter la boucle infinie
      const docRef = doc(db, QUIZZES_COLLECTION, quizId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) return [];

      const quizData = docSnap.data();
      const questionIds = quizData.questions?.map((q: any) => q.id) || [];
      console.log("questionIds", questionIds)
      const questions: Question[] = [];

      for (const questionId of questionIds) {
        const question = await this.getQuestion(questionId);
        if (question) {
          questions.push(question);
        }
      }

      return questions;
    } catch (error) {
      console.error('Error getting questions by quiz ID:', error);
      throw new Error('Failed to get questions by quiz ID');
    }
  }

  // Quiz retrieval
  async getQuiz(id: string): Promise<Quiz | null> {
    try {
      // 1. Récupérer le quiz
      const docRef = doc(db, QUIZZES_COLLECTION, id);
      const quizSnap = await getDoc(docRef);

      if (!quizSnap.exists()) {
        throw new Error('Quiz non trouvéa');
      }
      const quizData = quizSnap.data();

      // 2. Récupérer les questions associées (via questionIds)
      const questionIds: string[] = quizData.questionIds || [];

      if (questionIds.length === 0) {
        return { id: quizSnap.id, questions: [], ...quizData } as any;
      }

      // Firestore limite à 10 éléments max avec where 'in'
      // Si plus de 10, il faudra faire plusieurs requêtes (pagination)
      const chunkSize = 10;
      const questions: any[] = [];

      for (let i = 0; i < questionIds.length; i += chunkSize) {
        const chunk = questionIds.slice(i, i + chunkSize);

        const q = query(collection(db, 'questions'), where('__name__', 'in', chunk));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          questions.push({ id: doc.id, ...doc.data() });
        });
      }

      return { id: quizSnap.id, ...quizData, questions } as any;
    } catch (error) {
      console.error('💥 Erreur lors de la récupération du quiz:', error);
      throw new Error('Failed to get quiz');
    }
  }

  async getAllQuizzes(): Promise<Quiz[]> {
    try {
      const q = query(collection(db, QUIZZES_COLLECTION));
      const querySnapshot = await getDocs(q);

      const quizzes: Quiz[] = [];
      for (const doc of querySnapshot.docs) {
        const quizData = doc.data();

        // Récupérer le nombre de questions depuis le document quiz
        const questionCount = quizData.questions?.length || 0;

        // Créer un tableau avec le bon nombre d'éléments pour que .length fonctionne
        const questionsArray = Array(questionCount).fill(null);

        quizzes.push({
          id: doc.id,
          ...quizData,
          questions: questionsArray // Tableau avec la bonne longueur
        } as any);
      }

      // Trier les quiz par ID côté client
      return quizzes.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting all quizzes:', error);
      throw new Error('Failed to get quizzes');
    }
  }

  async getQuizzesByCategory(category: string): Promise<Quiz[]> {
    try {
      // Utiliser seulement le filtre where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('category', '==', category)
      );
      const querySnapshot = await getDocs(q);

      const quizzes: Quiz[] = [];
      for (const doc of querySnapshot.docs) {
        const quizData = doc.data();

        // Récupérer le nombre de questions depuis le document quiz
        const questionCount = quizData.questions?.length || 0;

        // Créer un tableau avec le bon nombre d'éléments pour que .length fonctionne
        const questionsArray = Array(questionCount).fill(null);

        quizzes.push({
          id: doc.id,
          ...quizData,
          questions: questionsArray // Tableau avec la bonne longueur
        } as any);
      }

      // Trier les quiz par ID côté client si nécessaire
      return quizzes.sort((a, b) => a.id.localeCompare(b.id));
    } catch (error) {
      console.error('Error getting quizzes by category:', error);
      throw new Error('Failed to get quizzes by category');
    }
  }

  async getQuizzesByCourse(courseId: string): Promise<Quiz[]> {
    try {
      const courseRef = doc(db, 'courses', courseId);
      const courseSnap = await getDoc(courseRef);
      if (!courseSnap.exists()) return [];

      const courseData = courseSnap.data();
      let quizzes = courseData.quizzes || [];

      // Si ce sont des IDs, on va chercher les quiz complets
      if (quizzes.length > 0 && typeof quizzes[0] === 'string') {
        const quizDocs = await Promise.all(
          quizzes.map((quizId: string) => getDoc(doc(db, 'quizzes', quizId)))
        );
        return quizDocs
          .filter(q => q.exists())
          .map(q => ({ id: q.id, ...q.data() } as Quiz));
      }

      // Sinon, on suppose que ce sont déjà des objets Quiz
      return quizzes as Quiz[];
    } catch (error) {
      console.error('Error getting quizzes for course:', error);
      throw new Error('Failed to get quizzes for course');
    }
  }

  async getAvailableQuizzes(userLevel: number): Promise<Quiz[]> {
    try {
      // Utiliser seulement le filtre where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('level', '<=', userLevel)
      );
      const querySnapshot = await getDocs(q);

      const quizzes: Quiz[] = [];
      for (const doc of querySnapshot.docs) {
        const quizData = doc.data();

        // Récupérer le nombre de questions depuis le document quiz
        const questionCount = quizData.questions?.length || 0;

        // Créer un tableau avec le bon nombre d'éléments pour que .length fonctionne
        const questionsArray = Array(questionCount).fill(null);

        quizzes.push({
          id: doc.id,
          ...quizData,
          questions: questionsArray // Tableau avec la bonne longueur
        } as any);
      }

      // Trier les quiz par niveau puis par ID côté client
      return quizzes.sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }
        return a.id.localeCompare(b.id);
      });
    } catch (error) {
      console.error('Error getting available quizzes:', error);
      throw new Error('Failed to get available quizzes');
    }
  }

  async getQuizzesByCategoryAndLevel(category: string, userLevel: number): Promise<Quiz[]> {
    try {
      // Utiliser seulement les filtres where sans orderBy pour éviter l'erreur d'index
      const q = query(
        collection(db, QUIZZES_COLLECTION),
        where('category', '==', category),
        where('level', '<=', userLevel)
      );
      const querySnapshot = await getDocs(q);

      const quizzes: Quiz[] = [];
      for (const doc of querySnapshot.docs) {
        const quizData = doc.data();

        // Récupérer le nombre de questions depuis le document quiz
        const questionCount = quizData.questions?.length || 0;

        // Créer un tableau avec le bon nombre d'éléments pour que .length fonctionne
        const questionsArray = Array(questionCount).fill(null);

        quizzes.push({
          id: doc.id,
          ...quizData,
          questions: questionsArray // Tableau avec la bonne longueur
        } as any);
      }

      // Trier les quiz par niveau puis par ID côté client
      return quizzes.sort((a, b) => {
        if (a.level !== b.level) {
          return a.level - b.level;
        }
        return a.id.localeCompare(b.id);
      });
    } catch (error) {
      console.error('Error getting quizzes by category and level:', error);
      throw new Error('Failed to get quizzes by category and level');
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
      const [questions, quizzes] = await Promise.all([
        this.getAllQuestions(),
        this.getAllQuizzes()
      ]);

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

export const quizService = new QuizServiceImpl(); 