import { Badge, SpiritualChallenge, UserProfile } from '../types/quiz';

// Badges de progression
export const badges: Badge[] = [
  // Badges de progression générale
  {
    id: 'first-quiz',
    name: 'Premier Pas',
    description: 'Avez complété votre premier quiz',
    icon: 'emoji_events',
    category: 'progression',
    requirements: [{ type: 'quiz_completed', value: 1 }],
    rarity: 'common',
    pointsReward: 50
  },
  {
    id: 'quiz-master',
    name: 'Maître des Quiz',
    description: 'Avez complété 50 quiz',
    icon: 'school',
    category: 'progression',
    requirements: [{ type: 'quiz_completed', value: 50 }],
    rarity: 'epic',
    pointsReward: 500
  },
  {
    id: 'streak-7',
    name: 'Fidèle de la Semaine',
    description: '7 jours consécutifs d\'activité',
    icon: 'local_fire_department',
    category: 'progression',
    requirements: [{ type: 'streak_days', value: 7 }],
    rarity: 'rare',
    pointsReward: 200
  },
  {
    id: 'streak-30',
    name: 'Fidèle du Mois',
    description: '30 jours consécutifs d\'activité',
    icon: 'whatshot',
    category: 'progression',
    requirements: [{ type: 'streak_days', value: 30 }],
    rarity: 'epic',
    pointsReward: 1000
  },
  {
    id: 'points-1000',
    name: 'Apprenti Théologien',
    description: 'Avez atteint 1000 points',
    icon: 'star',
    category: 'progression',
    requirements: [{ type: 'total_points', value: 1000 }],
    rarity: 'rare',
    pointsReward: 100
  },
  {
    id: 'points-5000',
    name: 'Théologien Confirmé',
    description: 'Avez atteint 5000 points',
    icon: 'stars',
    category: 'progression',
    requirements: [{ type: 'total_points', value: 5000 }],
    rarity: 'epic',
    pointsReward: 500
  },

  // Badges par catégorie
  {
    id: 'dogmes-expert',
    name: 'Expert en Dogmes',
    description: 'Maîtrisez les dogmes de la foi',
    icon: 'church',
    category: 'achievement',
    requirements: [
      { type: 'category_mastery', value: 10, category: 'dogmes' }
    ],
    rarity: 'rare',
    pointsReward: 300
  },
  {
    id: 'sacrements-expert',
    name: 'Expert en Sacrements',
    description: 'Maîtrisez les 7 sacrements',
    icon: 'water_drop',
    category: 'achievement',
    requirements: [
      { type: 'category_mastery', value: 10, category: 'sacrements' }
    ],
    rarity: 'rare',
    pointsReward: 300
  },
  {
    id: 'bible-expert',
    name: 'Expert en Écritures',
    description: 'Maîtrisez les Saintes Écritures',
    icon: 'menu_book',
    category: 'achievement',
    requirements: [
      { type: 'category_mastery', value: 10, category: 'saintes-ecritures' }
    ],
    rarity: 'rare',
    pointsReward: 300
  },
  {
    id: 'saints-expert',
    name: 'Expert en Saints',
    description: 'Connaissez bien les saints',
    icon: 'person',
    category: 'achievement',
    requirements: [
      { type: 'category_mastery', value: 10, category: 'saints' }
    ],
    rarity: 'rare',
    pointsReward: 300
  },

  // Badges spéciaux
  {
    id: 'perfect-score',
    name: 'Score Parfait',
    description: 'Avez obtenu 100% à un quiz',
    icon: 'verified',
    category: 'special',
    requirements: [{ type: 'score_achieved', value: 100 }],
    rarity: 'epic',
    pointsReward: 400
  },
  {
    id: 'speed-runner',
    name: 'Coureur Spirituel',
    description: 'Avez complété un quiz en moins de 2 minutes',
    icon: 'speed',
    category: 'special',
    requirements: [{ type: 'quiz_completed', value: 1 }], // Simplifié pour l'exemple
    rarity: 'rare',
    pointsReward: 250
  }
];

// Défis spirituels hebdomadaires
export const spiritualChallenges: SpiritualChallenge[] = [
  {
    id: 'challenge-1',
    title: 'Semaine de Prière',
    description: 'Priez chaque jour de la semaine et complétez 3 quiz',
    type: 'prayer',
    duration: 'weekly',
    startDate: new Date('2024-01-01'),
    endDate: new Date('2024-01-07'),
    requirements: [
      { type: 'prayer_count', target: 7, current: 0 },
      { type: 'quiz_completed', target: 3, current: 0 }
    ],
    reward: {
      points: 300,
      badge: badges.find(b => b.id === 'streak-7'),
      title: 'Prieur Assidu'
    },
    isActive: true
  },
  {
    id: 'challenge-2',
    title: 'Lecteur de la Bible',
    description: 'Lisez 30 minutes de Bible et complétez 2 quiz sur les Écritures',
    type: 'reading',
    duration: 'weekly',
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-14'),
    requirements: [
      { type: 'reading_minutes', target: 30, current: 0 },
      { type: 'quiz_completed', target: 2, current: 0 }
    ],
    reward: {
      points: 250,
      title: 'Lecteur de la Parole'
    },
    isActive: true
  },
  {
    id: 'challenge-3',
    title: 'Réflexion Spirituelle',
    description: 'Écrivez 100 mots de réflexion et complétez 1 quiz',
    type: 'reflection',
    duration: 'weekly',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-01-21'),
    requirements: [
      { type: 'reflection_words', target: 100, current: 0 },
      { type: 'quiz_completed', target: 1, current: 0 }
    ],
    reward: {
      points: 200,
      title: 'Contemplatif'
    },
    isActive: true
  }
];

// Profils utilisateurs d'exemple
export const sampleUserProfile: UserProfile = {
  id: 'user-1',
  name: 'Marie Dupont',
  email: 'marie.dupont@email.com',
  avatar: '👩‍🦰',
  joinDate: new Date('2024-01-01'),
  level: 2, // Niveau de formation actuel
  totalPoints: 1250,
  currentStreak: 5,
  longestStreak: 12,
  completedQuizzes: ['quiz-1', 'quiz-2'],
  unlockedBadges: ['first-quiz', 'streak-7'],
  preferences: {
    notifications: true,
    sound: true,
    hapticFeedback: true,
    theme: 'auto',
    language: 'fr',
    difficulty: 'moyen',
    dailyGoal: 100
  },
  familyMode: true,
  childrenProfiles: [
    {
      id: 'child-1',
      name: 'Thomas',
      age: 10,
      avatar: '👦',
      level: 1,
      totalPoints: 450,
      completedQuizzes: ['quiz-1'],
      unlockedBadges: ['first-quiz'],
      parentId: 'user-1'
    },
    {
      id: 'child-2',
      name: 'Sophie',
      age: 8,
      avatar: '👧',
      level: 1,
      totalPoints: 280,
      completedQuizzes: ['quiz-1'],
      unlockedBadges: ['first-quiz'],
      parentId: 'user-1'
    }
  ],
  formationProgress: {
    currentLevel: 2,
    levelProgress: 65, // 65% de progression dans le niveau 2
    completedLevels: [1],
    levelRequirements: [
      { type: 'points', value: 100 },
      { type: 'quizzes', value: 5 },
      { type: 'badges', value: 2 }
    ],
    nextLevelRequirements: [
      { type: 'points', value: 300 },
      { type: 'quizzes', value: 15 },
      { type: 'badges', value: 5 }
    ],
    levelStartDate: new Date('2024-01-15'),
    estimatedCompletionDate: new Date('2024-02-15')
  }
};



// Fonctions utilitaires pour la gamification
export const getBadgeById = (id: string): Badge | undefined => {
  return badges.find(badge => badge.id === id);
};

export const getUnlockedBadges = (userProfile: UserProfile): Badge[] => {
  return userProfile.unlockedBadges
    .map(badgeId => getBadgeById(badgeId))
    .filter((badge): badge is Badge => badge !== undefined);
};

export const getAvailableBadges = (userProfile: UserProfile): Badge[] => {
  return badges.filter(badge => !userProfile.unlockedBadges.includes(badge.id));
};

export const calculateFormationLevel = (totalPoints: number, completedQuizzes: number, unlockedBadges: number): number => {
  // Logique pour déterminer le niveau de formation basé sur les critères
  if (totalPoints >= 1000 && completedQuizzes >= 50 && unlockedBadges >= 15) return 5;
  if (totalPoints >= 600 && completedQuizzes >= 30 && unlockedBadges >= 10) return 4;
  if (totalPoints >= 300 && completedQuizzes >= 15 && unlockedBadges >= 5) return 3;
  if (totalPoints >= 100 && completedQuizzes >= 5 && unlockedBadges >= 2) return 2;
  return 1;
};

export const getFormationLevelTitle = (level: number): string => {
  switch (level) {
    case 1: return 'Découverte / Premiers pas dans la foi';
    case 2: return 'Fondamentaux de la foi catholique';
    case 3: return 'Vie chrétienne engagée';
    case 4: return 'Formation théologique et doctrinale';
    case 5: return 'Vie consacrée / Discernement vocationnel';
    default: return 'Niveau inconnu';
  }
};

export const getRarityColor = (rarity: string): string => {
  switch (rarity) {
    case 'common': return '#4CAF50';
    case 'rare': return '#2196F3';
    case 'epic': return '#9C27B0';
    case 'legendary': return '#FF9800';
    default: return '#757575';
  }
}; 