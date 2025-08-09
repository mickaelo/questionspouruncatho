import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Tooltip } from '@/components/ui/Tooltip';
import { TutorialStep } from '@/components/ui/TutorialPopup';
import { Colors } from '@/constants/Colors';
import { useHelpSystem, useQuizHelp } from '@/contexts/HelpSystemContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, View } from 'react-native';

// Exemples d'étapes de tutorial
const sampleTutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Bienvenue !',
    description: 'Découvrez comment utiliser notre application de quiz religieux.',
    position: 'center',
    action: 'none',
  },
  {
    id: 'quiz-selection',
    title: 'Choisir un quiz',
    description: 'Parcourez les différentes catégories et sélectionnez un quiz qui vous intéresse.',
    position: 'top',
    action: 'tap',
    actionDescription: 'Appuyez sur un quiz pour commencer',
  },
  {
    id: 'answering',
    title: 'Répondre aux questions',
    description: 'Lisez attentivement chaque question et sélectionnez la meilleure réponse.',
    position: 'center',
    action: 'tap',
    actionDescription: 'Appuyez sur votre réponse',
  },
  {
    id: 'progress',
    title: 'Suivre vos progrès',
    description: 'Gagnez des points et débloquez de nouveaux niveaux en répondant correctement.',
    position: 'bottom',
    action: 'none',
  },
];

export function HelpSystemExamples() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const helpSystem = useHelpSystem();
  const quizHelp = useQuizHelp();
  
  const [demoScore, setDemoScore] = useState(0);
  const [demoErrors, setDemoErrors] = useState(0);

  const handleStartTutorial = () => {
    helpSystem.startTutorial(sampleTutorialSteps);
  };

  const handleShowTooltipExample = () => {
    Alert.alert('Tooltip', 'Les tooltips apparaissent au survol ou à l\'interaction !');
  };

  const handleShowHint = () => {
    helpSystem.showHint(
      'Voici un indice utile pour vous aider à progresser dans vos quiz !',
      {
        type: 'tip',
        autoHide: true,
        autoHideDelay: 4000,
        position: 'bottom'
      }
    );
  };

  const handleCorrectAnswer = () => {
    const points = Math.floor(Math.random() * 20) + 10;
    setDemoScore(prev => prev + points);
    quizHelp.onCorrectAnswer(points);
  };

  const handleIncorrectAnswer = () => {
    setDemoErrors(prev => prev + 1);
    quizHelp.onIncorrectAnswer();
  };

  const handleShowAchievement = () => {
    helpSystem.showAchievement('Expert en Théologie !', 'center-top');
  };

  const handleShowStreak = () => {
    const streak = Math.floor(Math.random() * 10) + 3;
    helpSystem.showStreak(streak, 'top-left');
  };

  const demoButtons = [
    {
      title: 'Démarrer le Tutorial',
      description: 'Lancer une séquence de tutorial interactive',
      onPress: handleStartTutorial,
      icon: 'school-outline' as keyof typeof Ionicons.glyphMap,
      color: colors.tint,
    },
    {
      title: 'Afficher un Hint',
      description: 'Montrer un indice contextuel',
      onPress: handleShowHint,
      icon: 'bulb-outline' as keyof typeof Ionicons.glyphMap,
      color: '#2196F3',
    },
    {
      title: 'Message de Succès',
      description: 'Afficher un overlay de succès',
      onPress: () => helpSystem.showSuccess('Félicitations ! Vous avez réussi le quiz.'),
      icon: 'checkmark-circle-outline' as keyof typeof Ionicons.glyphMap,
      color: '#4CAF50',
    },
    {
      title: 'Message d\'Erreur',
      description: 'Afficher un overlay d\'erreur',
      onPress: () => helpSystem.showError('Une erreur est survenue lors du chargement du quiz.'),
      icon: 'close-circle-outline' as keyof typeof Ionicons.glyphMap,
      color: '#F44336',
    },
    {
      title: 'Message d\'Avertissement',
      description: 'Afficher un avertissement',
      onPress: () => helpSystem.showWarning('Attention : Il vous reste seulement 2 tentatives.'),
      icon: 'warning-outline' as keyof typeof Ionicons.glyphMap,
      color: '#FF9800',
    },
    {
      title: 'Réponse Correcte (Démo)',
      description: 'Simuler une bonne réponse avec points',
      onPress: handleCorrectAnswer,
      icon: 'star-outline' as keyof typeof Ionicons.glyphMap,
      color: '#FFD700',
    },
    {
      title: 'Réponse Incorrecte (Démo)',
      description: 'Simuler une mauvaise réponse',
      onPress: handleIncorrectAnswer,
      icon: 'close-outline' as keyof typeof Ionicons.glyphMap,
      color: '#F44336',
    },
    {
      title: 'Afficher Achievement',
      description: 'Montrer un succès/accomplissement',
      onPress: handleShowAchievement,
      icon: 'trophy-outline' as keyof typeof Ionicons.glyphMap,
      color: '#9C27B0',
    },
    {
      title: 'Afficher Streak',
      description: 'Montrer une série de succès',
      onPress: handleShowStreak,
      icon: 'flame-outline' as keyof typeof Ionicons.glyphMap,
      color: '#FF5722',
    },
  ];

  return (
    <ThemedView style={{ flex: 1, padding: 16 }}>
      <ThemedText style={{
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        textAlign: 'center',
        color: colors.text,
      }}>
        Système d'Aide - Démos
      </ThemedText>

      <ThemedText style={{
        fontSize: 16,
        marginBottom: 24,
        textAlign: 'center',
        color: colors.text,
        opacity: 0.7,
      }}>
        Testez tous les composants d'aide et de tooltips
      </ThemedText>

      {/* Stats de démo */}
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 24,
        padding: 16,
        backgroundColor: colors.card,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
      }}>
        <View style={{ alignItems: 'center' }}>
          <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: colors.tint }}>
            {demoScore}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>Points</ThemedText>
        </View>
        <View style={{ alignItems: 'center' }}>
          <ThemedText style={{ fontSize: 24, fontWeight: 'bold', color: '#F44336' }}>
            {demoErrors}
          </ThemedText>
          <ThemedText style={{ fontSize: 12, opacity: 0.7 }}>Erreurs</ThemedText>
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        {/* Exemple de Tooltip */}
        <View style={{ marginBottom: 20 }}>
          <ThemedText style={{
            fontSize: 18,
            fontWeight: '600',
            marginBottom: 12,
            color: colors.text,
          }}>
            Exemple de Tooltip
          </ThemedText>
          
          <Tooltip
            content="Ceci est un tooltip informatif ! Il apparaît au survol ou à l'interaction."
            position="top"
            trigger="press"
          >
            <Pressable
              onPress={handleShowTooltipExample}
              style={{
                backgroundColor: colors.tint,
                padding: 12,
                borderRadius: 8,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="information-circle-outline" size={20} color="#fff" style={{ marginRight: 8 }} />
              <ThemedText style={{ color: '#fff', fontWeight: '600' }}>
                Survolez ou appuyez pour voir le tooltip
              </ThemedText>
            </Pressable>
          </Tooltip>
        </View>

        {/* Boutons de démonstration */}
        <ThemedText style={{
          fontSize: 18,
          fontWeight: '600',
          marginBottom: 12,
          color: colors.text,
        }}>
          Démonstrations
        </ThemedText>

        {demoButtons.map((button, index) => (
          <Tooltip
            key={index}
            content={button.description}
            position="auto"
            trigger="press"
            delay={1000}
          >
            <Pressable
              onPress={button.onPress}
              style={{
                backgroundColor: colors.card,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: 12,
                padding: 16,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <View style={{
                width: 40,
                height: 40,
                borderRadius: 20,
                backgroundColor: button.color + '20',
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 16,
              }}>
                <Ionicons
                  name={button.icon}
                  size={20}
                  color={button.color}
                />
              </View>
              
              <View style={{ flex: 1 }}>
                <ThemedText style={{
                  fontSize: 16,
                  fontWeight: '600',
                  marginBottom: 4,
                  color: colors.text,
                }}>
                  {button.title}
                </ThemedText>
                <ThemedText style={{
                  fontSize: 14,
                  color: colors.text,
                  opacity: 0.7,
                }}>
                  {button.description}
                </ThemedText>
              </View>

              <Ionicons
                name="chevron-forward"
                size={16}
                color={colors.text}
                style={{ opacity: 0.5 }}
              />
            </Pressable>
          </Tooltip>
        ))}

        {/* Reset button */}
        <Pressable
          onPress={() => {
            setDemoScore(0);
            setDemoErrors(0);
            helpSystem.resetContext();
            helpSystem.clearAllHUDMessages();
          }}
          style={{
            backgroundColor: colors.border,
            padding: 12,
            borderRadius: 8,
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 40,
          }}
        >
          <ThemedText style={{
            color: colors.text,
            fontWeight: '600',
          }}>
            Réinitialiser la démo
          </ThemedText>
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
}
