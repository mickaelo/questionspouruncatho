import { Course, Quiz } from '../types/quiz';

// Type temporaire pour les cours avec des IDs de quiz
interface CourseWithQuizIds extends Omit<Course, 'quizzes'> {
  quizzes: string[]; // IDs des quiz au lieu d'objets Quiz complets
}

export const formationCourses: CourseWithQuizIds[] = [
  {
    id: "1",
    title: "Découverte / Premiers pas dans la foi",
    level: 1,
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
    quizzes: [
      "quiz-23", // Qui est Jésus-Christ ?
      "quiz-24", // Les premiers gestes chrétiens
      "quiz-25", // La Bible et les Écritures
      "quiz-26", // L'Église et la messe
      "quiz-27", // Le baptême et les sacrements
      "quiz-1",  // Les Fondamentaux de la Foi
      "quiz-3",  // La Bible et les Écritures
      "quiz-5",  // Les Saints et la Communion des Saints
      "quiz-11", // Les Prières Catholiques
      "quiz-13"  // Introduction à Saint Thomas d'Aquin
    ],
    challenges: []
  },
  {
    id: "2",
    title: "Fondamentaux de la foi catholique",
    level: 2,
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
    quizzes: [
      "quiz-2",  // Les Sacrements
      "quiz-4",  // La Liturgie et les Fêtes
      "quiz-12", // Les Prières en Latin
      "quiz-14", // Dieu et son existence
      "quiz-16", // L'Incarnation du Verbe
      "quiz-17", // Les vertus selon Saint Thomas
      "quiz-19", // Les sacrements (Saint Thomas)
      "quiz-21"  // La fin dernière de l'homme
    ],
    challenges: []
  },
  {
    id: "3",
    title: "Vie chrétienne engagée",
    level: 3,
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
    quizzes: [
      "quiz-11", // Les Prières Catholiques
      "quiz-12", // Les Prières en Latin
      "quiz-4",  // La Liturgie et les Fêtes
      "quiz-15", // La Trinité selon Saint Thomas
      "quiz-18", // La loi et la morale
      "quiz-20", // La grâce divine
      "quiz-22"  // La méthode thomiste
    ],
    challenges: []
  },
  {
    id: "4",
    title: "Formation théologique et doctrinale",
    level: 4,
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
    quizzes: [
      "quiz-13", // Introduction à Saint Thomas d'Aquin
      "quiz-14", // Dieu et son existence
      "quiz-15", // La Trinité selon Saint Thomas
      "quiz-16", // L'Incarnation du Verbe
      "quiz-17", // Les vertus selon Saint Thomas
      "quiz-18", // La loi et la morale
      "quiz-19", // Les sacrements (Saint Thomas)
      "quiz-20", // La grâce divine
      "quiz-21", // La fin dernière de l'homme
      "quiz-22"  // La méthode thomiste
    ],
    challenges: []
  },
  {
    id: "5",
    title: "Vie consacrée / Discernement vocationnel",
    level: 5,
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
    quizzes: [
      // Pour ce niveau, on inclut tous les quiz de niveau 3 et quelques-uns de niveau 2
      // comme formation complète pour le discernement
      "quiz-15", // La Trinité selon Saint Thomas
      "quiz-18", // La loi et la morale
      "quiz-20", // La grâce divine
      "quiz-22", // La méthode thomiste
      "quiz-12", // Les Prières en Latin
      "quiz-14", // Dieu et son existence
      "quiz-16", // L'Incarnation du Verbe
      "quiz-17", // Les vertus selon Saint Thomas
      "quiz-19", // Les sacrements (Saint Thomas)
      "quiz-21"  // La fin dernière de l'homme
    ],
    challenges: []
  },
  {
    id: "6",
    title: "La Vierge Marie dans la foi catholique",
    level: 2,
    color: "#E91E63", // 🌸 Rose
    description: "Découverte et approfondissement de la dévotion mariale",
    targetAudience: [
      "Tous les fidèles catholiques",
      "Personnes souhaitant approfondir leur dévotion mariale",
      "Catéchumènes et nouveaux convertis"
    ],
    contentTypes: [
      "La vie de Marie selon les Évangiles",
      "Les dogmes mariaux (Immaculée Conception, Assomption)",
      "Les apparitions mariales reconnues",
      "Le Rosaire et les prières mariales",
      "Marie dans la liturgie et les fêtes",
      "La dévotion mariale dans l'histoire de l'Église"
    ],
    requiredPoints: 150,
    requiredQuizzes: 8,
    requiredBadges: 3,
    unlockedBadges: [],
    quizzes: [
      "quiz-marie-vie", // La vie de Marie
      "quiz-marie-dogmes", // Les dogmes mariaux
      "quiz-marie-apparitions", // Les apparitions mariales
      "quiz-marie-prieres", // Les prières mariales
      "quiz-marie-liturgie", // Marie dans la liturgie
      "quiz-marie-devotion" // La dévotion mariale
    ],
    challenges: []
  }
];



export function getCourseById(id: string): CourseWithQuizIds | undefined {
  return formationCourses.find(course => course.id === id);
}

export function canAccessCourse(userLevel: number, targetCourse: number): boolean {
  return userLevel >= targetCourse;
}

export function getCourseProgress(userPoints: number, userQuizzes: number, userBadges: number, targetCourse: Course): {
  pointsProgress: number;
  quizzesProgress: number;
  badgesProgress: number;
  overallProgress: number;
} {
  const pointsProgress = Math.min((userPoints / targetCourse.requiredPoints) * 100, 100);
  const quizzesProgress = Math.min((userQuizzes / targetCourse.requiredQuizzes) * 100, 100);
  const badgesProgress = Math.min((userBadges / targetCourse.requiredBadges) * 100, 100);
  
  const overallProgress = (pointsProgress + quizzesProgress + badgesProgress) / 3;
  
  return {
    pointsProgress,
    quizzesProgress,
    badgesProgress,
    overallProgress
  };
}

// Fonction pour obtenir les quiz d'un cours spécifique
export function getCourseQuizzes(courseId: string): Quiz[] {
  const { sampleQuizzes } = require('./questions');
  
  // Trouver le cours
  const course = formationCourses.find(c => c.id === courseId);
  if (!course) {
    return [];
  }
  
  // Retourner les quiz basés sur les IDs stockés dans le cours
  return sampleQuizzes.filter((quiz: Quiz) => 
    course.quizzes.includes(quiz.id)
  );
} 