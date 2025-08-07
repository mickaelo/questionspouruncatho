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