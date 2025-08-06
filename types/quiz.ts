export interface Question {
  id: string;
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  level: number; // Niveau de formation requis (1-5)
  question: string;
  questionType: 'multiple-choice' | 'true-false' | 'image-recognition' | 'quote-completion' | 'association' | 'sentence-reorder';
  options: string[];
  correctAnswer: number | number[]; // number pour choix unique, number[] pour associations et réorganisation
  explanation: string;
  points: number;
  scripture?: string;
  catechism?: string;
  author?: string; // Auteur de la question ou de la doctrine
  reference?: string; // Référence bibliographique
  imageUrl?: string; // Pour les questions d'image à reconnaître
  quote?: string; // Pour les questions de citation à compléter
  partialQuote?: string; // Partie de la citation à compléter
  
  // Nouveaux champs pour les associations
  associationPairs?: AssociationPair[]; // Pour les questions d'association
  multipleCorrectAnswers?: boolean; // Pour les questions à choix multiples avec plusieurs réponses correctes
  
  // Nouveaux champs pour la réorganisation de phrases
  sentences?: string[]; // Phrases à réorganiser
  correctOrder?: number[]; // Ordre correct des phrases
}

export interface AssociationPair {
  id: string;
  leftItem: string;
  rightItem: string;
  isCorrect: boolean;
}

export interface AssociationQuestion extends Question {
  questionType: 'association';
  associationPairs: AssociationPair[];
  correctAnswer: number[]; // Indices des paires correctes
}

export interface MultipleChoiceQuestion extends Question {
  questionType: 'multiple-choice';
  options: string[];
  correctAnswer: number | number[]; // number pour une seule réponse, number[] pour plusieurs
  multipleCorrectAnswers: boolean;
}

export interface SentenceReorderQuestion extends Question {
  questionType: 'sentence-reorder';
  sentences: string[];
  correctOrder: number[]; // Ordre correct des phrases
  correctAnswer: number[]; // Même chose que correctOrder pour la compatibilité
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number; // Niveau de formation requis (1-5)
  questions: Question[];
  questionIds?: string[]; // IDs des questions assignées au quiz
  passingScore: number;
  timeLimit?: number; // en minutes
  prerequisites?: string[]; // IDs des quiz requis
}

export interface QuizResult {
  quizId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // en secondes
  completedAt: Date;
  pointsEarned: number;
}

export interface Answer {
  questionId: string;
  selectedAnswer: number;
  isCorrect: boolean;
  timeSpent: number;
}

// Types pour la gamification
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'progression' | 'special' | 'weekly' | 'achievement';
  requirements: BadgeRequirement[];
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointsReward: number;
}

export interface BadgeRequirement {
  type: 'quiz_completed' | 'score_achieved' | 'streak_days' | 'total_points' | 'category_mastery';
  value: number;
  category?: string; // pour les badges spécifiques à une catégorie
}

export interface SpiritualChallenge {
  id: string;
  title: string;
  description: string;
  type: 'prayer' | 'reading' | 'quiz' | 'reflection';
  duration: 'daily' | 'weekly' | 'monthly';
  startDate: Date;
  endDate: Date;
  requirements: ChallengeRequirement[];
  reward: ChallengeReward;
  isActive: boolean;
}

export interface ChallengeRequirement {
  type: 'prayer_count' | 'reading_minutes' | 'quiz_completed' | 'reflection_words';
  target: number;
  current: number;
}

export interface ChallengeReward {
  points: number;
  badge?: Badge;
  title?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  joinDate: Date;
  level: number; // Niveau de formation actuel (1-5)
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  completedQuizzes: string[];
  unlockedBadges: string[];
  preferences: UserPreferences;
  familyMode: boolean;
  childrenProfiles?: ChildProfile[];
  formationProgress: FormationProgress;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatar?: string;
  level: number;
  totalPoints: number;
  completedQuizzes: string[];
  unlockedBadges: string[];
  parentId: string;
}

export interface UserPreferences {
  notifications: boolean;
  sound: boolean;
  hapticFeedback: boolean;
  theme: 'light' | 'dark' | 'auto';
  language: 'fr' | 'en';
  difficulty: 'facile' | 'moyen' | 'difficile';
  dailyGoal: number; // points quotidiens
}

export interface UserProgress {
  totalPoints: number;
  level: number; // Niveau de formation actuel
  streak: number;
  completedQuizzes: string[];
  currentChallenges: string[];
  weeklyStats: WeeklyStats;
  monthlyStats: MonthlyStats;
  formationProgress: FormationProgress;
}

export interface WeeklyStats {
  weekStart: Date;
  pointsEarned: number;
  quizzesCompleted: number;
  prayersCount: number;
  readingMinutes: number;
  challengesCompleted: number;
}

export interface MonthlyStats {
  month: number;
  year: number;
  pointsEarned: number;
  quizzesCompleted: number;
  prayersCount: number;
  readingMinutes: number;
  challengesCompleted: number;
  badgesUnlocked: number;
}

export interface FidelityScore {
  prayerScore: number;
  readingScore: number;
  quizScore: number;
  totalScore: number;
  lastUpdated: Date;
}

// Nouveaux types pour le système de niveaux
export interface Level {
  id: number;
  name: string;
  color: string;
  description: string;
  targetAudience: string[];
  contentTypes: string[];
  requiredPoints: number;
  requiredQuizzes: number;
  requiredBadges: number;
  unlockedBadges: Badge[];
  quizzes: Quiz[];
  challenges: SpiritualChallenge[];
}

export interface LevelRequirement {
  type: 'points' | 'quizzes' | 'badges' | 'streak' | 'challenges';
  value: number;
  category?: string;
}

export interface FormationProgress {
  currentLevel: number;
  levelProgress: number; // Pourcentage de progression dans le niveau actuel
  completedLevels: number[];
  levelRequirements: LevelRequirement[];
  nextLevelRequirements: LevelRequirement[];
  levelStartDate: Date;
  estimatedCompletionDate?: Date;
}

export interface LevelContent {
  level: number;
  title: string;
  description: string;
  color: string;
  icon: string;
  targetAudience: string[];
  contentTypes: string[];
  sampleQuizzes: string[];
  sampleChallenges: string[];
  prerequisites: string[];
} 