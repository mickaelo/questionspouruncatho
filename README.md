# Question pour un Catho - Application de Quiz Théologique

Une application mobile moderne pour se former à la théologie catholique à travers des quiz interactifs, des récompenses et un système de progression.

## 🎯 Fonctionnalités

### Quiz Interactifs
- **Questions variées** : Dogmes, sacrements, liturgie, Saintes Écritures, morale, histoire de l'Église, saints et prières
- **Système de difficulté** : Questions faciles, moyennes et difficiles
- **Explications détaillées** : Chaque question inclut une explication et des références bibliques/catéchétiques
- **Timer optionnel** : Quiz chronométrés pour plus de défi

### Système de Récompenses
- **Points** : Gagnez des points en fonction de la difficulté et de la précision
- **Badges** : Débloquez des badges en fonction de vos performances
- **Niveaux** : Progressez à travers différents niveaux de maîtrise
- **Séries** : Suivez vos jours consécutifs d'utilisation

### Interface Utilisateur
- **Design moderne** : Interface intuitive et responsive
- **Mode sombre/clair** : Support automatique des thèmes
- **Navigation fluide** : Navigation par onglets et écrans dédiés
- **Animations** : Retour haptique et animations pour une meilleure expérience

## 📱 Écrans Principaux

### Accueil
- Vue d'ensemble de la progression
- Quiz recommandés
- Défi du jour
- Statistiques rapides

### Catégories
- Navigation par domaines théologiques
- Quiz populaires
- Statistiques par catégorie

### Quiz
- Interface de jeu immersive
- Barre de progression
- Timer en temps réel
- Feedback immédiat

### Progression
- Statistiques détaillées
- Badges obtenus
- Historique d'activité
- Graphiques de progression

### Profil
- Informations utilisateur
- Paramètres de notification
- Préférences d'accessibilité

## 🛠️ Technologies Utilisées

- **React Native** avec Expo
- **TypeScript** pour la sécurité des types
- **Expo Router** pour la navigation
- **React Hooks** pour la gestion d'état
- **StyleSheet** pour le styling

## 🚀 Installation et Démarrage

1. **Cloner le projet**
   ```bash
   git clone [url-du-repo]
   cd questionpouruncatho2
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Démarrer l'application**
   ```bash
   npm start
   # ou
   yarn start
   ```

4. **Ouvrir sur votre appareil**
   - Scannez le QR code avec l'app Expo Go (iOS/Android)
   - Ou appuyez sur `w` pour ouvrir dans le navigateur

## 📊 Structure des Données

### Questions
```typescript
interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: 'facile' | 'moyen' | 'difficile';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  scripture?: string;
  catechism?: string;
}
```

### Quiz
```typescript
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: QuestionCategory;
  questions: Question[];
  timeLimit?: number;
  passingScore: number;
}
```

## 🎨 Personnalisation

### Ajouter de Nouvelles Questions
1. Modifiez le fichier `data/questions.ts`
2. Ajoutez vos questions dans le tableau `sampleQuestions`
3. Créez de nouveaux quiz dans `sampleQuizzes`

### Modifier les Catégories
1. Mettez à jour `QuestionCategory` dans `types/quiz.ts`
2. Ajoutez les noms et icônes dans `data/questions.ts`

### Personnaliser l'Interface
1. Modifiez les couleurs dans `constants/Colors.ts`
2. Ajustez les styles dans les composants
3. Personnalisez les icônes avec `IconSymbol`

## 📈 Fonctionnalités Futures

- [ ] Synchronisation cloud des scores
- [ ] Mode multijoueur
- [ ] Quiz personnalisés
- [ ] Notifications de rappel
- [ ] Mode hors ligne
- [ ] Export des résultats
- [ ] Intégration avec des ressources théologiques

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche pour votre fonctionnalité
3. Committez vos changements
4. Poussez vers la branche
5. Ouvrez une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🙏 Remerciements

- L'Église catholique pour son enseignement
- La communauté React Native
- Les contributeurs open source

---

**Développé avec ❤️ pour la formation théologique catholique**
