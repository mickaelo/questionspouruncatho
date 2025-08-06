import { Question, Quiz } from '../types/quiz';

export const sampleQuestions: Question[] = [
  // DOGMES (10 questions)
  {
    id: '1',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le premier dogme de l\'Église catholique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'existence de Dieu',
      'La Trinité',
      'L\'Immaculée Conception',
      'L\'Assomption'
    ],
    correctAnswer: 0,
    explanation: 'L\'existence de Dieu est le fondement de toute la foi catholique. C\'est le premier dogme que l\'Église enseigne.',
    points: 10,
    scripture: 'Romains 1:20'
  },
  {
    id: '2',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'Combien y a-t-il de personnes en Dieu selon la foi catholique ?',
    questionType: 'multiple-choice',
    options: ['1', '2', '3', '4'],
    correctAnswer: 2,
    explanation: 'La Trinité enseigne qu\'il y a trois personnes en un seul Dieu : le Père, le Fils et le Saint-Esprit.',
    points: 10,
    catechism: 'CCC 253'
  },
  {
    id: '3',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 1,
    question: 'Qu\'est-ce que l\'Immaculée Conception ?',
    questionType: 'multiple-choice',
    options: [
      'La naissance de Jésus',
      'La conception de Marie sans péché originel',
      'La résurrection du Christ',
      'L\'ascension de Jésus'
    ],
    correctAnswer: 1,
    explanation: 'L\'Immaculée Conception est le dogme selon lequel Marie a été préservée du péché originel dès sa conception.',
    points: 15
  },
  {
    id: '4',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 1,
    question: 'Qu\'est-ce que l\'Assomption de Marie ?',
    questionType: 'multiple-choice',
    options: [
      'La mort de Marie',
      'L\'élévation de Marie au ciel en corps et en âme',
      'La naissance de Jésus',
      'La résurrection du Christ'
    ],
    correctAnswer: 1,
    explanation: 'L\'Assomption est le dogme selon lequel Marie a été élevée au ciel en corps et en âme à la fin de sa vie terrestre.',
    points: 15
  },
  {
    id: '5',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est Jésus-Christ selon la foi catholique ?',
    questionType: 'multiple-choice',
    options: [
      'Un prophète',
      'Un ange',
      'Vrai Dieu et vrai homme',
      'Un saint homme'
    ],
    correctAnswer: 2,
    explanation: 'Jésus-Christ est vrai Dieu et vrai homme, c\'est le mystère de l\'Incarnation.',
    points: 10,
    catechism: 'CCC 464'
  },
  {
    id: '6',
    category: 'dogmes',
    difficulty: 'difficile',
    level: 1,
    question: 'Qu\'est-ce que la transsubstantiation ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation du pain en corps du Christ',
      'La résurrection du Christ',
      'La naissance de Jésus',
      'La mort de Jésus sur la croix'
    ],
    correctAnswer: 0,
    explanation: 'La transsubstantiation est la transformation du pain et du vin en corps et sang du Christ lors de la consécration.',
    points: 20,
    catechism: 'CCC 1376'
  },
  {
    id: '7',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 1,
    question: 'Qu\'est-ce que la communion des saints ?',
    questionType: 'multiple-choice',
    options: [
      'La communion eucharistique',
      'La communion entre tous les fidèles, vivants et morts',
      'La communion des anges',
      'La communion des apôtres'
    ],
    correctAnswer: 1,
    explanation: 'La communion des saints est la communion spirituelle entre tous les fidèles, qu\'ils soient au ciel, au purgatoire ou sur terre.',
    points: 15,
    catechism: 'CCC 946'
  },
  {
    id: '8',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que la résurrection des morts ?',
    questionType: 'multiple-choice',
    options: [
      'La réincarnation',
      'La résurrection du corps à la fin des temps',
      'La survie de l\'âme',
      'La réunion avec Dieu'
    ],
    correctAnswer: 1,
    explanation: 'La résurrection des morts est le dogme selon lequel tous les hommes ressusciteront avec leur corps à la fin des temps.',
    points: 10,
    catechism: 'CCC 988'
  },
  {
    id: '9',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 1,
    question: 'Qu\'est-ce que la vie éternelle ?',
    questionType: 'multiple-choice',
    options: [
      'La vie sur terre',
      'La vie après la mort avec Dieu',
      'La réincarnation',
      'La survie de l\'âme'
    ],
    correctAnswer: 1,
    explanation: 'La vie éternelle est la vie en communion avec Dieu après la mort pour ceux qui sont sauvés.',
    points: 15
  },
  {
    id: '10',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que l\'Église catholique ?',
    questionType: 'multiple-choice',
    options: [
      'Un bâtiment',
      'Le peuple de Dieu uni au Christ',
      'Une organisation humaine',
      'Un groupe de croyants'
    ],
    correctAnswer: 1,
    explanation: 'L\'Église catholique est le peuple de Dieu uni au Christ, corps mystique du Christ.',
    points: 10,
    catechism: 'CCC 777'
  },

  // NOUVELLES QUESTIONS AVEC VARIANTES
  // Questions Vrai/Faux
  {
    id: '51',
    category: 'dogmes',
    difficulty: 'facile',
    level: 1,
    question: 'La Trinité enseigne qu\'il y a trois dieux distincts.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. La Trinité enseigne qu\'il y a trois personnes en un seul Dieu, pas trois dieux distincts.',
    points: 10,
    catechism: 'CCC 253'
  },
  {
    id: '52',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'L\'Eucharistie est le sacrement le plus important.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Vrai. L\'Eucharistie est le sacrement le plus important car elle contient le Christ lui-même.',
    points: 10,
    catechism: 'CCC 1324'
  },
  {
    id: '53',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Jésus a écrit les évangiles lui-même.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Faux. Jésus n\'a pas écrit les évangiles lui-même. Ils ont été écrits par ses disciples après sa résurrection.',
    points: 15
  },

  // Questions d'image à reconnaître
  {
    id: '54',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Quel saint est représenté sur cette image ?',
    questionType: 'image-recognition',
    options: ['Saint Pierre', 'Saint Paul', 'Saint Jean', 'Saint Matthieu'],
    correctAnswer: 0,
    explanation: 'Cette image représente Saint Pierre, reconnaissable à ses clés qui symbolisent son autorité sur l\'Église.',
    points: 10,
    imageUrl: 'https://example.com/saint-pierre.jpg'
  },
  {
    id: '55',
    category: 'liturgie',
    difficulty: 'moyen',
    level: 2,
    question: 'Quel objet liturgique est représenté sur cette image ?',
    questionType: 'image-recognition',
    options: ['Calice', 'Ciboire', 'Ostensoir', 'Patène'],
    correctAnswer: 2,
    explanation: 'Cet objet est un ostensoir, utilisé pour exposer le Saint-Sacrement à l\'adoration.',
    points: 15,
    imageUrl: 'https://example.com/ostensoir.jpg'
  },

  // Questions de citation à compléter
  {
    id: '56',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez cette citation de Jésus : "Je suis le chemin, la vérité et..."',
    questionType: 'quote-completion',
    options: ['la lumière', 'la vie', 'l\'amour', 'l\'espérance'],
    correctAnswer: 1,
    explanation: 'La citation complète est : "Je suis le chemin, la vérité et la vie" (Jean 14:6).',
    points: 15,
    quote: 'Je suis le chemin, la vérité et la vie',
    partialQuote: 'Je suis le chemin, la vérité et...',
    scripture: 'Jean 14:6'
  },
  {
    id: '57',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez cette citation : "Aimez-vous les uns les autres comme..."',
    questionType: 'quote-completion',
    options: ['je vous ai aimés', 'Dieu vous aime', 'vous vous aimez', 'le Christ vous aime'],
    correctAnswer: 0,
    explanation: 'La citation complète est : "Aimez-vous les uns les autres comme je vous ai aimés" (Jean 13:34).',
    points: 10,
    quote: 'Aimez-vous les uns les autres comme je vous ai aimés',
    partialQuote: 'Aimez-vous les uns les autres comme...',
    scripture: 'Jean 13:34'
  },
  {
    id: '58',
    category: 'saintes-ecritures',
    difficulty: 'difficile',
    level: 1,
    question: 'Complétez cette citation de Saint Paul : "La foi vient de ce qu\'on entend, et ce qu\'on entend vient de..."',
    questionType: 'quote-completion',
    options: ['la Parole de Dieu', 'la prédication', 'la parole du Christ', 'l\'enseignement'],
    correctAnswer: 2,
    explanation: 'La citation complète est : "La foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole du Christ" (Romains 10:17).',
    points: 20,
    quote: 'La foi vient de ce qu\'on entend, et ce qu\'on entend vient de la parole du Christ',
    partialQuote: 'La foi vient de ce qu\'on entend, et ce qu\'on entend vient de...',
    scripture: 'Romains 10:17'
  },

  // SACREMENTS (10 questions)
  {
    id: '11',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Combien y a-t-il de sacrements dans l\'Église catholique ?',
    questionType: 'multiple-choice',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'L\'Église catholique reconnaît 7 sacrements : Baptême, Confirmation, Eucharistie, Réconciliation, Onction des malades, Ordre, Mariage.',
    points: 10,
    catechism: 'CCC 1113'
  },
  {
    id: '12',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le premier sacrement reçu ?',
    questionType: 'multiple-choice',
    options: ['L\'Eucharistie', 'Le Baptême', 'La Confirmation', 'La Réconciliation'],
    correctAnswer: 1,
    explanation: 'Le Baptême est le premier sacrement reçu, il ouvre la porte aux autres sacrements.',
    points: 10,
    catechism: 'CCC 1213'
  },
  {
    id: '13',
    category: 'sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Quel sacrement est appelé "sacrement de l\'amour" ?',
    questionType: 'multiple-choice',
    options: ['Le Mariage', 'L\'Eucharistie', 'La Confirmation', 'L\'Ordre'],
    correctAnswer: 1,
    explanation: 'L\'Eucharistie est appelée "sacrement de l\'amour" car elle est le don de l\'amour de Dieu.',
    points: 15,
    catechism: 'CCC 1330'
  },
  {
    id: '14',
    category: 'sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Quel sacrement efface les péchés ?',
    questionType: 'multiple-choice',
    options: ['Le Baptême', 'La Réconciliation', 'L\'Eucharistie', 'La Confirmation'],
    correctAnswer: 1,
    explanation: 'La Réconciliation (ou Confession) efface les péchés commis après le baptême.',
    points: 15,
    catechism: 'CCC 1446'
  },
  {
    id: '15',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel sacrement confère le sacerdoce ?',
    questionType: 'multiple-choice',
    options: ['Le Baptême', 'La Confirmation', 'L\'Ordre', 'Le Mariage'],
    correctAnswer: 2,
    explanation: 'Le sacrement de l\'Ordre confère le sacerdoce ministériel.',
    points: 10,
    catechism: 'CCC 1536'
  },
  {
    id: '16',
    category: 'sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Quel sacrement unit un homme et une femme ?',
    questionType: 'multiple-choice',
    options: ['L\'Ordre', 'Le Mariage', 'La Confirmation', 'L\'Eucharistie'],
    correctAnswer: 1,
    explanation: 'Le sacrement du Mariage unit un homme et une femme en vue du bien des époux et de la procréation.',
    points: 15,
    catechism: 'CCC 1601'
  },
  {
    id: '17',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel sacrement donne la force du Saint-Esprit ?',
    questionType: 'multiple-choice',
    options: ['Le Baptême', 'La Confirmation', 'L\'Eucharistie', 'La Réconciliation'],
    correctAnswer: 1,
    explanation: 'La Confirmation donne la force du Saint-Esprit pour témoigner de la foi.',
    points: 10,
    catechism: 'CCC 1285'
  },
  {
    id: '18',
    category: 'sacrements',
    difficulty: 'moyen',
    level: 2,
    question: 'Quel sacrement est administré aux malades ?',
    questionType: 'multiple-choice',
    options: ['La Réconciliation', 'L\'Onction des malades', 'L\'Eucharistie', 'La Confirmation'],
    correctAnswer: 1,
    explanation: 'L\'Onction des malades est administrée aux personnes gravement malades.',
    points: 15,
    catechism: 'CCC 1511'
  },
  {
    id: '19',
    category: 'sacrements',
    difficulty: 'difficile',
    level: 2,
    question: 'Qu\'est-ce qu\'un sacrement ?',
    questionType: 'multiple-choice',
    options: [
      'Un simple rite',
      'Un signe visible institué par le Christ pour donner la grâce',
      'Une cérémonie religieuse',
      'Un acte de piété'
    ],
    correctAnswer: 1,
    explanation: 'Un sacrement est un signe visible institué par le Christ pour donner la grâce divine.',
    points: 20,
    catechism: 'CCC 1131'
  },
  {
    id: '20',
    category: 'sacrements',
    difficulty: 'facile',
    level: 2,
    question: 'Quel sacrement est reçu le plus souvent ?',
    questionType: 'multiple-choice',
    options: ['Le Baptême', 'L\'Eucharistie', 'La Réconciliation', 'La Confirmation'],
    correctAnswer: 1,
    explanation: 'L\'Eucharistie est reçue le plus souvent, notamment lors de chaque messe.',
    points: 10
  },

  // SAINTES ÉCRITURES (10 questions)
  {
    id: '21',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le premier livre de la Bible ?',
    questionType: 'multiple-choice',
    options: ['Exode', 'Genèse', 'Psaumes', 'Matthieu'],
    correctAnswer: 1,
    explanation: 'La Genèse est le premier livre de la Bible. Il raconte la création du monde et les origines de l\'humanité.',
    points: 10,
    scripture: 'Genèse 1:1'
  },
  {
    id: '22',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Combien y a-t-il d\'évangiles dans le Nouveau Testament ?',
    questionType: 'multiple-choice',
    options: ['2', '3', '4', '5'],
    correctAnswer: 2,
    explanation: 'Il y a 4 évangiles : Matthieu, Marc, Luc et Jean.',
    points: 10
  },
  {
    id: '23',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Qui a écrit la plupart des épîtres du Nouveau Testament ?',
    questionType: 'multiple-choice',
    options: ['Saint Pierre', 'Saint Paul', 'Saint Jean', 'Saint Luc'],
    correctAnswer: 1,
    explanation: 'Saint Paul a écrit la plupart des épîtres du Nouveau Testament.',
    points: 15
  },
  {
    id: '24',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel est le plus long livre de la Bible ?',
    questionType: 'multiple-choice',
    options: ['Genèse', 'Psaumes', 'Jérémie', 'Ézéchiel'],
    correctAnswer: 1,
    explanation: 'Le livre des Psaumes est le plus long livre de la Bible avec 150 psaumes.',
    points: 15
  },
  {
    id: '25',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le dernier livre de la Bible ?',
    questionType: 'multiple-choice',
    options: ['Évangile de Jean', 'Actes des Apôtres', 'Apocalypse', 'Épître de Jude'],
    correctAnswer: 2,
    explanation: 'L\'Apocalypse (ou Révélation) est le dernier livre de la Bible.',
    points: 10
  },
  {
    id: '26',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel prophète a prédit la naissance du Messie à Bethléem ?',
    questionType: 'multiple-choice',
    options: ['Isaïe', 'Michée', 'Jérémie', 'Ézéchiel'],
    correctAnswer: 1,
    explanation: 'Le prophète Michée a prédit que le Messie naîtrait à Bethléem.',
    points: 15,
    scripture: 'Michée 5:1'
  },
  {
    id: '27',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le premier miracle de Jésus ?',
    questionType: 'multiple-choice',
    options: [
      'La multiplication des pains',
      'Les noces de Cana',
      'La guérison d\'un lépreux',
      'La résurrection de Lazare'
    ],
    correctAnswer: 1,
    explanation: 'Le premier miracle de Jésus fut aux noces de Cana où il changea l\'eau en vin.',
    points: 10,
    scripture: 'Jean 2:1-11'
  },
  {
    id: '28',
    category: 'saintes-ecritures',
    difficulty: 'moyen',
    level: 1,
    question: 'Quel apôtre a renié Jésus trois fois ?',
    questionType: 'multiple-choice',
    options: ['Saint Jean', 'Saint Pierre', 'Saint Paul', 'Saint Thomas'],
    correctAnswer: 1,
    explanation: 'Saint Pierre a renié Jésus trois fois avant le chant du coq.',
    points: 15,
    scripture: 'Matthieu 26:69-75'
  },
  {
    id: '29',
    category: 'saintes-ecritures',
    difficulty: 'difficile',
    level: 1,
    question: 'Quel est le sens du mot "Évangile" ?',
    questionType: 'multiple-choice',
    options: [
      'Livre sacré',
      'Bonne nouvelle',
      'Parole de Dieu',
      'Enseignement'
    ],
    correctAnswer: 1,
    explanation: 'Le mot "Évangile" vient du grec "euangelion" qui signifie "bonne nouvelle".',
    points: 20
  },
  {
    id: '30',
    category: 'saintes-ecritures',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le verset le plus court de la Bible ?',
    questionType: 'multiple-choice',
    options: [
      'Jésus pleura',
      'Priez sans cesse',
      'Aimez-vous les uns les autres',
      'Dieu est amour'
    ],
    correctAnswer: 0,
    explanation: 'Le verset le plus court de la Bible est "Jésus pleura" (Jean 11:35).',
    points: 10,
    scripture: 'Jean 11:35'
  },

  // LITURGIE (10 questions)
  {
    id: '31',
    category: 'liturgie',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la couleur liturgique du temps de l\'Avent ?',
    questionType: 'multiple-choice',
    options: ['Rouge', 'Vert', 'Violet', 'Blanc'],
    correctAnswer: 2,
    explanation: 'Le violet est la couleur de l\'Avent, symbolisant la pénitence et l\'attente de la venue du Christ.',
    points: 15
  },
  {
    id: '32',
    category: 'liturgie',
    difficulty: 'facile',
    level: 2,
    question: 'Quelle est la couleur liturgique du temps de Noël ?',
    questionType: 'multiple-choice',
    options: ['Violet', 'Vert', 'Blanc', 'Rouge'],
    correctAnswer: 2,
    explanation: 'Le blanc est la couleur du temps de Noël, symbolisant la joie et la pureté.',
    points: 10
  },
  {
    id: '33',
    category: 'liturgie',
    difficulty: 'facile',
    level: 2,
    question: 'Quelle est la couleur liturgique du temps ordinaire ?',
    questionType: 'multiple-choice',
    options: ['Violet', 'Blanc', 'Vert', 'Rouge'],
    correctAnswer: 2,
    explanation: 'Le vert est la couleur du temps ordinaire, symbolisant l\'espérance et la croissance.',
    points: 10
  },
  {
    id: '34',
    category: 'liturgie',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la couleur liturgique du Vendredi Saint ?',
    questionType: 'multiple-choice',
    options: ['Violet', 'Rouge', 'Noir', 'Blanc'],
    correctAnswer: 1,
    explanation: 'Le rouge est la couleur du Vendredi Saint, symbolisant le sang du Christ versé pour nous.',
    points: 15
  },
  {
    id: '35',
    category: 'liturgie',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le premier dimanche de l\'année liturgique ?',
    questionType: 'multiple-choice',
    options: [
      'Dimanche de Pâques',
      'Premier dimanche de l\'Avent',
      'Dimanche de la Trinité',
      'Dimanche de Pentecôte'
    ],
    correctAnswer: 1,
    explanation: 'Le premier dimanche de l\'Avent marque le début de l\'année liturgique.',
    points: 10
  },
  {
    id: '36',
    category: 'liturgie',
    difficulty: 'moyen',
    level: 2,
    question: 'Qu\'est-ce que l\'Épiphanie ?',
    questionType: 'multiple-choice',
    options: [
      'La naissance de Jésus',
      'La visite des mages',
      'Le baptême de Jésus',
      'La résurrection'
    ],
    correctAnswer: 1,
    explanation: 'L\'Épiphanie célèbre la visite des mages venus adorer l\'Enfant Jésus.',
    points: 15
  },
  {
    id: '37',
    category: 'liturgie',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le jour le plus important de l\'année liturgique ?',
    questionType: 'multiple-choice',
    options: [
      'Noël',
      'Pâques',
      'Pentecôte',
      'L\'Assomption'
    ],
    correctAnswer: 1,
    explanation: 'Pâques est le jour le plus important car il célèbre la résurrection du Christ.',
    points: 10
  },
  {
    id: '38',
    category: 'liturgie',
    difficulty: 'moyen',
    level: 2,
    question: 'Qu\'est-ce que la Pentecôte ?',
    questionType: 'multiple-choice',
    options: [
      'La naissance de l\'Église',
      'La résurrection du Christ',
      'L\'ascension de Jésus',
      'La naissance de Marie'
    ],
    correctAnswer: 0,
    explanation: 'La Pentecôte célèbre la descente du Saint-Esprit et la naissance de l\'Église.',
    points: 15
  },
  {
    id: '39',
    category: 'liturgie',
    difficulty: 'difficile',
    level: 2,
    question: 'Qu\'est-ce que la liturgie des Heures ?',
    questionType: 'multiple-choice',
    options: [
      'La messe quotidienne',
      'La prière officielle de l\'Église répartie sur la journée',
      'Les vêpres du dimanche',
      'La prière du matin'
    ],
    correctAnswer: 1,
    explanation: 'La liturgie des Heures est la prière officielle de l\'Église répartie sur la journée.',
    points: 20
  },
  {
    id: '40',
    category: 'liturgie',
    difficulty: 'facile',
    level: 2,
    question: 'Quel est le sens du mot "liturgie" ?',
    questionType: 'multiple-choice',
    options: [
      'Cérémonie',
      'Service public',
      'Prière',
      'Culte'
    ],
    correctAnswer: 1,
    explanation: 'Le mot "liturgie" vient du grec "leitourgia" qui signifie "service public".',
    points: 10
  },

  // SAINTS (10 questions)
  {
    id: '41',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est le patron de l\'Église universelle ?',
    questionType: 'multiple-choice',
    options: ['Saint Paul', 'Saint Pierre', 'Saint Jean', 'Saint Matthieu'],
    correctAnswer: 1,
    explanation: 'Saint Pierre est le patron de l\'Église universelle, étant le premier pape et le fondement de l\'Église.',
    points: 10
  },
  {
    id: '42',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est le patron de la France ?',
    questionType: 'multiple-choice',
    options: ['Saint Michel', 'Sainte Jeanne d\'Arc', 'Saint Denis', 'Saint Louis'],
    correctAnswer: 0,
    explanation: 'Saint Michel est le patron de la France.',
    points: 10
  },
  {
    id: '43',
    category: 'saints',
    difficulty: 'moyen',
    level: 1,
    question: 'Qui est le patron des voyageurs ?',
    questionType: 'multiple-choice',
    options: ['Saint Christophe', 'Saint Michel', 'Saint Raphaël', 'Saint Gabriel'],
    correctAnswer: 0,
    explanation: 'Saint Christophe est le patron des voyageurs.',
    points: 15
  },
  {
    id: '44',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est le patron des médecins ?',
    questionType: 'multiple-choice',
    options: ['Saint Luc', 'Saint Côme', 'Saint Damien', 'Tous les précédents'],
    correctAnswer: 3,
    explanation: 'Saint Luc, Saint Côme et Saint Damien sont tous patrons des médecins.',
    points: 10
  },
  {
    id: '45',
    category: 'saints',
    difficulty: 'moyen',
    level: 1,
    question: 'Qui est le patron des écoliers et étudiants ?',
    questionType: 'multiple-choice',
    options: ['Saint Thomas d\'Aquin', 'Saint Jean-Baptiste de La Salle', 'Saint Nicolas', 'Tous les précédents'],
    correctAnswer: 3,
    explanation: 'Ces trois saints sont patrons des écoliers et étudiants.',
    points: 15
  },
  {
    id: '46',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est le patron des pauvres ?',
    questionType: 'multiple-choice',
    options: ['Saint François d\'Assise', 'Saint Vincent de Paul', 'Saint Martin', 'Tous les précédents'],
    correctAnswer: 3,
    explanation: 'Ces trois saints sont patrons des pauvres.',
    points: 10
  },
  {
    id: '47',
    category: 'saints',
    difficulty: 'moyen',
    level: 1,
    question: 'Qui est le patron de l\'Europe ?',
    questionType: 'multiple-choice',
    options: ['Saint Benoît', 'Sainte Brigitte', 'Sainte Catherine', 'Saint Cyrille'],
    correctAnswer: 0,
    explanation: 'Saint Benoît est le patron de l\'Europe.',
    points: 15
  },
  {
    id: '48',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qui est le patron des jeunes ?',
    questionType: 'multiple-choice',
    options: ['Saint Jean Bosco', 'Saint Dominique Savio', 'Sainte Thérèse de Lisieux', 'Tous les précédents'],
    correctAnswer: 3,
    explanation: 'Ces trois saints sont patrons des jeunes.',
    points: 10
  },
  {
    id: '49',
    category: 'saints',
    difficulty: 'moyen',
    level: 1,
    question: 'Qui est le patron des missionnaires ?',
    questionType: 'multiple-choice',
    options: ['Saint François Xavier', 'Sainte Thérèse de Lisieux', 'Saint Paul', 'Tous les précédents'],
    correctAnswer: 3,
    explanation: 'Ces trois saints sont patrons des missionnaires.',
    points: 15
  },
  {
    id: '50',
    category: 'saints',
    difficulty: 'facile',
    level: 1,
    question: 'Qu\'est-ce que la communion des saints ?',
    questionType: 'multiple-choice',
    options: [
      'La communion eucharistique',
      'La communion entre tous les saints du ciel',
      'La communion entre tous les fidèles, vivants et morts',
      'La communion des anges'
    ],
    correctAnswer: 2,
    explanation: 'La communion des saints est la communion spirituelle entre tous les fidèles, qu\'ils soient au ciel, au purgatoire ou sur terre.',
    points: 10,
    catechism: 'CCC 946'
  },

  // PRIÈRES CATHOLIQUES EN FRANÇAIS (10 questions)
  {
    id: '51',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Notre Père qui es aux cieux, que ton nom soit..."',
    questionType: 'quote-completion',
    options: [
      'sanctifié',
      'béni',
      'adoré',
      'loué'
    ],
    correctAnswer: 0,
    explanation: 'La prière du Notre Père commence par "Notre Père qui es aux cieux, que ton nom soit sanctifié".',
    points: 10
  },
  {
    id: '52',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Quelle prière commence par "Je vous salue Marie, pleine de grâce" ?',
    questionType: 'multiple-choice',
    options: [
      'Le Notre Père',
      'Le Je vous salue Marie',
      'Le Gloire au Père',
      'L\'Acte de contrition'
    ],
    correctAnswer: 1,
    explanation: 'Le "Je vous salue Marie" est une prière mariale qui commence par ces mots.',
    points: 10
  },
  {
    id: '53',
    category: 'prieres',
    difficulty: 'moyen',
    level: 1,
    question: 'Vrai ou Faux : Le "Gloire au Père" est une prière trinitaire.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: 'Le "Gloire au Père" est effectivement une prière trinitaire qui loue le Père, le Fils et le Saint-Esprit.',
    points: 15
  },
  {
    id: '54',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Gloire au Père, au Fils et au..."',
    questionType: 'quote-completion',
    options: [
      'Saint-Esprit',
      'Saint Esprit',
      'Esprit Saint',
      'Esprit de Dieu'
    ],
    correctAnswer: 0,
    explanation: 'La formule complète est "Gloire au Père, au Fils et au Saint-Esprit".',
    points: 10
  },
  {
    id: '55',
    category: 'prieres',
    difficulty: 'moyen',
    level: 1,
    question: 'Quelle prière est récitée avant de recevoir la communion ?',
    questionType: 'multiple-choice',
    options: [
      'Le Notre Père',
      'L\'Acte de contrition',
      'Le Je vous salue Marie',
      'Le Gloire au Père'
    ],
    correctAnswer: 0,
    explanation: 'Le Notre Père est récité avant la communion lors de la messe.',
    points: 15
  },
  {
    id: '56',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Vrai ou Faux : L\'"Ange du Seigneur" est une prière de l\'Avent.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'L\'"Ange du Seigneur" (Angelus) est une prière mariale récitée trois fois par jour, pas seulement pendant l\'Avent.',
    points: 10
  },
  {
    id: '57',
    category: 'prieres',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez : "Je vous salue Marie, pleine de grâce, le Seigneur est..."',
    questionType: 'quote-completion',
    options: [
      'avec vous',
      'en vous',
      'près de vous',
      'pour vous'
    ],
    correctAnswer: 0,
    explanation: 'La prière continue par "le Seigneur est avec vous".',
    points: 15
  },
  {
    id: '58',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Quelle prière est dite "prière du Seigneur" ?',
    questionType: 'multiple-choice',
    options: [
      'Le Je vous salue Marie',
      'Le Notre Père',
      'Le Gloire au Père',
      'L\'Acte de contrition'
    ],
    correctAnswer: 1,
    explanation: 'Le Notre Père est appelé "prière du Seigneur" car c\'est Jésus qui l\'a enseignée à ses disciples.',
    points: 10
  },
  {
    id: '59',
    category: 'prieres',
    difficulty: 'moyen',
    level: 1,
    question: 'Vrai ou Faux : Le "Magnificat" est une prière de saint Joseph.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 1,
    explanation: 'Le "Magnificat" est le cantique de Marie, pas de saint Joseph.',
    points: 15
  },
  {
    id: '60',
    category: 'prieres',
    difficulty: 'facile',
    level: 1,
    question: 'Complétez : "Notre Père qui es aux cieux, que ta volonté soit faite..."',
    questionType: 'quote-completion',
    options: [
      'sur la terre comme au ciel',
      'sur terre comme au ciel',
      'sur la terre et au ciel',
      'sur terre et au ciel'
    ],
    correctAnswer: 0,
    explanation: 'La formule exacte est "que ta volonté soit faite sur la terre comme au ciel".',
    points: 10
  },

  // PRIÈRES EN LATIN (10 questions)
  {
    id: '61',
    category: 'prieres-latin',
    difficulty: 'facile',
    level: 2,
    question: 'Complétez : "Pater noster, qui es in caelis, sanctificetur..."',
    questionType: 'quote-completion',
    options: [
      'nomen tuum',
      'nomen tuam',
      'nomen tuus',
      'nomen tuum'
    ],
    correctAnswer: 0,
    explanation: 'La prière continue par "sanctificetur nomen tuum" (que ton nom soit sanctifié).',
    points: 10
  },
  {
    id: '62',
    category: 'prieres-latin',
    difficulty: 'facile',
    level: 2,
    question: 'Quelle prière commence par "Ave Maria, gratia plena" ?',
    questionType: 'multiple-choice',
    options: [
      'Le Pater Noster',
      'L\'Ave Maria',
      'Le Gloria Patri',
      'L\'Agnus Dei'
    ],
    correctAnswer: 1,
    explanation: 'L\'"Ave Maria" est la version latine du "Je vous salue Marie".',
    points: 10
  },
  {
    id: '63',
    category: 'prieres-latin',
    difficulty: 'moyen',
    level: 2,
    question: 'Vrai ou Faux : "Gloria Patri" signifie "Gloire au Père" en français.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: '"Gloria Patri" se traduit effectivement par "Gloire au Père" en français.',
    points: 15
  },
  {
    id: '64',
    category: 'prieres-latin',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Gloria Patri, et Filio, et Spiritui..."',
    questionType: 'quote-completion',
    options: [
      'Sancto',
      'Sancti',
      'Sanctum',
      'Sancta'
    ],
    correctAnswer: 0,
    explanation: 'La formule complète est "Gloria Patri, et Filio, et Spiritui Sancto" (Gloire au Père, au Fils et au Saint-Esprit).',
    points: 15
  },
  {
    id: '65',
    category: 'prieres-latin',
    difficulty: 'facile',
    level: 2,
    question: 'Quelle prière se termine par "Amen" ?',
    questionType: 'multiple-choice',
    options: [
      'Toutes les prières',
      'Seulement le Pater Noster',
      'Seulement l\'Ave Maria',
      'Aucune prière'
    ],
    correctAnswer: 0,
    explanation: 'Toutes les prières catholiques se terminent traditionnellement par "Amen".',
    points: 10
  },
  {
    id: '66',
    category: 'prieres-latin',
    difficulty: 'moyen',
    level: 2,
    question: 'Vrai ou Faux : "Agnus Dei" signifie "Agneau de Dieu" en français.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: '"Agnus Dei" se traduit effectivement par "Agneau de Dieu" en français.',
    points: 15
  },
  {
    id: '67',
    category: 'prieres-latin',
    difficulty: 'facile',
    level: 2,
    question: 'Complétez : "Ave Maria, gratia plena, Dominus..."',
    questionType: 'quote-completion',
    options: [
      'tecum',
      'tecum est',
      'est tecum',
      'cum te'
    ],
    correctAnswer: 0,
    explanation: 'La prière continue par "Dominus tecum" (le Seigneur est avec vous).',
    points: 10
  },
  {
    id: '68',
    category: 'prieres-latin',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle prière est dite "prière eucharistique" ?',
    questionType: 'multiple-choice',
    options: [
      'Le Pater Noster',
      'L\'Ave Maria',
      'Le Sanctus',
      'Le Gloria Patri'
    ],
    correctAnswer: 2,
    explanation: 'Le "Sanctus" (Saint, Saint, Saint) fait partie de la prière eucharistique.',
    points: 15
  },
  {
    id: '69',
    category: 'prieres-latin',
    difficulty: 'facile',
    level: 2,
    question: 'Vrai ou Faux : "Kyrie eleison" est une prière en grec.',
    questionType: 'true-false',
    options: ['Vrai', 'Faux'],
    correctAnswer: 0,
    explanation: '"Kyrie eleison" (Seigneur, prends pitié) est effectivement en grec, pas en latin.',
    points: 10
  },
  {
    id: '70',
    category: 'prieres-latin',
    difficulty: 'moyen',
    level: 2,
    question: 'Complétez : "Pater noster, qui es in caelis, fiat voluntas tua..."',
    questionType: 'quote-completion',
    options: [
      'sicut in caelo et in terra',
      'sicut in caelo et in terram',
      'sicut in caelis et in terra',
      'sicut in caelis et in terram'
    ],
    correctAnswer: 0,
    explanation: 'La formule exacte est "fiat voluntas tua sicut in caelo et in terra" (que ta volonté soit faite sur la terre comme au ciel).',
    points: 15
  },

  // PARCOURS SAINT THOMAS D'AQUIN - SOMME THÉOLOGIQUE
  {
    id: '71',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Quand Saint Thomas d\'Aquin a-t-il vécu ?',
    questionType: 'multiple-choice',
    options: [
      'Xe siècle',
      'XIIIe siècle',
      'XVIe siècle',
      'XIXe siècle'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas d\'Aquin a vécu au XIIIe siècle (1225-1274). Il est né en Italie et est mort à l\'abbaye de Fossanova.',
    points: 10,
    author: 'Saint Thomas d\'Aquin'
  },
  {
    id: '72',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est l\'ordre religieux de Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Bénédictins',
      'Franciscains',
      'Dominicains',
      'Jésuites'
    ],
    correctAnswer: 2,
    explanation: 'Saint Thomas d\'Aquin était dominicain. Il a rejoint l\'Ordre des Prêcheurs (Dominicains) à l\'âge de 19 ans.',
    points: 10,
    author: 'Saint Thomas d\'Aquin'
  },
  {
    id: '73',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le titre principal de l\'œuvre de Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'La Divine Comédie',
      'La Somme théologique',
      'Les Confessions',
      'La Cité de Dieu'
    ],
    correctAnswer: 1,
    explanation: 'La Somme théologique (Summa Theologiae) est l\'œuvre principale de Saint Thomas d\'Aquin, écrite entre 1265 et 1274.',
    points: 10,
    author: 'Saint Thomas d\'Aquin'
  },

  // DIEU ET SON EXISTENCE
  {
    id: '74',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Combien Saint Thomas d\'Aquin propose-t-il de preuves de l\'existence de Dieu ?',
    questionType: 'multiple-choice',
    options: ['3', '5', '7', '10'],
    correctAnswer: 1,
    explanation: 'Saint Thomas d\'Aquin propose 5 voies (quinque viae) pour démontrer l\'existence de Dieu dans la Somme théologique.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 2, a. 3'
  },
  {
    id: '75',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la première voie de Saint Thomas pour prouver l\'existence de Dieu ?',
    questionType: 'multiple-choice',
    options: [
      'La cause efficiente',
      'Le mouvement',
      'La contingence',
      'La finalité'
    ],
    correctAnswer: 1,
    explanation: 'La première voie part du mouvement : tout ce qui se meut est mû par autre chose, ce qui nécessite un premier moteur immobile.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 2, a. 3'
  },
  {
    id: '76',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Qu\'est-ce que Saint Thomas entend par "moteur immobile" ?',
    questionType: 'multiple-choice',
    options: [
      'Un moteur qui ne fonctionne plus',
      'Un moteur qui meut sans être mû lui-même',
      'Un moteur électrique',
      'Un moteur qui se meut lui-même'
    ],
    correctAnswer: 1,
    explanation: 'Le "moteur immobile" est celui qui meut les autres sans être mû lui-même, c\'est-à-dire Dieu, cause première de tout mouvement.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 2, a. 3'
  },

  // LA TRINITÉ
  {
    id: '77',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Comment Saint Thomas explique-t-il la distinction des personnes dans la Trinité ?',
    questionType: 'multiple-choice',
    options: [
      'Par la différence de nature',
      'Par les relations d\'origine',
      'Par la différence de puissance',
      'Par la différence de temps'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas explique la distinction des personnes par les relations d\'origine : le Père engendre le Fils, le Père et le Fils spirant le Saint-Esprit.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 29-43'
  },
  {
    id: '78',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la relation qui distingue le Père dans la Trinité ?',
    questionType: 'multiple-choice',
    options: [
      'La paternité',
      'La filiation',
      'La spiration',
      'La procession'
    ],
    correctAnswer: 0,
    explanation: 'Le Père est distingué par la paternité, c\'est-à-dire la relation d\'engendrement du Fils.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 33'
  },

  // L'INCARNATION
  {
    id: '79',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Comment Saint Thomas définit-il l\'union hypostatique ?',
    questionType: 'multiple-choice',
    options: [
      'L\'union de deux personnes',
      'L\'union de la nature divine et de la nature humaine en une seule personne',
      'L\'union de deux natures divines',
      'L\'union de l\'âme et du corps'
    ],
    correctAnswer: 1,
    explanation: 'L\'union hypostatique est l\'union de la nature divine et de la nature humaine en la personne du Verbe incarné.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIIa, q. 2'
  },
  {
    id: '80',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Pourquoi l\'Incarnation était-elle nécessaire selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'Pour sauver l\'humanité du péché',
      'Pour créer le monde',
      'Pour punir les hommes',
      'Pour remplacer les anges'
    ],
    correctAnswer: 0,
    explanation: 'L\'Incarnation était nécessaire pour réparer le péché et sauver l\'humanité, selon Saint Thomas.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIIa, q. 1'
  },

  // LES VERTUS
  {
    id: '81',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Combien y a-t-il de vertus cardinales selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: ['3', '4', '5', '7'],
    correctAnswer: 1,
    explanation: 'Il y a 4 vertus cardinales : prudence, justice, force et tempérance.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIa-IIae, q. 47-170'
  },
  {
    id: '82',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la vertu cardinale qui dirige les autres selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'La justice',
      'La prudence',
      'La force',
      'La tempérance'
    ],
    correctAnswer: 1,
    explanation: 'La prudence est la vertu qui dirige les autres vertus cardinales, car elle est la rectitude de la raison dans l\'action.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIa-IIae, q. 47'
  },
  {
    id: '83',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Combien y a-t-il de vertus théologales selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: ['2', '3', '4', '5'],
    correctAnswer: 1,
    explanation: 'Il y a 3 vertus théologales : foi, espérance et charité.',
    points: 10,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIa-IIae, q. 1-46'
  },

  // LA LOI ET LA MORALE
  {
    id: '84',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Quels sont les types de loi selon Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Loi éternelle, loi naturelle, loi humaine, loi divine',
      'Loi civile et loi religieuse',
      'Loi morale et loi juridique',
      'Loi ancienne et loi nouvelle'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thomas distingue 4 types de loi : éternelle (en Dieu), naturelle (inscrite dans la nature), humaine (promulguée par l\'homme), divine (révélée).',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia-IIae, q. 90-108'
  },
  {
    id: '85',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Qu\'est-ce que la loi naturelle selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'La loi écrite dans les cœurs',
      'La loi de la jungle',
      'La loi civile',
      'La loi divine révélée'
    ],
    correctAnswer: 0,
    explanation: 'La loi naturelle est la participation de la créature raisonnable à la loi éternelle, elle est inscrite dans les cœurs.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia-IIae, q. 91, a. 2'
  },

  // LES SACREMENTS
  {
    id: '86',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Combien y a-t-il de sacrements selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: ['5', '6', '7', '8'],
    correctAnswer: 2,
    explanation: 'Il y a 7 sacrements : Baptême, Confirmation, Eucharistie, Pénitence, Onction des malades, Ordre, Mariage.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIIa, q. 60-90'
  },
  {
    id: '87',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Qu\'est-ce que la transsubstantiation selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'La transformation du pain en corps du Christ',
      'La présence spirituelle du Christ',
      'La bénédiction du pain',
      'La consécration du vin'
    ],
    correctAnswer: 0,
    explanation: 'La transsubstantiation est la conversion de toute la substance du pain en la substance du corps du Christ.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, IIIa, q. 75'
  },

  // LA GRÂCE
  {
    id: '88',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Qu\'est-ce que la grâce sanctifiante selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'Un don surnaturel qui sanctifie l\'âme',
      'Une qualité naturelle',
      'Un sentiment religieux',
      'Une émotion spirituelle'
    ],
    correctAnswer: 0,
    explanation: 'La grâce sanctifiante est un don surnaturel qui sanctifie l\'âme et la rend participant de la nature divine.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia-IIae, q. 110-114'
  },
  {
    id: '89',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la différence entre grâce sanctifiante et grâce actuelle selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'La grâce sanctifiante est permanente, la grâce actuelle est temporaire',
      'Il n\'y a pas de différence',
      'La grâce actuelle est plus importante',
      'La grâce sanctifiante est temporaire'
    ],
    correctAnswer: 0,
    explanation: 'La grâce sanctifiante est un habitus permanent, tandis que la grâce actuelle est un secours temporaire pour agir.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia-IIae, q. 109-114'
  },

  // LA FIN DERNIÈRE
  {
    id: '90',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la fin dernière de l\'homme selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'La richesse',
      'Le bonheur',
      'La vision de Dieu',
      'La gloire terrestre'
    ],
    correctAnswer: 2,
    explanation: 'La fin dernière de l\'homme est la vision béatifique de Dieu, qui est le souverain bien.',
    points: 15,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia-IIae, q. 1-5'
  },
  {
    id: '91',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Qu\'est-ce que la vision béatifique selon Saint Thomas ?',
    questionType: 'multiple-choice',
    options: [
      'Voir Dieu face à face',
      'Une vision imaginaire',
      'Un rêve spirituel',
      'Une méditation profonde'
    ],
    correctAnswer: 0,
    explanation: 'La vision béatifique est la vision directe de Dieu face à face, qui constitue le bonheur parfait des bienheureux.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, Ia, q. 12'
  },

  // MÉTHODE THÉOLOGIQUE
  {
    id: '92',
    category: 'saint-thomas',
    difficulty: 'difficile',
    level: 3,
    question: 'Quelle est la méthode de Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'La dialectique',
      'La méthode scolastique',
      'L\'empirisme',
      'Le mysticisme'
    ],
    correctAnswer: 1,
    explanation: 'Saint Thomas utilise la méthode scolastique : question, objections, réponse, réponses aux objections.',
    points: 20,
    author: 'Saint Thomas d\'Aquin',
    reference: 'Somme théologique, structure générale'
  },
  {
    id: '93',
    category: 'saint-thomas',
    difficulty: 'moyen',
    level: 2,
    question: 'Quelle est la devise de Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Contempler et transmettre',
      'Croire et comprendre',
      'Prier et travailler',
      'Aimer et servir'
    ],
    correctAnswer: 0,
    explanation: 'La devise de Saint Thomas est "Contemplare et contemplata aliis tradere" (Contempler et transmettre aux autres ce qui a été contemplé).',
    points: 15,
    author: 'Saint Thomas d\'Aquin'
  },

  // INFLUENCE ET POSTÉRITÉ
  {
    id: '94',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Quel titre l\'Église a-t-elle donné à Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Docteur de l\'Église',
      'Père de l\'Église',
      'Apôtre',
      'Prophète'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thomas d\'Aquin est Docteur de l\'Église, titre qui lui a été conféré en 1567 par le pape Pie V.',
    points: 10,
    author: 'Saint Thomas d\'Aquin'
  },
  {
    id: '95',
    category: 'saint-thomas',
    difficulty: 'facile',
    level: 1,
    question: 'Quel est le surnom de Saint Thomas d\'Aquin ?',
    questionType: 'multiple-choice',
    options: [
      'Le Docteur Angélique',
      'Le Docteur de la Grâce',
      'Le Docteur de l\'Église',
      'Le Docteur de la Charité'
    ],
    correctAnswer: 0,
    explanation: 'Saint Thomas d\'Aquin est surnommé "le Docteur Angélique" en raison de la pureté de sa doctrine et de sa vie.',
    points: 10,
    author: 'Saint Thomas d\'Aquin'
  },
  // Exemple de question d'association
  {
    id: 'association-1',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Associez chaque personne de la Trinité à sa caractéristique principale :',
    questionType: 'association',
    options: [],
    correctAnswer: [0, 1, 2],
    explanation: 'La Trinité est le mystère central de la foi chrétienne : un seul Dieu en trois personnes distinctes.',
    points: 20,
    associationPairs: [
      {
        id: 'pair-1',
        leftItem: 'Le Père',
        rightItem: 'Créateur',
        isCorrect: true
      },
      {
        id: 'pair-2',
        leftItem: 'Le Fils',
        rightItem: 'Rédempteur',
        isCorrect: true
      },
      {
        id: 'pair-3',
        leftItem: 'Le Saint-Esprit',
        rightItem: 'Sanctificateur',
        isCorrect: true
      }
    ]
  },
  // Exemple de question à choix multiples avec plusieurs réponses
  {
    id: 'multiple-1',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Quels sont les attributs de Dieu ? (Sélectionnez toutes les bonnes réponses)',
    questionType: 'multiple-choice',
    options: [
      'Omnipotent',
      'Omniscient',
      'Omniprésent',
      'Temporal'
    ],
    correctAnswer: [0, 1, 2],
    explanation: 'Dieu est omnipotent (tout-puissant), omniscient (tout-sachant) et omniprésent (présent partout). Il n\'est pas temporel car il existe en dehors du temps.',
    points: 15,
    multipleCorrectAnswers: true
  },
  // Exemple de question de réorganisation de phrases
  {
    id: 'reorder-1',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 2,
    question: 'Remettez dans l\'ordre chronologique les étapes de la création selon la Genèse :',
    questionType: 'sentence-reorder',
    options: [],
    correctAnswer: [0, 1, 2, 3, 4, 5],
    explanation: 'La Genèse décrit la création en six jours, commençant par la lumière et se terminant par l\'homme.',
    points: 20,
    sentences: [
      'Dieu dit : "Que la lumière soit" et la lumière fut.',
      'Dieu sépara les eaux d\'en haut et d\'en bas.',
      'Dieu fit apparaître la terre ferme et les mers.',
      'Dieu créa les plantes et les arbres.',
      'Dieu créa le soleil, la lune et les étoiles.',
      'Dieu créa l\'homme à son image.'
    ],
    correctOrder: [0, 1, 2, 3, 4, 5]
  },
  // Exemple de question de mots fléchés
  {
    id: 'crossword-1',
    category: 'dogmes',
    difficulty: 'moyen',
    level: 1,
    question: 'Complétez les mots fléchés sur les dogmes mariaux',
    questionType: 'crossword',
    options: [],
    correctAnswer: [0, 1, 2, 3],
    explanation: 'Ces mots fléchés vous permettent de réviser les principaux dogmes mariaux de l\'Église catholique.',
    points: 20,
    crosswordData: {
      gridSize: { rows: 4, cols: 20 },
      grid: {
        '0,0': { letter: '', isBlack: false, number: 1, wordIds: ['word1'], row: 0, col: 0 },
        '0,1': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 1 },
        '0,2': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 2 },
        '0,3': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 3 },
        '0,4': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 4 },
        '0,5': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 5 },
        '0,6': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 6 },
        '0,7': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 7 },
        '0,8': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 8 },
        '0,9': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 9 },
        '0,10': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 10 },
        '0,11': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 11 },
        '0,12': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 12 },
        '0,13': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 13 },
        '0,14': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 14 },
        '0,15': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 15 },
        '0,16': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 16 },
        '0,17': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 17 },
        '0,18': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 18 },
        '0,19': { letter: '', isBlack: false, number: null, wordIds: ['word1'], row: 0, col: 19 },
        '1,0': { letter: '', isBlack: false, number: 2, wordIds: ['word2'], row: 1, col: 0 },
        '1,1': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 1 },
        '1,2': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 2 },
        '1,3': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 3 },
        '1,4': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 4 },
        '1,5': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 5 },
        '1,6': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 6 },
        '1,7': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 7 },
        '1,8': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 8 },
        '1,9': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 9 },
        '1,10': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 10 },
        '1,11': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 11 },
        '1,12': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 12 },
        '1,13': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 13 },
        '1,14': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 14 },
        '1,15': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 15 },
        '1,16': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 16 },
        '1,17': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 17 },
        '1,18': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 18 },
        '1,19': { letter: '', isBlack: false, number: null, wordIds: ['word2'], row: 1, col: 19 },
        '2,0': { letter: '', isBlack: false, number: 3, wordIds: ['word3'], row: 2, col: 0 },
        '2,1': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 1 },
        '2,2': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 2 },
        '2,3': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 3 },
        '2,4': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 4 },
        '2,5': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 5 },
        '2,6': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 6 },
        '2,7': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 7 },
        '2,8': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 8 },
        '2,9': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 9 },
        '2,10': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 10 },
        '2,11': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 11 },
        '2,12': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 12 },
        '2,13': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 13 },
        '2,14': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 14 },
        '2,15': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 15 },
        '2,16': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 16 },
        '2,17': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 17 },
        '2,18': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 18 },
        '2,19': { letter: '', isBlack: false, number: null, wordIds: ['word3'], row: 2, col: 19 },
        '3,0': { letter: '', isBlack: false, number: 4, wordIds: ['word4'], row: 3, col: 0 },
        '3,1': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 1 },
        '3,2': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 2 },
        '3,3': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 3 },
        '3,4': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 4 },
        '3,5': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 5 },
        '3,6': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 6 },
        '3,7': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 7 },
        '3,8': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 8 },
        '3,9': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 9 },
        '3,10': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 10 },
        '3,11': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 11 },
        '3,12': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 12 },
        '3,13': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 13 },
        '3,14': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 14 },
        '3,15': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 15 },
        '3,16': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 16 },
        '3,17': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 17 },
        '3,18': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 18 },
        '3,19': { letter: '', isBlack: false, number: null, wordIds: ['word4'], row: 3, col: 19 },
      },
      clues: [
        {
          id: 'clue1',
          number: 1,
          wordId: 'word1',
          definition: 'Dogme selon lequel Marie a été préservée du péché originel dès sa conception',
          direction: 'horizontal',
          row: 0,
          col: 0,
          length: 19,
        },
        {
          id: 'clue2',
          number: 2,
          wordId: 'word2',
          definition: 'Dogme selon lequel Marie a été élevée au ciel en corps et en âme',
          direction: 'horizontal',
          row: 1,
          col: 0,
          length: 19,
        },
        {
          id: 'clue3',
          number: 3,
          wordId: 'word3',
          definition: 'Dogme selon lequel Marie est la mère de Dieu',
          direction: 'horizontal',
          row: 2,
          col: 0,
          length: 19,
        },
        {
          id: 'clue4',
          number: 4,
          wordId: 'word4',
          definition: 'Dogme selon lequel Marie est restée vierge avant, pendant et après la naissance de Jésus',
          direction: 'horizontal',
          row: 3,
          col: 0,
          length: 19,
        },
      ],
      words: [
        {
          id: 'word1',
          word: 'IMMACULEECONCEPTION',
          definition: 'Dogme selon lequel Marie a été préservée du péché originel dès sa conception',
          direction: 'horizontal',
          row: 0,
          col: 0,
          length: 19,
          isFound: false,
        },
        {
          id: 'word2',
          word: 'ASSOMPTIONDEMARIE',
          definition: 'Dogme selon lequel Marie a été élevée au ciel en corps et en âme',
          direction: 'horizontal',
          row: 1,
          col: 0,
          length: 19,
          isFound: false,
        },
        {
          id: 'word3',
          word: 'MARIEMEREDEDIEU',
          definition: 'Dogme selon lequel Marie est la mère de Dieu',
          direction: 'horizontal',
          row: 2,
          col: 0,
          length: 19,
          isFound: false,
        },
        {
          id: 'word4',
          word: 'VIERGEITEPERPETUELLE',
          definition: 'Dogme selon lequel Marie est restée vierge avant, pendant et après la naissance de Jésus',
          direction: 'horizontal',
          row: 3,
          col: 0,
          length: 19,
          isFound: false,
        },
      ],
    },
  },
];

export const sampleQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    title: 'Les Fondamentaux de la Foi',
    description: 'Testez vos connaissances sur les bases de la foi catholique',
    category: 'dogmes',
    level: 1,
    questions: sampleQuestions.filter(q => q.category === 'dogmes').slice(0, 10),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-2',
    title: 'Les Sacrements',
    description: 'Découvrez les 7 sacrements de l\'Église catholique',
    category: 'sacrements',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'sacrements').slice(0, 10),
    passingScore: 80,
    timeLimit: 15
  },
  {
    id: 'quiz-3',
    title: 'La Bible et les Écritures',
    description: 'Explorez les Saintes Écritures',
    category: 'saintes-ecritures',
    level: 1,
    questions: sampleQuestions.filter(q => q.category === 'saintes-ecritures').slice(0, 10),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-4',
    title: 'La Liturgie et les Fêtes',
    description: 'Apprenez les couleurs liturgiques et les fêtes chrétiennes',
    category: 'liturgie',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'liturgie').slice(0, 10),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-5',
    title: 'Les Saints et la Communion des Saints',
    description: 'Découvrez les saints patrons et la communion des saints',
    category: 'saints',
    level: 1,
    questions: sampleQuestions.filter(q => q.category === 'saints').slice(0, 10),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-11',
    title: 'Les Prières Catholiques',
    description: 'Testez vos connaissances sur les prières fondamentales de l\'Église',
    category: 'prieres',
    level: 1,
    questions: sampleQuestions.filter(q => q.category === 'prieres').slice(0, 10),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-12',
    title: 'Les Prières en Latin',
    description: 'Découvrez les prières traditionnelles de l\'Église en latin',
    category: 'prieres-latin',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'prieres-latin').slice(0, 10),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-13',
    title: 'Introduction à Saint Thomas d\'Aquin',
    description: 'Découvrez la vie et l\'œuvre du Docteur Angélique',
    category: 'saint-thomas',
    level: 1,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && q.level === 1),
    passingScore: 70,
    timeLimit: 15
  },
  {
    id: 'quiz-14',
    title: 'Dieu et son existence',
    description: 'Les 5 voies de Saint Thomas pour prouver l\'existence de Dieu',
    category: 'saint-thomas',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '74' || q.id === '75' || q.id === '76')),
    passingScore: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-15',
    title: 'La Trinité selon Saint Thomas',
    description: 'Comprendre le mystère de la Trinité avec le Docteur Angélique',
    category: 'saint-thomas',
    level: 3,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '77' || q.id === '78')),
    passingScore: 80,
    timeLimit: 15
  },
  {
    id: 'quiz-16',
    title: 'L\'Incarnation du Verbe',
    description: 'L\'union hypostatique et la nécessité de l\'Incarnation',
    category: 'saint-thomas',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '79' || q.id === '80')),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-17',
    title: 'Les vertus selon Saint Thomas',
    description: 'Vertus cardinales et théologales dans la pensée thomiste',
    category: 'saint-thomas',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '81' || q.id === '82' || q.id === '83')),
    passingScore: 75,
    timeLimit: 20
  },
  {
    id: 'quiz-18',
    title: 'La loi et la morale',
    description: 'Les différents types de loi dans la pensée de Saint Thomas',
    category: 'saint-thomas',
    level: 3,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '84' || q.id === '85')),
    passingScore: 80,
    timeLimit: 15
  },
  {
    id: 'quiz-19',
    title: 'Les sacrements',
    description: 'La doctrine sacramentelle de Saint Thomas d\'Aquin',
    category: 'saint-thomas',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '86' || q.id === '87')),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-20',
    title: 'La grâce divine',
    description: 'Grâce sanctifiante et grâce actuelle selon Saint Thomas',
    category: 'saint-thomas',
    level: 3,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '88' || q.id === '89')),
    passingScore: 80,
    timeLimit: 15
  },
  {
    id: 'quiz-21',
    title: 'La fin dernière de l\'homme',
    description: 'La vision béatifique et le bonheur parfait',
    category: 'saint-thomas',
    level: 2,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '90' || q.id === '91')),
    passingScore: 75,
    timeLimit: 15
  },
  {
    id: 'quiz-22',
    title: 'La méthode thomiste',
    description: 'La méthode scolastique et l\'influence de Saint Thomas',
    category: 'saint-thomas',
    level: 3,
    questions: sampleQuestions.filter(q => q.category === 'saint-thomas' && (q.id === '92' || q.id === '93' || q.id === '94' || q.id === '95')),
    passingScore: 75,
    timeLimit: 20
  }
];

export const categoryNames: Record<string, string> = {
  'dogmes': 'Dogmes de la Foi',
  'sacrements': 'Sacrements',
  'liturgie': 'Liturgie',
  'saintes-ecritures': 'Saintes Écritures',
  'morale': 'Morale Catholique',
  'histoire-eglise': 'Histoire de l\'Église',
  'saints': 'Saints et Saintes',
  'prieres': 'Prières',
  'prieres-latin': 'Prières en Latin',
  'saint-thomas': 'Saint Thomas d\'Aquin'
};

export const categoryIcons: Record<string, string> = {
  'dogmes': 'church',
  'sacrements': 'water-drop',
  'liturgie': 'local-fire-department',
  'saintes-ecritures': 'menu-book',
  'morale': 'favorite',
  'histoire-eglise': 'account-balance',
  'saints': 'person',
  'prieres': 'pan-tool',
  'prieres-latin': 'translate',
  'saint-thomas': 'school'
};

// Utility function to filter quizzes based on user level and admin status
export function getAvailableQuizzes(userLevel: number, isAdmin: boolean = false): Quiz[] {
  if (isAdmin) {
    // Admin users can see all quizzes
    return sampleQuizzes;
  }
  
  // Regular users can only see quizzes for their level and below
  return sampleQuizzes.filter(quiz => quiz.level <= userLevel);
}

// Utility function to filter quizzes by category with admin support
export function getQuizzesByCategory(category: string, userLevel: number, isAdmin: boolean = false): Quiz[] {
  const availableQuizzes = getAvailableQuizzes(userLevel, isAdmin);
  return availableQuizzes.filter(quiz => quiz.category === category);
}

// Utility function to filter quizzes by level with admin support
export function getQuizzesByCourse(level: number, userLevel: number, isAdmin: boolean = false): Quiz[] {
  const availableQuizzes = getAvailableQuizzes(userLevel, isAdmin);
  return availableQuizzes.filter(quiz => quiz.level === level);
} 