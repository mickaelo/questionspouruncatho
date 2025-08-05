# Interface d'Administration

## Vue d'ensemble

L'interface d'administration permet de gérer les questions et quiz de l'application "Questions pour un catho". Elle offre une interface complète pour créer, modifier, supprimer et importer des données dans Firebase.

## Accès

### Conditions d'accès
- L'utilisateur doit être connecté
- Le type de l'utilisateur doit contenir "admin" (ex: user.type = "admin")

### Navigation
- **Web** : Onglet "Administration" dans la barre de navigation verticale (visible uniquement pour les admins)
- **URL directe** : `/admin`

## Fonctionnalités

### 1. Tableau de bord
- **Statistiques** : Affichage du nombre total de questions et quiz
- **Actions rapides** :
  - Import des données existantes
  - Suppression de toutes les données (avec confirmation)

### 2. Gestion des Questions
- **Liste** : Affichage de toutes les questions avec leurs métadonnées
- **Actions** :
  - Édition (bouton crayon)
  - Suppression (bouton poubelle avec confirmation)
- **Informations affichées** :
  - Texte de la question
  - Catégorie
  - Difficulté
  - Points

### 3. Gestion des Quiz
- **Liste** : Affichage de tous les quiz avec leurs détails
- **Actions** :
  - Édition (bouton crayon)
  - Suppression (bouton poubelle avec confirmation)
- **Informations affichées** :
  - Titre
  - Description
  - Catégorie
  - Niveau
  - Nombre de questions

### 4. Import de Données
- **Données disponibles** : Affichage du nombre de questions et quiz prêts à l'import
- **Bouton d'import** : Import en masse de toutes les données existantes

### 5. Statistiques
- **Questions par catégorie** : Répartition des questions selon leur catégorie
- **Questions par difficulté** : Répartition selon le niveau de difficulté
- **Quiz par niveau** : Répartition des quiz selon le niveau requis

## Architecture Technique

### Services
- **`quizAdminService.ts`** : Service principal pour les opérations CRUD
- **`useQuizAdmin.ts`** : Hook React pour la gestion d'état

### Collections Firebase
- **`questions`** : Stockage des questions
- **`quizzes`** : Stockage des quiz

### Structure des données

#### Question
```typescript
interface Question {
  id: string;
  category: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  level: number;
  question: string;
  questionType: 'multiple-choice' | 'true-false' | 'image-recognition' | 'quote-completion';
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  scripture?: string;
  catechism?: string;
  imageUrl?: string;
  quote?: string;
  partialQuote?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

#### Quiz
```typescript
interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  level: number;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
  prerequisites?: string[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## Scripts de Migration

### Installation des dépendances
```bash
npm install
```

### Scripts disponibles
```bash
# Afficher les statistiques des données locales
npm run db-stats

# Populer la base de données avec les données existantes
npm run populate-db

# Vider la base de données (non implémenté pour la sécurité)
npm run clear-db
```

### Utilisation manuelle
```bash
# Afficher l'aide
npx tsx scripts/populate-database.ts

# Populer la base de données
npx tsx scripts/populate-database.ts populate

# Afficher les statistiques
npx tsx scripts/populate-database.ts stats
```

## Sécurité

### Contrôles d'accès
- Vérification de l'authentification
- Vérification du rôle admin (type utilisateur contenant "admin")
- Protection des routes sensibles

### Opérations critiques
- **Suppression** : Confirmation obligatoire pour toutes les suppressions
- **Import en masse** : Confirmation avant import
- **Suppression globale** : Double confirmation pour les opérations destructives

## Utilisation

### Première utilisation
1. **Créer un compte admin** : Utiliser un type utilisateur contenant "admin"
2. **Se connecter** : Utiliser les identifiants admin
3. **Accéder à l'interface** : Cliquer sur l'onglet "Administration"
4. **Importer les données** : Utiliser le bouton "Importer les données" dans le tableau de bord

### Gestion quotidienne
1. **Vérifier les statistiques** : Onglet "Statistiques"
2. **Gérer les questions** : Onglet "Questions"
3. **Gérer les quiz** : Onglet "Quiz"
4. **Ajouter de nouvelles données** : Utiliser les boutons d'édition

### Bonnes pratiques
- **Sauvegarde** : Toujours faire une sauvegarde avant les opérations critiques
- **Test** : Tester les nouvelles questions/quiz avant publication
- **Validation** : Vérifier la cohérence des données après import
- **Documentation** : Documenter les changements importants

## Dépannage

### Problèmes courants
1. **Accès refusé** : Vérifier que le type utilisateur contient "admin"
2. **Erreur d'import** : Vérifier la connexion Firebase
3. **Données manquantes** : Vérifier les permissions Firestore

### Logs
- Les erreurs sont affichées dans l'interface
- Les opérations sont loggées dans la console Firebase
- Les statistiques sont mises à jour en temps réel

## Évolutions futures

### Fonctionnalités prévues
- [ ] Éditeur de questions en ligne
- [ ] Éditeur de quiz en ligne
- [ ] Gestion des images et médias
- [ ] Export des données
- [ ] Gestion des utilisateurs
- [ ] Système de permissions avancé
- [ ] Historique des modifications
- [ ] Sauvegarde automatique

### Améliorations techniques
- [ ] Optimisation des requêtes
- [ ] Cache local
- [ ] Synchronisation en temps réel
- [ ] Interface responsive mobile
- [ ] Tests automatisés 