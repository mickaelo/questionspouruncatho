import { Level, LevelContent } from '../types/quiz';

export const formationLevels: Level[] = [
  {
    id: 1,
    name: "Découverte / Premiers pas dans la foi",
    color: "#4CAF50", // 🟢 Vert
    description: "Premiers pas dans la foi chrétienne pour les nouveaux venus",
    targetAudience: [
      "Non-croyants curieux",
      "Nouveaux convertis", 
      "Catéchumènes"
    ],
    contentTypes: [
      "Qui est Jésus-Christ ?",
      "Qu'est-ce que la foi chrétienne ?",
      "Introduction à la prière",
      "Symboles de la messe et premiers gestes",
      "Le signe de croix, le Notre Père, Je vous salue Marie",
      "Premiers textes bibliques (Genèse, Évangile de Luc)"
    ],
    requiredPoints: 0,
    requiredQuizzes: 0,
    requiredBadges: 0,
    unlockedBadges: [],
    quizzes: [],
    challenges: []
  },
  {
    id: 2,
    name: "Fondamentaux de la foi catholique",
    color: "#2196F3", // 🔵 Bleu
    description: "Apprentissage des bases de la doctrine catholique",
    targetAudience: [
      "Baptisés peu pratiquants",
      "Adolescents / adultes recommençant une vie chrétienne"
    ],
    contentTypes: [
      "Les 7 sacrements",
      "Les 10 commandements", 
      "Le Credo expliqué",
      "Les grandes fêtes chrétiennes",
      "Les Béatitudes",
      "Introduction au Catéchisme de l'Église Catholique"
    ],
    requiredPoints: 100,
    requiredQuizzes: 5,
    requiredBadges: 2,
    unlockedBadges: [],
    quizzes: [],
    challenges: []
  },
  {
    id: 3,
    name: "Vie chrétienne engagée",
    color: "#FFC107", // 🟡 Jaune
    description: "Approfondissement de la vie spirituelle et de la pratique",
    targetAudience: [
      "Pratiquants réguliers",
      "Personnes investies dans une paroisse"
    ],
    contentTypes: [
      "Lectio divina (lecture priante de la Bible)",
      "Rôle de l'Esprit Saint dans la vie quotidienne",
      "Comment se confesser ?",
      "Le Rosaire approfondi",
      "Vertus cardinales et théologales",
      "Discernement chrétien"
    ],
    requiredPoints: 300,
    requiredQuizzes: 15,
    requiredBadges: 5,
    unlockedBadges: [],
    quizzes: [],
    challenges: []
  },
  {
    id: 4,
    name: "Formation théologique et doctrinale",
    color: "#F44336", // 🔴 Rouge
    description: "Formation avancée en théologie et doctrine catholique",
    targetAudience: [
      "Chrétiens engagés souhaitant approfondir",
      "Animateurs, catéchistes, accompagnateurs"
    ],
    contentTypes: [
      "Histoire de l'Église",
      "Introduction à la théologie (Trinité, Christologie, ecclésiologie…)",
      "Saints Pères et Docteurs de l'Église",
      "Conciles et magistère",
      "Lecture guidée de documents comme Dei Verbum, Lumen Gentium, Evangelii Gaudium",
      "Éthique catholique, morale sociale"
    ],
    requiredPoints: 600,
    requiredQuizzes: 30,
    requiredBadges: 10,
    unlockedBadges: [],
    quizzes: [],
    challenges: []
  },
  {
    id: 5,
    name: "Vie consacrée / Discernement vocationnel",
    color: "#9E9E9E", // ⚪ Gris
    description: "Formation pour le discernement vocationnel et la vie consacrée",
    targetAudience: [
      "Personnes en cheminement vocationnel (prêtrise, vie religieuse, mariage chrétien)"
    ],
    contentTypes: [
      "Les différentes vocations dans l'Église",
      "Théologie du corps (Jean-Paul II)",
      "Vœux religieux et vie communautaire",
      "Liturgie des Heures",
      "Spiritualités catholiques (franciscaine, bénédictine, ignatienne…)"
    ],
    requiredPoints: 1000,
    requiredQuizzes: 50,
    requiredBadges: 15,
    unlockedBadges: [],
    quizzes: [],
    challenges: []
  }
];

export const levelContents: LevelContent[] = [
  {
    level: 1,
    title: "Découverte / Premiers pas dans la foi",
    description: "Commencez votre voyage spirituel avec les bases de la foi chrétienne",
    color: "#4CAF50",
    icon: "🌱",
    targetAudience: [
      "Non-croyants curieux",
      "Nouveaux convertis",
      "Catéchumènes"
    ],
    contentTypes: [
      "Qui est Jésus-Christ ?",
      "Qu'est-ce que la foi chrétienne ?",
      "Introduction à la prière",
      "Symboles de la messe et premiers gestes",
      "Le signe de croix, le Notre Père, Je vous salue Marie",
      "Premiers textes bibliques (Genèse, Évangile de Luc)"
    ],
    sampleQuizzes: [
      "Jésus-Christ : Fils de Dieu",
      "Les bases de la prière",
      "Premiers pas dans la Bible"
    ],
    sampleChallenges: [
      "Prier 5 minutes par jour",
      "Lire un passage biblique quotidien",
      "Apprendre le signe de croix"
    ],
    prerequisites: []
  },
  {
    level: 2,
    title: "Fondamentaux de la foi catholique",
    description: "Découvrez les fondements de la doctrine catholique",
    color: "#2196F3",
    icon: "📚",
    targetAudience: [
      "Baptisés peu pratiquants",
      "Adolescents / adultes recommençant une vie chrétienne"
    ],
    contentTypes: [
      "Les 7 sacrements",
      "Les 10 commandements",
      "Le Credo expliqué",
      "Les grandes fêtes chrétiennes",
      "Les Béatitudes",
      "Introduction au Catéchisme de l'Église Catholique"
    ],
    sampleQuizzes: [
      "Les sacrements de l'Église",
      "Les commandements de Dieu",
      "Le Credo de Nicée-Constantinople"
    ],
    sampleChallenges: [
      "Étudier un sacrement par semaine",
      "Mémoriser les 10 commandements",
      "Participer aux fêtes liturgiques"
    ],
    prerequisites: ["Niveau 1 terminé"]
  },
  {
    level: 3,
    title: "Vie chrétienne engagée",
    description: "Approfondissez votre vie spirituelle et votre pratique",
    color: "#FFC107",
    icon: "🙏",
    targetAudience: [
      "Pratiquants réguliers",
      "Personnes investies dans une paroisse"
    ],
    contentTypes: [
      "Lectio divina (lecture priante de la Bible)",
      "Rôle de l'Esprit Saint dans la vie quotidienne",
      "Comment se confesser ?",
      "Le Rosaire approfondi",
      "Vertus cardinales et théologales",
      "Discernement chrétien"
    ],
    sampleQuizzes: [
      "La Lectio Divina",
      "Le sacrement de réconciliation",
      "Le chapelet et le rosaire"
    ],
    sampleChallenges: [
      "Pratiquer la Lectio Divina quotidiennement",
      "Se confesser régulièrement",
      "Réciter le chapelet chaque jour"
    ],
    prerequisites: ["Niveau 2 terminé"]
  },
  {
    level: 4,
    title: "Formation théologique et doctrinale",
    description: "Formation avancée en théologie et doctrine catholique",
    color: "#F44336",
    icon: "🎓",
    targetAudience: [
      "Chrétiens engagés souhaitant approfondir",
      "Animateurs, catéchistes, accompagnateurs"
    ],
    contentTypes: [
      "Histoire de l'Église",
      "Introduction à la théologie (Trinité, Christologie, ecclésiologie…)",
      "Saints Pères et Docteurs de l'Église",
      "Conciles et magistère",
      "Lecture guidée de documents comme Dei Verbum, Lumen Gentium, Evangelii Gaudium",
      "Éthique catholique, morale sociale"
    ],
    sampleQuizzes: [
      "Histoire de l'Église primitive",
      "La Trinité divine",
      "Les conciles œcuméniques"
    ],
    sampleChallenges: [
      "Étudier un document conciliaire",
      "Lire les Pères de l'Église",
      "Approfondir un aspect de la théologie"
    ],
    prerequisites: ["Niveau 3 terminé"]
  },
  {
    level: 5,
    title: "Vie consacrée / Discernement vocationnel",
    description: "Formation pour le discernement vocationnel et la vie consacrée",
    color: "#9E9E9E",
    icon: "⛪",
    targetAudience: [
      "Personnes en cheminement vocationnel (prêtrise, vie religieuse, mariage chrétien)"
    ],
    contentTypes: [
      "Les différentes vocations dans l'Église",
      "Théologie du corps (Jean-Paul II)",
      "Vœux religieux et vie communautaire",
      "Liturgie des Heures",
      "Spiritualités catholiques (franciscaine, bénédictine, ignatienne…)"
    ],
    sampleQuizzes: [
      "Les vocations dans l'Église",
      "La théologie du corps",
      "Les vœux religieux"
    ],
    sampleChallenges: [
      "Pratiquer la Liturgie des Heures",
      "Découvrir une spiritualité particulière",
      "Accompagnement vocationnel"
    ],
    prerequisites: ["Niveau 4 terminé"]
  },
  {
    level: 6,
    title: "Parcours Saint Thomas d'Aquin",
    description: "Découverte approfondie de la pensée du Docteur Angélique",
    color: "#FF9800",
    icon: "📚",
    targetAudience: [
      "Étudiants en théologie",
      "Amateurs de philosophie et théologie",
      "Personnes souhaitant approfondir la doctrine catholique"
    ],
    contentTypes: [
      "Introduction à Saint Thomas d'Aquin",
      "Les 5 voies de l'existence de Dieu",
      "La Trinité et l'Incarnation",
      "Les vertus cardinales et théologales",
      "La loi naturelle et la morale",
      "Les sacrements et la grâce",
      "La fin dernière de l'homme",
      "La méthode scolastique"
    ],
    sampleQuizzes: [
      "Introduction à Saint Thomas d'Aquin",
      "Dieu et son existence",
      "La Trinité selon Sait Thomas",
      "Les vertus selon Saint Thomas",
      "La loi et la morale"
    ],
    sampleChallenges: [
      "Lire un passage de la Somme théologique",
      "Méditer sur les 5 voies de Saint Thomas",
      "Pratiquer une vertu cardinale",
      "Étudier la méthode scolastique"
    ],
    prerequisites: ["Niveau 3 terminé"]
  }
];

export function getLevelById(id: number): Level | undefined {
  return formationLevels.find(level => level.id === id);
}

export function getLevelContentById(id: number): LevelContent | undefined {
  return levelContents.find(level => level.level === id);
}

export function getNextLevel(currentLevel: number): Level | undefined {
  return formationLevels.find(level => level.id === currentLevel + 1);
}

export function canAccessLevel(userLevel: number, targetLevel: number): boolean {
  return userLevel >= targetLevel;
}

export function getLevelProgress(userPoints: number, userQuizzes: number, userBadges: number, targetLevel: Level): {
  pointsProgress: number;
  quizzesProgress: number;
  badgesProgress: number;
  overallProgress: number;
} {
  const pointsProgress = Math.min((userPoints / targetLevel.requiredPoints) * 100, 100);
  const quizzesProgress = Math.min((userQuizzes / targetLevel.requiredQuizzes) * 100, 100);
  const badgesProgress = Math.min((userBadges / targetLevel.requiredBadges) * 100, 100);
  
  const overallProgress = (pointsProgress + quizzesProgress + badgesProgress) / 3;
  
  return {
    pointsProgress,
    quizzesProgress,
    badgesProgress,
    overallProgress
  };
} 