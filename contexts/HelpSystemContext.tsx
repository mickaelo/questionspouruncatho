import { ContextualTip, useContextualHelp } from '@/components/ui/ContextualHelp';
import { Hint, useHint } from '@/components/ui/Hint';
import { HUDMessage, HUDMessageConfig, useHUDMessages } from '@/components/ui/HUDMessage';
import { OverlayMessage, OverlayMessageConfig } from '@/components/ui/OverlayMessage';
import { TutorialPopup, TutorialStep } from '@/components/ui/TutorialPopup';
import React, { createContext, useCallback, useContext, useState } from 'react';

// Types pour le contexte
interface HelpSystemContextType {
  // Hints
  showHint: (message: string, options?: {
    type?: 'info' | 'tip' | 'warning' | 'success';
    autoHide?: boolean;
    autoHideDelay?: number;
    position?: 'top' | 'bottom' | 'center';
  }) => string;
  hideHint: (id: string) => void;
  hideAllHints: () => void;

  // Tutorial
  startTutorial: (steps: TutorialStep[]) => void;
  skipTutorial: () => void;
  isTutorialActive: boolean;

  // Contextual Help
  updateUserContext: (updates: any) => void;
  incrementErrors: () => void;
  incrementSuccess: () => void;
  incrementAttempts: () => void;
  resetContext: () => void;

  // Overlay Messages
  showOverlay: (config: Omit<OverlayMessageConfig, 'id'>) => string;
  hideOverlay: (id: string) => void;

  // HUD Messages
  showHUDMessage: (config: Omit<HUDMessageConfig, 'id'>) => string;
  showPoints: (points: number, position?: HUDMessageConfig['position']) => string;
  showAchievement: (title: string, position?: HUDMessageConfig['position']) => string;
  showStreak: (streak: number, position?: HUDMessageConfig['position']) => string;
  clearAllHUDMessages: () => void;

  // Tooltips (gérés individuellement par chaque composant)
  // Méthodes utilitaires
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const HelpSystemContext = createContext<HelpSystemContextType | undefined>(undefined);

// Configuration par défaut des tips contextuels
const defaultContextualTips: ContextualTip[] = [
  {
    id: 'idle-help',
    message: 'Besoin d\'aide ? Appuyez sur une réponse pour continuer le quiz.',
    trigger: 'idle',
    conditions: { minIdleTime: 30000 }, // 30 secondes
    priority: 'medium',
    autoHide: true,
    autoHideDelay: 5000,
  },
  {
    id: 'stuck-help',
    message: 'Vous semblez avoir des difficultés. Essayez de lire attentivement la question.',
    trigger: 'stuck',
    conditions: { maxAttempts: 3 },
    priority: 'high',
    autoHide: true,
    autoHideDelay: 6000,
    action: {
      text: 'Voir l\'explication',
      onPress: () => {
        // Logique pour afficher l'explication
        console.log('Affichage de l\'explication');
      }
    }
  },
  {
    id: 'error-help',
    message: 'Plusieurs erreurs consécutives. Prenez votre temps pour réfléchir avant de répondre.',
    trigger: 'error',
    conditions: { errorCount: 2 },
    priority: 'high',
    autoHide: true,
    autoHideDelay: 7000,
  },
  {
    id: 'success-encouragement',
    message: 'Excellente série ! Vous maîtrisez bien ce sujet. Continuez ainsi !',
    trigger: 'success',
    conditions: { successStreak: 3 },
    priority: 'low',
    autoHide: true,
    autoHideDelay: 4000,
  },
];

interface HelpSystemProviderProps {
  children: React.ReactNode;
  customContextualTips?: ContextualTip[];
  enableContextualHelp?: boolean;
  tutorialSteps?: TutorialStep[];
  autoStartTutorial?: boolean;
}

export function HelpSystemProvider({
  children,
  customContextualTips = [],
  enableContextualHelp = true,
  tutorialSteps = [],
  autoStartTutorial = false
}: HelpSystemProviderProps) {
  // States pour les différents systèmes
  const [tutorialActive, setTutorialActive] = useState(autoStartTutorial);
  const [currentTutorialSteps, setCurrentTutorialSteps] = useState(tutorialSteps);
  const [overlayMessages, setOverlayMessages] = useState<Array<OverlayMessageConfig & { visible: boolean }>>([]);

  // Hooks pour les systèmes individuels
  const hintSystem = useHint();
  const contextualSystem = useContextualHelp();
  const hudSystem = useHUDMessages();

  // Combiner les tips par défaut avec les personnalisées
  const allContextualTips = [...defaultContextualTips, ...customContextualTips];

  // Tutorial functions
  const startTutorial = useCallback((steps: TutorialStep[]) => {
    setCurrentTutorialSteps(steps);
    setTutorialActive(true);
  }, []);

  const skipTutorial = useCallback(() => {
    setTutorialActive(false);
  }, []);

  const completeTutorial = useCallback(() => {
    setTutorialActive(false);
    // Optionnel: marquer le tutorial comme complété dans le stockage local
  }, []);

  // Overlay functions
  const showOverlay = useCallback((config: Omit<OverlayMessageConfig, 'id'>) => {
    const id = Date.now().toString();
    const newOverlay = {
      ...config,
      id,
      visible: true,
    };

    setOverlayMessages(prev => [...prev, newOverlay]);
    return id;
  }, []);

  const hideOverlay = useCallback((id: string) => {
    setOverlayMessages(prev => 
      prev.map(overlay => 
        overlay.id === id ? { ...overlay, visible: false } : overlay
      )
    );

    // Supprimer après l'animation
    setTimeout(() => {
      setOverlayMessages(prev => prev.filter(overlay => overlay.id !== id));
    }, 300);
  }, []);

  // Méthodes utilitaires pour les messages communs
  const showSuccess = useCallback((message: string, title?: string) => {
    showOverlay({
      type: 'success',
      title: title || 'Succès',
      message,
      duration: 3000,
      position: 'center',
      backdrop: false,
      dismissible: true,
      animation: 'bounce',
    });
  }, [showOverlay]);

  const showError = useCallback((message: string, title?: string) => {
    showOverlay({
      type: 'error',
      title: title || 'Erreur',
      message,
      duration: 4000,
      position: 'center',
      backdrop: true,
      backdropOpacity: 0.3,
      dismissible: true,
      animation: 'scale',
    });
  }, [showOverlay]);

  const showWarning = useCallback((message: string, title?: string) => {
    showOverlay({
      type: 'warning',
      title: title || 'Attention',
      message,
      duration: 3500,
      position: 'center',
      backdrop: false,
      dismissible: true,
      animation: 'slide',
    });
  }, [showOverlay]);

  const showInfo = useCallback((message: string, title?: string) => {
    showOverlay({
      type: 'info',
      title: title || 'Information',
      message,
      duration: 3000,
      position: 'center',
      backdrop: false,
      dismissible: true,
      animation: 'fade',
    });
  }, [showOverlay]);

  // Valeur du contexte
  const contextValue: HelpSystemContextType = {
    // Hints
    showHint: hintSystem.showHint,
    hideHint: hintSystem.hideHint,
    hideAllHints: hintSystem.hideAllHints,

    // Tutorial
    startTutorial,
    skipTutorial,
    isTutorialActive: tutorialActive,

    // Contextual Help
    updateUserContext: contextualSystem.updateContext,
    incrementErrors: contextualSystem.incrementErrors,
    incrementSuccess: contextualSystem.incrementSuccess,
    incrementAttempts: contextualSystem.incrementAttempts,
    resetContext: contextualSystem.resetContext,

    // Overlay Messages
    showOverlay,
    hideOverlay,

    // HUD Messages
    showHUDMessage: hudSystem.showMessage,
    showPoints: hudSystem.showPoints,
    showAchievement: hudSystem.showAchievement,
    showStreak: hudSystem.showStreak,
    clearAllHUDMessages: hudSystem.clearAllMessages,

    // Méthodes utilitaires
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <HelpSystemContext.Provider value={contextValue}>
      {children}

      {/* Rendu des Hints */}
      {hintSystem.hints.map(hint => (
        <Hint
          key={hint.id}
          message={hint.message}
          type={hint.type}
          visible={true}
          autoHide={hint.autoHide}
          autoHideDelay={hint.autoHideDelay}
          position={hint.position}
          onDismiss={() => hintSystem.hideHint(hint.id)}
        />
      ))}

      {/* Tutorial Popup */}
      {tutorialActive && currentTutorialSteps.length > 0 && (
        <TutorialPopup
          steps={currentTutorialSteps}
          visible={tutorialActive}
          onComplete={completeTutorial}
          onSkip={skipTutorial}
          allowSkip={true}
        />
      )}

      {/* Contextual Help */}
      {/* {enableContextualHelp && (
        <ContextualHelp
          tips={allContextualTips}
          userContext={contextualSystem.userContext}
          onTipShown={(tip) => console.log('Tip shown:', tip.id)}
          onTipDismissed={(tip) => console.log('Tip dismissed:', tip.id)}
        />
      )} */}

      {/* Overlay Messages */}
      {overlayMessages.map(overlay => (
        <OverlayMessage
          key={overlay.id}
          config={overlay}
          visible={overlay.visible}
          onDismiss={() => hideOverlay(overlay.id)}
        />
      ))}

      {/* HUD Messages */}
      {hudSystem.messages.map(message => (
        <HUDMessage
          key={message.id}
          config={message}
          visible={message.visible}
          onComplete={() => hudSystem.removeMessage(message.id)}
        />
      ))}
    </HelpSystemContext.Provider>
  );
}

// Hook pour utiliser le contexte
export function useHelpSystem() {
  const context = useContext(HelpSystemContext);
  if (context === undefined) {
    throw new Error('useHelpSystem must be used within a HelpSystemProvider');
  }
  return context;
}

// Hook spécialisé pour les quiz
export function useQuizHelp() {
  const helpSystem = useHelpSystem();

  const onCorrectAnswer = useCallback((points: number) => {
    helpSystem.incrementSuccess();
    helpSystem.showPoints(points);
  }, [helpSystem]);

  const onIncorrectAnswer = useCallback(() => {
    helpSystem.incrementErrors();
    helpSystem.incrementAttempts();
  }, [helpSystem]);

  const onQuizComplete = useCallback((score: number, totalQuestions: number) => {
    const percentage = (score / totalQuestions) * 100;
    
    if (percentage >= 90) {
      helpSystem.showAchievement('Quiz parfait !');
    } else if (percentage >= 70) {
      helpSystem.showAchievement('Bon travail !');
    }

    helpSystem.resetContext();
  }, [helpSystem]);

  return {
    ...helpSystem,
    onCorrectAnswer,
    onIncorrectAnswer,
    onQuizComplete,
  };
}
