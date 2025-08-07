import { Question, Quiz } from '../types/quiz';

// ========================================
// QUESTIONS PAR CATÉGORIE ET NIVEAU
// ========================================

// NIVEAU 1 - DÉCOUVERTE (Questions 1-200)
export const sampleQuestions: Question[] = [
  // ===== DÉCOUVERTE - QUI EST JÉSUS-CHRIST ? (Questions 1-30) =====
  {
    id: '1',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est Jésus-Christ selon la foi chrétienne ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple prophète',
      'Un philosophe',
      'Le Fils de Dieu fait homme',
      'Un roi terrestre'
    ],
    correctAnswer: [2],
    multipleCorrectAnswers: true,
    explanation: 'Jésus-Christ est le Fils de Dieu fait homme, c\'est le mystère de l\'Incarnation.',
    points: 10,
    catechism: 'CCC 464'
  },
  {
    id: '2',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Jésus-Christ est né à Bethléem.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Jésus est né à Bethléem, comme l\'annonçait le prophète Michée.',
    points: 10,
    scripture: 'Luc 2:4-7'
  },
  {
    id: '3',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez cette citation de Jésus : "Je suis le chemin, la vérité et..."',
    questionType: 'quote-completion',
    options: ['la lumière', 'la vie', 'l\'amour', 'l\'espérance'],
    correctAnswer: 1,
    explanation: 'La citation complète est : "Je suis le chemin, la vérité et la vie" (Jean 14:6).',
    points: 10,
    scripture: 'Jean 14:6'
  },
  {
    id: '4',
    category: 'decouverte-jesus',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel est le nom donné à Jésus par l\'ange Gabriel ?',
    questionType: 'multiple-choice',
    options: ['Emmanuel', 'Jésus', 'Christ', 'Seigneur'],
    correctAnswer: [1],
    multipleCorrectAnswers: true,
    explanation: 'L\'ange Gabriel dit à Marie : "Tu lui donneras le nom de Jésus" (Luc 1:31).',
    points: 15,
    scripture: 'Luc 1:31'
  },
  {
    id: '5',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Jésus a vécu environ 33 ans sur terre.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Jésus a vécu environ 33 ans, de sa naissance à sa mort sur la croix.',
    points: 10
  },
  {
    id: '6',
    category: 'decouverte-jesus',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui..."',
    questionType: 'quote-completion',
    options: [
      'ait la vie éternelle',
      'soit sauvé',
      'ne périsse point',
      'ait la paix'
    ],
    correctAnswer: 2,
    explanation: 'La citation complète est : "afin que quiconque croit en lui ne périsse point" (Jean 3:16).',
    points: 15,
    scripture: 'Jean 3:16'
  },
  {
    id: '7',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le premier miracle de Jésus ?',
    questionType: 'multiple-choice',
    options: [
      'La multiplication des pains',
      'La guérison d\'un lépreux',
      'Le changement de l\'eau en vin',
      'La résurrection de Lazare'
    ],
    correctAnswer: 2,
    explanation: 'Le premier miracle de Jésus est le changement de l\'eau en vin aux noces de Cana.',
    points: 10,
    scripture: 'Jean 2:1-11'
  },
  {
    id: '8',
    category: 'decouverte-jesus',
    difficulty: 'moyen',
    level: 1,
    question: 'Jésus a choisi 12 apôtres pour l\'accompagner.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Jésus a choisi 12 apôtres pour être ses témoins et continuer sa mission.',
    points: 10,
    scripture: 'Marc 3:13-19'
  },
  {
    id: '9',
    category: 'decouverte-jesus',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Aimez-vous les uns les autres comme..."',
    questionType: 'quote-completion',
    options: [
      'je vous ai aimés',
      'Dieu vous aime',
      'vous vous aimez',
      'le Christ vous aime'
    ],
    correctAnswer: 0,
    explanation: 'La citation complète est : "Aimez-vous les uns les autres comme je vous ai aimés" (Jean 13:34).',
    points: 10,
    scripture: 'Jean 13:34'
  },
  {
    id: '10',
    category: 'decouverte-jesus',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel jour Jésus est-il mort sur la croix ?',
    questionType: 'multiple-choice',
    options: [
      'Jeudi saint',
      'Vendredi saint',
      'Samedi saint',
      'Dimanche de Pâques'
    ],
    correctAnswer: 1,
    explanation: 'Jésus est mort sur la croix le Vendredi saint, veille du sabbat.',
    points: 15,
    scripture: 'Jean 19:31'
  },

  // ===== DÉCOUVERTE - PREMIERS GESTES CHRÉTIENS (Questions 11-30) =====
  {
    id: '11',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'Quels sont les gestes de prière chrétienne ?',
    questionType: 'multiple-choice',
    options: [
      'Le signe de croix',
      'Joindre les mains',
      'S\'agenouiller',
      'Fermer les yeux'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Tous ces gestes sont des gestes de prière chrétienne : le signe de croix, joindre les mains, s\'agenouiller et fermer les yeux.',
    points: 15
  },
  {
    id: '12',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'Le signe de croix est une prière.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le signe de croix est une prière qui nous rappelle la Trinité et la croix du Christ.',
    points: 10
  },
  {
    id: '13',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Au nom du Père, et du Fils, et du..."',
    questionType: 'quote-completion',
    options: ['Saint-Esprit', 'Saint Esprit', 'Esprit Saint', 'Esprit'],
    correctAnswer: 0,
    explanation: 'La formule complète est : "Au nom du Père, et du Fils, et du Saint-Esprit. Amen."',
    points: 10
  },
  {
    id: '14',
    category: 'decouverte-gestes',
    difficulty: 'moyen',
    level: 1,
    question: 'Quelle est la prière enseignée par Jésus ?',
    questionType: 'multiple-choice',
    options: [
      'Le Je vous salue Marie',
      'Le Notre Père',
      'Le Gloria',
      'Le Credo'
    ],
    correctAnswer: 1,
    explanation: 'Jésus a enseigné le Notre Père à ses disciples quand ils lui ont demandé comment prier.',
    points: 15,
    scripture: 'Luc 11:1-4'
  },
  {
    id: '15',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'On peut prier à genoux.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. On peut prier à genoux, debout, assis, ou dans n\'importe quelle position respectueuse.',
    points: 10
  },
  {
    id: '16',
    category: 'decouverte-gestes',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Notre Père qui es aux cieux, que ton nom soit..."',
    questionType: 'quote-completion',
    options: [
      'béni',
      'saintifié',
      'glorifié',
      'adoré'
    ],
    correctAnswer: 1,
    explanation: 'La prière commence par : "Notre Père qui es aux cieux, que ton nom soit sanctifié."',
    points: 15
  },
  {
    id: '17',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'Quels sont les gestes de respect dans l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'S\'incliner',
      'S\'agenouiller brièvement',
      'Faire le signe de croix',
      'Joindre les mains'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Tous ces gestes sont des gestes de respect dans l\'Église : s\'incliner, s\'agenouiller brièvement (génuflexion), faire le signe de croix et joindre les mains.',
    points: 15
  },
  {
    id: '18',
    category: 'decouverte-gestes',
    difficulty: 'moyen',
    level: 1,
    question: 'On fait une génuflexion devant le tabernacle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. On fait une génuflexion devant le tabernacle qui contient le Saint-Sacrement.',
    points: 10
  },
  {
    id: '19',
    category: 'decouverte-gestes',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Je vous salue Marie, pleine de..."',
    questionType: 'quote-completion',
    options: [
      'grâce',
      'bonté',
      'amour',
      'miséricorde'
    ],
    correctAnswer: 0,
    explanation: 'La prière commence par : "Je vous salue Marie, pleine de grâce, le Seigneur est avec vous."',
    points: 10
  },
  {
    id: '20',
    category: 'decouverte-gestes',
    difficulty: 'moyen',
    level: 1,
    question: 'Quelle est la prière la plus importante de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'Le Je vous salue Marie',
      'Le Notre Père',
      'Le Gloria',
      'Le Credo'
    ],
    correctAnswer: 1,
    explanation: 'Le Notre Père est la prière la plus importante car elle a été enseignée par Jésus lui-même.',
    points: 15
  },

  // ===== DÉCOUVERTE - LA BIBLE ET LES ÉCRITURES (Questions 21-30) =====
  {
    id: '21',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que la Bible ?',
    questionType: 'multiple-choice',
    options: [
      'Un livre d\'histoire',
      'La Parole de Dieu',
      'Un recueil de contes',
      'Un livre de philosophie'
    ],
    correctAnswer: 1,
    explanation: 'La Bible est la Parole de Dieu, inspirée par l\'Esprit Saint.',
    points: 10,
    catechism: 'CCC 105'
  },
  {
    id: '22',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'La Bible est divisée en deux parties principales.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Bible est divisée en Ancien Testament et Nouveau Testament.',
    points: 10
  },
  {
    id: '23',
    category: 'decouverte-bible',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Au commencement, Dieu créa..."',
    questionType: 'quote-completion',
    options: [
      'la terre',
      'le ciel et la terre',
      'l\'homme',
      'la lumière'
    ],
    correctAnswer: 1,
    explanation: 'La Bible commence par : "Au commencement, Dieu créa le ciel et la terre" (Genèse 1:1).',
    points: 15,
    scripture: 'Genèse 1:1'
  },
  {
    id: '24',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'Combien y a-t-il d\'évangiles ?',
    questionType: 'multiple-choice',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'Il y a 4 évangiles : Matthieu, Marc, Luc et Jean.',
    points: 10
  },
  {
    id: '25',
    category: 'decouverte-bible',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel est le premier livre de la Bible ?',
    questionType: 'multiple-choice',
    options: [
      'Exode',
      'Genèse',
      'Psaumes',
      'Évangile de Matthieu'
    ],
    correctAnswer: 1,
    explanation: 'Le premier livre de la Bible est la Genèse.',
    points: 15
  },
  {
    id: '26',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'Les Psaumes sont des prières.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Psaumes sont des prières et des chants sacrés.',
    points: 10
  },
  {
    id: '27',
    category: 'decouverte-bible',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Le Seigneur est mon berger, je ne manque de..."',
    questionType: 'quote-completion',
    options: [
      'rien',
      'personne',
      'rien',
      'tout'
    ],
    correctAnswer: 0,
    explanation: 'Le Psaume 23 commence par : "Le Seigneur est mon berger, je ne manque de rien."',
    points: 15,
    scripture: 'Psaume 23:1'
  },
  {
    id: '28',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'Qui a écrit la plupart des lettres du Nouveau Testament ?',
    questionType: 'multiple-choice',
    options: [
      'Saint Pierre',
      'Saint Paul',
      'Saint Jean',
      'Saint Matthieu'
    ],
    correctAnswer: 1,
    explanation: 'Saint Paul a écrit la plupart des lettres (épîtres) du Nouveau Testament.',
    points: 10
  },
  {
    id: '29',
    category: 'decouverte-bible',
    difficulty: 'moyen',
    level: 1,
    question: 'L\'Apocalypse est le dernier livre de la Bible.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Apocalypse de Saint Jean est le dernier livre de la Bible.',
    points: 10
  },
  {
    id: '30',
    category: 'decouverte-bible',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce qu\'un évangile ?',
    questionType: 'multiple-choice',
    options: [
      'Une histoire',
      'Une bonne nouvelle',
      'Une prière',
      'Un commandement'
    ],
    correctAnswer: 1,
    explanation: 'Évangile signifie "bonne nouvelle" en grec.',
    points: 10
  },

  // ===== DÉCOUVERTE - L'ÉGLISE ET LA MESSE (Questions 31-40) =====
  {
    id: '31',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce qu\'une église ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple bâtiment',
      'La maison de Dieu et le lieu de rassemblement des chrétiens',
      'Un musée religieux',
      'Un centre culturel'
    ],
    correctAnswer: 1,
    explanation: 'L\'église est la maison de Dieu et le lieu où les chrétiens se rassemblent pour prier et célébrer.',
    points: 10
  },
  {
    id: '32',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que la messe ?',
    questionType: 'multiple-choice',
    options: [
      'Une simple réunion',
      'La célébration du sacrifice du Christ',
      'Un concert religieux',
      'Une conférence'
    ],
    correctAnswer: 1,
    explanation: 'La messe est la célébration du sacrifice du Christ, renouvelé pour nous.',
    points: 10,
    catechism: 'CCC 1322'
  },
  {
    id: '33',
    category: 'decouverte-eglise',
    difficulty: 'moyen',
    level: 1,
    question: 'La messe se déroule en plusieurs parties.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La messe se déroule en plusieurs parties : liturgie de la Parole, liturgie eucharistique, etc.',
    points: 10
  },
  {
    id: '34',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que l\'autel ?',
    questionType: 'multiple-choice',
    options: [
      'Un meuble décoratif',
      'La table du sacrifice du Christ',
      'Un banc',
      'Une statue'
    ],
    correctAnswer: 1,
    explanation: 'L\'autel est la table du sacrifice du Christ, où se déroule la célébration eucharistique.',
    points: 10
  },
  {
    id: '35',
    category: 'decouverte-eglise',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Le Seigneur soit avec..."',
    questionType: 'quote-completion',
    options: [
      'nous',
      'vous',
      'tous',
      'chacun'
    ],
    correctAnswer: 1,
    explanation: 'Le prêtre dit : "Le Seigneur soit avec vous" et l\'assemblée répond : "Et avec votre esprit."',
    points: 15
  },
  {
    id: '36',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que le tabernacle ?',
    questionType: 'multiple-choice',
    options: [
      'Un meuble de rangement',
      'Le lieu où est conservé le Saint-Sacrement',
      'Un autel',
      'Une statue'
    ],
    correctAnswer: 1,
    explanation: 'Le tabernacle est le lieu où est conservé le Saint-Sacrement (le Corps du Christ).',
    points: 10
  },
  {
    id: '37',
    category: 'decouverte-eglise',
    difficulty: 'moyen',
    level: 1,
    question: 'On peut communier à chaque messe.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. On peut communier à chaque messe si on est en état de grâce.',
    points: 10
  },
  {
    id: '38',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que l\'encens ?',
    questionType: 'multiple-choice',
    options: [
      'Un parfum',
      'Une résine aromatique brûlée en signe de prière',
      'Une fleur',
      'Un aliment'
    ],
    correctAnswer: 1,
    explanation: 'L\'encens est une résine aromatique brûlée en signe de prière qui monte vers Dieu.',
    points: 10
  },
  {
    id: '39',
    category: 'decouverte-eglise',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Gloire à Dieu au plus haut des..."',
    questionType: 'quote-completion',
    options: [
      'cieux',
      'cieux, et paix sur la terre aux hommes qu\'il aime',
      'cieux, et paix sur la terre',
      'cieux, paix aux hommes'
    ],
    correctAnswer: 1,
    explanation: 'Le Gloria dit : "Gloire à Dieu au plus haut des cieux, et paix sur la terre aux hommes qu\'il aime."',
    points: 15
  },
  {
    id: '40',
    category: 'decouverte-eglise',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que le ciboire ?',
    questionType: 'multiple-choice',
    options: [
      'Un vase pour l\'eau',
      'Un vase pour conserver les hosties consacrées',
      'Un vase pour le vin',
      'Un vase décoratif'
    ],
    correctAnswer: 1,
    explanation: 'Le ciboire est un vase sacré pour conserver les hosties consacrées.',
    points: 10
  },

  // ===== DÉCOUVERTE - LE BAPTÊME ET LES SACREMENTS (Questions 41-50) =====
  {
    id: '41',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que le baptême ?',
    questionType: 'multiple-choice',
    options: [
      'Une simple cérémonie',
      'Le sacrement qui nous fait enfants de Dieu',
      'Une tradition culturelle',
      'Un rite de passage'
    ],
    correctAnswer: 1,
    explanation: 'Le baptême est le sacrement qui nous fait enfants de Dieu et nous incorpore à l\'Église.',
    points: 10,
    catechism: 'CCC 1213'
  },
  {
    id: '42',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'Le baptême efface le péché originel.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le baptême efface le péché originel et tous les péchés personnels.',
    points: 10
  },
  {
    id: '43',
    category: 'decouverte-sacrements',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Je te baptise au nom du Père, et du Fils, et du..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint Esprit',
      'Esprit Saint',
      'Esprit'
    ],
    correctAnswer: 0,
    explanation: 'La formule baptismale est : "Je te baptise au nom du Père, et du Fils, et du Saint-Esprit."',
    points: 15
  },
  {
    id: '44',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'Quels sont les sacrements de guérison ?',
    questionType: 'multiple-choice',
    options: [
      'Le Baptême',
      'La Réconciliation',
      'L\'Onction des malades',
      'La Confirmation'
    ],
    correctAnswer: [1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les sacrements de guérison sont la Réconciliation (confession) et l\'Onction des malades.',
    points: 15
  },
  {
    id: '45',
    category: 'decouverte-sacrements',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel est le sacrement le plus important ?',
    questionType: 'multiple-choice',
    options: [
      'Le baptême',
      'L\'Eucharistie',
      'La confirmation',
      'La réconciliation'
    ],
    correctAnswer: 1,
    explanation: 'L\'Eucharistie est le sacrement le plus important car elle contient le Christ lui-même.',
    points: 15,
    catechism: 'CCC 1324'
  },
  {
    id: '46',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'On peut être baptisé plusieurs fois.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. Le baptême ne peut être reçu qu\'une seule fois, il imprime un caractère indélébile.',
    points: 10
  },
  {
    id: '47',
    category: 'decouverte-sacrements',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Ceci est mon corps, livré pour..."',
    questionType: 'quote-completion',
    options: [
      'vous',
      'vous tous',
      'vous, faites ceci en mémoire de moi',
      'vous, prenez et mangez'
    ],
    correctAnswer: 2,
    explanation: 'Jésus dit : "Ceci est mon corps, livré pour vous, faites ceci en mémoire de moi."',
    points: 15,
    scripture: 'Luc 22:19'
  },
  {
    id: '48',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'Quels sont les sacrements de l\'initiation chrétienne ?',
    questionType: 'multiple-choice',
    options: [
      'Le Baptême',
      'La Confirmation',
      'L\'Eucharistie',
      'La Réconciliation'
    ],
    correctAnswer: [0, 1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les sacrements de l\'initiation chrétienne sont le Baptême, la Confirmation et l\'Eucharistie.',
    points: 15
  },
  {
    id: '49',
    category: 'decouverte-sacrements',
    difficulty: 'moyen',
    level: 1,
    question: 'On peut communier sans être baptisé.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. Pour communier, il faut être baptisé et en état de grâce.',
    points: 10
  },
  {
    id: '50',
    category: 'decouverte-sacrements',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que la communion ?',
    questionType: 'multiple-choice',
    options: [
      'Une simple cérémonie',
      'Recevoir le Corps du Christ',
      'Une prière',
      'Un chant'
    ],
    correctAnswer: 1,
    explanation: 'La communion est le fait de recevoir le Corps du Christ dans l\'Eucharistie.',
    points: 10
  },

  // ===== NIVEAU 2 - FONDAMENTAUX DE LA FOI (Questions 51-200) =====

  // ===== FONDAMENTAUX - LES DOGMES DE LA FOI (Questions 51-80) =====
  {
    id: '51',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce qu\'un dogme ?',
    questionType: 'multiple-choice',
    options: [
      'Une simple opinion',
      'Une vérité de foi définie par l\'Église',
      'Une tradition',
      'Une coutume'
    ],
    correctAnswer: 1,
    explanation: 'Un dogme est une vérité de foi définie solennellement par l\'Église comme révélée par Dieu.',
    points: 15,
    catechism: 'CCC 88'
  },
  {
    id: '52',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'La Trinité est un dogme central de la foi catholique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Trinité est le dogme central : un seul Dieu en trois personnes.',
    points: 10,
    catechism: 'CCC 253'
  },
  {
    id: '53',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois en un seul Dieu, Père tout-puissant, créateur du..."',
    questionType: 'quote-completion',
    options: [
      'monde',
      'ciel et de la terre',
      'univers',
      'tout'
    ],
    correctAnswer: 1,
    explanation: 'Le Credo dit : "Je crois en un seul Dieu, Père tout-puissant, créateur du ciel et de la terre."',
    points: 15
  },
  {
    id: '54',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Quelles sont les vertus théologales ?',
    questionType: 'multiple-choice',
    options: [
      'La Foi',
      'L\'Espérance',
      'La Charité',
      'La Prudence'
    ],
    correctAnswer: [0, 1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les vertus théologales sont la Foi, l\'Espérance et la Charité. Elles nous sont données par Dieu.',
    points: 20
  },
  {
    id: '55',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'L\'Immaculée Conception concerne la naissance de Jésus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. L\'Immaculée Conception concerne Marie, préservée du péché originel dès sa conception.',
    points: 15
  },
  {
    id: '56',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'Assomption de Marie ?',
    questionType: 'multiple-choice',
    options: [
      'La mort de Marie',
      'L\'élévation de Marie au ciel en corps et en âme',
      'La naissance de Jésus',
      'La résurrection du Christ'
    ],
    correctAnswer: 1,
    explanation: 'L\'Assomption est l\'élévation de Marie au ciel en corps et en âme à la fin de sa vie terrestre.',
    points: 15
  },
  {
    id: '57',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois en Jésus-Christ, son Fils unique, notre..."',
    questionType: 'quote-completion',
    options: [
      'frère',
      'ami',
      'Seigneur',
      'maître'
    ],
    correctAnswer: 2,
    explanation: 'Le Credo dit : "Je crois en Jésus-Christ, son Fils unique, notre Seigneur."',
    points: 15
  },
  {
    id: '58',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la transsubstantiation ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation du pain en corps du Christ',
      'La résurrection du Christ',
      'La naissance de Jésus',
      'La mort de Jésus sur la croix'
    ],
    correctAnswer: 0,
    explanation: 'La transsubstantiation est la transformation du pain et du vin en Corps et Sang du Christ.',
    points: 15
  },
  {
    id: '59',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'L\'infaillibilité pontificale s\'applique à tous les actes du pape.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. L\'infaillibilité ne s\'applique qu\'aux définitions solennelles en matière de foi et de morale.',
    points: 15
  },
  {
    id: '60',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'Incarnation ?',
    questionType: 'multiple-choice',
    options: [
      'La résurrection du Christ',
      'Le Fils de Dieu fait homme',
      'La naissance de Jésus',
      'La mort sur la croix'
    ],
    correctAnswer: 1,
    explanation: 'L\'Incarnation est le Fils de Dieu fait homme en Jésus-Christ.',
    points: 15,
    catechism: 'CCC 464'
  },
  {
    id: '61',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Il a souffert sous Ponce Pilate, il a été crucifié, il est mort et a été..."',
    questionType: 'quote-completion',
    options: [
      'enterré',
      'mis au tombeau',
      'enseveli',
      'déposé'
    ],
    correctAnswer: 0,
    explanation: 'Le Credo dit : "Il a souffert sous Ponce Pilate, il a été crucifié, il est mort et a été enterré."',
    points: 15
  },
  {
    id: '62',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la Résurrection ?',
    questionType: 'multiple-choice',
    options: [
      'La naissance de Jésus',
      'Le retour à la vie de Jésus après sa mort',
      'La mort de Jésus',
      'L\'ascension de Jésus'
    ],
    correctAnswer: 1,
    explanation: 'La Résurrection est le retour à la vie de Jésus après sa mort sur la croix.',
    points: 15
  },
  {
    id: '63',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'L\'Ascension est la montée de Jésus au ciel.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Ascension est la montée de Jésus au ciel 40 jours après sa résurrection.',
    points: 15
  },
  {
    id: '64',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la Pentecôte ?',
    questionType: 'multiple-choice',
    options: [
      'La naissance de l\'Église',
      'La mort de Jésus',
      'La résurrection',
      'L\'ascension'
    ],
    correctAnswer: 0,
    explanation: 'La Pentecôte est la descente de l\'Esprit Saint et la naissance de l\'Église.',
    points: 15
  },
  {
    id: '65',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois au Saint-Esprit, à la sainte Église catholique, à la communion des..."',
    questionType: 'quote-completion',
    options: [
      'saints',
      'fidèles',
      'croyants',
      'chrétiens'
    ],
    correctAnswer: 0,
    explanation: 'Le Credo dit : "Je crois au Saint-Esprit, à la sainte Église catholique, à la communion des saints."',
    points: 15
  },
  {
    id: '66',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la communion des saints ?',
    questionType: 'multiple-choice',
    options: [
      'La communion eucharistique',
      'La solidarité entre tous les membres de l\'Église',
      'La prière en commun',
      'La messe dominicale'
    ],
    correctAnswer: 1,
    explanation: 'La communion des saints est la solidarité entre tous les membres de l\'Église : vivants, défunts, saints.',
    points: 15
  },
  {
    id: '67',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelles sont les marques de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'Une',
      'Sainte',
      'Catholique',
      'Apostolique'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Les quatre marques de l\'Église sont : une, sainte, catholique et apostolique.',
    points: 20
  },
  {
    id: '68',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la rémission des péchés ?',
    questionType: 'multiple-choice',
    options: [
      'L\'oubli des péchés',
      'Le pardon des péchés par Dieu',
      'La confession',
      'La pénitence'
    ],
    correctAnswer: 1,
    explanation: 'La rémission des péchés est le pardon accordé par Dieu par le sacrement de réconciliation.',
    points: 15
  },
  {
    id: '69',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois à la résurrection de la chair, à la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle. Amen',
      'future',
      'bienheureuse'
    ],
    correctAnswer: 1,
    explanation: 'Le Credo se termine par : "Je crois à la résurrection de la chair, à la vie éternelle. Amen."',
    points: 15
  },
  {
    id: '70',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la vie éternelle ?',
    questionType: 'multiple-choice',
    options: [
      'Une vie très longue',
      'La vie avec Dieu après la mort',
      'La vie terrestre',
      'La vie des saints'
    ],
    correctAnswer: 1,
    explanation: 'La vie éternelle est la vie avec Dieu dans le bonheur parfait après la mort.',
    points: 15
  },
  {
    id: '71',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Le purgatoire est un dogme de l\'Église catholique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le purgatoire est un dogme : état de purification pour les âmes qui meurent en état de grâce mais avec des péchés véniels.',
    points: 15
  },
  {
    id: '72',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'enfer ?',
    questionType: 'multiple-choice',
    options: [
      'Un lieu de souffrance temporaire',
      'L\'état de séparation définitive d\'avec Dieu',
      'Le purgatoire',
      'La mort'
    ],
    correctAnswer: 1,
    explanation: 'L\'enfer est l\'état de séparation définitive d\'avec Dieu pour ceux qui meurent en état de péché mortel.',
    points: 15
  },
  {
    id: '73',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois en Dieu, le Père tout-puissant, créateur du ciel et de la terre, et en Jésus-Christ, son Fils unique, notre Seigneur, qui a été conçu du..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint Esprit',
      'Esprit Saint',
      'Esprit'
    ],
    correctAnswer: 0,
    explanation: 'Le Credo dit : "qui a été conçu du Saint-Esprit, est né de la Vierge Marie."',
    points: 15
  },
  {
    id: '74',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la virginité de Marie ?',
    questionType: 'multiple-choice',
    options: [
      'Marie n\'a jamais eu d\'enfants',
      'Marie est restée vierge avant, pendant et après la naissance de Jésus',
      'Marie n\'a eu que Jésus',
      'Marie était célibataire'
    ],
    correctAnswer: 1,
    explanation: 'Marie est restée vierge avant, pendant et après la naissance de Jésus (virginité perpétuelle).',
    points: 15
  },
  {
    id: '75',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'L\'Église est le Corps mystique du Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église est le Corps mystique du Christ, dont il est la tête et nous sommes les membres.',
    points: 15
  },
  {
    id: '76',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la grâce sanctifiante ?',
    questionType: 'multiple-choice',
    options: [
      'Une prière',
      'La vie divine en nous',
      'Un sacrement',
      'Une vertu'
    ],
    correctAnswer: 1,
    explanation: 'La grâce sanctifiante est la vie divine en nous, qui nous fait participer à la nature divine.',
    points: 15
  },
  {
    id: '77',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je crois en l\'Esprit Saint, qui est Seigneur et qui donne la vie, qui procède du Père et du..."',
    questionType: 'quote-completion',
    options: [
      'Fils',
      'Christ',
      'Jésus',
      'Seigneur'
    ],
    correctAnswer: 0,
    explanation: 'Le Credo dit : "qui procède du Père et du Fils, qui avec le Père et le Fils reçoit même adoration."',
    points: 15
  },
  {
    id: '78',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la rédemption ?',
    questionType: 'multiple-choice',
    options: [
      'La création du monde',
      'Le rachat de l\'humanité par le sacrifice du Christ',
      'La résurrection',
      'L\'ascension'
    ],
    correctAnswer: 1,
    explanation: 'La rédemption est le rachat de l\'humanité par le sacrifice du Christ sur la croix.',
    points: 15
  },
  {
    id: '79',
    category: 'fondamentaux-dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Le péché originel a été transmis à tous les hommes.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le péché originel a été transmis à tous les hommes depuis Adam et Ève.',
    points: 15
  },
  {
    id: '80',
    category: 'fondamentaux-dogmes',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la justification ?',
    questionType: 'multiple-choice',
    options: [
      'Une excuse',
      'L\'action de Dieu qui nous rend justes',
      'Un jugement',
      'Une récompense'
    ],
    correctAnswer: 1,
    explanation: 'La justification est l\'action de Dieu qui nous rend justes par la grâce du Christ.',
    points: 15
  },

  // ===== FONDAMENTAUX - LES 7 SACREMENTS (Questions 81-120) =====
  {
    id: '81',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quels sont les sacrements au service de la communion ?',
    questionType: 'multiple-choice',
    options: [
      'Le Baptême',
      'L\'Ordre',
      'Le Mariage',
      'La Confirmation'
    ],
    correctAnswer: [1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les sacrements au service de la communion sont l\'Ordre (prêtrise) et le Mariage.',
    points: 15
  },
  {
    id: '82',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Les sacrements sont des signes visibles de la grâce invisible.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les sacrements sont des signes visibles institués par le Christ pour donner la grâce.',
    points: 10
  },
  {
    id: '83',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Les sacrements sont des signes efficaces de la grâce, institués par le Christ et confiés à..."',
    questionType: 'quote-completion',
    options: [
      'l\'Église',
      'l\'Église, par lesquels nous est dispensée la vie divine',
      'l\'Église, pour notre salut',
      'l\'Église, pour nous sanctifier'
    ],
    correctAnswer: 1,
    explanation: 'Les sacrements sont des signes efficaces de la grâce, institués par le Christ et confiés à l\'Église, par lesquels nous est dispensée la vie divine.',
    points: 15,
    catechism: 'CCC 1131'
  },
  {
    id: '84',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le premier sacrement ?',
    questionType: 'multiple-choice',
    options: [
      'L\'Eucharistie',
      'Le baptême',
      'La confirmation',
      'La réconciliation'
    ],
    correctAnswer: 1,
    explanation: 'Le baptême est le premier sacrement, porte d\'entrée dans la vie chrétienne.',
    points: 10
  },
  {
    id: '85',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Le baptême efface tous les péchés.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le baptême efface le péché originel et tous les péchés personnels.',
    points: 10
  },
  {
    id: '86',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la confirmation ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple rite de passage',
      'Le sacrement qui confirme et fortifie la grâce baptismale',
      'Une cérémonie de fin d\'études',
      'Un engagement personnel'
    ],
    correctAnswer: 1,
    explanation: 'La confirmation confirme et fortifie la grâce baptismale par l\'Esprit Saint.',
    points: 15
  },
  {
    id: '87',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "L\'Eucharistie est la source et le sommet de toute la vie..."',
    questionType: 'quote-completion',
    options: [
      'chrétienne',
      'chrétienne et ecclésiale',
      'de l\'Église',
      'spirituelle'
    ],
    correctAnswer: 1,
    explanation: 'L\'Eucharistie est la source et le sommet de toute la vie chrétienne et ecclésiale.',
    points: 15,
    catechism: 'CCC 1324'
  },
  {
    id: '88',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le sacrement le plus important ?',
    questionType: 'multiple-choice',
    options: [
      'Le baptême',
      'L\'Eucharistie',
      'La confirmation',
      'La réconciliation'
    ],
    correctAnswer: 1,
    explanation: 'L\'Eucharistie est le sacrement le plus important car elle contient le Christ lui-même.',
    points: 15
  },
  {
    id: '89',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'La pénitence et réconciliation est le même sacrement que la confession.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pénitence et réconciliation, aussi appelée confession, est le sacrement du pardon.',
    points: 10
  },
  {
    id: '90',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'onction des malades ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple geste de réconfort',
      'Le sacrement pour les malades et les mourants',
      'Une prière de guérison',
      'Un rite funéraire'
    ],
    correctAnswer: 1,
    explanation: 'L\'onction des malades est le sacrement pour les malades et les mourants.',
    points: 15
  },
  {
    id: '91',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "L\'ordre est le sacrement par lequel la mission confiée par le Christ à ses apôtres continue à être exercée dans l\'Église jusqu\'à la fin des..."',
    questionType: 'quote-completion',
    options: [
      'temps',
      'siècles',
      'âges',
      'jours'
    ],
    correctAnswer: 0,
    explanation: 'L\'ordre est le sacrement par lequel la mission confiée par le Christ à ses apôtres continue à être exercée dans l\'Église jusqu\'à la fin des temps.',
    points: 15,
    catechism: 'CCC 1536'
  },
  {
    id: '92',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que le mariage ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple contrat civil',
      'Le sacrement de l\'alliance entre un homme et une femme',
      'Une tradition culturelle',
      'Un engagement privé'
    ],
    correctAnswer: 1,
    explanation: 'Le mariage est le sacrement de l\'alliance entre un homme et une femme.',
    points: 15
  },
  {
    id: '93',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Les sacrements de l\'initiation chrétienne sont au nombre de trois.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les sacrements de l\'initiation chrétienne sont : baptême, confirmation, eucharistie.',
    points: 10
  },
  {
    id: '94',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la communion ?',
    questionType: 'multiple-choice',
    options: [
      'Une simple cérémonie',
      'Recevoir le Corps du Christ dans l\'Eucharistie',
      'Une prière',
      'Un chant'
    ],
    correctAnswer: 1,
    explanation: 'La communion est le fait de recevoir le Corps du Christ dans l\'Eucharistie.',
    points: 10
  },
  {
    id: '95',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Ceci est mon corps, livré pour vous, faites ceci en..."',
    questionType: 'quote-completion',
    options: [
      'mémoire de moi',
      'souvenir de moi',
      'honneur de moi',
      'célébration de moi'
    ],
    correctAnswer: 0,
    explanation: 'Jésus dit : "Ceci est mon corps, livré pour vous, faites ceci en mémoire de moi."',
    points: 15,
    scripture: 'Luc 22:19'
  },
  {
    id: '96',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la transsubstantiation ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation du pain en corps du Christ',
      'La résurrection du Christ',
      'La naissance de Jésus',
      'La mort de Jésus sur la croix'
    ],
    correctAnswer: 0,
    explanation: 'La transsubstantiation est la transformation du pain et du vin en Corps et Sang du Christ.',
    points: 15
  },
  {
    id: '97',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'On peut communier plusieurs fois par jour.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. On peut communier plusieurs fois par jour si on participe à plusieurs messes.',
    points: 10
  },
  {
    id: '98',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'absolution ?',
    questionType: 'multiple-choice',
    options: [
      'Une prière',
      'La formule de pardon prononcée par le prêtre',
      'Une pénitence',
      'Un geste'
    ],
    correctAnswer: 1,
    explanation: 'L\'absolution est la formule de pardon prononcée par le prêtre au nom du Christ.',
    points: 15
  },
  {
    id: '99',
    category: 'fondamentaux-sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Je vous absous de vos péchés au nom du Père, et du Fils, et du..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint Esprit',
      'Esprit Saint',
      'Esprit'
    ],
    correctAnswer: 0,
    explanation: 'La formule d\'absolution est : "Je vous absous de vos péchés au nom du Père, et du Fils, et du Saint-Esprit."',
    points: 15
  },
  {
    id: '100',
    category: 'fondamentaux-sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que le sacerdoce ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple métier',
      'Le ministère sacerdotal conféré par l\'ordination',
      'Une fonction administrative',
      'Un titre honorifique'
    ],
    correctAnswer: 1,
    explanation: 'Le sacerdoce est le ministère sacerdotal conféré par l\'ordination.',
    points: 15
  },

  // ===== FONDAMENTAUX - LA MORALE CHRÉTIENNE (Questions 101-140) =====
  {
    id: '101',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la morale chrétienne ?',
    questionType: 'multiple-choice',
    options: [
      'Un ensemble de règles arbitraires',
      'L\'art de vivre selon la volonté de Dieu',
      'Une philosophie',
      'Un code de conduite social'
    ],
    correctAnswer: 1,
    explanation: 'La morale chrétienne est l\'art de vivre selon la volonté de Dieu révélée dans le Christ.',
    points: 15
  },
  {
    id: '102',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Les dix commandements sont la base de la morale chrétienne.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les dix commandements sont la base de la morale chrétienne.',
    points: 10
  },
  {
    id: '103',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Quels sont les commandements qui concernent Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'Tu aimeras le Seigneur ton Dieu de tout ton cœur',
      'Tu ne prendras point le nom du Seigneur en vain',
      'Tu sanctifieras le jour du Seigneur',
      'Tu honoreras ton père et ta mère'
    ],
    correctAnswer: [0, 1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les trois premiers commandements concernent Dieu : l\'amour de Dieu, le respect de son nom et la sanctification du dimanche.',
    points: 20
  },
  {
    id: '104',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Tu ne prendras point le nom du Seigneur ton Dieu en..."',
    questionType: 'quote-completion',
    options: [
      'vain',
      'vain, car le Seigneur ne laissera point impuni celui qui prendra son nom en vain',
      'vain, car c\'est un péché',
      'vain, car c\'est interdit'
    ],
    correctAnswer: 1,
    explanation: 'Le deuxième commandement : "Tu ne prendras point le nom du Seigneur ton Dieu en vain, car le Seigneur ne laissera point impuni celui qui prendra son nom en vain."',
    points: 15
  },
  {
    id: '105',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que le péché mortel ?',
    questionType: 'multiple-choice',
    options: [
      'Un péché grave',
      'Un péché qui détruit la charité en nous',
      'Un péché impardonnable',
      'Un péché public'
    ],
    correctAnswer: 1,
    explanation: 'Le péché mortel est un péché grave qui détruit la charité en nous.',
    points: 15
  },
  {
    id: '106',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Les vertus théologales sont au nombre de trois.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les vertus théologales sont : foi, espérance et charité.',
    points: 10
  },
  {
    id: '107',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la charité ?',
    questionType: 'multiple-choice',
    options: [
      'L\'amour de Dieu et du prochain',
      'Une simple bonté',
      'Un sentiment',
      'Une émotion'
    ],
    correctAnswer: 0,
    explanation: 'La charité est l\'amour de Dieu et du prochain.',
    points: 15
  },
  {
    id: '108',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Tu honoreras ton père et ta mère, afin que tes jours se prolongent dans le pays que le Seigneur ton Dieu te..."',
    questionType: 'quote-completion',
    options: [
      'donne',
      'donne en héritage',
      'accorde',
      'offre'
    ],
    correctAnswer: 1,
    explanation: 'Le quatrième commandement : "Tu honoreras ton père et ta mère, afin que tes jours se prolongent dans le pays que le Seigneur ton Dieu te donne en héritage."',
    points: 15
  },
  {
    id: '109',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la justice ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui rend à chacun son dû',
      'L\'égalité',
      'La loi',
      'Le droit'
    ],
    correctAnswer: 0,
    explanation: 'La justice est la vertu qui rend à chacun son dû.',
    points: 15
  },
  {
    id: '110',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Le septième commandement interdit le vol.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le septième commandement : "Tu ne voleras point."',
    points: 10
  },
  {
    id: '111',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la prudence ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait discerner le bien',
      'La peur',
      'La timidité',
      'L\'hésitation'
    ],
    correctAnswer: 0,
    explanation: 'La prudence est la vertu qui nous fait discerner le bien dans chaque circonstance.',
    points: 15
  },
  {
    id: '112',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Tu ne porteras point de faux témoignage contre ton..."',
    questionType: 'quote-completion',
    options: [
      'prochain',
      'prochain, car c\'est un péché',
      'frère',
      'voisin'
    ],
    correctAnswer: 0,
    explanation: 'Le huitième commandement : "Tu ne porteras point de faux témoignage contre ton prochain."',
    points: 15
  },
  {
    id: '113',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Quelles sont les vertus cardinales ?',
    questionType: 'multiple-choice',
    options: [
      'La Prudence',
      'La Justice',
      'La Force',
      'La Tempérance'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Les vertus cardinales sont la Prudence, la Justice, la Force et la Tempérance. Elles sont les vertus humaines principales.',
    points: 20
  },
  {
    id: '114',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Le sixième commandement concerne la pureté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le sixième commandement : "Tu ne commettras point d\'adultère."',
    points: 10
  },
  {
    id: '115',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la force ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait persévérer dans le bien',
      'La violence',
      'La puissance',
      'L\'énergie'
    ],
    correctAnswer: 0,
    explanation: 'La force est la vertu qui nous fait persévérer dans le bien malgré les difficultés.',
    points: 15
  },
  {
    id: '116',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Tu ne convoiteras point la maison de ton prochain, tu ne convoiteras point la femme de ton prochain, ni son serviteur, ni sa servante, ni son bœuf, ni son âne, ni aucune chose qui appartienne à ton..."',
    questionType: 'quote-completion',
    options: [
      'prochain',
      'prochain, car c\'est interdit',
      'voisin',
      'frère'
    ],
    correctAnswer: 0,
    explanation: 'Le dixième commandement : "Tu ne convoiteras point... ni aucune chose qui appartienne à ton prochain."',
    points: 15
  },
  {
    id: '117',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que l\'espérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait désirer le ciel',
      'Un simple espoir',
      'Un rêve',
      'Une illusion'
    ],
    correctAnswer: 0,
    explanation: 'L\'espérance est la vertu qui nous fait désirer le ciel et la vie éternelle.',
    points: 15
  },
  {
    id: '118',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Le cinquième commandement interdit le meurtre.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le cinquième commandement : "Tu ne tueras point."',
    points: 10
  },
  {
    id: '119',
    category: 'fondamentaux-morale',
    difficulty: 'facile',
    level: 2,
    question: 'Qu\'est-ce que la foi ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait croire en Dieu',
      'Une simple croyance',
      'Une opinion',
      'Une conviction'
    ],
    correctAnswer: 0,
    explanation: 'La foi est la vertu qui nous fait croire en Dieu et en tout ce qu\'il a révélé.',
    points: 15
  },
  {
    id: '120',
    category: 'fondamentaux-morale',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Tu ne te feras point d\'image taillée, ni de représentation quelconque des choses qui sont en haut dans les cieux, qui sont en bas sur la terre, et qui sont dans les eaux plus bas que la..."',
    questionType: 'quote-completion',
    options: [
      'terre',
      'terre, car c\'est interdit',
      'surface',
      'profondeur'
    ],
    correctAnswer: 0,
    explanation: 'Le deuxième commandement interdit les idoles et les représentations fausses de Dieu.',
    points: 15
  },

  // ===== NIVEAU 3 - APPROFONDISSEMENT (Questions 141-300) =====

  // ===== APPROFONDISSEMENT - L'ANCIEN TESTAMENT (Questions 141-180) =====
  {
    id: '141',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Combien y a-t-il de livres dans l\'Ancien Testament ?',
    questionType: 'multiple-choice',
    options: ['39', '46', '27', '73'],
    correctAnswer: 1,
    explanation: 'L\'Ancien Testament catholique compte 46 livres.',
    points: 20
  },
  {
    id: '142',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'La Genèse est le premier livre de la Bible.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Genèse est le premier livre de la Bible.',
    points: 15
  },
  {
    id: '143',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Au commencement, Dieu créa les cieux et la..."',
    questionType: 'quote-completion',
    options: [
      'terre',
      'terre. La terre était informe et vide',
      'terre. Et l\'Esprit de Dieu se mouvait au-dessus des eaux',
      'terre. Dieu dit : Que la lumière soit'
    ],
    correctAnswer: 1,
    explanation: 'Genèse 1:1-2 : "Au commencement, Dieu créa les cieux et la terre. La terre était informe et vide."',
    points: 25,
    scripture: 'Genèse 1:1-2'
  },
  {
    id: '144',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Abraham ?',
    questionType: 'multiple-choice',
    options: [
      'Le premier roi d\'Israël',
      'Le père des croyants',
      'Un prophète',
      'Un prêtre'
    ],
    correctAnswer: 1,
    explanation: 'Abraham est appelé le père des croyants, car il a cru en Dieu.',
    points: 20
  },
  {
    id: '145',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Moïse a reçu les dix commandements sur le mont Sinaï.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Moïse a reçu les dix commandements sur le mont Sinaï.',
    points: 15
  },
  {
    id: '146',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Exode ?',
    questionType: 'multiple-choice',
    options: [
      'La sortie d\'Égypte du peuple hébreu',
      'Un livre de prières',
      'Une prophétie',
      'Un psaume'
    ],
    correctAnswer: 0,
    explanation: 'L\'Exode raconte la sortie d\'Égypte du peuple hébreu sous la conduite de Moïse.',
    points: 20
  },
  {
    id: '147',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Tu aimeras le Seigneur ton Dieu de tout ton cœur, de toute ton âme et de toute ta..."',
    questionType: 'quote-completion',
    options: [
      'force',
      'force. C\'est le premier et le plus grand commandement',
      'pensée',
      'volonté'
    ],
    correctAnswer: 1,
    explanation: 'Deutéronome 6:5 : "Tu aimeras le Seigneur ton Dieu de tout ton cœur, de toute ton âme et de toute ta force."',
    points: 25,
    scripture: 'Deutéronome 6:5'
  },
  {
    id: '148',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Quels sont les évangélistes synoptiques ?',
    questionType: 'multiple-choice',
    options: [
      'Matthieu',
      'Marc',
      'Luc',
      'Jean'
    ],
    correctAnswer: [0, 1, 2],
    multipleCorrectAnswers: true,
    explanation: 'Les évangélistes synoptiques sont Matthieu, Marc et Luc. Jean est appelé l\'évangéliste spirituel.',
    points: 25
  },
  {
    id: '149',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Psaumes sont des prières chantées.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Psaumes sont des prières chantées, souvent attribuées à David.',
    points: 15
  },
  {
    id: '150',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Torah ?',
    questionType: 'multiple-choice',
    options: [
      'Les cinq premiers livres de la Bible',
      'Toute la Bible',
      'Les prophètes',
      'Les psaumes'
    ],
    correctAnswer: 0,
    explanation: 'La Torah désigne les cinq premiers livres de la Bible (Pentateuque).',
    points: 20
  },
  {
    id: '151',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Le Seigneur est mon berger, je ne manquerai de..."',
    questionType: 'quote-completion',
    options: [
      'rien',
      'rien. Il me fait reposer dans de verts pâturages',
      'rien. Il me dirige près des eaux paisibles',
      'rien. Il restaure mon âme'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 23:1-2 : "Le Seigneur est mon berger, je ne manquerai de rien. Il me fait reposer dans de verts pâturages."',
    points: 25,
    scripture: 'Psaume 23:1-2'
  },
  {
    id: '152',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Salomon ?',
    questionType: 'multiple-choice',
    options: [
      'Le fils de David',
      'Le roi sage d\'Israël',
      'Un prophète',
      'Un prêtre'
    ],
    correctAnswer: 1,
    explanation: 'Salomon était le fils de David et le roi sage d\'Israël.',
    points: 20
  },
  {
    id: '153',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les prophètes ont annoncé la venue du Messie.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les prophètes ont annoncé la venue du Messie.',
    points: 15
  },
  {
    id: '154',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Alliance ?',
    questionType: 'multiple-choice',
    options: [
      'Un contrat entre Dieu et son peuple',
      'Une promesse',
      'Une loi',
      'Un commandement'
    ],
    correctAnswer: 0,
    explanation: 'L\'Alliance est un contrat d\'amour entre Dieu et son peuple.',
    points: 20
  },
  {
    id: '155',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Voici, la vierge concevra et enfantera un fils, et elle lui donnera le nom d\'..."',
    questionType: 'quote-completion',
    options: [
      'Emmanuel',
      'Emmanuel, ce qui signifie Dieu avec nous',
      'Jésus',
      'Christ'
    ],
    correctAnswer: 1,
    explanation: 'Isaïe 7:14 : "Voici, la vierge concevra et enfantera un fils, et elle lui donnera le nom d\'Emmanuel, ce qui signifie Dieu avec nous."',
    points: 25,
    scripture: 'Isaïe 7:14'
  },
  {
    id: '156',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Élie ?',
    questionType: 'multiple-choice',
    options: [
      'Un roi',
      'Un grand prophète',
      'Un prêtre',
      'Un juge'
    ],
    correctAnswer: 1,
    explanation: 'Élie était un grand prophète qui a combattu l\'idolâtrie.',
    points: 20
  },
  {
    id: '157',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Le livre de Job traite de la souffrance.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le livre de Job traite de la question de la souffrance du juste.',
    points: 15
  },
  {
    id: '158',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Exil à Babylone ?',
    questionType: 'multiple-choice',
    options: [
      'La déportation du peuple juif',
      'Un voyage',
      'Une guerre',
      'Une migration'
    ],
    correctAnswer: 0,
    explanation: 'L\'Exil à Babylone fut la déportation du peuple juif en 587 av. J.-C.',
    points: 20
  },
  {
    id: '159',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Car un enfant nous est né, un fils nous est donné, et la domination reposera sur son épaule. On l\'appellera Admirable, Conseiller, Dieu puissant, Père éternel, Prince de la..."',
    questionType: 'quote-completion',
    options: [
      'paix',
      'paix, car il apporte la paix',
      'guerre',
      'victoire'
    ],
    correctAnswer: 1,
    explanation: 'Isaïe 9:5 : "Car un enfant nous est né... Prince de la paix."',
    points: 25,
    scripture: 'Isaïe 9:5'
  },
  {
    id: '160',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Quels sont les grands prophètes de l\'Ancien Testament ?',
    questionType: 'multiple-choice',
    options: [
      'Isaïe',
      'Jérémie',
      'Ézéchiel',
      'Daniel'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Les grands prophètes sont Isaïe, Jérémie, Ézéchiel et Daniel. Ils ont laissé des livres plus volumineux.',
    points: 25
  },
  {
    id: '161',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les livres sapientiaux enseignent la sagesse.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les livres sapientiaux (Proverbes, Ecclésiaste, etc.) enseignent la sagesse.',
    points: 15
  },
  {
    id: '162',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la circoncision ?',
    questionType: 'multiple-choice',
    options: [
      'Le signe de l\'alliance avec Dieu',
      'Une simple coutume',
      'Une loi sanitaire',
      'Un rite de passage'
    ],
    correctAnswer: 0,
    explanation: 'La circoncision était le signe de l\'alliance entre Dieu et Abraham.',
    points: 20
  },
  {
    id: '163',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'amour est patient, il est plein de bonté ; l\'amour n\'est point envieux ; l\'amour ne se vante point, il ne s\'enfle point d\'..."',
    questionType: 'quote-completion',
    options: [
      'orgueil',
      'orgueil, il ne fait rien de malhonnête',
      'fierté',
      'vanité'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 13:4 : "L\'amour est patient... il ne s\'enfle point d\'orgueil."',
    points: 25,
    scripture: '1 Corinthiens 13:4'
  },
  {
    id: '164',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Jonas ?',
    questionType: 'multiple-choice',
    options: [
      'Un prophète récalcitrant',
      'Un roi',
      'Un prêtre',
      'Un juge'
    ],
    correctAnswer: 0,
    explanation: 'Jonas était un prophète récalcitrant qui a été avalé par un grand poisson.',
    points: 20
  },
  {
    id: '165',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Le livre de l\'Ecclésiaste traite de la vanité.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le livre de l\'Ecclésiaste traite de la vanité des choses terrestres.',
    points: 15
  },
  {
    id: '166',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le Temple de Jérusalem ?',
    questionType: 'multiple-choice',
    options: [
      'La maison de Dieu',
      'Un simple bâtiment',
      'Un palais',
      'Une forteresse'
    ],
    correctAnswer: 0,
    explanation: 'Le Temple de Jérusalem était la maison de Dieu, le lieu de sa présence.',
    points: 20
  },
  {
    id: '167',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Éternel est mon berger, je ne manquerai de rien. Il me fait reposer dans de verts pâturages, il me dirige près des eaux..."',
    questionType: 'quote-completion',
    options: [
      'paisibles',
      'paisibles, il restaure mon âme',
      'fraîches',
      'calmes'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 23:2-3 : "Il me fait reposer dans de verts pâturages, il me dirige près des eaux paisibles, il restaure mon âme."',
    points: 25,
    scripture: 'Psaume 23:2-3'
  },
  {
    id: '168',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Ézéchiel ?',
    questionType: 'multiple-choice',
    options: [
      'Un prophète de l\'exil',
      'Un roi',
      'Un prêtre',
      'Un juge'
    ],
    correctAnswer: 0,
    explanation: 'Ézéchiel était un prophète qui a prophétisé pendant l\'exil à Babylone.',
    points: 20
  },
  {
    id: '169',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les livres historiques racontent l\'histoire d\'Israël.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les livres historiques (Josué, Juges, Samuel, Rois) racontent l\'histoire d\'Israël.',
    points: 15
  },
  {
    id: '170',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Pâque juive ?',
    questionType: 'multiple-choice',
    options: [
      'La fête de la libération d\'Égypte',
      'Une simple fête',
      'Un jour de jeûne',
      'Une commémoration'
    ],
    correctAnswer: 0,
    explanation: 'La Pâque juive commémore la libération d\'Égypte sous la conduite de Moïse.',
    points: 20
  },
  {
    id: '171',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle, car Dieu a envoyé son Fils dans le monde',
      'bienheureuse',
      'sans fin'
    ],
    correctAnswer: 1,
    explanation: 'Jean 3:16 : "Car Dieu a tant aimé le monde... mais qu\'il ait la vie éternelle."',
    points: 25,
    scripture: 'Jean 3:16'
  },
  {
    id: '172',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Jérémie ?',
    questionType: 'multiple-choice',
    options: [
      'Le prophète des larmes',
      'Un roi',
      'Un prêtre',
      'Un juge'
    ],
    correctAnswer: 0,
    explanation: 'Jérémie était appelé le prophète des larmes à cause de ses prophéties de malheur.',
    points: 20
  },
  {
    id: '173',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Le livre des Proverbes contient des maximes de sagesse.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le livre des Proverbes contient des maximes de sagesse.',
    points: 15
  },
  {
    id: '174',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le sabbat ?',
    questionType: 'multiple-choice',
    options: [
      'Le jour de repos consacré à Dieu',
      'Un simple jour de repos',
      'Un jour de fête',
      'Un jour de travail'
    ],
    correctAnswer: 0,
    explanation: 'Le sabbat est le jour de repos consacré à Dieu, le septième jour.',
    points: 20
  },
  {
    id: '175',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu. Elle était au commencement avec Dieu',
      'divine',
      'éternelle'
    ],
    correctAnswer: 1,
    explanation: 'Jean 1:1 : "Au commencement était la Parole, et la Parole était avec Dieu, et la Parole était Dieu."',
    points: 25,
    scripture: 'Jean 1:1'
  },
  {
    id: '176',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Quels sont les apôtres les plus importants ?',
    questionType: 'multiple-choice',
    options: [
      'Pierre',
      'Paul',
      'Jean',
      'Jacques'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Pierre, Paul, Jean et Jacques sont considérés comme les apôtres les plus importants. Pierre était le chef des apôtres, Paul l\'apôtre des nations, Jean l\'apôtre de l\'amour, et Jacques le frère du Seigneur.',
    points: 25
  },
  {
    id: '177',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les livres deutérocanoniques sont reconnus par l\'Église catholique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les livres deutérocanoniques sont reconnus par l\'Église catholique.',
    points: 15
  },
  {
    id: '178',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Loi mosaïque ?',
    questionType: 'multiple-choice',
    options: [
      'L\'ensemble des lois données par Moïse',
      'Les dix commandements',
      'Les coutumes juives',
      'Les traditions'
    ],
    correctAnswer: 0,
    explanation: 'La Loi mosaïque est l\'ensemble des lois données par Dieu à Moïse.',
    points: 20
  },
  {
    id: '179',
    category: 'approfondissement-ancien-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Je suis le chemin, la vérité et la vie. Nul ne vient au Père que par..."',
    questionType: 'quote-completion',
    options: [
      'moi',
      'moi, car je suis le chemin',
      'le Christ',
      'la foi'
    ],
    correctAnswer: 1,
    explanation: 'Jean 14:6 : "Je suis le chemin, la vérité et la vie. Nul ne vient au Père que par moi."',
    points: 25,
    scripture: 'Jean 14:6'
  },
  {
    id: '180',
    category: 'approfondissement-ancien-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était Samuel ?',
    questionType: 'multiple-choice',
    options: [
      'Le dernier juge et premier prophète',
      'Un roi',
      'Un prêtre',
      'Un scribe'
    ],
    correctAnswer: 0,
    explanation: 'Samuel était le dernier juge et le premier prophète d\'Israël.',
    points: 20
  },

  // ===== APPROFONDISSEMENT - LE NOUVEAU TESTAMENT (Questions 181-220) =====
  {
    id: '181',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Combien y a-t-il de livres dans le Nouveau Testament ?',
    questionType: 'multiple-choice',
    options: ['27', '39', '46', '73'],
    correctAnswer: 0,
    explanation: 'Le Nouveau Testament compte 27 livres.',
    points: 20
  },
  {
    id: '182',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Les Évangiles sont au nombre de quatre.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Évangiles sont au nombre de quatre : Matthieu, Marc, Luc et Jean.',
    points: 15
  },
  {
    id: '183',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Voici, une vierge sera enceinte, elle enfantera un fils, et on lui donnera le nom d\'..."',
    questionType: 'quote-completion',
    options: [
      'Emmanuel',
      'Emmanuel, ce qui signifie Dieu avec nous',
      'Jésus',
      'Christ'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 1:23 : "Voici, une vierge sera enceinte, elle enfantera un fils, et on lui donnera le nom d\'Emmanuel, ce qui signifie Dieu avec nous."',
    points: 25,
    scripture: 'Matthieu 1:23'
  },
  {
    id: '184',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Paul ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre des nations',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Paul était l\'apôtre des nations, le missionnaire par excellence.',
    points: 20
  },
  {
    id: '185',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Actes des Apôtres racontent les débuts de l\'Église.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Actes des Apôtres racontent les débuts de l\'Église après la Pentecôte.',
    points: 15
  },
  {
    id: '186',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Apocalypse ?',
    questionType: 'multiple-choice',
    options: [
      'Le dernier livre de la Bible',
      'Un livre de révélations',
      'Une prophétie',
      'Un psaume'
    ],
    correctAnswer: 0,
    explanation: 'L\'Apocalypse est le dernier livre de la Bible, livre de révélations.',
    points: 20
  },
  {
    id: '187',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Heureux les pauvres en esprit, car le royaume des cieux est à..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car ils hériteront la terre',
      'vous',
      'nous'
    ],
    correctAnswer: 0,
    explanation: 'Matthieu 5:3 : "Heureux les pauvres en esprit, car le royaume des cieux est à eux."',
    points: 25,
    scripture: 'Matthieu 5:3'
  },
  {
    id: '188',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Quels sont les pères de l\'Église les plus importants ?',
    questionType: 'multiple-choice',
    options: [
      'Saint Augustin',
      'Saint Jérôme',
      'Saint Ambroise',
      'Saint Grégoire'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Saint Augustin, saint Jérôme, saint Ambroise et saint Grégoire sont les quatre grands pères de l\'Église latine.',
    points: 25
  },
  {
    id: '189',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Épîtres de Paul sont des lettres apostoliques.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Épîtres de Paul sont des lettres apostoliques adressées aux premières communautés chrétiennes.',
    points: 15
  },
  {
    id: '190',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que les Béatitudes ?',
    questionType: 'multiple-choice',
    options: [
      'Les huit béatitudes du Sermon sur la montagne',
      'Des prières',
      'Des commandements',
      'Des prophéties'
    ],
    correctAnswer: 0,
    explanation: 'Les Béatitudes sont les huit béatitudes du Sermon sur la montagne.',
    points: 20
  },
  {
    id: '191',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Vous êtes le sel de la terre. Mais si le sel perd sa saveur, avec quoi la lui rendra-t-on ? Il ne sert plus qu\'à être..."',
    questionType: 'quote-completion',
    options: [
      'jeté dehors',
      'jeté dehors et foulé aux pieds par les hommes',
      'rejeté',
      'abandonné'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:13 : "Vous êtes le sel de la terre... Il ne sert plus qu\'à être jeté dehors et foulé aux pieds par les hommes."',
    points: 25,
    scripture: 'Matthieu 5:13'
  },
  {
    id: '192',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Jean ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre bien-aimé',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Jean était l\'apôtre bien-aimé, l\'auteur du quatrième Évangile.',
    points: 20
  },
  {
    id: '193',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Le Sermon sur la montagne est un enseignement de Jésus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le Sermon sur la montagne est un enseignement fondamental de Jésus.',
    points: 15
  },
  {
    id: '194',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la parabole ?',
    questionType: 'multiple-choice',
    options: [
      'Une histoire avec un enseignement spirituel',
      'Une légende',
      'Un conte',
      'Un mythe'
    ],
    correctAnswer: 0,
    explanation: 'La parabole est une histoire avec un enseignement spirituel.',
    points: 20
  },
  {
    id: '195',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être..."',
    questionType: 'quote-completion',
    options: [
      'cachée',
      'cachée, car elle brille pour tous',
      'ignorée',
      'oubliée'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:14 : "Vous êtes la lumière du monde. Une ville située sur une montagne ne peut être cachée."',
    points: 25,
    scripture: 'Matthieu 5:14'
  },
  {
    id: '196',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Matthieu ?',
    questionType: 'multiple-choice',
    options: [
      'L\'évangéliste publicain',
      'Un apôtre',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Matthieu était l\'évangéliste publicain, collecteur d\'impôts.',
    points: 20
  },
  {
    id: '197',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les miracles de Jésus sont des signes du Royaume.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les miracles de Jésus sont des signes du Royaume de Dieu.',
    points: 15
  },
  {
    id: '198',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le Royaume de Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'La présence de Dieu parmi les hommes',
      'Un royaume terrestre',
      'Une utopie',
      'Un rêve'
    ],
    correctAnswer: 0,
    explanation: 'Le Royaume de Dieu est la présence de Dieu parmi les hommes.',
    points: 20
  },
  {
    id: '199',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Ne vous inquiétez de rien, mais en toute chose faites connaître vos besoins à Dieu par des prières et des supplications, avec des actions de..."',
    questionType: 'quote-completion',
    options: [
      'grâces',
      'grâces, et la paix de Dieu vous gardera',
      'merci',
      'remerciements'
    ],
    correctAnswer: 1,
    explanation: 'Philippiens 4:6-7 : "Ne vous inquiétez de rien... avec des actions de grâces."',
    points: 25,
    scripture: 'Philippiens 4:6-7'
  },
  {
    id: '200',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Quels sont les conciles œcuméniques les plus importants ?',
    questionType: 'multiple-choice',
    options: [
      'Nicée I (325)',
      'Constantinople I (381)',
      'Éphèse (431)',
      'Chalcédoine (451)'
    ],
    correctAnswer: [0, 1, 2, 3],
    multipleCorrectAnswers: true,
    explanation: 'Ces quatre conciles sont les plus importants de l\'histoire de l\'Église. Ils ont défini les dogmes fondamentaux sur la Trinité et la nature du Christ.',
    points: 25
  },
  {
    id: '201',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Épîtres catholiques sont des lettres universelles.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Épîtres catholiques sont des lettres universelles adressées à toute l\'Église.',
    points: 15
  },
  {
    id: '202',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Révélation ?',
    questionType: 'multiple-choice',
    options: [
      'La manifestation de Dieu aux hommes',
      'Une découverte',
      'Une invention',
      'Une création'
    ],
    correctAnswer: 0,
    explanation: 'La Révélation est la manifestation de Dieu aux hommes.',
    points: 20
  },
  {
    id: '203',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d\'..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car je suis présent',
      'vous',
      'nous'
    ],
    correctAnswer: 0,
    explanation: 'Matthieu 18:20 : "Car là où deux ou trois sont assemblés en mon nom, je suis au milieu d\'eux."',
    points: 25,
    scripture: 'Matthieu 18:20'
  },
  {
    id: '204',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Marc ?',
    questionType: 'multiple-choice',
    options: [
      'L\'évangéliste compagnon de Pierre',
      'Un apôtre',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Marc était l\'évangéliste compagnon de saint Pierre.',
    points: 20
  },
  {
    id: '205',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Évangiles synoptiques sont Matthieu, Marc et Luc.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Évangiles synoptiques sont Matthieu, Marc et Luc.',
    points: 15
  },
  {
    id: '206',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Église primitive ?',
    questionType: 'multiple-choice',
    options: [
      'La première communauté chrétienne',
      'Une secte',
      'Un groupe',
      'Une association'
    ],
    correctAnswer: 0,
    explanation: 'L\'Église primitive est la première communauté chrétienne.',
    points: 20
  },
  {
    id: '207',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Je vous donne un commandement nouveau : Aimez-vous les uns les autres. Comme je vous ai aimés, vous aussi, aimez-vous les uns les..."',
    questionType: 'quote-completion',
    options: [
      'autres',
      'autres, car l\'amour est la loi',
      'uns',
      'frères'
    ],
    correctAnswer: 0,
    explanation: 'Jean 13:34 : "Je vous donne un commandement nouveau : Aimez-vous les uns les autres."',
    points: 25,
    scripture: 'Jean 13:34'
  },
  {
    id: '208',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Jacques ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre frère de Jean',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Jacques était l\'apôtre frère de saint Jean.',
    points: 20
  },
  {
    id: '209',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Actes des Apôtres sont l\'œuvre de saint Luc.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Actes des Apôtres sont l\'œuvre de saint Luc.',
    points: 15
  },
  {
    id: '210',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Pentecôte ?',
    questionType: 'multiple-choice',
    options: [
      'La descente de l\'Esprit Saint',
      'Une fête juive',
      'Un jour de repos',
      'Une commémoration'
    ],
    correctAnswer: 0,
    explanation: 'La Pentecôte est la descente de l\'Esprit Saint sur les apôtres.',
    points: 20
  },
  {
    id: '211',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle, car Dieu a envoyé son Fils',
      'bienheureuse',
      'sans fin'
    ],
    correctAnswer: 1,
    explanation: 'Jean 3:16 : "Car Dieu a tant aimé le monde... mais qu\'il ait la vie éternelle."',
    points: 25,
    scripture: 'Jean 3:16'
  },
  {
    id: '212',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint André ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre frère de Pierre',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint André était l\'apôtre frère de saint Pierre.',
    points: 20
  },
  {
    id: '213',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'L\'Évangile de Jean est le plus spirituel.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Évangile de Jean est le plus spirituel et théologique.',
    points: 15
  },
  {
    id: '214',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la conversion ?',
    questionType: 'multiple-choice',
    options: [
      'Le retournement vers Dieu',
      'Un simple changement',
      'Une réforme',
      'Une évolution'
    ],
    correctAnswer: 0,
    explanation: 'La conversion est le retournement vers Dieu.',
    points: 20
  },
  {
    id: '215',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait..."',
    questionType: 'quote-completion',
    options: [
      'mort',
      'mort, car je suis la vie',
      'défunt',
      'tombé'
    ],
    correctAnswer: 0,
    explanation: 'Jean 11:25 : "Je suis la résurrection et la vie. Celui qui croit en moi vivra, quand même il serait mort."',
    points: 25,
    scripture: 'Jean 11:25'
  },
  {
    id: '216',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre incrédule',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thomas était l\'apôtre incrédule qui douta de la résurrection.',
    points: 20
  },
  {
    id: '217',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Épîtres pastorales sont adressées à des pasteurs.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Épîtres pastorales sont adressées à des pasteurs (Timothée, Tite).',
    points: 15
  },
  {
    id: '218',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la foi ?',
    questionType: 'multiple-choice',
    options: [
      'La confiance en Dieu',
      'Une simple croyance',
      'Une opinion',
      'Une conviction'
    ],
    correctAnswer: 0,
    explanation: 'La foi est la confiance en Dieu et en sa parole.',
    points: 20
  },
  {
    id: '219',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Je suis le pain de vie. Celui qui vient à moi n\'aura jamais faim, et celui qui croit en moi n\'aura jamais..."',
    questionType: 'quote-completion',
    options: [
      'soif',
      'soif, car je suis la source',
      'faim',
      'besoin'
    ],
    correctAnswer: 0,
    explanation: 'Jean 6:35 : "Je suis le pain de vie. Celui qui vient à moi n\'aura jamais faim, et celui qui croit en moi n\'aura jamais soif."',
    points: 25,
    scripture: 'Jean 6:35'
  },
  {
    id: '220',
    category: 'approfondissement-nouveau-testament',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Philippe ?',
    questionType: 'multiple-choice',
    options: [
      'L\'apôtre qui amena Nathanaël',
      'Un évangéliste',
      'Un disciple',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Philippe était l\'apôtre qui amena Nathanaël à Jésus.',
    points: 20
  },

  // ===== APPROFONDISSEMENT - L'ÉGLISE ET SON HISTOIRE (Questions 221-260) =====
  {
    id: '221',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'Église catholique ?',
    questionType: 'multiple-choice',
    options: [
      'La communauté des croyants fondée par le Christ',
      'Un simple bâtiment',
      'Une organisation',
      'Une institution'
    ],
    correctAnswer: 0,
    explanation: 'L\'Église catholique est la communauté des croyants fondée par le Christ.',
    points: 20
  },
  {
    id: '222',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'L\'Église a été fondée par Jésus-Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église a été fondée par Jésus-Christ sur Pierre.',
    points: 15
  },
  {
    id: '223',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Tu es Pierre, et sur cette pierre je bâtirai mon..."',
    questionType: 'quote-completion',
    options: [
      'Église',
      'Église, et les portes de l\'enfer ne prévaudront point contre elle',
      'royaume',
      'temple'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 16:18 : "Tu es Pierre, et sur cette pierre je bâtirai mon Église, et les portes de l\'enfer ne prévaudront point contre elle."',
    points: 25,
    scripture: 'Matthieu 16:18'
  },
  {
    id: '224',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était le premier pape ?',
    questionType: 'multiple-choice',
    options: [
      'Saint Pierre',
      'Saint Paul',
      'Saint Jean',
      'Saint Matthieu'
    ],
    correctAnswer: 0,
    explanation: 'Saint Pierre était le premier pape, le chef des apôtres.',
    points: 20
  },
  {
    id: '225',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Les persécutions ont marqué les premiers siècles de l\'Église.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les persécutions ont marqué les premiers siècles de l\'Église.',
    points: 15
  },
  {
    id: '226',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'édit de Milan ?',
    questionType: 'multiple-choice',
    options: [
      'La liberté religieuse accordée par Constantin',
      'Une loi',
      'Un décret',
      'Une proclamation'
    ],
    correctAnswer: 0,
    explanation: 'L\'édit de Milan accorda la liberté religieuse aux chrétiens en 313.',
    points: 20
  },
  {
    id: '227',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est une, sainte, catholique et..."',
    questionType: 'quote-completion',
    options: [
      'apostolique',
      'apostolique, car elle vient des apôtres',
      'universelle',
      'divine'
    ],
    correctAnswer: 1,
    explanation: 'Le Credo dit : "L\'Église est une, sainte, catholique et apostolique."',
    points: 25
  },
  {
    id: '228',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Augustin ?',
    questionType: 'multiple-choice',
    options: [
      'Un Père de l\'Église',
      'Un pape',
      'Un évêque',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Augustin était un Père de l\'Église, évêque d\'Hippone.',
    points: 20
  },
  {
    id: '229',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Le concile de Nicée a défini la divinité du Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le concile de Nicée (325) a défini la divinité du Christ.',
    points: 15
  },
  {
    id: '230',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le monachisme ?',
    questionType: 'multiple-choice',
    options: [
      'La vie religieuse en communauté',
      'Une secte',
      'Un ordre',
      'Une confrérie'
    ],
    correctAnswer: 0,
    explanation: 'Le monachisme est la vie religieuse en communauté ou en solitude.',
    points: 20
  },
  {
    id: '231',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "Là où est l\'Église, là est l\'Esprit de Dieu, et là où est l\'Esprit de Dieu, là est l\'Église et toute..."',
    questionType: 'quote-completion',
    options: [
      'grâce',
      'grâce, car l\'Esprit est la vérité',
      'bénédiction',
      'faveur'
    ],
    correctAnswer: 1,
    explanation: 'Saint Irénée : "Là où est l\'Église, là est l\'Esprit de Dieu, et là où est l\'Esprit de Dieu, là est l\'Église et toute grâce."',
    points: 25
  },
  {
    id: '232',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Benoît ?',
    questionType: 'multiple-choice',
    options: [
      'Le père du monachisme occidental',
      'Un pape',
      'Un évêque',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Benoît était le père du monachisme occidental.',
    points: 20
  },
  {
    id: '233',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Le grand schisme d\'Orient a eu lieu en 1054.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le grand schisme d\'Orient a eu lieu en 1054.',
    points: 15
  },
  {
    id: '234',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la Réforme protestante ?',
    questionType: 'multiple-choice',
    options: [
      'Le mouvement de séparation du XVIe siècle',
      'Une réforme interne',
      'Un renouveau',
      'Une évolution'
    ],
    correctAnswer: 0,
    explanation: 'La Réforme protestante est le mouvement de séparation du XVIe siècle.',
    points: 20
  },
  {
    id: '235',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est le Corps mystique du Christ, dont il est la tête et nous sommes les..."',
    questionType: 'quote-completion',
    options: [
      'membres',
      'membres, car nous formons un seul corps',
      'parties',
      'éléments'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est le Corps mystique du Christ, dont il est la tête et nous sommes les membres.',
    points: 25
  },
  {
    id: '236',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint François d\'Assise ?',
    questionType: 'multiple-choice',
    options: [
      'Le saint de la pauvreté',
      'Un pape',
      'Un évêque',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint François d\'Assise était le saint de la pauvreté.',
    points: 20
  },
  {
    id: '237',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Le concile de Trente a réformé l\'Église catholique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le concile de Trente (1545-1563) a réformé l\'Église catholique.',
    points: 15
  },
  {
    id: '238',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le Vatican II ?',
    questionType: 'multiple-choice',
    options: [
      'Le concile de 1962-1965',
      'Un synode',
      'Une assemblée',
      'Une réunion'
    ],
    correctAnswer: 0,
    explanation: 'Le Vatican II est le concile de 1962-1965 qui a modernisé l\'Église.',
    points: 20
  },
  {
    id: '239',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est sainte, non par ses membres, mais par son fondateur qui est..."',
    questionType: 'quote-completion',
    options: [
      'saint',
      'saint, car le Christ est saint',
      'divin',
      'parfait'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est sainte, non par ses membres, mais par son fondateur qui est saint.',
    points: 25
  },
  {
    id: '240',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Le docteur angélique',
      'Un pape',
      'Un évêque',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thomas d\'Aquin était le docteur angélique.',
    points: 20
  },
  {
    id: '241',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'L\'Église est catholique, c\'est-à-dire universelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église est catholique, c\'est-à-dire universelle.',
    points: 15
  },
  {
    id: '242',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que l\'œcuménisme ?',
    questionType: 'multiple-choice',
    options: [
      'Le dialogue entre les Églises',
      'Une union',
      'Une fusion',
      'Une alliance'
    ],
    correctAnswer: 0,
    explanation: 'L\'œcuménisme est le dialogue entre les Églises chrétiennes.',
    points: 20
  },
  {
    id: '243',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est apostolique, car elle est fondée sur les apôtres et garde leur..."',
    questionType: 'quote-completion',
    options: [
      'enseignement',
      'enseignement, transmis par la succession apostolique',
      'doctrine',
      'tradition'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est apostolique, car elle est fondée sur les apôtres et garde leur enseignement.',
    points: 25
  },
  {
    id: '244',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Ignace de Loyola ?',
    questionType: 'multiple-choice',
    options: [
      'Le fondateur des jésuites',
      'Un pape',
      'Un évêque',
      'Un prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Ignace de Loyola était le fondateur des jésuites.',
    points: 20
  },
  {
    id: '245',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Les Pères de l\'Église sont les premiers théologiens.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Pères de l\'Église sont les premiers théologiens.',
    points: 15
  },
  {
    id: '246',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la succession apostolique ?',
    questionType: 'multiple-choice',
    options: [
      'La transmission de l\'autorité des apôtres',
      'Une tradition',
      'Une coutume',
      'Une loi'
    ],
    correctAnswer: 0,
    explanation: 'La succession apostolique est la transmission de l\'autorité des apôtres.',
    points: 20
  },
  {
    id: '247',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est une, comme le Christ est un, et comme le Père et le Fils sont..."',
    questionType: 'quote-completion',
    options: [
      'un',
      'un, car ils sont une seule divinité',
      'unis',
      'unis dans l\'amour'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est une, comme le Christ est un, et comme le Père et le Fils sont un.',
    points: 25
  },
  {
    id: '248',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Thérèse d\'Avila ?',
    questionType: 'multiple-choice',
    options: [
      'La réformatrice du Carmel',
      'Une pape',
      'Une évêque',
      'Une prêtre'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thérèse d\'Avila était la réformatrice du Carmel.',
    points: 20
  },
  {
    id: '249',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Le concile Vatican I a défini l\'infaillibilité pontificale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le concile Vatican I (1870) a défini l\'infaillibilité pontificale.',
    points: 15
  },
  {
    id: '250',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la mission de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'Évangéliser le monde',
      'Gouverner',
      'Administrer',
      'Diriger'
    ],
    correctAnswer: 0,
    explanation: 'La mission de l\'Église est d\'évangéliser le monde.',
    points: 20
  },
  {
    id: '251',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est le sacrement universel du salut, signe et instrument de la communion avec Dieu et de l\'unité de tout le genre..."',
    questionType: 'quote-completion',
    options: [
      'humain',
      'humain, car elle est catholique',
      'humain, car elle est universelle',
      'humain, car elle est une'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est le sacrement universel du salut, signe et instrument de la communion avec Dieu et de l\'unité de tout le genre humain.',
    points: 25
  },
  {
    id: '252',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Jean-Paul II ?',
    questionType: 'multiple-choice',
    options: [
      'Le pape polonais',
      'Un évêque',
      'Un prêtre',
      'Un cardinal'
    ],
    correctAnswer: 0,
    explanation: 'Saint Jean-Paul II était le pape polonais (1978-2005).',
    points: 20
  },
  {
    id: '253',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'L\'Église est le peuple de Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église est le peuple de Dieu.',
    points: 15
  },
  {
    id: '254',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que la hiérarchie de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'L\'organisation de l\'Église',
      'Une structure',
      'Un système',
      'Un ordre'
    ],
    correctAnswer: 0,
    explanation: 'La hiérarchie de l\'Église est son organisation (pape, évêques, prêtres).',
    points: 20
  },
  {
    id: '255',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est la colonne et l\'appui de la..."',
    questionType: 'quote-completion',
    options: [
      'vérité',
      'vérité, car elle enseigne la vérité',
      'foi',
      'doctrine'
    ],
    correctAnswer: 1,
    explanation: '1 Timothée 3:15 : "L\'Église est la colonne et l\'appui de la vérité."',
    points: 25,
    scripture: '1 Timothée 3:15'
  },
  {
    id: '256',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Pie X ?',
    questionType: 'multiple-choice',
    options: [
      'Le pape de l\'Eucharistie',
      'Un évêque',
      'Un prêtre',
      'Un cardinal'
    ],
    correctAnswer: 0,
    explanation: 'Saint Pie X était le pape de l\'Eucharistie (1903-1914).',
    points: 20
  },
  {
    id: '257',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'L\'Église est le Corps mystique du Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église est le Corps mystique du Christ.',
    points: 15
  },
  {
    id: '258',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qu\'est-ce que le magistère de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'L\'autorité d\'enseignement de l\'Église',
      'Un pouvoir',
      'Une fonction',
      'Un rôle'
    ],
    correctAnswer: 0,
    explanation: 'Le magistère est l\'autorité d\'enseignement de l\'Église.',
    points: 20
  },
  {
    id: '259',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'difficile',
    level: 3,
    question: 'Complétez : "L\'Église est la maison de Dieu et la porte du..."',
    questionType: 'quote-completion',
    options: [
      'ciel',
      'ciel, car elle mène au salut',
      'paradis',
      'royaume'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église est la maison de Dieu et la porte du ciel.',
    points: 25
  },
  {
    id: '260',
    category: 'approfondissement-eglise-histoire',
    difficulty: 'moyen',
    level: 3,
    question: 'Qui était saint Léon le Grand ?',
    questionType: 'multiple-choice',
    options: [
      'Le pape qui arrêta Attila',
      'Un évêque',
      'Un prêtre',
      'Un cardinal'
    ],
    correctAnswer: 0,
    explanation: 'Saint Léon le Grand était le pape qui arrêta Attila (440-461).',
    points: 20
  },

  // ===== NIVEAU 4 - MAÎTRISE (Questions 261-600) =====

  // ===== MAÎTRISE - THÉOLOGIE AVANCÉE (Questions 261-300) =====
  {
    id: '261',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude rationnelle de la foi',
      'Une simple croyance',
      'Une philosophie',
      'Une religion'
    ],
    correctAnswer: 0,
    explanation: 'La théologie est l\'étude rationnelle de la foi.',
    points: 30
  },
  {
    id: '262',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie est une science.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie est une science qui étudie Dieu et les réalités divines.',
    points: 25
  },
  {
    id: '263',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La foi cherche l\'intelligence, et l\'intelligence cherche la..."',
    questionType: 'quote-completion',
    options: [
      'foi',
      'foi, car elles se complètent',
      'vérité',
      'sagesse'
    ],
    correctAnswer: 1,
    explanation: 'Saint Anselme : "La foi cherche l\'intelligence, et l\'intelligence cherche la foi."',
    points: 35
  },
  {
    id: '264',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie dogmatique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des vérités de foi',
      'Une doctrine',
      'Une croyance',
      'Une opinion'
    ],
    correctAnswer: 0,
    explanation: 'La théologie dogmatique étudie les vérités de foi définies par l\'Église.',
    points: 30
  },
  {
    id: '265',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie morale étudie le bien et le mal.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie morale étudie le bien et le mal, les vertus et les vices.',
    points: 25
  },
  {
    id: '266',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie spirituelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la vie spirituelle',
      'Une mystique',
      'Une expérience',
      'Une prière'
    ],
    correctAnswer: 0,
    explanation: 'La théologie spirituelle étudie la vie spirituelle et la sainteté.',
    points: 30
  },
  {
    id: '267',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La grâce ne détruit pas la nature, mais la..."',
    questionType: 'quote-completion',
    options: [
      'perfectionne',
      'perfectionne, car elle l\'élève',
      'transforme',
      'change'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas d\'Aquin : "La grâce ne détruit pas la nature, mais la perfectionne."',
    points: 35
  },
  {
    id: '268',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie sacramentelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des sacrements',
      'Une liturgie',
      'Un rite',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La théologie sacramentelle étudie les sacrements et leur efficacité.',
    points: 30
  },
  {
    id: '269',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie biblique étudie l\'Écriture Sainte.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie biblique étudie l\'Écriture Sainte.',
    points: 25
  },
  {
    id: '270',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie fondamentale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des fondements de la foi',
      'Une base',
      'Un fondement',
      'Une racine'
    ],
    correctAnswer: 0,
    explanation: 'La théologie fondamentale étudie les fondements de la foi chrétienne.',
    points: 30
  },
  {
    id: '271',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La vérité vous rendra..."',
    questionType: 'quote-completion',
    options: [
      'libres',
      'libres, car la vérité libère',
      'heureux',
      'sages'
    ],
    correctAnswer: 1,
    explanation: 'Jean 8:32 : "La vérité vous rendra libres."',
    points: 35,
    scripture: 'Jean 8:32'
  },
  {
    id: '272',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie pastorale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du ministère pastoral',
      'Une pastorale',
      'Un service',
      'Un ministère'
    ],
    correctAnswer: 0,
    explanation: 'La théologie pastorale étudie le ministère pastoral et l\'évangélisation.',
    points: 30
  },
  {
    id: '273',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie liturgique étudie la liturgie.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie liturgique étudie la liturgie et les rites.',
    points: 25
  },
  {
    id: '274',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie patristique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des Pères de l\'Église',
      'Une tradition',
      'Un héritage',
      'Un patrimoine'
    ],
    correctAnswer: 0,
    explanation: 'La théologie patristique étudie les Pères de l\'Église.',
    points: 30
  },
  {
    id: '275',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "La foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne..."',
    questionType: 'quote-completion',
    options: [
      'voit point',
      'voit point, car la foi dépasse la raison',
      'comprend',
      'sait'
    ],
    correctAnswer: 1,
    explanation: 'Hébreux 11:1 : "La foi est une ferme assurance des choses qu\'on espère, une démonstration de celles qu\'on ne voit point."',
    points: 35,
    scripture: 'Hébreux 11:1'
  },
  {
    id: '276',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'expérience mystique',
      'Une mystique',
      'Une expérience',
      'Une révélation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie mystique étudie l\'expérience mystique et l\'union avec Dieu.',
    points: 30
  },
  {
    id: '277',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie spéculative utilise la raison.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie spéculative utilise la raison pour comprendre la foi.',
    points: 25
  },
  {
    id: '278',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie positive ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des sources de la révélation',
      'Une approche',
      'Une méthode',
      'Une démarche'
    ],
    correctAnswer: 0,
    explanation: 'La théologie positive étudie les sources de la révélation (Écriture, Tradition).',
    points: 30
  },
  {
    id: '279',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "La sagesse de ce monde est folie devant..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car Dieu est plus sage',
      'le Seigneur',
      'le Créateur'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 3:19 : "La sagesse de ce monde est folie devant Dieu."',
    points: 35,
    scripture: '1 Corinthiens 3:19'
  },
  {
    id: '280',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie systématique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'organisation systématique de la doctrine',
      'Un système',
      'Une organisation',
      'Une structure'
    ],
    correctAnswer: 0,
    explanation: 'La théologie systématique organise de manière cohérente la doctrine chrétienne.',
    points: 30
  },
  {
    id: '281',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie historique étudie l\'histoire de la théologie.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie historique étudie l\'histoire de la théologie.',
    points: 25
  },
  {
    id: '282',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie pratique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'application pratique de la théologie',
      'Une pratique',
      'Une application',
      'Un usage'
    ],
    correctAnswer: 0,
    explanation: 'La théologie pratique applique la théologie à la vie concrète.',
    points: 30
  },
  {
    id: '283',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, afin que l\'homme de Dieu soit accompli',
      'vérité',
      'sagesse'
    ],
    correctAnswer: 1,
    explanation: '2 Timothée 3:16 : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."',
    points: 35,
    scripture: '2 Timothée 3:16'
  },
  {
    id: '284',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie contextuelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'adaptation de la théologie au contexte',
      'Un contexte',
      'Une adaptation',
      'Une situation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie contextuelle adapte la théologie au contexte culturel.',
    points: 30
  },
  {
    id: '285',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie de la libération est une théologie contextuelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie de la libération est une théologie contextuelle latino-américaine.',
    points: 25
  },
  {
    id: '286',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la grâce ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la grâce divine',
      'Une grâce',
      'Un don',
      'Un cadeau'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la grâce étudie la grâce divine et ses effets.',
    points: 30
  },
  {
    id: '287',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "Car c\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car le salut est un don gratuit',
      'Dieu, car c\'est sa volonté',
      'Dieu, car il nous aime'
    ],
    correctAnswer: 1,
    explanation: 'Éphésiens 2:8 : "Car c\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de Dieu."',
    points: 35,
    scripture: 'Éphésiens 2:8'
  },
  {
    id: '288',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la Trinité ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du mystère de la Trinité',
      'Un mystère',
      'Une doctrine',
      'Une vérité'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la Trinité étudie le mystère de la Trinité.',
    points: 30
  },
  {
    id: '289',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie de l\'Incarnation étudie le Verbe fait chair.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie de l\'Incarnation étudie le Verbe fait chair.',
    points: 25
  },
  {
    id: '290',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la Rédemption ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'œuvre rédemptrice du Christ',
      'Une rédemption',
      'Un salut',
      'Une libération'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la Rédemption étudie l\'œuvre rédemptrice du Christ.',
    points: 30
  },
  {
    id: '291',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle, car Dieu a envoyé son Fils',
      'bienheureuse',
      'sans fin'
    ],
    correctAnswer: 1,
    explanation: 'Jean 3:16 : "Car Dieu a tant aimé le monde... mais qu\'il ait la vie éternelle."',
    points: 35,
    scripture: 'Jean 3:16'
  },
  {
    id: '292',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la nature de l\'Église',
      'Une nature',
      'Une essence',
      'Une réalité'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de l\'Église étudie la nature et la mission de l\'Église.',
    points: 30
  },
  {
    id: '293',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie des sacrements étudie les sacrements.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie des sacrements étudie les sacrements et leur efficacité.',
    points: 25
  },
  {
    id: '294',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la prière ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la prière chrétienne',
      'Une prière',
      'Une oraison',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la prière étudie la prière chrétienne.',
    points: 30
  },
  {
    id: '295',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "Priez sans cesse, rendez grâces en toutes choses, car c\'est à votre égard la volonté de Dieu en Jésus..."',
    questionType: 'quote-completion',
    options: [
      'Christ',
      'Christ, car Dieu veut notre bonheur',
      'Christ, car c\'est sa volonté',
      'Christ, car il nous aime'
    ],
    correctAnswer: 1,
    explanation: '1 Thessaloniciens 5:17-18 : "Priez sans cesse, rendez grâces en toutes choses, car c\'est à votre égard la volonté de Dieu en Jésus-Christ."',
    points: 35,
    scripture: '1 Thessaloniciens 5:17-18'
  },
  {
    id: '296',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la sainteté ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la sainteté chrétienne',
      'Une sainteté',
      'Une perfection',
      'Une vertu'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la sainteté étudie la sainteté chrétienne.',
    points: 30
  },
  {
    id: '297',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie de la mission étudie l\'évangélisation.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie de la mission étudie l\'évangélisation.',
    points: 25
  },
  {
    id: '298',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la création ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la création divine',
      'Une création',
      'Une œuvre',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la création étudie la création divine.',
    points: 30
  },
  {
    id: '299',
    category: 'maitrise-theologie-avancee',
    difficulty: 'tres-difficile',
    level: 4,
    question: 'Complétez : "Au commencement, Dieu créa les cieux et la terre. La terre était informe et vide, et l\'Esprit de Dieu se mouvait au-dessus des..."',
    questionType: 'quote-completion',
    options: [
      'eaux',
      'eaux, car Dieu est créateur',
      'eaux, car tout vient de lui',
      'eaux, car il est tout-puissant'
    ],
    correctAnswer: 1,
    explanation: 'Genèse 1:1-2 : "Au commencement, Dieu créa les cieux et la terre. La terre était informe et vide, et l\'Esprit de Dieu se mouvait au-dessus des eaux."',
    points: 35,
    scripture: 'Genèse 1:1-2'
  },
  {
    id: '300',
    category: 'maitrise-theologie-avancee',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la fin des temps ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'eschatologie',
      'Une fin',
      'Un terme',
      'Une conclusion'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la fin des temps étudie l\'eschatologie.',
    points: 30
  },

  // ===== MAÎTRISE - PHILOSOPHIE CHRÉTIENNE (Questions 301-340) =====
  {
    id: '301',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la philosophie chrétienne ?',
    questionType: 'multiple-choice',
    options: [
      'L\'usage de la raison éclairée par la foi',
      'Une simple philosophie',
      'Une religion',
      'Une théologie'
    ],
    correctAnswer: 0,
    explanation: 'La philosophie chrétienne est l\'usage de la raison éclairée par la foi.',
    points: 30
  },
  {
    id: '302',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'La foi et la raison ne s\'opposent pas.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La foi et la raison ne s\'opposent pas, elles se complètent.',
    points: 25
  },
  {
    id: '303',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La foi cherche l\'intelligence, et l\'intelligence cherche la..."',
    questionType: 'quote-completion',
    options: [
      'foi',
      'foi, car elles se complètent',
      'vérité',
      'sagesse'
    ],
    correctAnswer: 1,
    explanation: 'Saint Anselme : "La foi cherche l\'intelligence, et l\'intelligence cherche la foi."',
    points: 35
  },
  {
    id: '304',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'existence de Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'Une vérité accessible à la raison',
      'Une simple croyance',
      'Une opinion',
      'Une conviction'
    ],
    correctAnswer: 0,
    explanation: 'L\'existence de Dieu est une vérité accessible à la raison.',
    points: 30
  },
  {
    id: '305',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Les preuves de l\'existence de Dieu sont rationnelles.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les preuves de l\'existence de Dieu sont rationnelles.',
    points: 25
  },
  {
    id: '306',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve cosmologique ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par la cause première',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve cosmologique est la preuve par la cause première.',
    points: 30
  },
  {
    id: '307',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Tout ce qui se meut est mû par un autre. Or il est impossible qu\'une série de moteurs s\'étende à l\'infini. Donc il faut arriver à un premier..."',
    questionType: 'quote-completion',
    options: [
      'moteur',
      'moteur, qui n\'est mû par aucun autre',
      'principe',
      'cause'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas d\'Aquin : "Tout ce qui se meut est mû par un autre... il faut arriver à un premier moteur."',
    points: 35
  },
  {
    id: '308',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve téléologique ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par l\'ordre du monde',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve téléologique est la preuve par l\'ordre du monde.',
    points: 30
  },
  {
    id: '309',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'La preuve ontologique est de saint Anselme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La preuve ontologique est de saint Anselme.',
    points: 25
  },
  {
    id: '310',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve morale ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par la conscience morale',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve morale est la preuve par la conscience morale.',
    points: 30
  },
  {
    id: '311',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'homme est naturellement religieux, car il cherche..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est créé à son image',
      'la vérité',
      'le bonheur'
    ],
    correctAnswer: 1,
    explanation: 'L\'homme est naturellement religieux, car il cherche Dieu.',
    points: 35
  },
  {
    id: '312',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la nature humaine ?',
    questionType: 'multiple-choice',
    options: [
      'L\'essence de l\'homme',
      'Un simple concept',
      'Une idée',
      'Une notion'
    ],
    correctAnswer: 0,
    explanation: 'La nature humaine est l\'essence de l\'homme.',
    points: 30
  },
  {
    id: '313',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'homme est corps et âme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'homme est corps et âme, un être composé.',
    points: 25
  },
  {
    id: '314',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liberté humaine ?',
    questionType: 'multiple-choice',
    options: [
      'La capacité de choisir le bien',
      'Une simple volonté',
      'Un désir',
      'Une envie'
    ],
    correctAnswer: 0,
    explanation: 'La liberté humaine est la capacité de choisir le bien.',
    points: 30
  },
  {
    id: '315',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La vérité vous rendra..."',
    questionType: 'quote-completion',
    options: [
      'libres',
      'libres, car la vérité libère',
      'heureux',
      'sages'
    ],
    correctAnswer: 1,
    explanation: 'Jean 8:32 : "La vérité vous rendra libres."',
    points: 35,
    scripture: 'Jean 8:32'
  },
  {
    id: '316',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la loi naturelle ?',
    questionType: 'multiple-choice',
    options: [
      'La loi morale inscrite dans le cœur',
      'Une loi civile',
      'Une loi religieuse',
      'Une loi humaine'
    ],
    correctAnswer: 0,
    explanation: 'La loi naturelle est la loi morale inscrite dans le cœur de l\'homme.',
    points: 30
  },
  {
    id: '317',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'La conscience morale est universelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La conscience morale est universelle.',
    points: 25
  },
  {
    id: '318',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le bien objectif ?',
    questionType: 'multiple-choice',
    options: [
      'Le bien en soi',
      'Un bien relatif',
      'Un bien subjectif',
      'Un bien personnel'
    ],
    correctAnswer: 0,
    explanation: 'Le bien objectif est le bien en soi, indépendant des préférences.',
    points: 30
  },
  {
    id: '319',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le bien est ce qui est conforme à la..."',
    questionType: 'quote-completion',
    options: [
      'nature',
      'nature, car Dieu a créé l\'homme bon',
      'volonté',
      'raison'
    ],
    correctAnswer: 1,
    explanation: 'Le bien est ce qui est conforme à la nature.',
    points: 35
  },
  {
    id: '320',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vertu ?',
    questionType: 'multiple-choice',
    options: [
      'Une disposition stable au bien',
      'Une simple qualité',
      'Un trait de caractère',
      'Une habitude'
    ],
    correctAnswer: 0,
    explanation: 'La vertu est une disposition stable au bien.',
    points: 30
  },
  {
    id: '321',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Les vertus cardinales sont au nombre de quatre.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les vertus cardinales sont : prudence, justice, force, tempérance.',
    points: 25
  },
  {
    id: '322',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le bonheur ?',
    questionType: 'multiple-choice',
    options: [
      'La fin ultime de l\'homme',
      'Un simple plaisir',
      'Une émotion',
      'Un sentiment'
    ],
    correctAnswer: 0,
    explanation: 'Le bonheur est la fin ultime de l\'homme.',
    points: 30
  },
  {
    id: '323',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Tu nous as faits pour toi, Seigneur, et notre cœur est sans repos tant qu\'il ne..."',
    questionType: 'quote-completion',
    options: [
      'repose en toi',
      'repose en toi, car tu es notre fin',
      'te trouve',
      'te rencontre'
    ],
    correctAnswer: 1,
    explanation: 'Saint Augustin : "Tu nous as faits pour toi, Seigneur, et notre cœur est sans repos tant qu\'il ne repose en toi."',
    points: 35
  },
  {
    id: '324',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'amour ?',
    questionType: 'multiple-choice',
    options: [
      'La volonté du bien de l\'autre',
      'Un simple sentiment',
      'Une émotion',
      'Une passion'
    ],
    correctAnswer: 0,
    explanation: 'L\'amour est la volonté du bien de l\'autre.',
    points: 30
  },
  {
    id: '325',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'amour est plus fort que la mort.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'amour est plus fort que la mort.',
    points: 25
  },
  {
    id: '326',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la personne humaine ?',
    questionType: 'multiple-choice',
    options: [
      'Un être unique et irremplaçable',
      'Un simple individu',
      'Un sujet',
      'Un objet'
    ],
    correctAnswer: 0,
    explanation: 'La personne humaine est un être unique et irremplaçable.',
    points: 30
  },
  {
    id: '327',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'homme est créé à l\'image et à la ressemblance de..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est son enfant',
      'Dieu, car il est son reflet',
      'Dieu, car il est son œuvre'
    ],
    correctAnswer: 1,
    explanation: 'Genèse 1:27 : "L\'homme est créé à l\'image et à la ressemblance de Dieu."',
    points: 35,
    scripture: 'Genèse 1:27'
  },
  {
    id: '328',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la dignité humaine ?',
    questionType: 'multiple-choice',
    options: [
      'La valeur intrinsèque de l\'homme',
      'Un simple respect',
      'Une considération',
      'Une estime'
    ],
    correctAnswer: 0,
    explanation: 'La dignité humaine est la valeur intrinsèque de l\'homme.',
    points: 30
  },
  {
    id: '329',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'La dignité humaine est inaliénable.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La dignité humaine est inaliénable.',
    points: 25
  },
  {
    id: '330',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la solidarité ?',
    questionType: 'multiple-choice',
    options: [
      'La responsabilité mutuelle entre les hommes',
      'Un simple lien',
      'Une relation',
      'Une connexion'
    ],
    correctAnswer: 0,
    explanation: 'La solidarité est la responsabilité mutuelle entre les hommes.',
    points: 30
  },
  {
    id: '331',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Nous sommes tous responsables de..."',
    questionType: 'quote-completion',
    options: [
      'tous',
      'tous, car nous formons une seule famille',
      'chacun',
      'l\'autre'
    ],
    correctAnswer: 1,
    explanation: 'Nous sommes tous responsables de tous.',
    points: 35
  },
  {
    id: '332',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le bien commun ?',
    questionType: 'multiple-choice',
    options: [
      'Le bien de tous et de chacun',
      'Un bien collectif',
      'Un bien public',
      'Un bien social'
    ],
    correctAnswer: 0,
    explanation: 'Le bien commun est le bien de tous et de chacun.',
    points: 30
  },
  {
    id: '333',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Le bien commun prime sur l\'intérêt particulier.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le bien commun prime sur l\'intérêt particulier.',
    points: 25
  },
  {
    id: '334',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la subsidiarité ?',
    questionType: 'multiple-choice',
    options: [
      'Le principe de non-intervention',
      'Un principe politique',
      'Un principe social',
      'Un principe économique'
    ],
    correctAnswer: 0,
    explanation: 'La subsidiarité est le principe de non-intervention.',
    points: 30
  },
  {
    id: '335',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Rendez à César ce qui est à César, et à Dieu ce qui est à..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car Dieu est souverain',
      'Dieu, car il est le maître',
      'Dieu, car il est le créateur'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 22:21 : "Rendez à César ce qui est à César, et à Dieu ce qui est à Dieu."',
    points: 35,
    scripture: 'Matthieu 22:21'
  },
  {
    id: '336',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la justice sociale ?',
    questionType: 'multiple-choice',
    options: [
      'La justice dans les relations sociales',
      'Une justice politique',
      'Une justice économique',
      'Une justice légale'
    ],
    correctAnswer: 0,
    explanation: 'La justice sociale est la justice dans les relations sociales.',
    points: 30
  },
  {
    id: '337',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'La justice sociale est une exigence évangélique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La justice sociale est une exigence évangélique.',
    points: 25
  },
  {
    id: '338',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la paix ?',
    questionType: 'multiple-choice',
    options: [
      'Le fruit de la justice',
      'Une simple absence de guerre',
      'Un état',
      'Une situation'
    ],
    correctAnswer: 0,
    explanation: 'La paix est le fruit de la justice.',
    points: 30
  },
  {
    id: '339',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les artisans de paix, car ils seront appelés..."',
    questionType: 'quote-completion',
    options: [
      'fils de Dieu',
      'fils de Dieu, car ils imitent le Père',
      'enfants de Dieu',
      'serviteurs de Dieu'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:9 : "Heureux les artisans de paix, car ils seront appelés fils de Dieu."',
    points: 35,
    scripture: 'Matthieu 5:9'
  },
  {
    id: '340',
    category: 'maitrise-philosophie-chretienne',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la sagesse ?',
    questionType: 'multiple-choice',
    options: [
      'La connaissance des fins dernières',
      'Une simple intelligence',
      'Un savoir',
      'Une compréhension'
    ],
    correctAnswer: 0,
    explanation: 'La sagesse est la connaissance des fins dernières.',
    points: 30
  },

  // ===== MAÎTRISE - LITURGIE ET SACREMENTS (Questions 341-380) =====
  {
    id: '341',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie ?',
    questionType: 'multiple-choice',
    options: [
      'Le culte public de l\'Église',
      'Une simple cérémonie',
      'Un rite',
      'Une prière'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie est le culte public de l\'Église.',
    points: 30
  },
  {
    id: '342',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'La liturgie est l\'œuvre du Christ et de l\'Église.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La liturgie est l\'œuvre du Christ et de l\'Église.',
    points: 25
  },
  {
    id: '343',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La liturgie est la source et le sommet de toute la vie..."',
    questionType: 'quote-completion',
    options: [
      'chrétienne',
      'chrétienne et ecclésiale',
      'de l\'Église',
      'spirituelle'
    ],
    correctAnswer: 1,
    explanation: 'La liturgie est la source et le sommet de toute la vie chrétienne et ecclésiale.',
    points: 35
  },
  {
    id: '344',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'année liturgique ?',
    questionType: 'multiple-choice',
    options: [
      'Le cycle des fêtes chrétiennes',
      'Une année civile',
      'Un calendrier',
      'Un programme'
    ],
    correctAnswer: 0,
    explanation: 'L\'année liturgique est le cycle des fêtes chrétiennes.',
    points: 30
  },
  {
    id: '345',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Le temps de l\'Avent prépare Noël.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le temps de l\'Avent prépare Noël.',
    points: 25
  },
  {
    id: '346',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le Carême ?',
    questionType: 'multiple-choice',
    options: [
      'Le temps de préparation à Pâques',
      'Un simple jeûne',
      'Une période',
      'Une saison'
    ],
    correctAnswer: 0,
    explanation: 'Le Carême est le temps de préparation à Pâques.',
    points: 30
  },
  {
    id: '347',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le temps pascal dure cinquante jours jusqu\'à la..."',
    questionType: 'quote-completion',
    options: [
      'Pentecôte',
      'Pentecôte, fête de l\'Esprit Saint',
      'Pentecôte, naissance de l\'Église',
      'Pentecôte, descente de l\'Esprit'
    ],
    correctAnswer: 1,
    explanation: 'Le temps pascal dure cinquante jours jusqu\'à la Pentecôte.',
    points: 35
  },
  {
    id: '348',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la messe ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrifice eucharistique',
      'Une simple prière',
      'Un office',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La messe est le sacrifice eucharistique.',
    points: 30
  },
  {
    id: '349',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'La messe renouvelle le sacrifice du Calvaire.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La messe renouvelle le sacrifice du Calvaire.',
    points: 25
  },
  {
    id: '350',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'Eucharistie ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement du Corps et du Sang du Christ',
      'Un simple repas',
      'Une cérémonie',
      'Un rite'
    ],
    correctAnswer: 0,
    explanation: 'L\'Eucharistie est le sacrement du Corps et du Sang du Christ.',
    points: 30
  },
  {
    id: '351',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ceci est mon corps, livré pour vous, faites ceci en..."',
    questionType: 'quote-completion',
    options: [
      'mémoire de moi',
      'mémoire de moi, car je vous aime',
      'souvenir de moi',
      'honneur de moi'
    ],
    correctAnswer: 1,
    explanation: 'Luc 22:19 : "Ceci est mon corps, livré pour vous, faites ceci en mémoire de moi."',
    points: 35,
    scripture: 'Luc 22:19'
  },
  {
    id: '352',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la transsubstantiation ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation du pain en Corps du Christ',
      'Un simple changement',
      'Une transformation',
      'Une conversion'
    ],
    correctAnswer: 0,
    explanation: 'La transsubstantiation est la transformation du pain en Corps du Christ.',
    points: 30
  },
  {
    id: '353',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'Eucharistie est le sacrement le plus important.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Eucharistie est le sacrement le plus important.',
    points: 25
  },
  {
    id: '354',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la communion ?',
    questionType: 'multiple-choice',
    options: [
      'Recevoir le Corps du Christ',
      'Une simple participation',
      'Un partage',
      'Une union'
    ],
    correctAnswer: 0,
    explanation: 'La communion est recevoir le Corps du Christ.',
    points: 30
  },
  {
    id: '355',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Qui mange ma chair et boit mon sang a la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle, car je suis la vie',
      'bienheureuse',
      'sans fin'
    ],
    correctAnswer: 1,
    explanation: 'Jean 6:54 : "Qui mange ma chair et boit mon sang a la vie éternelle."',
    points: 35,
    scripture: 'Jean 6:54'
  },
  {
    id: '356',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le baptême ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement de la nouvelle naissance',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'Le baptême est le sacrement de la nouvelle naissance.',
    points: 30
  },
  {
    id: '357',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Le baptême efface le péché originel.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le baptême efface le péché originel.',
    points: 25
  },
  {
    id: '358',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la confirmation ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement de la force',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La confirmation est le sacrement de la force.',
    points: 30
  },
  {
    id: '359',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Recevez l\'Esprit Saint. À qui vous remettrez les péchés, ils seront..."',
    questionType: 'quote-completion',
    options: [
      'remis',
      'remis, car vous avez le pouvoir',
      'pardonnés',
      'effacés'
    ],
    correctAnswer: 1,
    explanation: 'Jean 20:22-23 : "Recevez l\'Esprit Saint. À qui vous remettrez les péchés, ils seront remis."',
    points: 35,
    scripture: 'Jean 20:22-23'
  },
  {
    id: '360',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pénitence ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement du pardon',
      'Un simple aveu',
      'Une confession',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La pénitence est le sacrement du pardon.',
    points: 30
  },
  {
    id: '361',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'La confession est obligatoire pour les péchés mortels.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La confession est obligatoire pour les péchés mortels.',
    points: 25
  },
  {
    id: '362',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'absolution ?',
    questionType: 'multiple-choice',
    options: [
      'La formule de pardon',
      'Un simple pardon',
      'Une remise',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'L\'absolution est la formule de pardon.',
    points: 30
  },
  {
    id: '363',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Je vous absous de vos péchés au nom du Père, et du Fils, et du..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint-Esprit, car Dieu pardonne',
      'Saint Esprit',
      'Esprit Saint'
    ],
    correctAnswer: 1,
    explanation: 'La formule d\'absolution : "Je vous absous de vos péchés au nom du Père, et du Fils, et du Saint-Esprit."',
    points: 35
  },
  {
    id: '364',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'onction des malades ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement des malades',
      'Un simple geste',
      'Une prière',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'L\'onction des malades est le sacrement des malades.',
    points: 30
  },
  {
    id: '365',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'onction des malades peut être reçue plusieurs fois.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'onction des malades peut être reçue plusieurs fois.',
    points: 25
  },
  {
    id: '366',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'ordre ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement du ministère',
      'Un simple ordre',
      'Une fonction',
      'Un rôle'
    ],
    correctAnswer: 0,
    explanation: 'L\'ordre est le sacrement du ministère.',
    points: 30
  },
  {
    id: '367',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'ordre est le sacrement par lequel la mission confiée par le Christ à ses apôtres continue à être exercée dans l\'Église jusqu\'à la fin des..."',
    questionType: 'quote-completion',
    options: [
      'temps',
      'temps, car l\'Église est apostolique',
      'siècles',
      'âges'
    ],
    correctAnswer: 1,
    explanation: 'L\'ordre est le sacrement par lequel la mission confiée par le Christ à ses apôtres continue à être exercée dans l\'Église jusqu\'à la fin des temps.',
    points: 35
  },
  {
    id: '368',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le mariage ?',
    questionType: 'multiple-choice',
    options: [
      'Le sacrement de l\'alliance',
      'Un simple contrat',
      'Une union',
      'Un lien'
    ],
    correctAnswer: 0,
    explanation: 'Le mariage est le sacrement de l\'alliance.',
    points: 30
  },
  {
    id: '369',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Le mariage est indissoluble.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le mariage est indissoluble.',
    points: 25
  },
  {
    id: '370',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie des Heures ?',
    questionType: 'multiple-choice',
    options: [
      'La prière officielle de l\'Église',
      'Une simple prière',
      'Un office',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie des Heures est la prière officielle de l\'Église.',
    points: 30
  },
  {
    id: '371',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Sept fois le jour je te loue pour tes justes..."',
    questionType: 'quote-completion',
    options: [
      'ordonnances',
      'ordonnances, car tu es fidèle',
      'lois',
      'commandements'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 119:164 : "Sept fois le jour je te loue pour tes justes ordonnances."',
    points: 35,
    scripture: 'Psaume 119:164'
  },
  {
    id: '372',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie funéraire ?',
    questionType: 'multiple-choice',
    options: [
      'Les rites pour les défunts',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie funéraire comprend les rites pour les défunts.',
    points: 30
  },
  {
    id: '373',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'La liturgie funéraire exprime l\'espérance.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La liturgie funéraire exprime l\'espérance de la résurrection.',
    points: 25
  },
  {
    id: '374',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie baptismale ?',
    questionType: 'multiple-choice',
    options: [
      'Les rites du baptême',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie baptismale comprend les rites du baptême.',
    points: 30
  },
  {
    id: '375',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Je te baptise au nom du Père, et du Fils, et du..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint-Esprit, car tu es enfant de Dieu',
      'Saint Esprit',
      'Esprit Saint'
    ],
    correctAnswer: 1,
    explanation: 'La formule baptismale : "Je te baptise au nom du Père, et du Fils, et du Saint-Esprit."',
    points: 35
  },
  {
    id: '376',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie eucharistique ?',
    questionType: 'multiple-choice',
    options: [
      'Les rites de l\'Eucharistie',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie eucharistique comprend les rites de l\'Eucharistie.',
    points: 30
  },
  {
    id: '377',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'La liturgie eucharistique est le cœur de la messe.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La liturgie eucharistique est le cœur de la messe.',
    points: 25
  },
  {
    id: '378',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie de la Parole ?',
    questionType: 'multiple-choice',
    options: [
      'La proclamation de la Parole de Dieu',
      'Un simple rite',
      'Une lecture',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie de la Parole est la proclamation de la Parole de Dieu.',
    points: 30
  },
  {
    id: '379',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ta parole est une lampe à mes pieds, et une lumière sur mon..."',
    questionType: 'quote-completion',
    options: [
      'sentier',
      'sentier, car elle guide',
      'chemin',
      'route'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 119:105 : "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier."',
    points: 35,
    scripture: 'Psaume 119:105'
  },
  {
    id: '380',
    category: 'maitrise-liturgie-sacrements',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liturgie pénitentielle ?',
    questionType: 'multiple-choice',
    options: [
      'Les rites de la pénitence',
      'Un simple rite',
      'Une cérémonie',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La liturgie pénitentielle comprend les rites de la pénitence.',
    points: 30
  },

  // ===== MAÎTRISE - ÉTHIQUE ET MORALE (Questions 381-420) =====
  {
    id: '381',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'éthique ?',
    questionType: 'multiple-choice',
    options: [
      'La science du bien et du mal',
      'Une simple morale',
      'Une philosophie',
      'Une doctrine'
    ],
    correctAnswer: 0,
    explanation: 'L\'éthique est la science du bien et du mal.',
    points: 30
  },
  {
    id: '382',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'éthique chrétienne est fondée sur l\'amour.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'éthique chrétienne est fondée sur l\'amour.',
    points: 25
  },
  {
    id: '383',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Aimez-vous les uns les autres comme je vous ai..."',
    questionType: 'quote-completion',
    options: [
      'aimés',
      'aimés, car l\'amour est la loi',
      'aimés, car je vous aime',
      'aimés, car Dieu vous aime'
    ],
    correctAnswer: 1,
    explanation: 'Jean 13:34 : "Aimez-vous les uns les autres comme je vous ai aimés."',
    points: 35,
    scripture: 'Jean 13:34'
  },
  {
    id: '384',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la conscience morale ?',
    questionType: 'multiple-choice',
    options: [
      'La voix de Dieu dans le cœur',
      'Une simple intuition',
      'Un sentiment',
      'Une émotion'
    ],
    correctAnswer: 0,
    explanation: 'La conscience morale est la voix de Dieu dans le cœur.',
    points: 30
  },
  {
    id: '385',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La conscience morale doit être formée.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La conscience morale doit être formée.',
    points: 25
  },
  {
    id: '386',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le péché ?',
    questionType: 'multiple-choice',
    options: [
      'Un acte contraire à la loi de Dieu',
      'Une simple erreur',
      'Une faute',
      'Un défaut'
    ],
    correctAnswer: 0,
    explanation: 'Le péché est un acte contraire à la loi de Dieu.',
    points: 30
  },
  {
    id: '387',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le salaire du péché, c\'est la..."',
    questionType: 'quote-completion',
    options: [
      'mort',
      'mort, mais le don gratuit de Dieu, c\'est la vie éternelle',
      'souffrance',
      'séparation'
    ],
    correctAnswer: 1,
    explanation: 'Romains 6:23 : "Le salaire du péché, c\'est la mort, mais le don gratuit de Dieu, c\'est la vie éternelle."',
    points: 35,
    scripture: 'Romains 6:23'
  },
  {
    id: '388',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le péché mortel ?',
    questionType: 'multiple-choice',
    options: [
      'Un péché grave qui tue la grâce',
      'Un simple péché',
      'Une faute',
      'Un défaut'
    ],
    correctAnswer: 0,
    explanation: 'Le péché mortel est un péché grave qui tue la grâce.',
    points: 30
  },
  {
    id: '389',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Le péché véniel n\'ôte pas la grâce.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le péché véniel n\'ôte pas la grâce.',
    points: 25
  },
  {
    id: '390',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vertu ?',
    questionType: 'multiple-choice',
    options: [
      'Une disposition stable au bien',
      'Une simple qualité',
      'Un trait de caractère',
      'Une habitude'
    ],
    correctAnswer: 0,
    explanation: 'La vertu est une disposition stable au bien.',
    points: 30
  },
  {
    id: '391',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Les fruits de l\'Esprit sont : amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de..."',
    questionType: 'quote-completion',
    options: [
      'soi',
      'soi, car l\'Esprit nous sanctifie',
      'soi, car nous sommes libres',
      'soi, car nous sommes saints'
    ],
    correctAnswer: 1,
    explanation: 'Galates 5:22-23 : "Les fruits de l\'Esprit sont : amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de soi."',
    points: 35,
    scripture: 'Galates 5:22-23'
  },
  {
    id: '392',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la charité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu théologale de l\'amour',
      'Un simple don',
      'Une aumône',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La charité est la vertu théologale de l\'amour.',
    points: 30
  },
  {
    id: '393',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La charité est la plus grande des vertus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La charité est la plus grande des vertus.',
    points: 25
  },
  {
    id: '394',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la justice ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui rend à chacun son dû',
      'Un simple principe',
      'Une loi',
      'Un droit'
    ],
    correctAnswer: 0,
    explanation: 'La justice est la vertu qui rend à chacun son dû.',
    points: 30
  },
  {
    id: '395',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux ceux qui ont faim et soif de la justice, car ils seront..."',
    questionType: 'quote-completion',
    options: [
      'rassasiés',
      'rassasiés, car Dieu est juste',
      'satisfaits',
      'comblés'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:6 : "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés."',
    points: 35,
    scripture: 'Matthieu 5:6'
  },
  {
    id: '396',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prudence ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui discerne le bien',
      'Une simple sagesse',
      'Une intelligence',
      'Une compréhension'
    ],
    correctAnswer: 0,
    explanation: 'La prudence est la vertu qui discerne le bien.',
    points: 30
  },
  {
    id: '397',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La prudence est la mère de toutes les vertus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prudence est la mère de toutes les vertus.',
    points: 25
  },
  {
    id: '398',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la force ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui surmonte les difficultés',
      'Une simple courage',
      'Une bravoure',
      'Une audace'
    ],
    correctAnswer: 0,
    explanation: 'La force est la vertu qui surmonte les difficultés.',
    points: 30
  },
  {
    id: '399',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ma grâce te suffit, car ma puissance s\'accomplit dans la..."',
    questionType: 'quote-completion',
    options: [
      'faiblesse',
      'faiblesse, car Dieu est fort',
      'pauvreté',
      'humilité'
    ],
    correctAnswer: 1,
    explanation: '2 Corinthiens 12:9 : "Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse."',
    points: 35,
    scripture: '2 Corinthiens 12:9'
  },
  {
    id: '400',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la tempérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui modère les désirs',
      'Une simple modération',
      'Une sobriété',
      'Une abstinence'
    ],
    correctAnswer: 0,
    explanation: 'La tempérance est la vertu qui modère les désirs.',
    points: 30
  },
  {
    id: '401',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La tempérance est nécessaire pour la liberté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La tempérance est nécessaire pour la liberté.',
    points: 25
  },
  {
    id: '402',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'humilité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui reconnaît la vérité',
      'Une simple modestie',
      'Une humilité',
      'Une soumission'
    ],
    correctAnswer: 0,
    explanation: 'L\'humilité est la vertu qui reconnaît la vérité.',
    points: 30
  },
  {
    id: '403',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Apprenez de moi que je suis doux et humble de..."',
    questionType: 'quote-completion',
    options: [
      'cœur',
      'cœur, car je suis votre maître',
      'cœur, car je vous aime',
      'cœur, car je suis votre serviteur'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 11:29 : "Apprenez de moi que je suis doux et humble de cœur."',
    points: 35,
    scripture: 'Matthieu 11:29'
  },
  {
    id: '404',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la chasteté ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui ordonne la sexualité',
      'Une simple pureté',
      'Une abstinence',
      'Une continence'
    ],
    correctAnswer: 0,
    explanation: 'La chasteté est la vertu qui ordonne la sexualité.',
    points: 30
  },
  {
    id: '405',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La chasteté est une vertu pour tous.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La chasteté est une vertu pour tous.',
    points: 25
  },
  {
    id: '406',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pauvreté évangélique ?',
    questionType: 'multiple-choice',
    options: [
      'La liberté par rapport aux biens',
      'Une simple pauvreté',
      'Une indigence',
      'Une misère'
    ],
    correctAnswer: 0,
    explanation: 'La pauvreté évangélique est la liberté par rapport aux biens.',
    points: 30
  },
  {
    id: '407',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les pauvres de cœur, car le royaume des cieux est à..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car ils sont libres',
      'eux, car ils sont humbles',
      'eux, car ils sont saints'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:3 : "Heureux les pauvres de cœur, car le royaume des cieux est à eux."',
    points: 35,
    scripture: 'Matthieu 5:3'
  },
  {
    id: '408',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'obéissance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui soumet la volonté',
      'Une simple soumission',
      'Une docilité',
      'Une conformité'
    ],
    correctAnswer: 0,
    explanation: 'L\'obéissance est la vertu qui soumet la volonté.',
    points: 30
  },
  {
    id: '409',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'obéissance est une vertu libératrice.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'obéissance est une vertu libératrice.',
    points: 25
  },
  {
    id: '410',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la miséricorde ?',
    questionType: 'multiple-choice',
    options: [
      'L\'amour qui pardonne',
      'Un simple pardon',
      'Une pitié',
      'Une compassion'
    ],
    correctAnswer: 0,
    explanation: 'La miséricorde est l\'amour qui pardonne.',
    points: 30
  },
  {
    id: '411',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Soyez miséricordieux comme votre Père est..."',
    questionType: 'quote-completion',
    options: [
      'miséricordieux',
      'miséricordieux, car il pardonne',
      'bon',
      'amour'
    ],
    correctAnswer: 1,
    explanation: 'Luc 6:36 : "Soyez miséricordieux comme votre Père est miséricordieux."',
    points: 35,
    scripture: 'Luc 6:36'
  },
  {
    id: '412',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vérité ?',
    questionType: 'multiple-choice',
    options: [
      'L\'adéquation de l\'esprit à la réalité',
      'Une simple exactitude',
      'Une précision',
      'Une justesse'
    ],
    correctAnswer: 0,
    explanation: 'La vérité est l\'adéquation de l\'esprit à la réalité.',
    points: 30
  },
  {
    id: '413',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La vérité nous rend libres.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La vérité nous rend libres.',
    points: 25
  },
  {
    id: '414',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liberté ?',
    questionType: 'multiple-choice',
    options: [
      'La capacité de choisir le bien',
      'Une simple indépendance',
      'Une autonomie',
      'Une souveraineté'
    ],
    correctAnswer: 0,
    explanation: 'La liberté est la capacité de choisir le bien.',
    points: 30
  },
  {
    id: '415',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "C\'est pour la liberté que le Christ nous a..."',
    questionType: 'quote-completion',
    options: [
      'affranchis',
      'affranchis, car nous sommes libres',
      'libérés',
      'sauvé'
    ],
    correctAnswer: 1,
    explanation: 'Galates 5:1 : "C\'est pour la liberté que le Christ nous a affranchis."',
    points: 35,
    scripture: 'Galates 5:1'
  },
  {
    id: '416',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la responsabilité ?',
    questionType: 'multiple-choice',
    options: [
      'La capacité de répondre de ses actes',
      'Une simple obligation',
      'Un devoir',
      'Une charge'
    ],
    correctAnswer: 0,
    explanation: 'La responsabilité est la capacité de répondre de ses actes.',
    points: 30
  },
  {
    id: '417',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La responsabilité est liée à la liberté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La responsabilité est liée à la liberté.',
    points: 25
  },
  {
    id: '418',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la solidarité ?',
    questionType: 'multiple-choice',
    options: [
      'La responsabilité mutuelle',
      'Un simple lien',
      'Une relation',
      'Une connexion'
    ],
    correctAnswer: 0,
    explanation: 'La solidarité est la responsabilité mutuelle.',
    points: 30
  },
  {
    id: '419',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Nous sommes tous responsables de..."',
    questionType: 'quote-completion',
    options: [
      'tous',
      'tous, car nous formons une seule famille',
      'chacun',
      'l\'autre'
    ],
    correctAnswer: 1,
    explanation: 'Nous sommes tous responsables de tous.',
    points: 35
  },
  {
    id: '420',
    category: 'maitrise-ethique-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le bien commun ?',
    questionType: 'multiple-choice',
    options: [
      'Le bien de tous et de chacun',
      'Un bien collectif',
      'Un bien public',
      'Un bien social'
    ],
    correctAnswer: 0,
    explanation: 'Le bien commun est le bien de tous et de chacun.',
    points: 30
  },

  // ===== MAÎTRISE - SPIRITUALITÉ ET PRIÈRE (Questions 421-460) =====
  {
    id: '421',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la spiritualité ?',
    questionType: 'multiple-choice',
    options: [
      'La vie de l\'Esprit en nous',
      'Une simple dévotion',
      'Une piété',
      'Une religion'
    ],
    correctAnswer: 0,
    explanation: 'La spiritualité est la vie de l\'Esprit en nous.',
    points: 30
  },
  {
    id: '422',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La spiritualité chrétienne est christocentrique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La spiritualité chrétienne est centrée sur le Christ.',
    points: 25
  },
  {
    id: '423',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Je suis le chemin, la vérité et la..."',
    questionType: 'quote-completion',
    options: [
      'vie',
      'vie, car je suis la résurrection',
      'vie, car je suis le Sauveur',
      'vie, car je suis le Messie'
    ],
    correctAnswer: 1,
    explanation: 'Jean 14:6 : "Je suis le chemin, la vérité et la vie."',
    points: 35,
    scripture: 'Jean 14:6'
  },
  {
    id: '424',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière ?',
    questionType: 'multiple-choice',
    options: [
      'L\'élévation de l\'âme vers Dieu',
      'Une simple demande',
      'Une supplication',
      'Une requête'
    ],
    correctAnswer: 0,
    explanation: 'La prière est l\'élévation de l\'âme vers Dieu.',
    points: 30
  },
  {
    id: '425',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière est un dialogue avec Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière est un dialogue avec Dieu.',
    points: 25
  },
  {
    id: '426',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de demande ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui demande à Dieu',
      'Une simple demande',
      'Une supplication',
      'Une requête'
    ],
    correctAnswer: 0,
    explanation: 'La prière de demande est la prière qui demande à Dieu.',
    points: 30
  },
  {
    id: '427',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Demandez et vous recevrez, cherchez et vous trouverez, frappez et l\'on vous..."',
    questionType: 'quote-completion',
    options: [
      'ouvrira',
      'ouvrira, car Dieu est bon',
      'ouvrira, car il écoute',
      'ouvrira, car il aime'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 7:7 : "Demandez et vous recevrez, cherchez et vous trouverez, frappez et l\'on vous ouvrira."',
    points: 35,
    scripture: 'Matthieu 7:7'
  },
  {
    id: '428',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière d\'action de grâce ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui remercie Dieu',
      'Un simple merci',
      'Une gratitude',
      'Une reconnaissance'
    ],
    correctAnswer: 0,
    explanation: 'La prière d\'action de grâce est la prière qui remercie Dieu.',
    points: 30
  },
  {
    id: '429',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière d\'action de grâce est toujours appropriée.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière d\'action de grâce est toujours appropriée.',
    points: 25
  },
  {
    id: '430',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de louange ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui glorifie Dieu',
      'Un simple chant',
      'Une adoration',
      'Une vénération'
    ],
    correctAnswer: 0,
    explanation: 'La prière de louange est la prière qui glorifie Dieu.',
    points: 30
  },
  {
    id: '431',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Louez le Seigneur, toutes les nations, louez-le, tous les..."',
    questionType: 'quote-completion',
    options: [
      'peuples',
      'peuples, car il est fidèle',
      'peuples, car il est bon',
      'peuples, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 117:1 : "Louez le Seigneur, toutes les nations, louez-le, tous les peuples."',
    points: 35,
    scripture: 'Psaume 117:1'
  },
  {
    id: '432',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de pénitence ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui demande pardon',
      'Un simple aveu',
      'Une confession',
      'Une repentance'
    ],
    correctAnswer: 0,
    explanation: 'La prière de pénitence est la prière qui demande pardon.',
    points: 30
  },
  {
    id: '433',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière de pénitence est nécessaire pour la conversion.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière de pénitence est nécessaire pour la conversion.',
    points: 25
  },
  {
    id: '434',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière d\'adoration ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui adore Dieu',
      'Un simple culte',
      'Une vénération',
      'Une dévotion'
    ],
    correctAnswer: 0,
    explanation: 'La prière d\'adoration est la prière qui adore Dieu.',
    points: 30
  },
  {
    id: '435',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Adorez le Seigneur dans la splendeur de sa..."',
    questionType: 'quote-completion',
    options: [
      'sainteté',
      'sainteté, car il est saint',
      'sainteté, car il est Dieu',
      'sainteté, car il est roi'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 29:2 : "Adorez le Seigneur dans la splendeur de sa sainteté."',
    points: 35,
    scripture: 'Psaume 29:2'
  },
  {
    id: '436',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière contemplative ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui contemple Dieu',
      'Une simple méditation',
      'Une réflexion',
      'Une pensée'
    ],
    correctAnswer: 0,
    explanation: 'La prière contemplative est la prière qui contemple Dieu.',
    points: 30
  },
  {
    id: '437',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière contemplative est un don de Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière contemplative est un don de Dieu.',
    points: 25
  },
  {
    id: '438',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière vocale ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui utilise des mots',
      'Une simple prière',
      'Une oraison',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La prière vocale est la prière qui utilise des mots.',
    points: 30
  },
  {
    id: '439',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Notre Père qui es aux cieux, que ton nom soit..."',
    questionType: 'quote-completion',
    options: [
      'sanctifié',
      'sanctifié, car tu es saint',
      'sanctifié, car tu es Dieu',
      'sanctifié, car tu es roi'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 6:9 : "Notre Père qui es aux cieux, que ton nom soit sanctifié."',
    points: 35,
    scripture: 'Matthieu 6:9'
  },
  {
    id: '440',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière mentale ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui se fait en silence',
      'Une simple pensée',
      'Une méditation',
      'Une réflexion'
    ],
    correctAnswer: 0,
    explanation: 'La prière mentale est la prière qui se fait en silence.',
    points: 30
  },
  {
    id: '441',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière mentale est plus profonde que la prière vocale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière mentale est plus profonde que la prière vocale.',
    points: 25
  },
  {
    id: '442',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière liturgique ?',
    questionType: 'multiple-choice',
    options: [
      'La prière officielle de l\'Église',
      'Une simple prière',
      'Un office',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La prière liturgique est la prière officielle de l\'Église.',
    points: 30
  },
  {
    id: '443',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Là où deux ou trois sont réunis en mon nom, je suis au milieu..."',
    questionType: 'quote-completion',
    options: [
      'd\'eux',
      'd\'eux, car je suis présent',
      'd\'eux, car je vous aime',
      'd\'eux, car je suis Dieu'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 18:20 : "Là où deux ou trois sont réunis en mon nom, je suis au milieu d\'eux."',
    points: 35,
    scripture: 'Matthieu 18:20'
  },
  {
    id: '444',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière personnelle ?',
    questionType: 'multiple-choice',
    options: [
      'La prière faite seul avec Dieu',
      'Une simple prière',
      'Une oraison',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La prière personnelle est la prière faite seul avec Dieu.',
    points: 30
  },
  {
    id: '445',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière personnelle est nécessaire pour la vie spirituelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière personnelle est nécessaire pour la vie spirituelle.',
    points: 25
  },
  {
    id: '446',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière familiale ?',
    questionType: 'multiple-choice',
    options: [
      'La prière faite en famille',
      'Une simple prière',
      'Un office',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La prière familiale est la prière faite en famille.',
    points: 30
  },
  {
    id: '447',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La famille qui prie ensemble reste..."',
    questionType: 'quote-completion',
    options: [
      'ensemble',
      'ensemble, car Dieu unit',
      'unie',
      'forte'
    ],
    correctAnswer: 1,
    explanation: 'La famille qui prie ensemble reste ensemble.',
    points: 35
  },
  {
    id: '448',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière du cœur ?',
    questionType: 'multiple-choice',
    options: [
      'La prière qui vient du cœur',
      'Une simple prière',
      'Une oraison',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La prière du cœur est la prière qui vient du cœur.',
    points: 30
  },
  {
    id: '449',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière du cœur est la plus authentique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière du cœur est la plus authentique.',
    points: 25
  },
  {
    id: '450',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de Jésus ?',
    questionType: 'multiple-choice',
    options: [
      'La prière du Notre Père',
      'Une simple prière',
      'Une oraison',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La prière de Jésus est la prière du Notre Père.',
    points: 30
  },
  {
    id: '451',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Priez sans cesse, rendez grâces en toutes..."',
    questionType: 'quote-completion',
    options: [
      'choses',
      'choses, car c\'est la volonté de Dieu',
      'choses, car Dieu est bon',
      'choses, car il vous aime'
    ],
    correctAnswer: 1,
    explanation: '1 Thessaloniciens 5:17-18 : "Priez sans cesse, rendez grâces en toutes choses."',
    points: 35,
    scripture: '1 Thessaloniciens 5:17-18'
  },
  {
    id: '452',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière du rosaire ?',
    questionType: 'multiple-choice',
    options: [
      'La prière mariale par excellence',
      'Une simple prière',
      'Une dévotion',
      'Une oraison'
    ],
    correctAnswer: 0,
    explanation: 'La prière du rosaire est la prière mariale par excellence.',
    points: 30
  },
  {
    id: '453',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Le rosaire est une prière contemplative.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le rosaire est une prière contemplative.',
    points: 25
  },
  {
    id: '454',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de l\'Angelus ?',
    questionType: 'multiple-choice',
    options: [
      'La prière de l\'Incarnation',
      'Une simple prière',
      'Une dévotion',
      'Une oraison'
    ],
    correctAnswer: 0,
    explanation: 'La prière de l\'Angelus est la prière de l\'Incarnation.',
    points: 30
  },
  {
    id: '455',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'ange du Seigneur apporta l\'annonce à Marie, et elle conçut du Saint..."',
    questionType: 'quote-completion',
    options: [
      'Esprit',
      'Esprit, car Dieu est fidèle',
      'Esprit, car il est puissant',
      'Esprit, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'L\'Angelus : "L\'ange du Seigneur apporta l\'annonce à Marie, et elle conçut du Saint Esprit."',
    points: 35
  },
  {
    id: '456',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de la Divine Miséricorde ?',
    questionType: 'multiple-choice',
    options: [
      'La prière de la miséricorde divine',
      'Une simple prière',
      'Une dévotion',
      'Une oraison'
    ],
    correctAnswer: 0,
    explanation: 'La prière de la Divine Miséricorde est la prière de la miséricorde divine.',
    points: 30
  },
  {
    id: '457',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'La Divine Miséricorde est une dévotion moderne.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Divine Miséricorde est une dévotion moderne.',
    points: 25
  },
  {
    id: '458',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière de la Divine Liturgie ?',
    questionType: 'multiple-choice',
    options: [
      'La messe dans les Églises orientales',
      'Une simple prière',
      'Un office',
      'Une cérémonie'
    ],
    correctAnswer: 0,
    explanation: 'La prière de la Divine Liturgie est la messe dans les Églises orientales.',
    points: 30
  },
  {
    id: '459',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La prière est la respiration de l\'âme, comme la respiration est la vie du..."',
    questionType: 'quote-completion',
    options: [
      'corps',
      'corps, car elle est nécessaire',
      'corps, car elle maintient la vie',
      'corps, car elle est vitale'
    ],
    correctAnswer: 1,
    explanation: 'La prière est la respiration de l\'âme, comme la respiration est la vie du corps.',
    points: 35
  },
  {
    id: '460',
    category: 'maitrise-spiritualite-priere',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière d\'intercession ?',
    questionType: 'multiple-choice',
    options: [
      'La prière pour les autres',
      'Une simple prière',
      'Une supplication',
      'Une requête'
    ],
    correctAnswer: 0,
    explanation: 'La prière d\'intercession est la prière pour les autres.',
    points: 30
  },

  // ===== MAÎTRISE - APOLOGÉTIQUE (Questions 461-500) =====
  {
    id: '461',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'apologétique ?',
    questionType: 'multiple-choice',
    options: [
      'La défense de la foi',
      'Une simple explication',
      'Une justification',
      'Une argumentation'
    ],
    correctAnswer: 0,
    explanation: 'L\'apologétique est la défense de la foi.',
    points: 30
  },
  {
    id: '462',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'apologétique utilise la raison.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'apologétique utilise la raison.',
    points: 25
  },
  {
    id: '463',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Soyez toujours prêts à rendre compte de l\'espérance qui est en vous, mais avec douceur et..."',
    questionType: 'quote-completion',
    options: [
      'respect',
      'respect, car la vérité libère',
      'respect, car Dieu est amour',
      'respect, car la foi est libre'
    ],
    correctAnswer: 1,
    explanation: '1 Pierre 3:15 : "Soyez toujours prêts à rendre compte de l\'espérance qui est en vous, mais avec douceur et respect."',
    points: 35,
    scripture: '1 Pierre 3:15'
  },
  {
    id: '464',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'existence de Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'Une vérité accessible à la raison',
      'Une simple croyance',
      'Une opinion',
      'Une conviction'
    ],
    correctAnswer: 0,
    explanation: 'L\'existence de Dieu est une vérité accessible à la raison.',
    points: 30
  },
  {
    id: '465',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Les preuves de l\'existence de Dieu sont rationnelles.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les preuves de l\'existence de Dieu sont rationnelles.',
    points: 25
  },
  {
    id: '466',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve cosmologique ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par la cause première',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve cosmologique est la preuve par la cause première.',
    points: 30
  },
  {
    id: '467',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Tout ce qui se meut est mû par un autre. Or il est impossible qu\'une série de moteurs s\'étende à l\'infini. Donc il faut arriver à un premier..."',
    questionType: 'quote-completion',
    options: [
      'moteur',
      'moteur, qui n\'est mû par aucun autre',
      'principe',
      'cause'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas d\'Aquin : "Tout ce qui se meut est mû par un autre... il faut arriver à un premier moteur."',
    points: 35
  },
  {
    id: '468',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve téléologique ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par l\'ordre du monde',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve téléologique est la preuve par l\'ordre du monde.',
    points: 30
  },
  {
    id: '469',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La preuve ontologique est de saint Anselme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La preuve ontologique est de saint Anselme.',
    points: 25
  },
  {
    id: '470',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la preuve morale ?',
    questionType: 'multiple-choice',
    options: [
      'La preuve par la conscience morale',
      'Une preuve scientifique',
      'Une preuve historique',
      'Une preuve logique'
    ],
    correctAnswer: 0,
    explanation: 'La preuve morale est la preuve par la conscience morale.',
    points: 30
  },
  {
    id: '471',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'homme est naturellement religieux, car il cherche..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est créé à son image',
      'la vérité',
      'le bonheur'
    ],
    correctAnswer: 1,
    explanation: 'L\'homme est naturellement religieux, car il cherche Dieu.',
    points: 35
  },
  {
    id: '472',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la révélation ?',
    questionType: 'multiple-choice',
    options: [
      'L\'auto-communication de Dieu',
      'Une simple révélation',
      'Une manifestation',
      'Une apparition'
    ],
    correctAnswer: 0,
    explanation: 'La révélation est l\'auto-communication de Dieu.',
    points: 30
  },
  {
    id: '473',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La révélation est nécessaire pour connaître Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La révélation est nécessaire pour connaître Dieu.',
    points: 25
  },
  {
    id: '474',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'inspiration biblique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'action de l\'Esprit Saint sur les auteurs',
      'Une simple inspiration',
      'Une révélation',
      'Une illumination'
    ],
    correctAnswer: 0,
    explanation: 'L\'inspiration biblique est l\'action de l\'Esprit Saint sur les auteurs.',
    points: 30
  },
  {
    id: '475',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, car elle est parole de Dieu',
      'justice, car elle guide',
      'justice, car elle éclaire'
    ],
    correctAnswer: 1,
    explanation: '2 Timothée 3:16 : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."',
    points: 35,
    scripture: '2 Timothée 3:16'
  },
  {
    id: '476',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'infaillibilité ?',
    questionType: 'multiple-choice',
    options: [
      'La protection contre l\'erreur',
      'Une simple certitude',
      'Une garantie',
      'Une assurance'
    ],
    correctAnswer: 0,
    explanation: 'L\'infaillibilité est la protection contre l\'erreur.',
    points: 30
  },
  {
    id: '477',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'infaillibilité est limitée aux questions de foi et de morale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'infaillibilité est limitée aux questions de foi et de morale.',
    points: 25
  },
  {
    id: '478',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'autorité de l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'Le pouvoir d\'enseigner au nom du Christ',
      'Une simple autorité',
      'Un pouvoir',
      'Une domination'
    ],
    correctAnswer: 0,
    explanation: 'L\'autorité de l\'Église est le pouvoir d\'enseigner au nom du Christ.',
    points: 30
  },
  {
    id: '479',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Tu es Pierre, et sur cette pierre je bâtirai mon Église, et les portes de l\'enfer ne prévaudront point contre..."',
    questionType: 'quote-completion',
    options: [
      'elle',
      'elle, car elle est fondée sur le Christ',
      'elle, car elle est divine',
      'elle, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 16:18 : "Tu es Pierre, et sur cette pierre je bâtirai mon Église, et les portes de l\'enfer ne prévaudront point contre elle."',
    points: 35,
    scripture: 'Matthieu 16:18'
  },
  {
    id: '480',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la succession apostolique ?',
    questionType: 'multiple-choice',
    options: [
      'La transmission de l\'autorité apostolique',
      'Une simple succession',
      'Une transmission',
      'Une continuité'
    ],
    correctAnswer: 0,
    explanation: 'La succession apostolique est la transmission de l\'autorité apostolique.',
    points: 30
  },
  {
    id: '481',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La succession apostolique garantit l\'authenticité de l\'enseignement.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La succession apostolique garantit l\'authenticité de l\'enseignement.',
    points: 25
  },
  {
    id: '482',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la tradition ?',
    questionType: 'multiple-choice',
    options: [
      'La transmission vivante de la Parole de Dieu',
      'Une simple tradition',
      'Une coutume',
      'Une habitude'
    ],
    correctAnswer: 0,
    explanation: 'La tradition est la transmission vivante de la Parole de Dieu.',
    points: 30
  },
  {
    id: '483',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ainsi donc, frères, demeurez fermes et retenez les traditions que vous avez apprises, soit par notre parole, soit par notre..."',
    questionType: 'quote-completion',
    options: [
      'lettre',
      'lettre, car elles sont vraies',
      'lettre, car elles sont divines',
      'lettre, car elles sont saintes'
    ],
    correctAnswer: 1,
    explanation: '2 Thessaloniciens 2:15 : "Ainsi donc, frères, demeurez fermes et retenez les traditions que vous avez apprises, soit par notre parole, soit par notre lettre."',
    points: 35,
    scripture: '2 Thessaloniciens 2:15'
  },
  {
    id: '484',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le magistère ?',
    questionType: 'multiple-choice',
    options: [
      'L\'autorité d\'enseigner de l\'Église',
      'Une simple autorité',
      'Un pouvoir',
      'Une domination'
    ],
    correctAnswer: 0,
    explanation: 'Le magistère est l\'autorité d\'enseigner de l\'Église.',
    points: 30
  },
  {
    id: '485',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Le magistère est exercé par les évêques.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le magistère est exercé par les évêques.',
    points: 25
  },
  {
    id: '486',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'œcuménisme ?',
    questionType: 'multiple-choice',
    options: [
      'Le mouvement vers l\'unité des chrétiens',
      'Un simple dialogue',
      'Une conversation',
      'Une discussion'
    ],
    correctAnswer: 0,
    explanation: 'L\'œcuménisme est le mouvement vers l\'unité des chrétiens.',
    points: 30
  },
  {
    id: '487',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Qu\'ils soient un, comme toi, Père, tu es en moi, et moi en toi, qu\'ils soient aussi un en nous, afin que le monde croie que tu m\'as..."',
    questionType: 'quote-completion',
    options: [
      'envoyé',
      'envoyé, car l\'unité témoigne',
      'envoyé, car l\'amour unit',
      'envoyé, car la vérité libère'
    ],
    correctAnswer: 1,
    explanation: 'Jean 17:21 : "Qu\'ils soient un, comme toi, Père, tu es en moi, et moi en toi, qu\'ils soient aussi un en nous, afin que le monde croie que tu m\'as envoyé."',
    points: 35,
    scripture: 'Jean 17:21'
  },
  {
    id: '488',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le dialogue interreligieux ?',
    questionType: 'multiple-choice',
    options: [
      'Le dialogue avec les autres religions',
      'Un simple dialogue',
      'Une conversation',
      'Une discussion'
    ],
    correctAnswer: 0,
    explanation: 'Le dialogue interreligieux est le dialogue avec les autres religions.',
    points: 30
  },
  {
    id: '489',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Le dialogue interreligieux respecte la liberté religieuse.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le dialogue interreligieux respecte la liberté religieuse.',
    points: 25
  },
  {
    id: '490',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liberté religieuse ?',
    questionType: 'multiple-choice',
    options: [
      'Le droit de professer sa religion',
      'Un simple droit',
      'Une liberté',
      'Une autonomie'
    ],
    correctAnswer: 0,
    explanation: 'La liberté religieuse est le droit de professer sa religion.',
    points: 30
  },
  {
    id: '491',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La vérité ne s\'impose que par la force de la vérité elle-même, qui pénètre l\'esprit avec autant de douceur que de..."',
    questionType: 'quote-completion',
    options: [
      'puissance',
      'puissance, car elle libère',
      'puissance, car elle éclaire',
      'puissance, car elle guide'
    ],
    correctAnswer: 1,
    explanation: 'Dignitatis humanae : "La vérité ne s\'impose que par la force de la vérité elle-même, qui pénètre l\'esprit avec autant de douceur que de puissance."',
    points: 35
  },
  {
    id: '492',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la laïcité ?',
    questionType: 'multiple-choice',
    options: [
      'La séparation de l\'Église et de l\'État',
      'Une simple séparation',
      'Une distinction',
      'Une division'
    ],
    correctAnswer: 0,
    explanation: 'La laïcité est la séparation de l\'Église et de l\'État.',
    points: 30
  },
  {
    id: '493',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La laïcité respecte la liberté religieuse.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La laïcité respecte la liberté religieuse.',
    points: 25
  },
  {
    id: '494',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la sécularisation ?',
    questionType: 'multiple-choice',
    options: [
      'Le processus de désacralisation',
      'Un simple processus',
      'Une évolution',
      'Un changement'
    ],
    correctAnswer: 0,
    explanation: 'La sécularisation est le processus de désacralisation.',
    points: 30
  },
  {
    id: '495',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Rendez à César ce qui est à César, et à Dieu ce qui est à..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car Dieu est souverain',
      'Dieu, car il est le maître',
      'Dieu, car il est le créateur'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 22:21 : "Rendez à César ce qui est à César, et à Dieu ce qui est à Dieu."',
    points: 35,
    scripture: 'Matthieu 22:21'
  },
  {
    id: '496',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'athéisme ?',
    questionType: 'multiple-choice',
    options: [
      'La négation de l\'existence de Dieu',
      'Une simple négation',
      'Un refus',
      'Un rejet'
    ],
    correctAnswer: 0,
    explanation: 'L\'athéisme est la négation de l\'existence de Dieu.',
    points: 30
  },
  {
    id: '497',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'athéisme est une position philosophique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'athéisme est une position philosophique.',
    points: 25
  },
  {
    id: '498',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'agnosticisme ?',
    questionType: 'multiple-choice',
    options: [
      'La suspension du jugement sur Dieu',
      'Une simple suspension',
      'Un doute',
      'Une incertitude'
    ],
    correctAnswer: 0,
    explanation: 'L\'agnosticisme est la suspension du jugement sur Dieu.',
    points: 30
  },
  {
    id: '499',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'homme moderne écoute plus volontiers les témoins que les maîtres, ou s\'il écoute les maîtres, c\'est parce qu\'ils sont..."',
    questionType: 'quote-completion',
    options: [
      'témoins',
      'témoins, car la vie témoigne',
      'témoins, car l\'amour convainc',
      'témoins, car la vérité libère'
    ],
    correctAnswer: 1,
    explanation: 'Paul VI : "L\'homme moderne écoute plus volontiers les témoins que les maîtres, ou s\'il écoute les maîtres, c\'est parce qu\'ils sont témoins."',
    points: 35
  },
  {
    id: '500',
    category: 'maitrise-apologetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'évangélisation ?',
    questionType: 'multiple-choice',
    options: [
      'L\'annonce de l\'Évangile',
      'Une simple annonce',
      'Une proclamation',
      'Une prédication'
    ],
    correctAnswer: 0,
    explanation: 'L\'évangélisation est l\'annonce de l\'Évangile.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE MORALE (Questions 501-540) =====
  {
    id: '501',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie morale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'agir humain à la lumière de la foi',
      'Une simple morale',
      'Une éthique',
      'Une philosophie'
    ],
    correctAnswer: 0,
    explanation: 'La théologie morale est l\'étude de l\'agir humain à la lumière de la foi.',
    points: 30
  },
  {
    id: '502',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie morale est fondée sur la loi naturelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie morale est fondée sur la loi naturelle.',
    points: 25
  },
  {
    id: '503',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La loi naturelle est inscrite dans le cœur de..."',
    questionType: 'quote-completion',
    options: [
      'l\'homme',
      'l\'homme, car il est créé à l\'image de Dieu',
      'l\'homme, car il est raisonnable',
      'l\'homme, car il est libre'
    ],
    correctAnswer: 1,
    explanation: 'La loi naturelle est inscrite dans le cœur de l\'homme.',
    points: 35
  },
  {
    id: '504',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la conscience morale ?',
    questionType: 'multiple-choice',
    options: [
      'La voix de Dieu dans le cœur',
      'Une simple intuition',
      'Un sentiment',
      'Une émotion'
    ],
    correctAnswer: 0,
    explanation: 'La conscience morale est la voix de Dieu dans le cœur.',
    points: 30
  },
  {
    id: '505',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La conscience morale doit être formée.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La conscience morale doit être formée.',
    points: 25
  },
  {
    id: '506',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le péché ?',
    questionType: 'multiple-choice',
    options: [
      'Un acte contraire à la loi de Dieu',
      'Une simple erreur',
      'Une faute',
      'Un défaut'
    ],
    correctAnswer: 0,
    explanation: 'Le péché est un acte contraire à la loi de Dieu.',
    points: 30
  },
  {
    id: '507',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le salaire du péché, c\'est la..."',
    questionType: 'quote-completion',
    options: [
      'mort',
      'mort, mais le don gratuit de Dieu, c\'est la vie éternelle',
      'souffrance',
      'séparation'
    ],
    correctAnswer: 1,
    explanation: 'Romains 6:23 : "Le salaire du péché, c\'est la mort, mais le don gratuit de Dieu, c\'est la vie éternelle."',
    points: 35,
    scripture: 'Romains 6:23'
  },
  {
    id: '508',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le péché mortel ?',
    questionType: 'multiple-choice',
    options: [
      'Un péché grave qui tue la grâce',
      'Un simple péché',
      'Une faute',
      'Un défaut'
    ],
    correctAnswer: 0,
    explanation: 'Le péché mortel est un péché grave qui tue la grâce.',
    points: 30
  },
  {
    id: '509',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Le péché véniel n\'ôte pas la grâce.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le péché véniel n\'ôte pas la grâce.',
    points: 25
  },
  {
    id: '510',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vertu ?',
    questionType: 'multiple-choice',
    options: [
      'Une disposition stable au bien',
      'Une simple qualité',
      'Un trait de caractère',
      'Une habitude'
    ],
    correctAnswer: 0,
    explanation: 'La vertu est une disposition stable au bien.',
    points: 30
  },
  {
    id: '511',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Les fruits de l\'Esprit sont : amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de..."',
    questionType: 'quote-completion',
    options: [
      'soi',
      'soi, car l\'Esprit nous sanctifie',
      'soi, car nous sommes libres',
      'soi, car nous sommes saints'
    ],
    correctAnswer: 1,
    explanation: 'Galates 5:22-23 : "Les fruits de l\'Esprit sont : amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de soi."',
    points: 35,
    scripture: 'Galates 5:22-23'
  },
  {
    id: '512',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la charité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu théologale de l\'amour',
      'Un simple don',
      'Une aumône',
      'Un acte'
    ],
    correctAnswer: 0,
    explanation: 'La charité est la vertu théologale de l\'amour.',
    points: 30
  },
  {
    id: '513',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La charité est la plus grande des vertus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La charité est la plus grande des vertus.',
    points: 25
  },
  {
    id: '514',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la justice ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui rend à chacun son dû',
      'Un simple principe',
      'Une loi',
      'Un droit'
    ],
    correctAnswer: 0,
    explanation: 'La justice est la vertu qui rend à chacun son dû.',
    points: 30
  },
  {
    id: '515',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux ceux qui ont faim et soif de la justice, car ils seront..."',
    questionType: 'quote-completion',
    options: [
      'rassasiés',
      'rassasiés, car Dieu est juste',
      'satisfaits',
      'comblés'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:6 : "Heureux ceux qui ont faim et soif de la justice, car ils seront rassasiés."',
    points: 35,
    scripture: 'Matthieu 5:6'
  },
  {
    id: '516',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prudence ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui discerne le bien',
      'Une simple sagesse',
      'Une intelligence',
      'Une compréhension'
    ],
    correctAnswer: 0,
    explanation: 'La prudence est la vertu qui discerne le bien.',
    points: 30
  },
  {
    id: '517',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La prudence est la mère de toutes les vertus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prudence est la mère de toutes les vertus.',
    points: 25
  },
  {
    id: '518',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la force ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui surmonte les difficultés',
      'Une simple courage',
      'Une bravoure',
      'Une audace'
    ],
    correctAnswer: 0,
    explanation: 'La force est la vertu qui surmonte les difficultés.',
    points: 30
  },
  {
    id: '519',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ma grâce te suffit, car ma puissance s\'accomplit dans la..."',
    questionType: 'quote-completion',
    options: [
      'faiblesse',
      'faiblesse, car Dieu est fort',
      'pauvreté',
      'humilité'
    ],
    correctAnswer: 1,
    explanation: '2 Corinthiens 12:9 : "Ma grâce te suffit, car ma puissance s\'accomplit dans la faiblesse."',
    points: 35,
    scripture: '2 Corinthiens 12:9'
  },
  {
    id: '520',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la tempérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui modère les désirs',
      'Une simple modération',
      'Une sobriété',
      'Une abstinence'
    ],
    correctAnswer: 0,
    explanation: 'La tempérance est la vertu qui modère les désirs.',
    points: 30
  },
  {
    id: '521',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La tempérance est nécessaire pour la liberté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La tempérance est nécessaire pour la liberté.',
    points: 25
  },
  {
    id: '522',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'humilité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui reconnaît la vérité',
      'Une simple modestie',
      'Une humilité',
      'Une soumission'
    ],
    correctAnswer: 0,
    explanation: 'L\'humilité est la vertu qui reconnaît la vérité.',
    points: 30
  },
  {
    id: '523',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Apprenez de moi que je suis doux et humble de..."',
    questionType: 'quote-completion',
    options: [
      'cœur',
      'cœur, car je suis votre maître',
      'cœur, car je vous aime',
      'cœur, car je suis votre serviteur'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 11:29 : "Apprenez de moi que je suis doux et humble de cœur."',
    points: 35,
    scripture: 'Matthieu 11:29'
  },
  {
    id: '524',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la chasteté ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui ordonne la sexualité',
      'Une simple pureté',
      'Une abstinence',
      'Une continence'
    ],
    correctAnswer: 0,
    explanation: 'La chasteté est la vertu qui ordonne la sexualité.',
    points: 30
  },
  {
    id: '525',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La chasteté est une vertu pour tous.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La chasteté est une vertu pour tous.',
    points: 25
  },
  {
    id: '526',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pauvreté évangélique ?',
    questionType: 'multiple-choice',
    options: [
      'La liberté par rapport aux biens',
      'Une simple pauvreté',
      'Une indigence',
      'Une misère'
    ],
    correctAnswer: 0,
    explanation: 'La pauvreté évangélique est la liberté par rapport aux biens.',
    points: 30
  },
  {
    id: '527',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les pauvres de cœur, car le royaume des cieux est à..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car ils sont libres',
      'eux, car ils sont humbles',
      'eux, car ils sont saints'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:3 : "Heureux les pauvres de cœur, car le royaume des cieux est à eux."',
    points: 35,
    scripture: 'Matthieu 5:3'
  },
  {
    id: '528',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'obéissance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui soumet la volonté',
      'Une simple soumission',
      'Une docilité',
      'Une conformité'
    ],
    correctAnswer: 0,
    explanation: 'L\'obéissance est la vertu qui soumet la volonté.',
    points: 30
  },
  {
    id: '529',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'obéissance est une vertu libératrice.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'obéissance est une vertu libératrice.',
    points: 25
  },
  {
    id: '530',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la miséricorde ?',
    questionType: 'multiple-choice',
    options: [
      'L\'amour qui pardonne',
      'Un simple pardon',
      'Une pitié',
      'Une compassion'
    ],
    correctAnswer: 0,
    explanation: 'La miséricorde est l\'amour qui pardonne.',
    points: 30
  },
  {
    id: '531',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Soyez miséricordieux comme votre Père est..."',
    questionType: 'quote-completion',
    options: [
      'miséricordieux',
      'miséricordieux, car il pardonne',
      'bon',
      'amour'
    ],
    correctAnswer: 1,
    explanation: 'Luc 6:36 : "Soyez miséricordieux comme votre Père est miséricordieux."',
    points: 35,
    scripture: 'Luc 6:36'
  },
  {
    id: '532',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vérité ?',
    questionType: 'multiple-choice',
    options: [
      'L\'adéquation de l\'esprit à la réalité',
      'Une simple exactitude',
      'Une précision',
      'Une justesse'
    ],
    correctAnswer: 0,
    explanation: 'La vérité est l\'adéquation de l\'esprit à la réalité.',
    points: 30
  },
  {
    id: '533',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La vérité nous rend libres.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La vérité nous rend libres.',
    points: 25
  },
  {
    id: '534',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la liberté ?',
    questionType: 'multiple-choice',
    options: [
      'La capacité de choisir le bien',
      'Une simple indépendance',
      'Une autonomie',
      'Une souveraineté'
    ],
    correctAnswer: 0,
    explanation: 'La liberté est la capacité de choisir le bien.',
    points: 30
  },
  {
    id: '535',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "C\'est pour la liberté que le Christ nous a..."',
    questionType: 'quote-completion',
    options: [
      'affranchis',
      'affranchis, car nous sommes libres',
      'libérés',
      'sauvé'
    ],
    correctAnswer: 1,
    explanation: 'Galates 5:1 : "C\'est pour la liberté que le Christ nous a affranchis."',
    points: 35,
    scripture: 'Galates 5:1'
  },
  {
    id: '536',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la responsabilité ?',
    questionType: 'multiple-choice',
    options: [
      'La capacité de répondre de ses actes',
      'Une simple obligation',
      'Un devoir',
      'Une charge'
    ],
    correctAnswer: 0,
    explanation: 'La responsabilité est la capacité de répondre de ses actes.',
    points: 30
  },
  {
    id: '537',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'La responsabilité est liée à la liberté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La responsabilité est liée à la liberté.',
    points: 25
  },
  {
    id: '538',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la solidarité ?',
    questionType: 'multiple-choice',
    options: [
      'La responsabilité mutuelle',
      'Un simple lien',
      'Une relation',
      'Une connexion'
    ],
    correctAnswer: 0,
    explanation: 'La solidarité est la responsabilité mutuelle.',
    points: 30
  },
  {
    id: '539',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Nous sommes tous responsables de..."',
    questionType: 'quote-completion',
    options: [
      'tous',
      'tous, car nous formons une seule famille',
      'chacun',
      'l\'autre'
    ],
    correctAnswer: 1,
    explanation: 'Nous sommes tous responsables de tous.',
    points: 35
  },
  {
    id: '540',
    category: 'maitrise-theologie-morale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le bien commun ?',
    questionType: 'multiple-choice',
    options: [
      'Le bien de tous et de chacun',
      'Un bien collectif',
      'Un bien public',
      'Un bien social'
    ],
    correctAnswer: 0,
    explanation: 'Le bien commun est le bien de tous et de chacun.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE DOGMATIQUE (Questions 541-580) =====
  {
    id: '541',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie dogmatique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des vérités de la foi',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie dogmatique est l\'étude des vérités de la foi.',
    points: 30
  },
  {
    id: '542',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie dogmatique est fondée sur la révélation.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie dogmatique est fondée sur la révélation.',
    points: 25
  },
  {
    id: '543',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole de..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car elle est vérité',
      'Dieu, car elle est vie',
      'Dieu, car elle est amour'
    ],
    correctAnswer: 1,
    explanation: 'Romains 10:17 : "La foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole de Dieu."',
    points: 35,
    scripture: 'Romains 10:17'
  },
  {
    id: '544',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Trinité ?',
    questionType: 'multiple-choice',
    options: [
      'Le mystère d\'un seul Dieu en trois personnes',
      'Un simple mystère',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La Trinité est le mystère d\'un seul Dieu en trois personnes.',
    points: 30
  },
  {
    id: '545',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La Trinité est le mystère central de la foi.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Trinité est le mystère central de la foi.',
    points: 25
  },
  {
    id: '546',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'Incarnation ?',
    questionType: 'multiple-choice',
    options: [
      'Le Fils de Dieu fait homme',
      'Un simple mystère',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'L\'Incarnation est le Fils de Dieu fait homme.',
    points: 30
  },
  {
    id: '547',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Et le Verbe s\'est fait chair, et il a habité parmi nous, et nous avons vu sa gloire, gloire qu\'il tient de son Père comme Fils unique, plein de grâce et de..."',
    questionType: 'quote-completion',
    options: [
      'vérité',
      'vérité, car il est Dieu',
      'vérité, car il est lumière',
      'vérité, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Jean 1:14 : "Et le Verbe s\'est fait chair, et il a habité parmi nous, et nous avons vu sa gloire, gloire qu\'il tient de son Père comme Fils unique, plein de grâce et de vérité."',
    points: 35,
    scripture: 'Jean 1:14'
  },
  {
    id: '548',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Rédemption ?',
    questionType: 'multiple-choice',
    options: [
      'Le rachat de l\'humanité par le Christ',
      'Un simple rachat',
      'Une libération',
      'Une délivrance'
    ],
    correctAnswer: 0,
    explanation: 'La Rédemption est le rachat de l\'humanité par le Christ.',
    points: 30
  },
  {
    id: '549',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La Rédemption est l\'œuvre du Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Rédemption est l\'œuvre du Christ.',
    points: 25
  },
  {
    id: '550',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Résurrection ?',
    questionType: 'multiple-choice',
    options: [
      'La victoire du Christ sur la mort',
      'Un simple retour',
      'Une renaissance',
      'Une réapparition'
    ],
    correctAnswer: 0,
    explanation: 'La Résurrection est la victoire du Christ sur la mort.',
    points: 30
  },
  {
    id: '551',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Si le Christ n\'est pas ressuscité, notre prédication est vaine, et votre foi est..."',
    questionType: 'quote-completion',
    options: [
      'vaine',
      'vaine, car tout est perdu',
      'vaine, car nous mentons',
      'vaine, car nous nous trompons'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 15:14 : "Si le Christ n\'est pas ressuscité, notre prédication est vaine, et votre foi est vaine."',
    points: 35,
    scripture: '1 Corinthiens 15:14'
  },
  {
    id: '552',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'Ascension ?',
    questionType: 'multiple-choice',
    options: [
      'L\'élévation du Christ au ciel',
      'Un simple départ',
      'Une montée',
      'Une élévation'
    ],
    correctAnswer: 0,
    explanation: 'L\'Ascension est l\'élévation du Christ au ciel.',
    points: 30
  },
  {
    id: '553',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'Ascension précède la Pentecôte.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Ascension précède la Pentecôte.',
    points: 25
  },
  {
    id: '554',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Pentecôte ?',
    questionType: 'multiple-choice',
    options: [
      'La descente de l\'Esprit Saint',
      'Un simple événement',
      'Une fête',
      'Une célébration'
    ],
    correctAnswer: 0,
    explanation: 'La Pentecôte est la descente de l\'Esprit Saint.',
    points: 30
  },
  {
    id: '555',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Quand le jour de la Pentecôte arriva, ils étaient tous ensemble dans le même lieu. Tout à coup il vint du ciel un bruit comme celui d\'un vent impétueux, et il remplit toute la maison où ils étaient assis. Des langues, semblables à des langues de feu, leur apparurent, séparées les unes des autres, et se posèrent sur chacun d\'eux. Et ils furent tous remplis du Saint..."',
    questionType: 'quote-completion',
    options: [
      'Esprit',
      'Esprit, car Dieu est fidèle',
      'Esprit, car il est promis',
      'Esprit, car il est donné'
    ],
    correctAnswer: 1,
    explanation: 'Actes 2:1-4 : "Quand le jour de la Pentecôte arriva... Et ils furent tous remplis du Saint Esprit."',
    points: 35,
    scripture: 'Actes 2:1-4'
  },
  {
    id: '556',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'Église ?',
    questionType: 'multiple-choice',
    options: [
      'Le Corps mystique du Christ',
      'Un simple corps',
      'Une institution',
      'Une organisation'
    ],
    correctAnswer: 0,
    explanation: 'L\'Église est le Corps mystique du Christ.',
    points: 30
  },
  {
    id: '557',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'Église est une, sainte, catholique et apostolique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Église est une, sainte, catholique et apostolique.',
    points: 25
  },
  {
    id: '558',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Communion des Saints ?',
    questionType: 'multiple-choice',
    options: [
      'La communion entre tous les fidèles',
      'Un simple lien',
      'Une relation',
      'Une connexion'
    ],
    correctAnswer: 0,
    explanation: 'La Communion des Saints est la communion entre tous les fidèles.',
    points: 30
  },
  {
    id: '559',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Nous qui sommes plusieurs, nous formons un seul corps en Christ, et nous sommes tous membres les uns des..."',
    questionType: 'quote-completion',
    options: [
      'autres',
      'autres, car nous sommes unis',
      'autres, car nous sommes frères',
      'autres, car nous sommes saints'
    ],
    correctAnswer: 1,
    explanation: 'Romains 12:5 : "Nous qui sommes plusieurs, nous formons un seul corps en Christ, et nous sommes tous membres les uns des autres."',
    points: 35,
    scripture: 'Romains 12:5'
  },
  {
    id: '560',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Vie éternelle ?',
    questionType: 'multiple-choice',
    options: [
      'La vie avec Dieu pour toujours',
      'Un simple temps',
      'Une durée',
      'Une période'
    ],
    correctAnswer: 0,
    explanation: 'La Vie éternelle est la vie avec Dieu pour toujours.',
    points: 30
  },
  {
    id: '561',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La Vie éternelle commence dès ici-bas.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Vie éternelle commence dès ici-bas.',
    points: 25
  },
  {
    id: '562',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le Royaume de Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'La souveraineté de Dieu sur toutes choses',
      'Un simple royaume',
      'Un règne',
      'Une domination'
    ],
    correctAnswer: 0,
    explanation: 'Le Royaume de Dieu est la souveraineté de Dieu sur toutes choses.',
    points: 30
  },
  {
    id: '563',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Cherchez premièrement le royaume de Dieu et sa justice, et toutes ces choses vous seront données par..."',
    questionType: 'quote-completion',
    options: [
      'surcroît',
      'surcroît, car Dieu pourvoit',
      'surcroît, car il est bon',
      'surcroît, car il aime'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 6:33 : "Cherchez premièrement le royaume de Dieu et sa justice, et toutes ces choses vous seront données par surcroît."',
    points: 35,
    scripture: 'Matthieu 6:33'
  },
  {
    id: '564',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Parousie ?',
    questionType: 'multiple-choice',
    options: [
      'Le retour glorieux du Christ',
      'Un simple retour',
      'Une venue',
      'Une apparition'
    ],
    correctAnswer: 0,
    explanation: 'La Parousie est le retour glorieux du Christ.',
    points: 30
  },
  {
    id: '565',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La Parousie est l\'objet de notre espérance.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Parousie est l\'objet de notre espérance.',
    points: 25
  },
  {
    id: '566',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Résurrection des morts ?',
    questionType: 'multiple-choice',
    options: [
      'La résurrection de tous les hommes',
      'Un simple retour',
      'Une renaissance',
      'Une réapparition'
    ],
    correctAnswer: 0,
    explanation: 'La Résurrection des morts est la résurrection de tous les hommes.',
    points: 30
  },
  {
    id: '567',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Car la trompette sonnera, et les morts ressusciteront incorruptibles, et nous serons..."',
    questionType: 'quote-completion',
    options: [
      'changés',
      'changés, car nous serons glorieux',
      'changés, car nous serons saints',
      'changés, car nous serons parfaits'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 15:52 : "Car la trompette sonnera, et les morts ressusciteront incorruptibles, et nous serons changés."',
    points: 35,
    scripture: '1 Corinthiens 15:52'
  },
  {
    id: '568',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le Jugement dernier ?',
    questionType: 'multiple-choice',
    options: [
      'Le jugement de tous les hommes par le Christ',
      'Un simple jugement',
      'Un procès',
      'Une sentence'
    ],
    correctAnswer: 0,
    explanation: 'Le Jugement dernier est le jugement de tous les hommes par le Christ.',
    points: 30
  },
  {
    id: '569',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Le Jugement dernier est un mystère de foi.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le Jugement dernier est un mystère de foi.',
    points: 25
  },
  {
    id: '570',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le Ciel ?',
    questionType: 'multiple-choice',
    options: [
      'La vie avec Dieu dans la gloire',
      'Un simple lieu',
      'Un endroit',
      'Un séjour'
    ],
    correctAnswer: 0,
    explanation: 'Le Ciel est la vie avec Dieu dans la gloire.',
    points: 30
  },
  {
    id: '571',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ce que l\'œil n\'a pas vu, ce que l\'oreille n\'a pas entendu, ce qui n\'est pas monté au cœur de l\'homme, tout ce que Dieu a préparé pour ceux qui..."',
    questionType: 'quote-completion',
    options: [
      'l\'aiment',
      'l\'aiment, car il est fidèle',
      'l\'aiment, car il est bon',
      'l\'aiment, car il est amour'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 2:9 : "Ce que l\'œil n\'a pas vu, ce que l\'oreille n\'a pas entendu, ce qui n\'est pas monté au cœur de l\'homme, tout ce que Dieu a préparé pour ceux qui l\'aiment."',
    points: 35,
    scripture: '1 Corinthiens 2:9'
  },
  {
    id: '572',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'Enfer ?',
    questionType: 'multiple-choice',
    options: [
      'L\'éloignement définitif de Dieu',
      'Un simple lieu',
      'Un endroit',
      'Un séjour'
    ],
    correctAnswer: 0,
    explanation: 'L\'Enfer est l\'éloignement définitif de Dieu.',
    points: 30
  },
  {
    id: '573',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'Enfer est le choix de l\'homme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Enfer est le choix de l\'homme.',
    points: 25
  },
  {
    id: '574',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le Purgatoire ?',
    questionType: 'multiple-choice',
    options: [
      'La purification des âmes avant le Ciel',
      'Un simple lieu',
      'Un endroit',
      'Un séjour'
    ],
    correctAnswer: 0,
    explanation: 'Le Purgatoire est la purification des âmes avant le Ciel.',
    points: 30
  },
  {
    id: '575',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Car il faut que ce corps corruptible revête l\'incorruptibilité, et que ce corps mortel revête..."',
    questionType: 'quote-completion',
    options: [
      'l\'immortalité',
      'l\'immortalité, car nous serons glorieux',
      'l\'immortalité, car nous serons saints',
      'l\'immortalité, car nous serons parfaits'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 15:53 : "Car il faut que ce corps corruptible revête l\'incorruptibilité, et que ce corps mortel revête l\'immortalité."',
    points: 35,
    scripture: '1 Corinthiens 15:53'
  },
  {
    id: '576',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Grâce ?',
    questionType: 'multiple-choice',
    options: [
      'Le don gratuit de Dieu',
      'Un simple don',
      'Un cadeau',
      'Un présent'
    ],
    correctAnswer: 0,
    explanation: 'La Grâce est le don gratuit de Dieu.',
    points: 30
  },
  {
    id: '577',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'La Grâce est nécessaire pour le salut.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La Grâce est nécessaire pour le salut.',
    points: 25
  },
  {
    id: '578',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Justification ?',
    questionType: 'multiple-choice',
    options: [
      'L\'acte par lequel Dieu rend juste',
      'Un simple acte',
      'Une action',
      'Une œuvre'
    ],
    correctAnswer: 0,
    explanation: 'La Justification est l\'acte par lequel Dieu rend juste.',
    points: 30
  },
  {
    id: '579',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "C\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est bon',
      'Dieu, car il est amour',
      'Dieu, car il est fidèle'
    ],
    correctAnswer: 1,
    explanation: 'Éphésiens 2:8 : "C\'est par la grâce que vous êtes sauvés, par le moyen de la foi. Et cela ne vient pas de vous, c\'est le don de Dieu."',
    points: 35,
    scripture: 'Éphésiens 2:8'
  },
  {
    id: '580',
    category: 'maitrise-theologie-dogmatique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la Sanctification ?',
    questionType: 'multiple-choice',
    options: [
      'Le processus de sanctification',
      'Un simple processus',
      'Une évolution',
      'Un changement'
    ],
    correctAnswer: 0,
    explanation: 'La Sanctification est le processus de sanctification.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE BIBLIQUE (Questions 581-620) =====
  {
    id: '581',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie biblique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la révélation divine dans la Bible',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie biblique est l\'étude de la révélation divine dans la Bible.',
    points: 30
  },
  {
    id: '582',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie biblique est fondée sur l\'inspiration.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie biblique est fondée sur l\'inspiration.',
    points: 25
  },
  {
    id: '583',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, car elle est parole de Dieu',
      'justice, car elle guide',
      'justice, car elle éclaire'
    ],
    correctAnswer: 1,
    explanation: '2 Timothée 3:16 : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."',
    points: 35,
    scripture: '2 Timothée 3:16'
  },
  {
    id: '584',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'exégèse ?',
    questionType: 'multiple-choice',
    options: [
      'L\'interprétation scientifique des textes',
      'Une simple lecture',
      'Une étude',
      'Une analyse'
    ],
    correctAnswer: 0,
    explanation: 'L\'exégèse est l\'interprétation scientifique des textes.',
    points: 30
  },
  {
    id: '585',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'exégèse utilise des méthodes scientifiques.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'exégèse utilise des méthodes scientifiques.',
    points: 25
  },
  {
    id: '586',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'herméneutique ?',
    questionType: 'multiple-choice',
    options: [
      'La science de l\'interprétation',
      'Une simple interprétation',
      'Une lecture',
      'Une analyse'
    ],
    correctAnswer: 0,
    explanation: 'L\'herméneutique est la science de l\'interprétation.',
    points: 30
  },
  {
    id: '587',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ta parole est une lampe à mes pieds, et une lumière sur mon..."',
    questionType: 'quote-completion',
    options: [
      'sentier',
      'sentier, car elle guide',
      'chemin',
      'route'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 119:105 : "Ta parole est une lampe à mes pieds, et une lumière sur mon sentier."',
    points: 35,
    scripture: 'Psaume 119:105'
  },
  {
    id: '588',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique textuelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des manuscrits bibliques',
      'Une simple critique',
      'Une analyse',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'La critique textuelle est l\'étude des manuscrits bibliques.',
    points: 30
  },
  {
    id: '589',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La critique textuelle établit le texte original.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La critique textuelle établit le texte original.',
    points: 25
  },
  {
    id: '590',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique historique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du contexte historique',
      'Une simple critique',
      'Une analyse',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'La critique historique est l\'étude du contexte historique.',
    points: 30
  },
  {
    id: '591',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est éternel',
      'Dieu, car il est divin',
      'Dieu, car il est saint'
    ],
    correctAnswer: 1,
    explanation: 'Jean 1:1 : "Au commencement était le Verbe, et le Verbe était auprès de Dieu, et le Verbe était Dieu."',
    points: 35,
    scripture: 'Jean 1:1'
  },
  {
    id: '592',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique littéraire ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la composition littéraire',
      'Une simple critique',
      'Une analyse',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'La critique littéraire est l\'étude de la composition littéraire.',
    points: 30
  },
  {
    id: '593',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La critique littéraire analyse les genres.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La critique littéraire analyse les genres.',
    points: 25
  },
  {
    id: '594',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique de la forme ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des formes littéraires',
      'Une simple critique',
      'Une analyse',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'La critique de la forme est l\'étude des formes littéraires.',
    points: 30
  },
  {
    id: '595',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Au commencement, Dieu créa le ciel et la..."',
    questionType: 'quote-completion',
    options: [
      'terre',
      'terre, car il est créateur',
      'terre, car il est tout-puissant',
      'terre, car il est souverain'
    ],
    correctAnswer: 1,
    explanation: 'Genèse 1:1 : "Au commencement, Dieu créa le ciel et la terre."',
    points: 35,
    scripture: 'Genèse 1:1'
  },
  {
    id: '596',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique de la rédaction ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'œuvre des rédacteurs',
      'Une simple critique',
      'Une analyse',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'La critique de la rédaction est l\'étude de l\'œuvre des rédacteurs.',
    points: 30
  },
  {
    id: '597',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La critique de la rédaction étudie l\'intention théologique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La critique de la rédaction étudie l\'intention théologique.',
    points: 25
  },
  {
    id: '598',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de l\'Ancien Testament ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la révélation dans l\'Ancien Testament',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de l\'Ancien Testament est l\'étude de la révélation dans l\'Ancien Testament.',
    points: 30
  },
  {
    id: '599',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Écoute, Israël ! L\'Éternel, notre Dieu, l\'Éternel est..."',
    questionType: 'quote-completion',
    options: [
      'un',
      'un, car il est unique',
      'un, car il est seul',
      'un, car il est unique'
    ],
    correctAnswer: 1,
    explanation: 'Deutéronome 6:4 : "Écoute, Israël ! L\'Éternel, notre Dieu, l\'Éternel est un."',
    points: 35,
    scripture: 'Deutéronome 6:4'
  },
  {
    id: '600',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie du Nouveau Testament ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la révélation dans le Nouveau Testament',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie du Nouveau Testament est l\'étude de la révélation dans le Nouveau Testament.',
    points: 30
  },
  {
    id: '601',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie du Nouveau Testament est centrée sur le Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie du Nouveau Testament est centrée sur le Christ.',
    points: 25
  },
  {
    id: '602',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie paulinienne ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la théologie de saint Paul',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie paulinienne est l\'étude de la théologie de saint Paul.',
    points: 30
  },
  {
    id: '603',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie..."',
    questionType: 'quote-completion',
    options: [
      'éternelle',
      'éternelle, car Dieu est amour',
      'éternelle, car il est fidèle',
      'éternelle, car il est bon'
    ],
    correctAnswer: 1,
    explanation: 'Jean 3:16 : "Car Dieu a tant aimé le monde qu\'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu\'il ait la vie éternelle."',
    points: 35,
    scripture: 'Jean 3:16'
  },
  {
    id: '604',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie johannique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la théologie de saint Jean',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie johannique est l\'étude de la théologie de saint Jean.',
    points: 30
  },
  {
    id: '605',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie johannique est spirituelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie johannique est spirituelle.',
    points: 25
  },
  {
    id: '606',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie synoptique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des évangiles synoptiques',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie synoptique est l\'étude des évangiles synoptiques.',
    points: 30
  },
  {
    id: '607',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Jésus-Christ est le même hier, aujourd\'hui, et éternellement. Ne vous laissez pas entraîner par des doctrines diverses et étrangères..."',
    questionType: 'quote-completion',
    options: [
      'car il est fidèle',
      'car il est fidèle, car il ne change pas',
      'car il est constant',
      'car il est éternel'
    ],
    correctAnswer: 1,
    explanation: 'Hébreux 13:8-9 : "Jésus-Christ est le même hier, aujourd\'hui, et éternellement. Ne vous laissez pas entraîner par des doctrines diverses et étrangères."',
    points: 35,
    scripture: 'Hébreux 13:8-9'
  },
  {
    id: '608',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de l\'histoire du salut ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'action de Dieu dans l\'histoire',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de l\'histoire du salut est l\'étude de l\'action de Dieu dans l\'histoire.',
    points: 30
  },
  {
    id: '609',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'histoire du salut est progressive.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'histoire du salut est progressive.',
    points: 25
  },
  {
    id: '610',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de l\'alliance ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des alliances de Dieu avec l\'homme',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de l\'alliance est l\'étude des alliances de Dieu avec l\'homme.',
    points: 30
  },
  {
    id: '611',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Voici, les jours viennent, dit l\'Éternel, où je ferai avec la maison d\'Israël et la maison de Juda une alliance nouvelle..."',
    questionType: 'quote-completion',
    options: [
      'car l\'ancienne est périmée',
      'car l\'ancienne est périmée, car elle est accomplie',
      'car elle est nouvelle',
      'car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'Jérémie 31:31 : "Voici, les jours viennent, dit l\'Éternel, où je ferai avec la maison d\'Israël et la maison de Juda une alliance nouvelle."',
    points: 35,
    scripture: 'Jérémie 31:31'
  },
  {
    id: '612',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la promesse ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des promesses de Dieu',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la promesse est l\'étude des promesses de Dieu.',
    points: 30
  },
  {
    id: '613',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Les promesses de Dieu sont fidèles.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les promesses de Dieu sont fidèles.',
    points: 25
  },
  {
    id: '614',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la création ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la création selon la Bible',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la création est l\'étude de la création selon la Bible.',
    points: 30
  },
  {
    id: '615',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Les cieux racontent la gloire de Dieu, et l\'étendue manifeste l\'œuvre de ses..."',
    questionType: 'quote-completion',
    options: [
      'mains',
      'mains, car il est créateur',
      'mains, car il est tout-puissant',
      'mains, car il est souverain'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 19:1 : "Les cieux racontent la gloire de Dieu, et l\'étendue manifeste l\'œuvre de ses mains."',
    points: 35,
    scripture: 'Psaume 19:1'
  },
  {
    id: '616',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la chute ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du péché originel',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la chute est l\'étude du péché originel.',
    points: 30
  },
  {
    id: '617',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'La chute a affecté toute l\'humanité.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La chute a affecté toute l\'humanité.',
    points: 25
  },
  {
    id: '618',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la rédemption ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du rachat par le Christ',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la rédemption est l\'étude du rachat par le Christ.',
    points: 30
  },
  {
    id: '619',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Car le Fils de l\'homme est venu, non pour être servi, mais pour servir et donner sa vie comme rançon de..."',
    questionType: 'quote-completion',
    options: [
      'plusieurs',
      'plusieurs, car il est sauveur',
      'plusieurs, car il est rédempteur',
      'plusieurs, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Marc 10:45 : "Car le Fils de l\'homme est venu, non pour être servi, mais pour servir et donner sa vie comme rançon de plusieurs."',
    points: 35,
    scripture: 'Marc 10:45'
  },
  {
    id: '620',
    category: 'maitrise-theologie-biblique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la fin des temps ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'eschatologie biblique',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la fin des temps est l\'étude de l\'eschatologie biblique.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE HISTORIQUE (Questions 621-660) =====
  {
    id: '621',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie historique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'histoire de la théologie',
      'Une simple histoire',
      'Une chronologie',
      'Une évolution'
    ],
    correctAnswer: 0,
    explanation: 'La théologie historique est l\'étude de l\'histoire de la théologie.',
    points: 30
  },
  {
    id: '622',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie historique étudie l\'évolution des doctrines.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie historique étudie l\'évolution des doctrines.',
    points: 25
  },
  {
    id: '623',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La tradition est la transmission vivante de la Parole de Dieu dans l\'Église par l\'assistance du Saint..."',
    questionType: 'quote-completion',
    options: [
      'Esprit',
      'Esprit, car il guide l\'Église',
      'Esprit, car il est vérité',
      'Esprit, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'La tradition est la transmission vivante de la Parole de Dieu dans l\'Église par l\'assistance du Saint Esprit.',
    points: 35
  },
  {
    id: '624',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la patristique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des Pères de l\'Église',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La patristique est l\'étude des Pères de l\'Église.',
    points: 30
  },
  {
    id: '625',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Les Pères de l\'Église sont les premiers théologiens.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les Pères de l\'Église sont les premiers théologiens.',
    points: 25
  },
  {
    id: '626',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la scolastique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie médiévale',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La scolastique est la théologie médiévale.',
    points: 30
  },
  {
    id: '627',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La foi cherche l\'intelligence, car la foi est un don de Dieu qui nous fait croire en Dieu et en tout ce qu\'il a révélé, et que la sainte Église nous propose à croire, parce qu\'il est la vérité..."',
    questionType: 'quote-completion',
    options: [
      'absolue',
      'absolue, car Dieu est vérité',
      'absolue, car il est fidèle',
      'absolue, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Saint Anselme : "La foi cherche l\'intelligence, car la foi est un don de Dieu qui nous fait croire en Dieu et en tout ce qu\'il a révélé, et que la sainte Église nous propose à croire, parce qu\'il est la vérité absolue."',
    points: 35
  },
  {
    id: '628',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie moderne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie des temps modernes',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie moderne est la théologie des temps modernes.',
    points: 30
  },
  {
    id: '629',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie moderne répond aux défis contemporains.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie moderne répond aux défis contemporains.',
    points: 25
  },
  {
    id: '630',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie contemporaine ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie d\'aujourd\'hui',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie contemporaine est la théologie d\'aujourd\'hui.',
    points: 30
  },
  {
    id: '631',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie est la science de la foi, car elle cherche à comprendre ce que nous croyons par la lumière de la..."',
    questionType: 'quote-completion',
    options: [
      'raison',
      'raison, car elle éclaire',
      'raison, car elle guide',
      'raison, car elle libère'
    ],
    correctAnswer: 1,
    explanation: 'La théologie est la science de la foi, car elle cherche à comprendre ce que nous croyons par la lumière de la raison.',
    points: 35
  },
  {
    id: '632',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie systématique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'organisation systématique de la théologie',
      'Une simple organisation',
      'Une classification',
      'Une catégorisation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie systématique est l\'organisation systématique de la théologie.',
    points: 30
  },
  {
    id: '633',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie systématique organise les doctrines.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie systématique organise les doctrines.',
    points: 25
  },
  {
    id: '634',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie fondamentale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des fondements de la foi',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie fondamentale est l\'étude des fondements de la foi.',
    points: 30
  },
  {
    id: '635',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie fondamentale étudie la révélation divine, la transmission de la révélation, la foi et la..."',
    questionType: 'quote-completion',
    options: [
      'raison',
      'raison, car elles sont liées',
      'raison, car elles s\'éclairent',
      'raison, car elles se complètent'
    ],
    correctAnswer: 1,
    explanation: 'La théologie fondamentale étudie la révélation divine, la transmission de la révélation, la foi et la raison.',
    points: 35
  },
  {
    id: '636',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie spéculative ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie qui réfléchit sur les mystères',
      'Une simple réflexion',
      'Une méditation',
      'Une contemplation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie spéculative est la théologie qui réfléchit sur les mystères.',
    points: 30
  },
  {
    id: '637',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie spéculative utilise la raison.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie spéculative utilise la raison.',
    points: 25
  },
  {
    id: '638',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie positive ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie basée sur les sources',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie positive est la théologie basée sur les sources.',
    points: 30
  },
  {
    id: '639',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie positive étudie les sources de la révélation : l\'Écriture Sainte et la..."',
    questionType: 'quote-completion',
    options: [
      'Tradition',
      'Tradition, car elles sont liées',
      'Tradition, car elles se complètent',
      'Tradition, car elles sont divines'
    ],
    correctAnswer: 1,
    explanation: 'La théologie positive étudie les sources de la révélation : l\'Écriture Sainte et la Tradition.',
    points: 35
  },
  {
    id: '640',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie pastorale ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie au service du ministère',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie pastorale est la théologie au service du ministère.',
    points: 30
  },
  {
    id: '641',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie pastorale est pratique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie pastorale est pratique.',
    points: 25
  },
  {
    id: '642',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie spirituelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la vie spirituelle',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie spirituelle est l\'étude de la vie spirituelle.',
    points: 30
  },
  {
    id: '643',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie spirituelle étudie la vie de grâce, les étapes de la vie spirituelle, les dons du Saint Esprit et la..."',
    questionType: 'quote-completion',
    options: [
      'sainteté',
      'sainteté, car elle est le but',
      'sainteté, car elle est divine',
      'sainteté, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'La théologie spirituelle étudie la vie de grâce, les étapes de la vie spirituelle, les dons du Saint Esprit et la sainteté.',
    points: 35
  },
  {
    id: '644',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'expérience mystique',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie mystique est l\'étude de l\'expérience mystique.',
    points: 30
  },
  {
    id: '645',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie mystique étudie l\'union avec Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie mystique étudie l\'union avec Dieu.',
    points: 25
  },
  {
    id: '646',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie ascétique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'ascèse chrétienne',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie ascétique est l\'étude de l\'ascèse chrétienne.',
    points: 30
  },
  {
    id: '647',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'ascèse est l\'effort pour maîtriser les passions et les tendances mauvaises, pour acquérir les vertus et progresser dans la vie..."',
    questionType: 'quote-completion',
    options: [
      'spirituelle',
      'spirituelle, car elle est divine',
      'spirituelle, car elle est éternelle',
      'spirituelle, car elle est sainte'
    ],
    correctAnswer: 1,
    explanation: 'L\'ascèse est l\'effort pour maîtriser les passions et les tendances mauvaises, pour acquérir les vertus et progresser dans la vie spirituelle.',
    points: 35
  },
  {
    id: '648',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie monastique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée dans les monastères',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie monastique est la théologie développée dans les monastères.',
    points: 30
  },
  {
    id: '649',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie monastique est contemplative.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie monastique est contemplative.',
    points: 25
  },
  {
    id: '650',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie universitaire ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie enseignée dans les universités',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie universitaire est la théologie enseignée dans les universités.',
    points: 30
  },
  {
    id: '651',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie universitaire est académique et scientifique, elle utilise les méthodes de la recherche et de la..."',
    questionType: 'quote-completion',
    options: [
      'critique',
      'critique, car elle est rigoureuse',
      'critique, car elle est objective',
      'critique, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie universitaire est académique et scientifique, elle utilise les méthodes de la recherche et de la critique.',
    points: 35
  },
  {
    id: '652',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie contextuelle ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie adaptée au contexte',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie contextuelle est la théologie adaptée au contexte.',
    points: 30
  },
  {
    id: '653',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie contextuelle respecte les cultures.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie contextuelle respecte les cultures.',
    points: 25
  },
  {
    id: '654',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la libération ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie qui prône la libération',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la libération est la théologie qui prône la libération.',
    points: 30
  },
  {
    id: '655',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie de la libération met l\'accent sur la libération des pauvres et des opprimés, sur la justice sociale et la..."',
    questionType: 'quote-completion',
    options: [
      'solidarité',
      'solidarité, car elle est évangélique',
      'solidarité, car elle est divine',
      'solidarité, car elle est humaine'
    ],
    correctAnswer: 1,
    explanation: 'La théologie de la libération met l\'accent sur la libération des pauvres et des opprimés, sur la justice sociale et la solidarité.',
    points: 35
  },
  {
    id: '656',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie féministe ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie qui défend les droits des femmes',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie féministe est la théologie qui défend les droits des femmes.',
    points: 30
  },
  {
    id: '657',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie féministe critique le patriarcat.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie féministe critique le patriarcat.',
    points: 25
  },
  {
    id: '658',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie écologique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie qui défend l\'environnement',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie écologique est la théologie qui défend l\'environnement.',
    points: 30
  },
  {
    id: '659',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie écologique met l\'accent sur la responsabilité de l\'homme envers la création, sur la sauvegarde de l\'environnement et la..."',
    questionType: 'quote-completion',
    options: [
      'sustainability',
      'sustainability, car elle est nécessaire',
      'sustainability, car elle est divine',
      'sustainability, car elle est humaine'
    ],
    correctAnswer: 1,
    explanation: 'La théologie écologique met l\'accent sur la responsabilité de l\'homme envers la création, sur la sauvegarde de l\'environnement et la sustainability.',
    points: 35
  },
  {
    id: '660',
    category: 'maitrise-theologie-historique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie œcuménique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie qui cherche l\'unité des chrétiens',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie œcuménique est la théologie qui cherche l\'unité des chrétiens.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE PASTORALE (Questions 661-700) =====
  {
    id: '661',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie pastorale ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie au service du ministère pastoral',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie pastorale est la théologie au service du ministère pastoral.',
    points: 30
  },
  {
    id: '662',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie pastorale est pratique et appliquée.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie pastorale est pratique et appliquée.',
    points: 25
  },
  {
    id: '663',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le bon pasteur donne sa vie pour ses..."',
    questionType: 'quote-completion',
    options: [
      'brebis',
      'brebis, car il les aime',
      'brebis, car il est fidèle',
      'brebis, car il est bon'
    ],
    correctAnswer: 1,
    explanation: 'Jean 10:11 : "Le bon pasteur donne sa vie pour ses brebis."',
    points: 35,
    scripture: 'Jean 10:11'
  },
  {
    id: '664',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la catéchèse ?',
    questionType: 'multiple-choice',
    options: [
      'L\'enseignement de la foi',
      'Un simple enseignement',
      'Une instruction',
      'Une formation'
    ],
    correctAnswer: 0,
    explanation: 'La catéchèse est l\'enseignement de la foi.',
    points: 30
  },
  {
    id: '665',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La catéchèse est une responsabilité de l\'Église.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La catéchèse est une responsabilité de l\'Église.',
    points: 25
  },
  {
    id: '666',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'évangélisation ?',
    questionType: 'multiple-choice',
    options: [
      'L\'annonce de l\'Évangile',
      'Une simple annonce',
      'Une proclamation',
      'Une prédication'
    ],
    correctAnswer: 0,
    explanation: 'L\'évangélisation est l\'annonce de l\'Évangile.',
    points: 30
  },
  {
    id: '667',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Allez donc, de toutes les nations faites des disciples, les baptisant au nom du Père et du Fils et du Saint..."',
    questionType: 'quote-completion',
    options: [
      'Esprit',
      'Esprit, car il est Dieu',
      'Esprit, car il est vérité',
      'Esprit, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 28:19 : "Allez donc, de toutes les nations faites des disciples, les baptisant au nom du Père et du Fils et du Saint Esprit."',
    points: 35,
    scripture: 'Matthieu 28:19'
  },
  {
    id: '668',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des jeunes ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des jeunes',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des jeunes est l\'accompagnement pastoral des jeunes.',
    points: 30
  },
  {
    id: '669',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des jeunes est adaptée aux besoins.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des jeunes est adaptée aux besoins.',
    points: 25
  },
  {
    id: '670',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale familiale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des familles',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale familiale est l\'accompagnement pastoral des familles.',
    points: 30
  },
  {
    id: '671',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La famille est la cellule de base de la..."',
    questionType: 'quote-completion',
    options: [
      'société',
      'société, car elle est fondamentale',
      'société, car elle est divine',
      'société, car elle est humaine'
    ],
    correctAnswer: 1,
    explanation: 'La famille est la cellule de base de la société.',
    points: 35
  },
  {
    id: '672',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des malades ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des malades',
      'Un simple accompagnement',
      'Une visite',
      'Une consolation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des malades est l\'accompagnement pastoral des malades.',
    points: 30
  },
  {
    id: '673',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des malades apporte réconfort et espérance.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des malades apporte réconfort et espérance.',
    points: 25
  },
  {
    id: '674',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des mourants ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des mourants',
      'Un simple accompagnement',
      'Une visite',
      'Une consolation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des mourants est l\'accompagnement pastoral des mourants.',
    points: 30
  },
  {
    id: '675',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Même si je marche dans la vallée de l\'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me..."',
    questionType: 'quote-completion',
    options: [
      'rassurent',
      'rassurent, car tu es fidèle',
      'rassurent, car tu es bon',
      'rassurent, car tu es amour'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 23:4 : "Même si je marche dans la vallée de l\'ombre de la mort, je ne crains aucun mal, car tu es avec moi : ta houlette et ton bâton me rassurent."',
    points: 35,
    scripture: 'Psaume 23:4'
  },
  {
    id: '676',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des prisonniers ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des prisonniers',
      'Un simple accompagnement',
      'Une visite',
      'Une consolation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des prisonniers est l\'accompagnement pastoral des prisonniers.',
    points: 30
  },
  {
    id: '677',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des prisonniers apporte espérance et rédemption.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des prisonniers apporte espérance et rédemption.',
    points: 25
  },
  {
    id: '678',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des migrants ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des migrants',
      'Un simple accompagnement',
      'Une aide',
      'Un soutien'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des migrants est l\'accompagnement pastoral des migrants.',
    points: 30
  },
  {
    id: '679',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "J\'étais étranger et vous m\'avez..."',
    questionType: 'quote-completion',
    options: [
      'accueilli',
      'accueilli, car vous êtes charitables',
      'accueilli, car vous êtes bons',
      'accueilli, car vous êtes saints'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 25:35 : "J\'étais étranger et vous m\'avez accueilli."',
    points: 35,
    scripture: 'Matthieu 25:35'
  },
  {
    id: '680',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des pauvres ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des pauvres',
      'Un simple accompagnement',
      'Une aide',
      'Un soutien'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des pauvres est l\'accompagnement pastoral des pauvres.',
    points: 30
  },
  {
    id: '681',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des pauvres est une priorité évangélique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des pauvres est une priorité évangélique.',
    points: 25
  },
  {
    id: '682',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des travailleurs ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des travailleurs',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des travailleurs est l\'accompagnement pastoral des travailleurs.',
    points: 30
  },
  {
    id: '683',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le travail est pour l\'homme, et non l\'homme pour le..."',
    questionType: 'quote-completion',
    options: [
      'travail',
      'travail, car l\'homme est sacré',
      'travail, car l\'homme est divin',
      'travail, car l\'homme est libre'
    ],
    correctAnswer: 1,
    explanation: 'Le travail est pour l\'homme, et non l\'homme pour le travail.',
    points: 35
  },
  {
    id: '684',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des intellectuels ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des intellectuels',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des intellectuels est l\'accompagnement pastoral des intellectuels.',
    points: 30
  },
  {
    id: '685',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des intellectuels dialogue avec la culture.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des intellectuels dialogue avec la culture.',
    points: 25
  },
  {
    id: '686',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des artistes ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral des artistes',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des artistes est l\'accompagnement pastoral des artistes.',
    points: 30
  },
  {
    id: '687',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La beauté sauvera le..."',
    questionType: 'quote-completion',
    options: [
      'monde',
      'monde, car elle est divine',
      'monde, car elle est éternelle',
      'monde, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Dostoïevski : "La beauté sauvera le monde."',
    points: 35
  },
  {
    id: '688',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale des médias ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans les médias',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale des médias est l\'accompagnement pastoral dans les médias.',
    points: 30
  },
  {
    id: '689',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale des médias utilise les nouvelles technologies.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale des médias utilise les nouvelles technologies.',
    points: 25
  },
  {
    id: '690',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de la santé ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans le domaine de la santé',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de la santé est l\'accompagnement pastoral dans le domaine de la santé.',
    points: 30
  },
  {
    id: '691',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ce ne sont pas les bien-portants qui ont besoin de médecin, mais les..."',
    questionType: 'quote-completion',
    options: [
      'malades',
      'malades, car ils souffrent',
      'malades, car ils sont faibles',
      'malades, car ils sont pauvres'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 9:12 : "Ce ne sont pas les bien-portants qui ont besoin de médecin, mais les malades."',
    points: 35,
    scripture: 'Matthieu 9:12'
  },
  {
    id: '692',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de l\'éducation ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans l\'éducation',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de l\'éducation est l\'accompagnement pastoral dans l\'éducation.',
    points: 30
  },
  {
    id: '693',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale de l\'éducation forme l\'homme tout entier.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale de l\'éducation forme l\'homme tout entier.',
    points: 25
  },
  {
    id: '694',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de la culture ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans la culture',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de la culture est l\'accompagnement pastoral dans la culture.',
    points: 30
  },
  {
    id: '695',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La culture est ce qui reste quand on a tout..."',
    questionType: 'quote-completion',
    options: [
      'oublié',
      'oublié, car elle est essentielle',
      'oublié, car elle est divine',
      'oublié, car elle est humaine'
    ],
    correctAnswer: 1,
    explanation: 'La culture est ce qui reste quand on a tout oublié.',
    points: 35
  },
  {
    id: '696',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de la politique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans la politique',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de la politique est l\'accompagnement pastoral dans la politique.',
    points: 30
  },
  {
    id: '697',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'La pastorale de la politique forme à la responsabilité civique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La pastorale de la politique forme à la responsabilité civique.',
    points: 25
  },
  {
    id: '698',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de l\'économie ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral dans l\'économie',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de l\'économie est l\'accompagnement pastoral dans l\'économie.',
    points: 30
  },
  {
    id: '699',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'économie doit être au service de l\'homme et non l\'homme au service de..."',
    questionType: 'quote-completion',
    options: [
      'l\'économie',
      'l\'économie, car l\'homme est sacré',
      'l\'économie, car l\'homme est divin',
      'l\'économie, car l\'homme est libre'
    ],
    correctAnswer: 1,
    explanation: 'L\'économie doit être au service de l\'homme et non l\'homme au service de l\'économie.',
    points: 35
  },
  {
    id: '700',
    category: 'maitrise-theologie-pastorale',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pastorale de l\'environnement ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accompagnement pastoral pour l\'environnement',
      'Un simple accompagnement',
      'Une formation',
      'Une éducation'
    ],
    correctAnswer: 0,
    explanation: 'La pastorale de l\'environnement est l\'accompagnement pastoral pour l\'environnement.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE SPIRITUELLE (Questions 701-740) =====
  {
    id: '701',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie spirituelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la vie spirituelle chrétienne',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie spirituelle est l\'étude de la vie spirituelle chrétienne.',
    points: 30
  },
  {
    id: '702',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie spirituelle étudie la vie de grâce.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie spirituelle étudie la vie de grâce.',
    points: 25
  },
  {
    id: '703',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La vie spirituelle est la vie de l\'âme unie à Dieu par la..."',
    questionType: 'quote-completion',
    options: [
      'grâce',
      'grâce, car elle est divine',
      'grâce, car elle est sainte',
      'grâce, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'La vie spirituelle est la vie de l\'âme unie à Dieu par la grâce.',
    points: 35
  },
  {
    id: '704',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la grâce sanctifiante ?',
    questionType: 'multiple-choice',
    options: [
      'La grâce qui sanctifie l\'âme',
      'Une simple grâce',
      'Un don',
      'Une faveur'
    ],
    correctAnswer: 0,
    explanation: 'La grâce sanctifiante est la grâce qui sanctifie l\'âme.',
    points: 30
  },
  {
    id: '705',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La grâce sanctifiante nous rend participants de la nature divine.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La grâce sanctifiante nous rend participants de la nature divine.',
    points: 25
  },
  {
    id: '706',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la grâce actuelle ?',
    questionType: 'multiple-choice',
    options: [
      'La grâce qui nous aide à agir',
      'Une simple grâce',
      'Un don',
      'Une faveur'
    ],
    correctAnswer: 0,
    explanation: 'La grâce actuelle est la grâce qui nous aide à agir.',
    points: 30
  },
  {
    id: '707',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Sans moi, vous ne pouvez rien..."',
    questionType: 'quote-completion',
    options: [
      'faire',
      'faire, car je suis la vie',
      'faire, car je suis la vérité',
      'faire, car je suis le chemin'
    ],
    correctAnswer: 1,
    explanation: 'Jean 15:5 : "Sans moi, vous ne pouvez rien faire."',
    points: 35,
    scripture: 'Jean 15:5'
  },
  {
    id: '708',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que les dons du Saint Esprit ?',
    questionType: 'multiple-choice',
    options: [
      'Les dons spirituels donnés par l\'Esprit Saint',
      'De simples dons',
      'Des talents',
      'Des capacités'
    ],
    correctAnswer: 0,
    explanation: 'Les dons du Saint Esprit sont les dons spirituels donnés par l\'Esprit Saint.',
    points: 30
  },
  {
    id: '709',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Les dons du Saint Esprit sont au nombre de sept.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Les dons du Saint Esprit sont au nombre de sept.',
    points: 25
  },
  {
    id: '710',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que les fruits du Saint Esprit ?',
    questionType: 'multiple-choice',
    options: [
      'Les vertus produites par l\'Esprit Saint',
      'De simples vertus',
      'Des qualités',
      'Des caractères'
    ],
    correctAnswer: 0,
    explanation: 'Les fruits du Saint Esprit sont les vertus produites par l\'Esprit Saint.',
    points: 30
  },
  {
    id: '711',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le fruit de l\'Esprit est amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de..."',
    questionType: 'quote-completion',
    options: [
      'soi',
      'soi, car c\'est une vertu',
      'soi, car c\'est un don',
      'soi, car c\'est un fruit'
    ],
    correctAnswer: 1,
    explanation: 'Galates 5:22-23 : "Le fruit de l\'Esprit est amour, joie, paix, patience, bonté, bienveillance, fidélité, douceur, maîtrise de soi."',
    points: 35,
    scripture: 'Galates 5:22-23'
  },
  {
    id: '712',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vie mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La vie d\'union intime avec Dieu',
      'Une simple vie',
      'Une expérience',
      'Une union'
    ],
    correctAnswer: 0,
    explanation: 'La vie mystique est la vie d\'union intime avec Dieu.',
    points: 30
  },
  {
    id: '713',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La vie mystique est accessible à tous les chrétiens.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La vie mystique est accessible à tous les chrétiens.',
    points: 25
  },
  {
    id: '714',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la contemplation ?',
    questionType: 'multiple-choice',
    options: [
      'Le regard de foi fixé sur Dieu',
      'Un simple regard',
      'Une vision',
      'Une contemplation'
    ],
    correctAnswer: 0,
    explanation: 'La contemplation est le regard de foi fixé sur Dieu.',
    points: 30
  },
  {
    id: '715',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les cœurs purs, car ils verront..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car ils sont saints',
      'Dieu, car ils sont purs',
      'Dieu, car ils sont justes'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:8 : "Heureux les cœurs purs, car ils verront Dieu."',
    points: 35,
    scripture: 'Matthieu 5:8'
  },
  {
    id: '716',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière ?',
    questionType: 'multiple-choice',
    options: [
      'L\'élévation de l\'âme vers Dieu',
      'Une simple élévation',
      'Une demande',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'La prière est l\'élévation de l\'âme vers Dieu.',
    points: 30
  },
  {
    id: '717',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière est nécessaire pour la vie spirituelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière est nécessaire pour la vie spirituelle.',
    points: 25
  },
  {
    id: '718',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière vocale ?',
    questionType: 'multiple-choice',
    options: [
      'La prière exprimée par des paroles',
      'Une simple prière',
      'Une oraison',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'La prière vocale est la prière exprimée par des paroles.',
    points: 30
  },
  {
    id: '719',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Priez sans cesse, rendez grâces en toutes circonstances : c\'est la volonté de Dieu sur vous dans le Christ..."',
    questionType: 'quote-completion',
    options: [
      'Jésus',
      'Jésus, car il est notre Seigneur',
      'Jésus, car il est notre Sauveur',
      'Jésus, car il est notre Maître'
    ],
    correctAnswer: 1,
    explanation: '1 Thessaloniciens 5:17-18 : "Priez sans cesse, rendez grâces en toutes circonstances : c\'est la volonté de Dieu sur vous dans le Christ Jésus."',
    points: 35,
    scripture: '1 Thessaloniciens 5:17-18'
  },
  {
    id: '720',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière mentale ?',
    questionType: 'multiple-choice',
    options: [
      'La prière intérieure de l\'esprit',
      'Une simple prière',
      'Une oraison',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'La prière mentale est la prière intérieure de l\'esprit.',
    points: 30
  },
  {
    id: '721',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La prière mentale est plus profonde que la prière vocale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La prière mentale est plus profonde que la prière vocale.',
    points: 25
  },
  {
    id: '722',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la méditation ?',
    questionType: 'multiple-choice',
    options: [
      'La réflexion sur les vérités de la foi',
      'Une simple réflexion',
      'Une pensée',
      'Une considération'
    ],
    correctAnswer: 0,
    explanation: 'La méditation est la réflexion sur les vérités de la foi.',
    points: 30
  },
  {
    id: '723',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux l\'homme qui médite la loi du Seigneur jour et..."',
    questionType: 'quote-completion',
    options: [
      'nuit',
      'nuit, car elle est vie',
      'nuit, car elle est vérité',
      'nuit, car elle est sagesse'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 1:2 : "Heureux l\'homme qui médite la loi du Seigneur jour et nuit."',
    points: 35,
    scripture: 'Psaume 1:2'
  },
  {
    id: '724',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'oraison ?',
    questionType: 'multiple-choice',
    options: [
      'La prière silencieuse et contemplative',
      'Une simple prière',
      'Une méditation',
      'Une contemplation'
    ],
    correctAnswer: 0,
    explanation: 'L\'oraison est la prière silencieuse et contemplative.',
    points: 30
  },
  {
    id: '725',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'oraison est un dialogue avec Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'oraison est un dialogue avec Dieu.',
    points: 25
  },
  {
    id: '726',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'adoration ?',
    questionType: 'multiple-choice',
    options: [
      'L\'acte de rendre gloire à Dieu',
      'Un simple acte',
      'Un hommage',
      'Un culte'
    ],
    correctAnswer: 0,
    explanation: 'L\'adoration est l\'acte de rendre gloire à Dieu.',
    points: 30
  },
  {
    id: '727',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Adorez le Seigneur dans la splendeur de sa..."',
    questionType: 'quote-completion',
    options: [
      'sainteté',
      'sainteté, car il est saint',
      'sainteté, car il est glorieux',
      'sainteté, car il est divin'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 29:2 : "Adorez le Seigneur dans la splendeur de sa sainteté."',
    points: 35,
    scripture: 'Psaume 29:2'
  },
  {
    id: '728',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'action de grâces ?',
    questionType: 'multiple-choice',
    options: [
      'L\'expression de reconnaissance envers Dieu',
      'Une simple expression',
      'Une reconnaissance',
      'Un remerciement'
    ],
    correctAnswer: 0,
    explanation: 'L\'action de grâces est l\'expression de reconnaissance envers Dieu.',
    points: 30
  },
  {
    id: '729',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'action de grâces est un devoir du chrétien.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'action de grâces est un devoir du chrétien.',
    points: 25
  },
  {
    id: '730',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la supplication ?',
    questionType: 'multiple-choice',
    options: [
      'La demande humble à Dieu',
      'Une simple demande',
      'Une prière',
      'Une requête'
    ],
    correctAnswer: 0,
    explanation: 'La supplication est la demande humble à Dieu.',
    points: 30
  },
  {
    id: '731',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Demandez et vous recevrez, cherchez et vous trouverez, frappez et l\'on vous..."',
    questionType: 'quote-completion',
    options: [
      'ouvrira',
      'ouvrira, car Dieu est bon',
      'ouvrira, car Dieu est fidèle',
      'ouvrira, car Dieu est amour'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 7:7 : "Demandez et vous recevrez, cherchez et vous trouverez, frappez et l\'on vous ouvrira."',
    points: 35,
    scripture: 'Matthieu 7:7'
  },
  {
    id: '732',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'intercession ?',
    questionType: 'multiple-choice',
    options: [
      'La prière pour les autres',
      'Une simple prière',
      'Une demande',
      'Une supplication'
    ],
    correctAnswer: 0,
    explanation: 'L\'intercession est la prière pour les autres.',
    points: 30
  },
  {
    id: '733',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'intercession est un acte de charité.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'intercession est un acte de charité.',
    points: 25
  },
  {
    id: '734',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la louange ?',
    questionType: 'multiple-choice',
    options: [
      'L\'expression de la gloire de Dieu',
      'Une simple expression',
      'Une glorification',
      'Une exaltation'
    ],
    correctAnswer: 0,
    explanation: 'La louange est l\'expression de la gloire de Dieu.',
    points: 30
  },
  {
    id: '735',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Louez le Seigneur, toutes les nations, célébrez-le, tous les..."',
    questionType: 'quote-completion',
    options: [
      'peuples',
      'peuples, car il est bon',
      'peuples, car il est fidèle',
      'peuples, car il est saint'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 117:1 : "Louez le Seigneur, toutes les nations, célébrez-le, tous les peuples."',
    points: 35,
    scripture: 'Psaume 117:1'
  },
  {
    id: '736',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la bénédiction ?',
    questionType: 'multiple-choice',
    options: [
      'L\'invocation de la grâce de Dieu',
      'Une simple invocation',
      'Une prière',
      'Une demande'
    ],
    correctAnswer: 0,
    explanation: 'La bénédiction est l\'invocation de la grâce de Dieu.',
    points: 30
  },
  {
    id: '737',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La bénédiction est un acte sacerdotal.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La bénédiction est un acte sacerdotal.',
    points: 25
  },
  {
    id: '738',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pénitence ?',
    questionType: 'multiple-choice',
    options: [
      'Le repentir et la conversion',
      'Un simple repentir',
      'Une conversion',
      'Un changement'
    ],
    correctAnswer: 0,
    explanation: 'La pénitence est le repentir et la conversion.',
    points: 30
  },
  {
    id: '739',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Convertissez-vous et croyez à l\'..."',
    questionType: 'quote-completion',
    options: [
      'Évangile',
      'Évangile, car il est vérité',
      'Évangile, car il est vie',
      'Évangile, car il est salut'
    ],
    correctAnswer: 1,
    explanation: 'Marc 1:15 : "Convertissez-vous et croyez à l\'Évangile."',
    points: 35,
    scripture: 'Marc 1:15'
  },
  {
    id: '740',
    category: 'maitrise-theologie-spirituelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la sainteté ?',
    questionType: 'multiple-choice',
    options: [
      'La participation à la sainteté de Dieu',
      'Une simple participation',
      'Une union',
      'Une communion'
    ],
    correctAnswer: 0,
    explanation: 'La sainteté est la participation à la sainteté de Dieu.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE MYSTIQUE (Questions 741-780) =====
  {
    id: '741',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'expérience mystique',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie mystique est l\'étude de l\'expérience mystique.',
    points: 30
  },
  {
    id: '742',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie mystique étudie l\'union avec Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie mystique étudie l\'union avec Dieu.',
    points: 25
  },
  {
    id: '743',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'expérience mystique est l\'union intime de l\'âme avec..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est amour',
      'Dieu, car il est vérité',
      'Dieu, car il est vie'
    ],
    correctAnswer: 1,
    explanation: 'L\'expérience mystique est l\'union intime de l\'âme avec Dieu.',
    points: 35
  },
  {
    id: '744',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'extase mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'état d\'union profonde avec Dieu',
      'Un simple état',
      'Une expérience',
      'Une union'
    ],
    correctAnswer: 0,
    explanation: 'L\'extase mystique est l\'état d\'union profonde avec Dieu.',
    points: 30
  },
  {
    id: '745',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'extase mystique est un don de Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'extase mystique est un don de Dieu.',
    points: 25
  },
  {
    id: '746',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la vision mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La vision spirituelle de Dieu',
      'Une simple vision',
      'Une apparition',
      'Une révélation'
    ],
    correctAnswer: 0,
    explanation: 'La vision mystique est la vision spirituelle de Dieu.',
    points: 30
  },
  {
    id: '747',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les cœurs purs, car ils verront..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car ils sont saints',
      'Dieu, car ils sont purs',
      'Dieu, car ils sont justes'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:8 : "Heureux les cœurs purs, car ils verront Dieu."',
    points: 35,
    scripture: 'Matthieu 5:8'
  },
  {
    id: '748',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la révélation mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La révélation directe de Dieu',
      'Une simple révélation',
      'Une apparition',
      'Une vision'
    ],
    correctAnswer: 0,
    explanation: 'La révélation mystique est la révélation directe de Dieu.',
    points: 30
  },
  {
    id: '749',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La révélation mystique est rare et exceptionnelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La révélation mystique est rare et exceptionnelle.',
    points: 25
  },
  {
    id: '750',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'illumination mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'éclairement spirituel de l\'âme',
      'Un simple éclairement',
      'Une lumière',
      'Une illumination'
    ],
    correctAnswer: 0,
    explanation: 'L\'illumination mystique est l\'éclairement spirituel de l\'âme.',
    points: 30
  },
  {
    id: '751',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le Seigneur est ma lumière et mon salut, de qui aurais-je..."',
    questionType: 'quote-completion',
    options: [
      'peur',
      'peur, car il est avec moi',
      'peur, car il me protège',
      'peur, car il m\'aime'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 27:1 : "Le Seigneur est ma lumière et mon salut, de qui aurais-je peur ?"',
    points: 35,
    scripture: 'Psaume 27:1'
  },
  {
    id: '752',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'union mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'union intime avec Dieu',
      'Une simple union',
      'Une communion',
      'Une participation'
    ],
    correctAnswer: 0,
    explanation: 'L\'union mystique est l\'union intime avec Dieu.',
    points: 30
  },
  {
    id: '753',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'union mystique est le but de la vie spirituelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'union mystique est le but de la vie spirituelle.',
    points: 25
  },
  {
    id: '754',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la transformation mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation de l\'âme par Dieu',
      'Une simple transformation',
      'Un changement',
      'Une conversion'
    ],
    correctAnswer: 0,
    explanation: 'La transformation mystique est la transformation de l\'âme par Dieu.',
    points: 30
  },
  {
    id: '755',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ne vous conformez pas au monde présent, mais soyez transformés par le renouvellement de votre..."',
    questionType: 'quote-completion',
    options: [
      'intelligence',
      'intelligence, car elle est divine',
      'intelligence, car elle est sainte',
      'intelligence, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Romains 12:2 : "Ne vous conformez pas au monde présent, mais soyez transformés par le renouvellement de votre intelligence."',
    points: 35,
    scripture: 'Romains 12:2'
  },
  {
    id: '756',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la déification ?',
    questionType: 'multiple-choice',
    options: [
      'La participation à la nature divine',
      'Une simple participation',
      'Une union',
      'Une communion'
    ],
    correctAnswer: 0,
    explanation: 'La déification est la participation à la nature divine.',
    points: 30
  },
  {
    id: '757',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La déification est possible par la grâce.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La déification est possible par la grâce.',
    points: 25
  },
  {
    id: '758',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théosis ?',
    questionType: 'multiple-choice',
    options: [
      'La divinisation de l\'homme',
      'Une simple divinisation',
      'Une transformation',
      'Une conversion'
    ],
    correctAnswer: 0,
    explanation: 'La théosis est la divinisation de l\'homme.',
    points: 30
  },
  {
    id: '759',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Dieu s\'est fait homme pour que l\'homme devienne..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car c\'est le but',
      'Dieu, car c\'est la grâce',
      'Dieu, car c\'est l\'amour'
    ],
    correctAnswer: 1,
    explanation: 'Saint Athanase : "Dieu s\'est fait homme pour que l\'homme devienne Dieu."',
    points: 35
  },
  {
    id: '760',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la contemplation mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La contemplation de Dieu dans l\'union mystique',
      'Une simple contemplation',
      'Une vision',
      'Une révélation'
    ],
    correctAnswer: 0,
    explanation: 'La contemplation mystique est la contemplation de Dieu dans l\'union mystique.',
    points: 30
  },
  {
    id: '761',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La contemplation mystique est passive.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La contemplation mystique est passive.',
    points: 25
  },
  {
    id: '762',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'oraison mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La prière dans l\'union mystique',
      'Une simple prière',
      'Une oraison',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'L\'oraison mystique est la prière dans l\'union mystique.',
    points: 30
  },
  {
    id: '763',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'oraison mystique est un don de Dieu, une grâce de l\'Esprit..."',
    questionType: 'quote-completion',
    options: [
      'Saint',
      'Saint, car il est Dieu',
      'Saint, car il est vérité',
      'Saint, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'L\'oraison mystique est un don de Dieu, une grâce de l\'Esprit Saint.',
    points: 35
  },
  {
    id: '764',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'amour mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'amour divin dans l\'union mystique',
      'Un simple amour',
      'Une affection',
      'Une tendresse'
    ],
    correctAnswer: 0,
    explanation: 'L\'amour mystique est l\'amour divin dans l\'union mystique.',
    points: 30
  },
  {
    id: '765',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'amour mystique est un don de Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'amour mystique est un don de Dieu.',
    points: 25
  },
  {
    id: '766',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la joie mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La joie de l\'union avec Dieu',
      'Une simple joie',
      'Un bonheur',
      'Une félicité'
    ],
    correctAnswer: 0,
    explanation: 'La joie mystique est la joie de l\'union avec Dieu.',
    points: 30
  },
  {
    id: '767',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La joie du Seigneur est votre..."',
    questionType: 'quote-completion',
    options: [
      'force',
      'force, car elle est divine',
      'force, car elle est sainte',
      'force, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'Néhémie 8:10 : "La joie du Seigneur est votre force."',
    points: 35,
    scripture: 'Néhémie 8:10'
  },
  {
    id: '768',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la paix mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La paix de l\'union avec Dieu',
      'Une simple paix',
      'Un calme',
      'Une tranquillité'
    ],
    correctAnswer: 0,
    explanation: 'La paix mystique est la paix de l\'union avec Dieu.',
    points: 30
  },
  {
    id: '769',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La paix mystique dépasse toute intelligence.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La paix mystique dépasse toute intelligence.',
    points: 25
  },
  {
    id: '770',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la sagesse mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La sagesse divine reçue dans l\'union mystique',
      'Une simple sagesse',
      'Une connaissance',
      'Une intelligence'
    ],
    correctAnswer: 0,
    explanation: 'La sagesse mystique est la sagesse divine reçue dans l\'union mystique.',
    points: 30
  },
  {
    id: '771',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La crainte du Seigneur est le commencement de la..."',
    questionType: 'quote-completion',
    options: [
      'sagesse',
      'sagesse, car elle est divine',
      'sagesse, car elle est sainte',
      'sagesse, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Proverbes 9:10 : "La crainte du Seigneur est le commencement de la sagesse."',
    points: 35,
    scripture: 'Proverbes 9:10'
  },
  {
    id: '772',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la connaissance mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La connaissance de Dieu par expérience',
      'Une simple connaissance',
      'Une science',
      'Une intelligence'
    ],
    correctAnswer: 0,
    explanation: 'La connaissance mystique est la connaissance de Dieu par expérience.',
    points: 30
  },
  {
    id: '773',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'La connaissance mystique est expérientielle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La connaissance mystique est expérientielle.',
    points: 25
  },
  {
    id: '774',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la foi mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La foi dans l\'union mystique',
      'Une simple foi',
      'Une croyance',
      'Une confiance'
    ],
    correctAnswer: 0,
    explanation: 'La foi mystique est la foi dans l\'union mystique.',
    points: 30
  },
  {
    id: '775',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La foi est la substance des choses qu\'on espère, la démonstration de celles qu\'on ne..."',
    questionType: 'quote-completion',
    options: [
      'voit',
      'voit, car elle est divine',
      'voit, car elle est sainte',
      'voit, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Hébreux 11:1 : "La foi est la substance des choses qu\'on espère, la démonstration de celles qu\'on ne voit."',
    points: 35,
    scripture: 'Hébreux 11:1'
  },
  {
    id: '776',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'espérance mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'espérance dans l\'union avec Dieu',
      'Une simple espérance',
      'Une attente',
      'Une confiance'
    ],
    correctAnswer: 0,
    explanation: 'L\'espérance mystique est l\'espérance dans l\'union avec Dieu.',
    points: 30
  },
  {
    id: '777',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'espérance mystique ne déçoit jamais.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'espérance mystique ne déçoit jamais.',
    points: 25
  },
  {
    id: '778',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la charité mystique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'amour divin dans l\'union mystique',
      'Un simple amour',
      'Une affection',
      'Une tendresse'
    ],
    correctAnswer: 0,
    explanation: 'La charité mystique est l\'amour divin dans l\'union mystique.',
    points: 30
  },
  {
    id: '779',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La charité ne passe jamais. Les prophéties disparaîtront, les langues cesseront, la connaissance disparaîtra. Car nous connaissons en partie et nous prophétisons en partie, mais quand ce qui est parfait sera venu, ce qui est partiel..."',
    questionType: 'quote-completion',
    options: [
      'disparaîtra',
      'disparaîtra, car la charité est éternelle',
      'disparaîtra, car la charité est divine',
      'disparaîtra, car la charité est parfaite'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 13:8-10 : "La charité ne passe jamais. Les prophéties disparaîtront, les langues cesseront, la connaissance disparaîtra. Car nous connaissons en partie et nous prophétisons en partie, mais quand ce qui est parfait sera venu, ce qui est partiel disparaîtra."',
    points: 35,
    scripture: '1 Corinthiens 13:8-10'
  },
  {
    id: '780',
    category: 'maitrise-theologie-mystique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la sainteté mystique ?',
    questionType: 'multiple-choice',
    options: [
      'La sainteté dans l\'union mystique',
      'Une simple sainteté',
      'Une pureté',
      'Une perfection'
    ],
    correctAnswer: 0,
    explanation: 'La sainteté mystique est la sainteté dans l\'union mystique.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE ASCÉTIQUE (Questions 781-820) =====
  {
    id: '781',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie ascétique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'ascèse chrétienne',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie ascétique est l\'étude de l\'ascèse chrétienne.',
    points: 30
  },
  {
    id: '782',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie ascétique étudie la maîtrise de soi.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie ascétique étudie la maîtrise de soi.',
    points: 25
  },
  {
    id: '783',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'ascèse est l\'effort pour maîtriser les passions et les tendances mauvaises, pour acquérir les vertus et progresser dans la vie..."',
    questionType: 'quote-completion',
    options: [
      'spirituelle',
      'spirituelle, car elle est divine',
      'spirituelle, car elle est éternelle',
      'spirituelle, car elle est sainte'
    ],
    correctAnswer: 1,
    explanation: 'L\'ascèse est l\'effort pour maîtriser les passions et les tendances mauvaises, pour acquérir les vertus et progresser dans la vie spirituelle.',
    points: 35
  },
  {
    id: '784',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la mortification ?',
    questionType: 'multiple-choice',
    options: [
      'La maîtrise des désirs sensuels',
      'Une simple maîtrise',
      'Un contrôle',
      'Une discipline'
    ],
    correctAnswer: 0,
    explanation: 'La mortification est la maîtrise des désirs sensuels.',
    points: 30
  },
  {
    id: '785',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La mortification est nécessaire pour la vie spirituelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La mortification est nécessaire pour la vie spirituelle.',
    points: 25
  },
  {
    id: '786',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le jeûne ?',
    questionType: 'multiple-choice',
    options: [
      'L\'abstinence de nourriture pour des raisons spirituelles',
      'Une simple abstinence',
      'Un renoncement',
      'Une privation'
    ],
    correctAnswer: 0,
    explanation: 'Le jeûne est l\'abstinence de nourriture pour des raisons spirituelles.',
    points: 30
  },
  {
    id: '787',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Ce n\'est pas seulement de pain que l\'homme vivra, mais de toute parole qui sort de la bouche de..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car elle est vie',
      'Dieu, car elle est vérité',
      'Dieu, car elle est amour'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 4:4 : "Ce n\'est pas seulement de pain que l\'homme vivra, mais de toute parole qui sort de la bouche de Dieu."',
    points: 35,
    scripture: 'Matthieu 4:4'
  },
  {
    id: '788',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la veille ?',
    questionType: 'multiple-choice',
    options: [
      'La privation de sommeil pour la prière',
      'Une simple privation',
      'Un renoncement',
      'Une abstinence'
    ],
    correctAnswer: 0,
    explanation: 'La veille est la privation de sommeil pour la prière.',
    points: 30
  },
  {
    id: '789',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La veille est une pratique monastique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La veille est une pratique monastique.',
    points: 25
  },
  {
    id: '790',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pauvreté volontaire ?',
    questionType: 'multiple-choice',
    options: [
      'Le renoncement aux biens matériels',
      'Un simple renoncement',
      'Un abandon',
      'Une privation'
    ],
    correctAnswer: 0,
    explanation: 'La pauvreté volontaire est le renoncement aux biens matériels.',
    points: 30
  },
  {
    id: '791',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les pauvres en esprit, car le royaume des cieux est à..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car ils sont humbles',
      'eux, car ils sont saints',
      'eux, car ils sont justes'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:3 : "Heureux les pauvres en esprit, car le royaume des cieux est à eux."',
    points: 35,
    scripture: 'Matthieu 5:3'
  },
  {
    id: '792',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la chasteté ?',
    questionType: 'multiple-choice',
    options: [
      'La maîtrise de la sexualité',
      'Une simple maîtrise',
      'Un contrôle',
      'Une discipline'
    ],
    correctAnswer: 0,
    explanation: 'La chasteté est la maîtrise de la sexualité.',
    points: 30
  },
  {
    id: '793',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La chasteté est une vertu chrétienne.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La chasteté est une vertu chrétienne.',
    points: 25
  },
  {
    id: '794',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'obéissance ?',
    questionType: 'multiple-choice',
    options: [
      'La soumission à la volonté de Dieu',
      'Une simple soumission',
      'Un respect',
      'Une docilité'
    ],
    correctAnswer: 0,
    explanation: 'L\'obéissance est la soumission à la volonté de Dieu.',
    points: 30
  },
  {
    id: '795',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Mieux vaut obéir que..."',
    questionType: 'quote-completion',
    options: [
      'sacrifier',
      'sacrifier, car l\'obéissance est divine',
      'sacrifier, car l\'obéissance est sainte',
      'sacrifier, car l\'obéissance est vraie'
    ],
    correctAnswer: 1,
    explanation: '1 Samuel 15:22 : "Mieux vaut obéir que sacrifier."',
    points: 35,
    scripture: '1 Samuel 15:22'
  },
  {
    id: '796',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'humilité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait reconnaître notre dépendance de Dieu',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'L\'humilité est la vertu qui nous fait reconnaître notre dépendance de Dieu.',
    points: 30
  },
  {
    id: '797',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'humilité est la base de toutes les vertus.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'humilité est la base de toutes les vertus.',
    points: 25
  },
  {
    id: '798',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la patience ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait supporter les épreuves',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La patience est la vertu qui nous fait supporter les épreuves.',
    points: 30
  },
  {
    id: '799',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La patience produit la persévérance, la persévérance produit la..."',
    questionType: 'quote-completion',
    options: [
      'vertu',
      'vertu, car elle est divine',
      'vertu, car elle est sainte',
      'vertu, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Romains 5:4 : "La patience produit la persévérance, la persévérance produit la vertu."',
    points: 35,
    scripture: 'Romains 5:4'
  },
  {
    id: '800',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la persévérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait persister dans le bien',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La persévérance est la vertu qui nous fait persister dans le bien.',
    points: 30
  },
  {
    id: '801',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La persévérance est nécessaire pour la sainteté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La persévérance est nécessaire pour la sainteté.',
    points: 25
  },
  {
    id: '802',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la tempérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait maîtriser nos appétits',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La tempérance est la vertu qui nous fait maîtriser nos appétits.',
    points: 30
  },
  {
    id: '803',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Tout m\'est permis, mais tout n\'est pas..."',
    questionType: 'quote-completion',
    options: [
      'utile',
      'utile, car tout n\'est pas bon',
      'utile, car tout n\'est pas saint',
      'utile, car tout n\'est pas vrai'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 6:12 : "Tout m\'est permis, mais tout n\'est pas utile."',
    points: 35,
    scripture: '1 Corinthiens 6:12'
  },
  {
    id: '804',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la force ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait surmonter les difficultés',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La force est la vertu qui nous fait surmonter les difficultés.',
    points: 30
  },
  {
    id: '805',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La force est une vertu cardinale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La force est une vertu cardinale.',
    points: 25
  },
  {
    id: '806',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prudence ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait discerner le bien du mal',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La prudence est la vertu qui nous fait discerner le bien du mal.',
    points: 30
  },
  {
    id: '807',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Soyez prudents comme les serpents et simples comme les..."',
    questionType: 'quote-completion',
    options: [
      'colombes',
      'colombes, car elles sont pures',
      'colombes, car elles sont saintes',
      'colombes, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 10:16 : "Soyez prudents comme les serpents et simples comme les colombes."',
    points: 35,
    scripture: 'Matthieu 10:16'
  },
  {
    id: '808',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la justice ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait rendre à chacun son dû',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La justice est la vertu qui nous fait rendre à chacun son dû.',
    points: 30
  },
  {
    id: '809',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La justice est une vertu cardinale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La justice est une vertu cardinale.',
    points: 25
  },
  {
    id: '810',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la charité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait aimer Dieu et le prochain',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La charité est la vertu qui nous fait aimer Dieu et le prochain.',
    points: 30
  },
  {
    id: '811',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La charité est patiente, elle est serviable, elle n\'est pas envieuse, elle ne se vante pas, elle ne s\'enfle pas..."',
    questionType: 'quote-completion',
    options: [
      'd\'orgueil',
      'd\'orgueil, car elle est humble',
      'd\'orgueil, car elle est sainte',
      'd\'orgueil, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 13:4 : "La charité est patiente, elle est serviable, elle n\'est pas envieuse, elle ne se vante pas, elle ne s\'enfle pas d\'orgueil."',
    points: 35,
    scripture: '1 Corinthiens 13:4'
  },
  {
    id: '812',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'espérance ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait espérer en Dieu',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'L\'espérance est la vertu qui nous fait espérer en Dieu.',
    points: 30
  },
  {
    id: '813',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'espérance est une vertu théologale.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'espérance est une vertu théologale.',
    points: 25
  },
  {
    id: '814',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la foi ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait croire en Dieu',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La foi est la vertu qui nous fait croire en Dieu.',
    points: 30
  },
  {
    id: '815',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Sans la foi, il est impossible de plaire à..."',
    questionType: 'quote-completion',
    options: [
      'Dieu',
      'Dieu, car il est vérité',
      'Dieu, car il est saint',
      'Dieu, car il est amour'
    ],
    correctAnswer: 1,
    explanation: 'Hébreux 11:6 : "Sans la foi, il est impossible de plaire à Dieu."',
    points: 35,
    scripture: 'Hébreux 11:6'
  },
  {
    id: '816',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la douceur ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait être doux avec les autres',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La douceur est la vertu qui nous fait être doux avec les autres.',
    points: 30
  },
  {
    id: '817',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'La douceur est un fruit de l\'Esprit.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La douceur est un fruit de l\'Esprit.',
    points: 25
  },
  {
    id: '818',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la bonté ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait être bons envers les autres',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La bonté est la vertu qui nous fait être bons envers les autres.',
    points: 30
  },
  {
    id: '819',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Soyez bons les uns envers les autres, compatissants, vous pardonnant mutuellement, comme Dieu vous a pardonnés dans le..."',
    questionType: 'quote-completion',
    options: [
      'Christ',
      'Christ, car il est amour',
      'Christ, car il est vérité',
      'Christ, car il est vie'
    ],
    correctAnswer: 1,
    explanation: 'Éphésiens 4:32 : "Soyez bons les uns envers les autres, compatissants, vous pardonnant mutuellement, comme Dieu vous a pardonnés dans le Christ."',
    points: 35,
    scripture: 'Éphésiens 4:32'
  },
  {
    id: '820',
    category: 'maitrise-theologie-ascetique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la fidélité ?',
    questionType: 'multiple-choice',
    options: [
      'La vertu qui nous fait être fidèles à nos engagements',
      'Une simple vertu',
      'Une qualité',
      'Un caractère'
    ],
    correctAnswer: 0,
    explanation: 'La fidélité est la vertu qui nous fait être fidèles à nos engagements.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE MONASTIQUE (Questions 821-860) =====
  {
    id: '821',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie monastique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée dans les monastères',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie monastique est la théologie développée dans les monastères.',
    points: 30
  },
  {
    id: '822',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie monastique est contemplative.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie monastique est contemplative.',
    points: 25
  },
  {
    id: '823',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La vie monastique est une vie de prière, de travail et de..."',
    questionType: 'quote-completion',
    options: [
      'contemplation',
      'contemplation, car elle est divine',
      'contemplation, car elle est sainte',
      'contemplation, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'La vie monastique est une vie de prière, de travail et de contemplation.',
    points: 35
  },
  {
    id: '824',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la règle monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le code de vie des moines',
      'Un simple code',
      'Une loi',
      'Une règle'
    ],
    correctAnswer: 0,
    explanation: 'La règle monastique est le code de vie des moines.',
    points: 30
  },
  {
    id: '825',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La règle de saint Benoît est la plus célèbre.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La règle de saint Benoît est la plus célèbre.',
    points: 25
  },
  {
    id: '826',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'ora et labora ?',
    questionType: 'multiple-choice',
    options: [
      'La devise bénédictine : prie et travaille',
      'Une simple devise',
      'Une règle',
      'Un principe'
    ],
    correctAnswer: 0,
    explanation: 'L\'ora et labora est la devise bénédictine : prie et travaille.',
    points: 30
  },
  {
    id: '827',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "L\'oisiveté est l\'ennemie de l\'âme. C\'est pourquoi les frères doivent s\'occuper à certains moments au travail manuel, et à d\'autres moments à la lecture..."',
    questionType: 'quote-completion',
    options: [
      'divine',
      'divine, car elle est sainte',
      'divine, car elle est vraie',
      'divine, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'Règle de saint Benoît : "L\'oisiveté est l\'ennemie de l\'âme. C\'est pourquoi les frères doivent s\'occuper à certains moments au travail manuel, et à d\'autres moments à la lecture divine."',
    points: 35
  },
  {
    id: '828',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la lectio divina ?',
    questionType: 'multiple-choice',
    options: [
      'La lecture spirituelle de la Bible',
      'Une simple lecture',
      'Une étude',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'La lectio divina est la lecture spirituelle de la Bible.',
    points: 30
  },
  {
    id: '829',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La lectio divina a quatre étapes.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La lectio divina a quatre étapes.',
    points: 25
  },
  {
    id: '830',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la prière liturgique ?',
    questionType: 'multiple-choice',
    options: [
      'La prière officielle de l\'Église',
      'Une simple prière',
      'Une oraison',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'La prière liturgique est la prière officielle de l\'Église.',
    points: 30
  },
  {
    id: '831',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Sept fois le jour je te loue pour tes justes..."',
    questionType: 'quote-completion',
    options: [
      'ordonnances',
      'ordonnances, car elles sont saintes',
      'ordonnances, car elles sont vraies',
      'ordonnances, car elles sont divines'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 119:164 : "Sept fois le jour je te loue pour tes justes ordonnances."',
    points: 35,
    scripture: 'Psaume 119:164'
  },
  {
    id: '832',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'office divin ?',
    questionType: 'multiple-choice',
    options: [
      'La prière quotidienne des moines',
      'Une simple prière',
      'Une oraison',
      'Une méditation'
    ],
    correctAnswer: 0,
    explanation: 'L\'office divin est la prière quotidienne des moines.',
    points: 30
  },
  {
    id: '833',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'office divin sanctifie le temps.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'office divin sanctifie le temps.',
    points: 25
  },
  {
    id: '834',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le silence monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le silence pour favoriser la prière',
      'Un simple silence',
      'Un calme',
      'Une tranquillité'
    ],
    correctAnswer: 0,
    explanation: 'Le silence monastique est le silence pour favoriser la prière.',
    points: 30
  },
  {
    id: '835',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Le Seigneur est dans son temple saint, que toute la terre garde le..."',
    questionType: 'quote-completion',
    options: [
      'silence',
      'silence, car il est saint',
      'silence, car il est divin',
      'silence, car il est glorieux'
    ],
    correctAnswer: 1,
    explanation: 'Habacuc 2:20 : "Le Seigneur est dans son temple saint, que toute la terre garde le silence."',
    points: 35,
    scripture: 'Habacuc 2:20'
  },
  {
    id: '836',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la stabilité monastique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'engagement à rester dans le même monastère',
      'Un simple engagement',
      'Une promesse',
      'Un vœu'
    ],
    correctAnswer: 0,
    explanation: 'La stabilité monastique est l\'engagement à rester dans le même monastère.',
    points: 30
  },
  {
    id: '837',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La stabilité favorise la persévérance.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La stabilité favorise la persévérance.',
    points: 25
  },
  {
    id: '838',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la conversion des mœurs ?',
    questionType: 'multiple-choice',
    options: [
      'Le changement de vie pour suivre le Christ',
      'Un simple changement',
      'Une transformation',
      'Une conversion'
    ],
    correctAnswer: 0,
    explanation: 'La conversion des mœurs est le changement de vie pour suivre le Christ.',
    points: 30
  },
  {
    id: '839',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Convertissez-vous et croyez à l\'..."',
    questionType: 'quote-completion',
    options: [
      'Évangile',
      'Évangile, car il est vérité',
      'Évangile, car il est vie',
      'Évangile, car il est salut'
    ],
    correctAnswer: 1,
    explanation: 'Marc 1:15 : "Convertissez-vous et croyez à l\'Évangile."',
    points: 35,
    scripture: 'Marc 1:15'
  },
  {
    id: '840',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'obéissance monastique ?',
    questionType: 'multiple-choice',
    options: [
      'La soumission à l\'abbé et à la règle',
      'Une simple soumission',
      'Un respect',
      'Une docilité'
    ],
    correctAnswer: 0,
    explanation: 'L\'obéissance monastique est la soumission à l\'abbé et à la règle.',
    points: 30
  },
  {
    id: '841',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'obéissance monastique libère l\'âme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'obéissance monastique libère l\'âme.',
    points: 25
  },
  {
    id: '842',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la pauvreté monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le renoncement aux biens personnels',
      'Un simple renoncement',
      'Un abandon',
      'Une privation'
    ],
    correctAnswer: 0,
    explanation: 'La pauvreté monastique est le renoncement aux biens personnels.',
    points: 30
  },
  {
    id: '843',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Heureux les pauvres en esprit, car le royaume des cieux est à..."',
    questionType: 'quote-completion',
    options: [
      'eux',
      'eux, car ils sont humbles',
      'eux, car ils sont saints',
      'eux, car ils sont justes'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 5:3 : "Heureux les pauvres en esprit, car le royaume des cieux est à eux."',
    points: 35,
    scripture: 'Matthieu 5:3'
  },
  {
    id: '844',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la chasteté monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le renoncement au mariage pour le Christ',
      'Un simple renoncement',
      'Un abandon',
      'Une privation'
    ],
    correctAnswer: 0,
    explanation: 'La chasteté monastique est le renoncement au mariage pour le Christ.',
    points: 30
  },
  {
    id: '845',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La chasteté monastique libère pour Dieu.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La chasteté monastique libère pour Dieu.',
    points: 25
  },
  {
    id: '846',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'hospitalité monastique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'accueil des hôtes comme le Christ',
      'Un simple accueil',
      'Une réception',
      'Une bienvenue'
    ],
    correctAnswer: 0,
    explanation: 'L\'hospitalité monastique est l\'accueil des hôtes comme le Christ.',
    points: 30
  },
  {
    id: '847',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "J\'étais étranger et vous m\'avez..."',
    questionType: 'quote-completion',
    options: [
      'accueilli',
      'accueilli, car vous êtes charitables',
      'accueilli, car vous êtes bons',
      'accueilli, car vous êtes saints'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 25:35 : "J\'étais étranger et vous m\'avez accueilli."',
    points: 35,
    scripture: 'Matthieu 25:35'
  },
  {
    id: '848',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le travail monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le travail manuel pour subvenir aux besoins',
      'Un simple travail',
      'Un labeur',
      'Une tâche'
    ],
    correctAnswer: 0,
    explanation: 'Le travail monastique est le travail manuel pour subvenir aux besoins.',
    points: 30
  },
  {
    id: '849',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Le travail monastique sanctifie la journée.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. Le travail monastique sanctifie la journée.',
    points: 25
  },
  {
    id: '850',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la communauté monastique ?',
    questionType: 'multiple-choice',
    options: [
      'La vie fraternelle des moines',
      'Une simple vie',
      'Une existence',
      'Une cohabitation'
    ],
    correctAnswer: 0,
    explanation: 'La communauté monastique est la vie fraternelle des moines.',
    points: 30
  },
  {
    id: '851',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Voici qu\'il est bon et qu\'il est agréable que des frères habitent..."',
    questionType: 'quote-completion',
    options: [
      'ensemble',
      'ensemble, car ils sont unis',
      'ensemble, car ils sont frères',
      'ensemble, car ils sont saints'
    ],
    correctAnswer: 1,
    explanation: 'Psaume 133:1 : "Voici qu\'il est bon et qu\'il est agréable que des frères habitent ensemble."',
    points: 35,
    scripture: 'Psaume 133:1'
  },
  {
    id: '852',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'abbé ?',
    questionType: 'multiple-choice',
    options: [
      'Le père spirituel de la communauté',
      'Un simple père',
      'Un guide',
      'Un chef'
    ],
    correctAnswer: 0,
    explanation: 'L\'abbé est le père spirituel de la communauté.',
    points: 30
  },
  {
    id: '853',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'abbé représente le Christ dans la communauté.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'abbé représente le Christ dans la communauté.',
    points: 25
  },
  {
    id: '854',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que le noviciat ?',
    questionType: 'multiple-choice',
    options: [
      'La période de formation des novices',
      'Une simple période',
      'Un temps',
      'Une étape'
    ],
    correctAnswer: 0,
    explanation: 'Le noviciat est la période de formation des novices.',
    points: 30
  },
  {
    id: '855',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Celui qui veut être le premier sera le serviteur de..."',
    questionType: 'quote-completion',
    options: [
      'tous',
      'tous, car c\'est la règle',
      'tous, car c\'est la loi',
      'tous, car c\'est la vérité'
    ],
    correctAnswer: 1,
    explanation: 'Marc 10:44 : "Celui qui veut être le premier sera le serviteur de tous."',
    points: 35,
    scripture: 'Marc 10:44'
  },
  {
    id: '856',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la profession monastique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'engagement définitif dans la vie monastique',
      'Un simple engagement',
      'Une promesse',
      'Un vœu'
    ],
    correctAnswer: 0,
    explanation: 'La profession monastique est l\'engagement définitif dans la vie monastique.',
    points: 30
  },
  {
    id: '857',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'La profession monastique est un mariage avec le Christ.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La profession monastique est un mariage avec le Christ.',
    points: 25
  },
  {
    id: '858',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la solitude monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le temps de prière personnelle',
      'Un simple temps',
      'Un moment',
      'Une période'
    ],
    correctAnswer: 0,
    explanation: 'La solitude monastique est le temps de prière personnelle.',
    points: 30
  },
  {
    id: '859',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Retire-toi dans ta chambre, ferme ta porte et prie ton Père qui est dans le lieu..."',
    questionType: 'quote-completion',
    options: [
      'secret',
      'secret, car il est saint',
      'secret, car il est divin',
      'secret, car il est glorieux'
    ],
    correctAnswer: 1,
    explanation: 'Matthieu 6:6 : "Retire-toi dans ta chambre, ferme ta porte et prie ton Père qui est dans le lieu secret."',
    points: 35,
    scripture: 'Matthieu 6:6'
  },
  {
    id: '860',
    category: 'maitrise-theologie-monastique',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la contemplation monastique ?',
    questionType: 'multiple-choice',
    options: [
      'Le regard de foi fixé sur Dieu',
      'Un simple regard',
      'Une vision',
      'Une contemplation'
    ],
    correctAnswer: 0,
    explanation: 'La contemplation monastique est le regard de foi fixé sur Dieu.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE UNIVERSITAIRE (Questions 861-900) =====
  {
    id: '861',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie universitaire ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie enseignée dans les universités',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie universitaire est la théologie enseignée dans les universités.',
    points: 30
  },
  {
    id: '862',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie universitaire est académique et scientifique.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie universitaire est académique et scientifique.',
    points: 25
  },
  {
    id: '863',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie universitaire utilise les méthodes de la recherche et de la..."',
    questionType: 'quote-completion',
    options: [
      'critique',
      'critique, car elle est rigoureuse',
      'critique, car elle est objective',
      'critique, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie universitaire utilise les méthodes de la recherche et de la critique.',
    points: 35
  },
  {
    id: '864',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'exégèse biblique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'interprétation scientifique des textes bibliques',
      'Une simple interprétation',
      'Une lecture',
      'Une étude'
    ],
    correctAnswer: 0,
    explanation: 'L\'exégèse biblique est l\'interprétation scientifique des textes bibliques.',
    points: 30
  },
  {
    id: '865',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'exégèse biblique utilise les méthodes historico-critiques.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'exégèse biblique utilise les méthodes historico-critiques.',
    points: 25
  },
  {
    id: '866',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique textuelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des manuscrits bibliques',
      'Une simple étude',
      'Une analyse',
      'Une recherche'
    ],
    correctAnswer: 0,
    explanation: 'La critique textuelle est l\'étude des manuscrits bibliques.',
    points: 30
  },
  {
    id: '867',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, car elle est divine',
      'justice, car elle est sainte',
      'justice, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: '2 Timothée 3:16 : "Toute Écriture est inspirée de Dieu et utile pour enseigner, pour convaincre, pour corriger, pour instruire dans la justice."',
    points: 35,
    scripture: '2 Timothée 3:16'
  },
  {
    id: '868',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique historique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du contexte historique des textes',
      'Une simple étude',
      'Une analyse',
      'Une recherche'
    ],
    correctAnswer: 0,
    explanation: 'La critique historique est l\'étude du contexte historique des textes.',
    points: 30
  },
  {
    id: '869',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La critique historique étudie l\'arrière-plan culturel.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La critique historique étudie l\'arrière-plan culturel.',
    points: 25
  },
  {
    id: '870',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique littéraire ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la composition littéraire des textes',
      'Une simple étude',
      'Une analyse',
      'Une recherche'
    ],
    correctAnswer: 0,
    explanation: 'La critique littéraire est l\'étude de la composition littéraire des textes.',
    points: 30
  },
  {
    id: '871',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La parole de Dieu est vivante et efficace, plus tranchante qu\'une épée à deux tranchants, pénétrante jusqu\'à partager âme et esprit, jointures et..."',
    questionType: 'quote-completion',
    options: [
      'moelles',
      'moelles, car elle est divine',
      'moelles, car elle est sainte',
      'moelles, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'Hébreux 4:12 : "La parole de Dieu est vivante et efficace, plus tranchante qu\'une épée à deux tranchants, pénétrante jusqu\'à partager âme et esprit, jointures et moelles."',
    points: 35,
    scripture: 'Hébreux 4:12'
  },
  {
    id: '872',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique de la rédaction ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'intention théologique des rédacteurs',
      'Une simple étude',
      'Une analyse',
      'Une recherche'
    ],
    correctAnswer: 0,
    explanation: 'La critique de la rédaction est l\'étude de l\'intention théologique des rédacteurs.',
    points: 30
  },
  {
    id: '873',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La critique de la rédaction étudie la théologie des évangélistes.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La critique de la rédaction étudie la théologie des évangélistes.',
    points: 25
  },
  {
    id: '874',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la critique de la forme ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des genres littéraires bibliques',
      'Une simple étude',
      'Une analyse',
      'Une recherche'
    ],
    correctAnswer: 0,
    explanation: 'La critique de la forme est l\'étude des genres littéraires bibliques.',
    points: 30
  },
  {
    id: '875',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "Il y a diversité de dons, mais le même Esprit ; diversité de ministères, mais le même Seigneur ; diversité d\'opérations, mais le même Dieu qui opère tout en..."',
    questionType: 'quote-completion',
    options: [
      'tous',
      'tous, car il est un',
      'tous, car il est saint',
      'tous, car il est divin'
    ],
    correctAnswer: 1,
    explanation: '1 Corinthiens 12:4-6 : "Il y a diversité de dons, mais le même Esprit ; diversité de ministères, mais le même Seigneur ; diversité d\'opérations, mais le même Dieu qui opère tout en tous."',
    points: 35,
    scripture: '1 Corinthiens 12:4-6'
  },
  {
    id: '876',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie systématique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'organisation systématique de la théologie',
      'Une simple organisation',
      'Une classification',
      'Une catégorisation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie systématique est l\'organisation systématique de la théologie.',
    points: 30
  },
  {
    id: '877',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie systématique organise les doctrines.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie systématique organise les doctrines.',
    points: 25
  },
  {
    id: '878',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie fondamentale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des fondements de la foi',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie fondamentale est l\'étude des fondements de la foi.',
    points: 30
  },
  {
    id: '879',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie fondamentale étudie la révélation divine, la transmission de la révélation, la foi et la..."',
    questionType: 'quote-completion',
    options: [
      'raison',
      'raison, car elles sont liées',
      'raison, car elles s\'éclairent',
      'raison, car elles se complètent'
    ],
    correctAnswer: 1,
    explanation: 'La théologie fondamentale étudie la révélation divine, la transmission de la révélation, la foi et la raison.',
    points: 35
  },
  {
    id: '880',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie dogmatique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude des vérités de la foi',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie dogmatique est l\'étude des vérités de la foi.',
    points: 30
  },
  {
    id: '881',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie dogmatique étudie les dogmes.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie dogmatique étudie les dogmes.',
    points: 25
  },
  {
    id: '882',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie morale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'agir humain à la lumière de la foi',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie morale est l\'étude de l\'agir humain à la lumière de la foi.',
    points: 30
  },
  {
    id: '883',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie morale étudie les actes humains, les vertus, les vices et la..."',
    questionType: 'quote-completion',
    options: [
      'conscience',
      'conscience, car elle guide',
      'conscience, car elle juge',
      'conscience, car elle éclaire'
    ],
    correctAnswer: 1,
    explanation: 'La théologie morale étudie les actes humains, les vertus, les vices et la conscience.',
    points: 35
  },
  {
    id: '884',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie spirituelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la vie spirituelle',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie spirituelle est l\'étude de la vie spirituelle.',
    points: 30
  },
  {
    id: '885',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie spirituelle étudie la prière.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie spirituelle étudie la prière.',
    points: 25
  },
  {
    id: '886',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie pastorale ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la pratique pastorale',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie pastorale est l\'étude de la pratique pastorale.',
    points: 30
  },
  {
    id: '887',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie pastorale étudie la catéchèse, l\'évangélisation et la..."',
    questionType: 'quote-completion',
    options: [
      'liturgie',
      'liturgie, car elle est divine',
      'liturgie, car elle est sainte',
      'liturgie, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie pastorale étudie la catéchèse, l\'évangélisation et la liturgie.',
    points: 35
  },
  {
    id: '888',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie œcuménique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de l\'unité des chrétiens',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie œcuménique est l\'étude de l\'unité des chrétiens.',
    points: 30
  },
  {
    id: '889',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie œcuménique cherche l\'unité.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie œcuménique cherche l\'unité.',
    points: 25
  },
  {
    id: '890',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie contextuelle ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la théologie dans son contexte',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie contextuelle est l\'étude de la théologie dans son contexte.',
    points: 30
  },
  {
    id: '891',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie contextuelle respecte les cultures et les..."',
    questionType: 'quote-completion',
    options: [
      'traditions',
      'traditions, car elles sont valables',
      'traditions, car elles sont saintes',
      'traditions, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'La théologie contextuelle respecte les cultures et les traditions.',
    points: 35
  },
  {
    id: '892',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la libération ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la libération des pauvres',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la libération est l\'étude de la libération des pauvres.',
    points: 30
  },
  {
    id: '893',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie de la libération défend les pauvres.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie de la libération défend les pauvres.',
    points: 25
  },
  {
    id: '894',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie féministe ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la théologie du point de vue des femmes',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie féministe est l\'étude de la théologie du point de vue des femmes.',
    points: 30
  },
  {
    id: '895',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie féministe critique le patriarcat et défend les droits des..."',
    questionType: 'quote-completion',
    options: [
      'femmes',
      'femmes, car elles sont égales',
      'femmes, car elles sont saintes',
      'femmes, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'La théologie féministe critique le patriarcat et défend les droits des femmes.',
    points: 35
  },
  {
    id: '896',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie écologique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude de la théologie de l\'environnement',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie écologique est l\'étude de la théologie de l\'environnement.',
    points: 30
  },
  {
    id: '897',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie écologique défend la création.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie écologique défend la création.',
    points: 25
  },
  {
    id: '898',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie interreligieuse ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du dialogue entre les religions',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie interreligieuse est l\'étude du dialogue entre les religions.',
    points: 30
  },
  {
    id: '899',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie interreligieuse cherche le dialogue et la..."',
    questionType: 'quote-completion',
    options: [
      'compréhension',
      'compréhension, car elle est nécessaire',
      'compréhension, car elle est sainte',
      'compréhension, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie interreligieuse cherche le dialogue et la compréhension.',
    points: 35
  },
  {
    id: '900',
    category: 'maitrise-theologie-universitaire',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie de la culture ?',
    questionType: 'multiple-choice',
    options: [
      'L\'étude du dialogue entre foi et culture',
      'Une simple étude',
      'Une exégèse',
      'Une interprétation'
    ],
    correctAnswer: 0,
    explanation: 'La théologie de la culture est l\'étude du dialogue entre foi et culture.',
    points: 30
  },

  // ===== MAÎTRISE - THÉOLOGIE CONTEXTUELLE (Questions 901-940) =====
  {
    id: '901',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie contextuelle ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie adaptée au contexte culturel',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie contextuelle est la théologie adaptée au contexte culturel.',
    points: 30
  },
  {
    id: '902',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie contextuelle respecte les cultures.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie contextuelle respecte les cultures.',
    points: 25
  },
  {
    id: '903',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie contextuelle s\'adapte aux réalités locales tout en gardant la fidélité à la..."',
    questionType: 'quote-completion',
    options: [
      'vérité',
      'vérité, car elle est divine',
      'vérité, car elle est sainte',
      'vérité, car elle est éternelle'
    ],
    correctAnswer: 1,
    explanation: 'La théologie contextuelle s\'adapte aux réalités locales tout en gardant la fidélité à la vérité.',
    points: 35
  },
  {
    id: '904',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que l\'inculturation ?',
    questionType: 'multiple-choice',
    options: [
      'L\'adaptation de la foi à la culture locale',
      'Une simple adaptation',
      'Une transformation',
      'Une conversion'
    ],
    correctAnswer: 0,
    explanation: 'L\'inculturation est l\'adaptation de la foi à la culture locale.',
    points: 30
  },
  {
    id: '905',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'L\'inculturation respecte l\'identité culturelle.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'inculturation respecte l\'identité culturelle.',
    points: 25
  },
  {
    id: '906',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie africaine ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Afrique',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie africaine est la théologie développée en Afrique.',
    points: 30
  },
  {
    id: '907',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie africaine met l\'accent sur la communauté, la solidarité et la..."',
    questionType: 'quote-completion',
    options: [
      'vie',
      'vie, car elle est sacrée',
      'vie, car elle est divine',
      'vie, car elle est sainte'
    ],
    correctAnswer: 1,
    explanation: 'La théologie africaine met l\'accent sur la communauté, la solidarité et la vie.',
    points: 35
  },
  {
    id: '908',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie asiatique ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Asie',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie asiatique est la théologie développée en Asie.',
    points: 30
  },
  {
    id: '909',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie asiatique dialogue avec les religions asiatiques.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie asiatique dialogue avec les religions asiatiques.',
    points: 25
  },
  {
    id: '910',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie latino-américaine ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Amérique latine',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie latino-américaine est la théologie développée en Amérique latine.',
    points: 30
  },
  {
    id: '911',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie latino-américaine met l\'accent sur la libération des pauvres et la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, car elle est divine',
      'justice, car elle est sainte',
      'justice, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie latino-américaine met l\'accent sur la libération des pauvres et la justice.',
    points: 35
  },
  {
    id: '912',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie indienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Inde',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie indienne est la théologie développée en Inde.',
    points: 30
  },
  {
    id: '913',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie indienne dialogue avec l\'hindouisme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie indienne dialogue avec l\'hindouisme.',
    points: 25
  },
  {
    id: '914',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie chinoise ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Chine',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie chinoise est la théologie développée en Chine.',
    points: 30
  },
  {
    id: '915',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie chinoise dialogue avec le confucianisme et le..."',
    questionType: 'quote-completion',
    options: [
      'taoïsme',
      'taoïsme, car ils sont sages',
      'taoïsme, car ils sont saints',
      'taoïsme, car ils sont vrais'
    ],
    correctAnswer: 1,
    explanation: 'La théologie chinoise dialogue avec le confucianisme et le taoïsme.',
    points: 35
  },
  {
    id: '916',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie japonaise ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée au Japon',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie japonaise est la théologie développée au Japon.',
    points: 30
  },
  {
    id: '917',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie japonaise dialogue avec le bouddhisme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie japonaise dialogue avec le bouddhisme.',
    points: 25
  },
  {
    id: '918',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie coréenne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Corée',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie coréenne est la théologie développée en Corée.',
    points: 30
  },
  {
    id: '919',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie coréenne met l\'accent sur la réconciliation et la..."',
    questionType: 'quote-completion',
    options: [
      'paix',
      'paix, car elle est divine',
      'paix, car elle est sainte',
      'paix, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie coréenne met l\'accent sur la réconciliation et la paix.',
    points: 35
  },
  {
    id: '920',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie philippine ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée aux Philippines',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie philippine est la théologie développée aux Philippines.',
    points: 30
  },
  {
    id: '921',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie philippine met l\'accent sur la libération.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie philippine met l\'accent sur la libération.',
    points: 25
  },
  {
    id: '922',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie indonésienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Indonésie',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie indonésienne est la théologie développée en Indonésie.',
    points: 30
  },
  {
    id: '923',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie indonésienne dialogue avec l\'islam et les traditions..."',
    questionType: 'quote-completion',
    options: [
      'locales',
      'locales, car elles sont valables',
      'locales, car elles sont saintes',
      'locales, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'La théologie indonésienne dialogue avec l\'islam et les traditions locales.',
    points: 35
  },
  {
    id: '924',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie thaïlandaise ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Thaïlande',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie thaïlandaise est la théologie développée en Thaïlande.',
    points: 30
  },
  {
    id: '925',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie thaïlandaise dialogue avec le bouddhisme.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie thaïlandaise dialogue avec le bouddhisme.',
    points: 25
  },
  {
    id: '926',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie vietnamienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée au Vietnam',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie vietnamienne est la théologie développée au Vietnam.',
    points: 30
  },
  {
    id: '927',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie vietnamienne met l\'accent sur la réconciliation et la..."',
    questionType: 'quote-completion',
    options: [
      'guérison',
      'guérison, car elle est divine',
      'guérison, car elle est sainte',
      'guérison, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie vietnamienne met l\'accent sur la réconciliation et la guérison.',
    points: 35
  },
  {
    id: '928',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie cambodgienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée au Cambodge',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie cambodgienne est la théologie développée au Cambodge.',
    points: 30
  },
  {
    id: '929',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie cambodgienne met l\'accent sur la guérison.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie cambodgienne met l\'accent sur la guérison.',
    points: 25
  },
  {
    id: '930',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie laotienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée au Laos',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie laotienne est la théologie développée au Laos.',
    points: 30
  },
  {
    id: '931',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie laotienne dialogue avec le bouddhisme et les traditions..."',
    questionType: 'quote-completion',
    options: [
      'animistes',
      'animistes, car elles sont valables',
      'animistes, car elles sont saintes',
      'animistes, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'La théologie laotienne dialogue avec le bouddhisme et les traditions animistes.',
    points: 35
  },
  {
    id: '932',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie birmane ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Birmanie',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie birmane est la théologie développée en Birmanie.',
    points: 30
  },
  {
    id: '933',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie birmane met l\'accent sur la paix.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie birmane met l\'accent sur la paix.',
    points: 25
  },
  {
    id: '934',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie malaisienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée en Malaisie',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie malaisienne est la théologie développée en Malaisie.',
    points: 30
  },
  {
    id: '935',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie malaisienne dialogue avec l\'islam et les traditions..."',
    questionType: 'quote-completion',
    options: [
      'asiatiques',
      'asiatiques, car elles sont valables',
      'asiatiques, car elles sont saintes',
      'asiatiques, car elles sont vraies'
    ],
    correctAnswer: 1,
    explanation: 'La théologie malaisienne dialogue avec l\'islam et les traditions asiatiques.',
    points: 35
  },
  {
    id: '936',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie singapourienne ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée à Singapour',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie singapourienne est la théologie développée à Singapour.',
    points: 30
  },
  {
    id: '937',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'La théologie singapourienne met l\'accent sur le dialogue interreligieux.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. La théologie singapourienne met l\'accent sur le dialogue interreligieux.',
    points: 25
  },
  {
    id: '938',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie hongkongaise ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée à Hong Kong',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie hongkongaise est la théologie développée à Hong Kong.',
    points: 30
  },
  {
    id: '939',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Complétez : "La théologie hongkongaise met l\'accent sur la liberté religieuse et la..."',
    questionType: 'quote-completion',
    options: [
      'justice',
      'justice, car elle est divine',
      'justice, car elle est sainte',
      'justice, car elle est vraie'
    ],
    correctAnswer: 1,
    explanation: 'La théologie hongkongaise met l\'accent sur la liberté religieuse et la justice.',
    points: 35
  },
  {
    id: '940',
    category: 'maitrise-theologie-contextuelle',
    difficulty: 'difficile',
    level: 4,
    question: 'Qu\'est-ce que la théologie taïwanaise ?',
    questionType: 'multiple-choice',
    options: [
      'La théologie développée à Taïwan',
      'Une simple théologie',
      'Une doctrine',
      'Une croyance'
    ],
    correctAnswer: 0,
    explanation: 'La théologie taïwanaise est la théologie développée à Taïwan.',
    points: 30
  }
];

// ========================================
// QUIZ ORGANISÉS PAR COURS
// ========================================

export const sampleQuizzes: Quiz[] = [
  // COURS 1 - DÉCOUVERTE / PREMIERS PAS DANS LA FOI (Niveau 1)
  {
    id: 'quiz-1',
    title: 'Qui est Jésus-Christ ?',
    description: 'Découvrez qui est Jésus-Christ pour les chrétiens',
    category: 'decouverte-jesus',
    level: 1,
    questions: sampleQuestions.filter(q => 
      ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].includes(q.id)
    ),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-2',
    title: 'Les premiers gestes chrétiens',
    description: 'Apprenez le signe de croix et les prières de base',
    category: 'decouverte-gestes',
    level: 1,
    questions: sampleQuestions.filter(q => 
      ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'].includes(q.id)
    ),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-3',
    title: 'La Bible et les Écritures',
    description: 'Découvrez ce qu\'est la Bible et ses premiers livres',
    category: 'decouverte-bible',
    level: 1,
    questions: sampleQuestions.filter(q => 
      ['21', '22', '23', '24', '25', '26', '27', '28', '29', '30'].includes(q.id)
    ),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-4',
    title: 'L\'Église et la messe',
    description: 'Comprenez ce qu\'est l\'église et la messe',
    category: 'decouverte-eglise',
    level: 1,
    questions: sampleQuestions.filter(q => 
      ['31', '32', '33', '34', '35', '36', '37', '38', '39', '40'].includes(q.id)
    ),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-5',
    title: 'Le baptême et les sacrements',
    description: 'Découvrez le sacrement du baptême',
    category: 'decouverte-sacrements',
    level: 1,
    questions: sampleQuestions.filter(q => 
      ['41', '42', '43', '44', '45', '46', '47', '48', '49', '50'].includes(q.id)
    ),
    passingScore: 70,
    timeLimit: 15
  },

  // COURS 2 - FONDAMENTAUX DE LA FOI CATHOLIQUE (Niveau 2)
  {
    id: 'quiz-6',
    title: 'Les Dogmes de la Foi',
    description: 'Découvrez les vérités fondamentales de la foi catholique',
    category: 'fondamentaux-dogmes',
    level: 2,
    questions: sampleQuestions.filter(q => 
      ['51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80'].includes(q.id)
    ),
    passingScore: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-7',
    title: 'Les 7 Sacrements',
    description: 'Découvrez les sacrements de l\'Église catholique',
    category: 'fondamentaux-sacrements',
    level: 2,
    questions: sampleQuestions.filter(q => 
      ['81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100'].includes(q.id)
    ),
    passingScore: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-8',
    title: 'La Morale Chrétienne',
    description: 'Découvrez les fondements de la morale chrétienne',
    category: 'fondamentaux-morale',
    level: 2,
    questions: sampleQuestions.filter(q => 
      ['101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118', '119', '120'].includes(q.id)
    ),
    passingScore: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-9',
    title: 'L\'Ancien Testament',
    description: 'Découvrez les livres et les personnages de l\'Ancien Testament',
    category: 'approfondissement-ancien-testament',
    level: 3,
    questions: sampleQuestions.filter(q => 
      ['141', '142', '143', '144', '145', '146', '147', '148', '149', '150', '151', '152', '153', '154', '155', '156', '157', '158', '159', '160', '161', '162', '163', '164', '165', '166', '167', '168', '169', '170', '171', '172', '173', '174', '175', '176', '177', '178', '179', '180'].includes(q.id)
    ),
    passingScore: 80,
    timeLimit: 25
  },
  {
    id: 'quiz-10',
    title: 'Le Nouveau Testament',
    description: 'Découvrez les Évangiles, les Actes et les Épîtres',
    category: 'approfondissement-nouveau-testament',
    level: 3,
    questions: sampleQuestions.filter(q => 
      ['181', '182', '183', '184', '185', '186', '187', '188', '189', '190', '191', '192', '193', '194', '195', '196', '197', '198', '199', '200', '201', '202', '203', '204', '205', '206', '207', '208', '209', '210', '211', '212', '213', '214', '215', '216', '217', '218', '219', '220'].includes(q.id)
    ),
    passingScore: 80,
    timeLimit: 25
  },
  {
    id: 'quiz-11',
    title: 'L\'Église et son Histoire',
    description: 'Découvrez l\'histoire de l\'Église catholique',
    category: 'approfondissement-eglise-histoire',
    level: 3,
    questions: sampleQuestions.filter(q => 
      ['221', '222', '223', '224', '225', '226', '227', '228', '229', '230', '231', '232', '233', '234', '235', '236', '237', '238', '239', '240', '241', '242', '243', '244', '245', '246', '247', '248', '249', '250', '251', '252', '253', '254', '255', '256', '257', '258', '259', '260'].includes(q.id)
    ),
    passingScore: 80,
    timeLimit: 25
  },
  {
    id: 'quiz-12',
    title: 'Théologie Avancée',
    description: 'Découvrez les différentes branches de la théologie',
    category: 'maitrise-theologie-avancee',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['261', '262', '263', '264', '265', '266', '267', '268', '269', '270', '271', '272', '273', '274', '275', '276', '277', '278', '279', '280', '281', '282', '283', '284', '285', '286', '287', '288', '289', '290', '291', '292', '293', '294', '295', '296', '297', '298', '299', '300'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-13',
    title: 'Philosophie Chrétienne',
    description: 'Découvrez les fondements philosophiques de la foi chrétienne',
    category: 'maitrise-philosophie-chretienne',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['301', '302', '303', '304', '305', '306', '307', '308', '309', '310', '311', '312', '313', '314', '315', '316', '317', '318', '319', '320', '321', '322', '323', '324', '325', '326', '327', '328', '329', '330', '331', '332', '333', '334', '335', '336', '337', '338', '339', '340'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-14',
    title: 'Liturgie et Sacrements',
    description: 'Découvrez la liturgie et les sacrements de l\'Église',
    category: 'maitrise-liturgie-sacrements',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['341', '342', '343', '344', '345', '346', '347', '348', '349', '350', '351', '352', '353', '354', '355', '356', '357', '358', '359', '360', '361', '362', '363', '364', '365', '366', '367', '368', '369', '370', '371', '372', '373', '374', '375', '376', '377', '378', '379', '380'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-15',
    title: 'Éthique et Morale',
    description: 'Découvrez les fondements de l\'éthique chrétienne',
    category: 'maitrise-ethique-morale',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['381', '382', '383', '384', '385', '386', '387', '388', '389', '390', '391', '392', '393', '394', '395', '396', '397', '398', '399', '400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '418', '419', '420'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-16',
    title: 'Spiritualité et Prière',
    description: 'Découvrez la vie spirituelle et les différentes formes de prière',
    category: 'maitrise-spiritualite-priere',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['421', '422', '423', '424', '425', '426', '427', '428', '429', '430', '431', '432', '433', '434', '435', '436', '437', '438', '439', '440', '441', '442', '443', '444', '445', '446', '447', '448', '449', '450', '451', '452', '453', '454', '455', '456', '457', '458', '459', '460'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-17',
    title: 'Apologétique',
    description: 'Découvrez la défense de la foi chrétienne',
    category: 'maitrise-apologetique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['461', '462', '463', '464', '465', '466', '467', '468', '469', '470', '471', '472', '473', '474', '475', '476', '477', '478', '479', '480', '481', '482', '483', '484', '485', '486', '487', '488', '489', '490', '491', '492', '493', '494', '495', '496', '497', '498', '499', '500'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-18',
    title: 'Théologie Morale',
    description: 'Découvrez les fondements de la morale chrétienne',
    category: 'maitrise-theologie-morale',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['501', '502', '503', '504', '505', '506', '507', '508', '509', '510', '511', '512', '513', '514', '515', '516', '517', '518', '519', '520', '521', '522', '523', '524', '525', '526', '527', '528', '529', '530', '531', '532', '533', '534', '535', '536', '537', '538', '539', '540'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-19',
    title: 'Théologie Dogmatique',
    description: 'Découvrez les vérités fondamentales de la foi',
    category: 'maitrise-theologie-dogmatique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['541', '542', '543', '544', '545', '546', '547', '548', '549', '550', '551', '552', '553', '554', '555', '556', '557', '558', '559', '560', '561', '562', '563', '564', '565', '566', '567', '568', '569', '570', '571', '572', '573', '574', '575', '576', '577', '578', '579', '580'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-20',
    title: 'Théologie Biblique',
    description: 'Découvrez l\'étude scientifique des textes bibliques',
    category: 'maitrise-theologie-biblique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['581', '582', '583', '584', '585', '586', '587', '588', '589', '590', '591', '592', '593', '594', '595', '596', '597', '598', '599', '600', '601', '602', '603', '604', '605', '606', '607', '608', '609', '610', '611', '612', '613', '614', '615', '616', '617', '618', '619', '620'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-21',
    title: 'Théologie Historique',
    description: 'Découvrez l\'évolution de la théologie à travers l\'histoire',
    category: 'maitrise-theologie-historique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['621', '622', '623', '624', '625', '626', '627', '628', '629', '630', '631', '632', '633', '634', '635', '636', '637', '638', '639', '640', '641', '642', '643', '644', '645', '646', '647', '648', '649', '650', '651', '652', '653', '654', '655', '656', '657', '658', '659', '660'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-22',
    title: 'Théologie Pastorale',
    description: 'Découvrez la théologie au service du ministère pastoral',
    category: 'maitrise-theologie-pastorale',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['661', '662', '663', '664', '665', '666', '667', '668', '669', '670', '671', '672', '673', '674', '675', '676', '677', '678', '679', '680', '681', '682', '683', '684', '685', '686', '687', '688', '689', '690', '691', '692', '693', '694', '695', '696', '697', '698', '699', '700'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-23',
    title: 'Théologie Spirituelle',
    description: 'Découvrez la vie spirituelle et les différentes formes de prière',
    category: 'maitrise-theologie-spirituelle',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['701', '702', '703', '704', '705', '706', '707', '708', '709', '710', '711', '712', '713', '714', '715', '716', '717', '718', '719', '720', '721', '722', '723', '724', '725', '726', '727', '728', '729', '730', '731', '732', '733', '734', '735', '736', '737', '738', '739', '740'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-24',
    title: 'Théologie Mystique',
    description: 'Découvrez l\'expérience mystique et l\'union avec Dieu',
    category: 'maitrise-theologie-mystique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['741', '742', '743', '744', '745', '746', '747', '748', '749', '750', '751', '752', '753', '754', '755', '756', '757', '758', '759', '760', '761', '762', '763', '764', '765', '766', '767', '768', '769', '770', '771', '772', '773', '774', '775', '776', '777', '778', '779', '780'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-25',
    title: 'Théologie Ascétique',
    description: 'Découvrez l\'ascèse chrétienne et les vertus',
    category: 'maitrise-theologie-ascetique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['781', '782', '783', '784', '785', '786', '787', '788', '789', '790', '791', '792', '793', '794', '795', '796', '797', '798', '799', '800', '801', '802', '803', '804', '805', '806', '807', '808', '809', '810', '811', '812', '813', '814', '815', '816', '817', '818', '819', '820'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-26',
    title: 'Théologie Monastique',
    description: 'Découvrez la vie monastique et la spiritualité bénédictine',
    category: 'maitrise-theologie-monastique',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['821', '822', '823', '824', '825', '826', '827', '828', '829', '830', '831', '832', '833', '834', '835', '836', '837', '838', '839', '840', '841', '842', '843', '844', '845', '846', '847', '848', '849', '850', '851', '852', '853', '854', '855', '856', '857', '858', '859', '860'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  },
  {
    id: 'quiz-27',
    title: 'Théologie Universitaire',
    description: 'Découvrez la théologie académique et les méthodes scientifiques',
    category: 'maitrise-theologie-universitaire',
    level: 4,
    questions: sampleQuestions.filter(q => 
      ['861', '862', '863', '864', '865', '866', '867', '868', '869', '870', '871', '872', '873', '874', '875', '876', '877', '878', '879', '880', '881', '882', '883', '884', '885', '886', '887', '888', '889', '890', '891', '892', '893', '894', '895', '896', '897', '898', '899', '900'].includes(q.id)
    ),
    passingScore: 85,
    timeLimit: 30
  }
];

// ========================================
// CATÉGORIES ET ICÔNES
// ========================================

export const categoryNames: Record<string, string> = {
  'decouverte-jesus': 'Qui est Jésus-Christ ?',
  'decouverte-gestes': 'Premiers gestes chrétiens',
  'decouverte-bible': 'La Bible et les Écritures',
  'decouverte-eglise': 'L\'Église et la messe',
  'decouverte-sacrements': 'Le baptême et les sacrements',
  'fondamentaux-dogmes': 'Les dogmes de la foi',
  'fondamentaux-sacrements': 'Les 7 sacrements',
  'fondamentaux-liturgie': 'La liturgie et les fêtes',
  'fondamentaux-prieres': 'Les prières fondamentales',
  'fondamentaux-commandements': 'Les 10 commandements',
  'vie-chretienne-spiritualite': 'Vie spirituelle',
  'vie-chretienne-confession': 'La confession',
  'vie-chretienne-rosaire': 'Le Rosaire',
  'vie-chretienne-vertus': 'Les vertus',
  'theologie-trinite': 'La Trinité',
  'theologie-christologie': 'La Christologie',
  'theologie-ecclesiologie': 'L\'ecclésiologie',
  'theologie-morale': 'La morale catholique',
  'vocation-discernement': 'Le discernement vocationnel',
  'vocation-vie-consacree': 'La vie consacrée'
};

export const categoryIcons: Record<string, string> = {
  'decouverte-jesus': 'person',
  'decouverte-gestes': 'pan-tool',
  'decouverte-bible': 'menu-book',
  'decouverte-eglise': 'church',
  'decouverte-sacrements': 'water-drop',
  'fondamentaux-dogmes': 'school',
  'fondamentaux-sacrements': 'celebration',
  'fondamentaux-liturgie': 'local-fire-department',
  'fondamentaux-prieres': 'favorite',
  'fondamentaux-commandements': 'gavel',
  'vie-chretienne-spiritualite': 'self-improvement',
  'vie-chretienne-confession': 'healing',
  'vie-chretienne-rosaire': 'beads',
  'vie-chretienne-vertus': 'star',
  'theologie-trinite': 'account-balance',
  'theologie-christologie': 'crucifix',
  'theologie-ecclesiologie': 'groups',
  'theologie-morale': 'psychology',
  'vocation-discernement': 'search',
  'vocation-vie-consacree': 'monk'
};

// ========================================
// FONCTIONS UTILITAIRES
// ========================================

export function getAvailableQuizzes(userLevel: number, isAdmin: boolean = false): Quiz[] {
  return sampleQuizzes.filter(quiz => {
    if (isAdmin) return true;
    return quiz.level <= userLevel;
  });
}

export function getQuizzesByCategory(category: string, userLevel: number, isAdmin: boolean = false): Quiz[] {
  return sampleQuizzes.filter(quiz => {
    if (!isAdmin && quiz.level > userLevel) return false;
    return quiz.category === category;
  });
}

export function getQuizzesByCourse(level: number, userLevel: number, isAdmin: boolean = false): Quiz[] {
  return sampleQuizzes.filter(quiz => {
    if (!isAdmin && quiz.level > userLevel) return false;
    return quiz.level === level;
  });
} 