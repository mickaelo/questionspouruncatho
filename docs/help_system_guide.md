# 🎮 Guide du Système d'Aide - Mécaniques de Jeu

Un système complet d'aide et de tooltips inspiré des mécaniques de jeux vidéo pour améliorer l'expérience utilisateur.

## 📋 Vue d'ensemble

Le système d'aide comprend 6 types de composants principaux :

### 1. 🔍 **Tooltip** - Info au survol
Petite bulle d'information qui apparaît au survol ou à l'interaction.

```tsx
import { Tooltip } from '@/components/ui';

<Tooltip 
  content="Restaure 50 points de vie"
  position="top"
  trigger="hover" // ou "press"
>
  <IconButton icon="health-potion" />
</Tooltip>
```

**Options :**
- `position`: 'top' | 'bottom' | 'left' | 'right' | 'auto'
- `trigger`: 'hover' | 'press' | 'focus'
- `delay`: Délai avant apparition (ms)
- `maxWidth`: Largeur maximale

### 2. 💡 **Hint** - Indices contextuels
Messages d'aide qui donnent des conseils ou pistes.

```tsx
import { useHelpSystem } from '@/components/ui';

const { showHint } = useHelpSystem();

// Afficher un indice
showHint("Essayez d'esquiver les attaques pour économiser vos potions", {
  type: 'tip',
  autoHide: true,
  autoHideDelay: 4000,
  position: 'bottom'
});
```

**Types :**
- `info`: Information générale (bleu)
- `tip`: Conseil utile (bleu clair)
- `warning`: Avertissement (orange)
- `success`: Succès (vert)

### 3. 📚 **Tutorial Popup** - Tutoriels interactifs
Séquences de tutorial pour les nouveaux utilisateurs.

```tsx
import { useHelpSystem, TutorialStep } from '@/components/ui';

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenue !',
    description: 'Découvrez comment utiliser l\'application.',
    position: 'center',
    action: 'none',
  },
  {
    id: 'quiz-selection',
    title: 'Choisir un quiz',
    description: 'Sélectionnez un quiz qui vous intéresse.',
    position: 'top',
    action: 'tap',
    actionDescription: 'Appuyez sur un quiz pour commencer',
  }
];

const { startTutorial } = useHelpSystem();
startTutorial(tutorialSteps);
```

### 4. 🤖 **Contextual Help** - Aide automatique
Aide déclenchée automatiquement selon le comportement de l'utilisateur.

```tsx
// Configuration automatique via le contexte
const contextualTips: ContextualTip[] = [
  {
    id: 'idle-help',
    message: 'Besoin d\'aide ? Appuyez sur une réponse pour continuer.',
    trigger: 'idle',
    conditions: { minIdleTime: 30000 }, // 30 secondes
    priority: 'medium',
    autoHide: true,
  },
  {
    id: 'stuck-help',
    message: 'Vous semblez avoir des difficultés. Essayez de relire la question.',
    trigger: 'stuck',
    conditions: { maxAttempts: 3 },
    priority: 'high',
    action: {
      text: 'Voir l\'explication',
      onPress: () => showExplanation()
    }
  }
];
```

**Triggers disponibles :**
- `idle`: Inactivité prolongée
- `stuck`: Trop de tentatives
- `error`: Erreurs répétées
- `success`: Série de succès
- `manual`: Déclenchement manuel

### 5. 🖼️ **Overlay Message** - Messages semi-transparents
Messages qui apparaissent par-dessus l'écran avec backdrop.

```tsx
const { showSuccess, showError, showWarning, showInfo } = useHelpSystem();

// Messages pré-configurés
showSuccess('Quiz terminé avec succès !');
showError('Erreur de connexion réseau');
showWarning('Il vous reste 2 tentatives');
showInfo('Nouvelle fonctionnalité disponible');

// Message personnalisé
showOverlay({
  type: 'achievement',
  title: 'Nouveau niveau !',
  message: 'Vous avez atteint le niveau 5 en Théologie',
  duration: 4000,
  position: 'center',
  backdrop: true,
  animation: 'bounce',
  actions: [
    {
      text: 'Continuer',
      onPress: () => console.log('Continue'),
      style: 'primary'
    }
  ]
});
```

### 6. 📍 **HUD Message** - Messages intégrés
Messages courts intégrés dans l'interface (comme dans les jeux).

```tsx
const { showPoints, showAchievement, showStreak, showHUDMessage } = useHelpSystem();

// Messages pré-configurés
showPoints(150, 'top-right');           // +150 pts
showAchievement('Expert !', 'center-top'); // Trophy avec titre
showStreak(5, 'top-left');              // Série de 5 !

// Message personnalisé
showHUDMessage({
  message: 'Nouvelle compétence débloquée',
  type: 'achievement',
  position: 'bottom-right',
  style: 'expanded',
  animation: 'pulse',
  duration: 3000
});
```

**Positions HUD :**
- `top-left`, `top-right`
- `bottom-left`, `bottom-right` 
- `center-top`, `center-bottom`

## 🎯 Intégration dans l'Application

### 1. Configuration du Provider

```tsx
// app/_layout.tsx
import { HelpSystemProvider } from '@/contexts/HelpSystemContext';

export default function RootLayout() {
  return (
    <HelpSystemProvider 
      enableContextualHelp={true}
      autoStartTutorial={false}
    >
      {/* Votre app */}
    </HelpSystemProvider>
  );
}
```

### 2. Utilisation dans les Quiz

```tsx
import { useQuizHelp } from '@/components/ui';

function QuizScreen() {
  const { onCorrectAnswer, onIncorrectAnswer, onQuizComplete } = useQuizHelp();
  
  const handleAnswer = (isCorrect: boolean, points: number) => {
    if (isCorrect) {
      onCorrectAnswer(points); // Affiche automatiquement les points
    } else {
      onIncorrectAnswer(); // Déclenche l'aide contextuelle si nécessaire
    }
  };
  
  const handleQuizEnd = (score: number, total: number) => {
    onQuizComplete(score, total); // Affiche les achievements automatiquement
  };
}
```

### 3. Ajout de Tooltips aux éléments UI

```tsx
import { Tooltip } from '@/components/ui';

function MenuButton() {
  return (
    <Tooltip content="Accédez à vos statistiques et paramètres">
      <TouchableOpacity onPress={openProfile}>
        <Icon name="person" />
      </TouchableOpacity>
    </Tooltip>
  );
}
```

## 🎨 Personnalisation

### Thèmes et Couleurs
Les composants s'adaptent automatiquement au thème clair/sombre via `useColorScheme()`.

### Animations
Chaque composant propose plusieurs types d'animations :
- `fade`: Apparition en fondu
- `slide`: Glissement depuis un bord
- `scale`: Zoom avant/arrière
- `bounce`: Effet rebond
- `pulse`: Pulsation

### Positions
Système de positionnement intelligent avec détection automatique des bords d'écran.

## 📱 Compatibilité

- ✅ **iOS** : Support complet avec gestes natifs
- ✅ **Android** : Support complet avec Material Design
- ✅ **Web** : Support hover + interactions tactiles
- ✅ **Responsive** : Adaptation automatique aux tailles d'écran

## 🔧 API Complète

### Hook Principal
```tsx
const helpSystem = useHelpSystem();
// Toutes les méthodes disponibles :
// - showHint, hideHint, hideAllHints
// - startTutorial, skipTutorial
// - showOverlay, hideOverlay  
// - showHUDMessage, showPoints, showAchievement, showStreak
// - showSuccess, showError, showWarning, showInfo
// - updateUserContext, incrementErrors, incrementSuccess
```

### Hook Quiz Spécialisé
```tsx
const quizHelp = useQuizHelp();
// Méthodes spécialisées pour les quiz :
// - onCorrectAnswer(points)
// - onIncorrectAnswer()
// - onQuizComplete(score, total)
// + toutes les méthodes du hook principal
```

## 🎮 Philosophie des Mécaniques de Jeu

Ce système s'inspire des meilleures pratiques des jeux vidéo :

1. **Feedback immédiat** : Points, achievements visibles instantanément
2. **Aide progressive** : L'aide apparaît quand l'utilisateur en a besoin
3. **Gamification** : Streaks, points, niveaux pour maintenir l'engagement
4. **Non-intrusif** : Les messages n'interrompent pas l'expérience
5. **Contextuel** : L'aide s'adapte à la situation de l'utilisateur

Cela crée une expérience utilisateur fluide et engageante qui guide naturellement l'utilisateur sans être intrusive.
