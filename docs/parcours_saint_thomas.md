# Parcours Saint Thomas d'Aquin - Somme Théologique

## 📚 Vue d'ensemble

Le parcours Saint Thomas d'Aquin est un module spécialisé de formation théologique basé sur l'œuvre majeure du Docteur Angélique : la **Somme théologique** (Summa Theologiae). Ce parcours s'adresse aux personnes souhaitant approfondir leur compréhension de la doctrine catholique à travers la pensée systématique de Saint Thomas d'Aquin.

## 🎯 Objectifs du parcours

- **Découvrir** la vie et l'œuvre de Saint Thomas d'Aquin
- **Comprendre** les 5 voies de l'existence de Dieu
- **Approfondir** les mystères de la Trinité et de l'Incarnation
- **Étudier** la doctrine des vertus cardinales et théologales
- **Explorer** la loi naturelle et la morale chrétienne
- **Analyser** la doctrine sacramentelle et la grâce
- **Réfléchir** sur la fin dernière de l'homme
- **Maîtriser** la méthode scolastique

## 📊 Structure du parcours

### Niveau 1 : Introduction (6 questions)
- **Quiz** : Introduction à Saint Thomas d'Aquin
- **Thèmes** : Vie du saint, ordre dominicain, œuvre principale
- **Difficulté** : Facile
- **Temps** : 15 minutes
- **Score de passage** : 70%

### Niveau 2 : Fondamentaux (11 questions)
- **Quiz disponibles** :
  - Dieu et son existence (3 questions)
  - L'Incarnation du Verbe (2 questions)
  - Les vertus selon Saint Thomas (3 questions)
  - Les sacrements (2 questions)
  - La fin dernière de l'homme (2 questions)
- **Difficulté** : Moyenne
- **Temps** : 15-20 minutes par quiz
- **Score de passage** : 75%

### Niveau 3 : Approfondissement (8 questions)
- **Quiz disponibles** :
  - La Trinité selon Saint Thomas (2 questions)
  - La loi et la morale (2 questions)
  - La grâce divine (2 questions)
  - La méthode thomiste (4 questions)
- **Difficulté** : Difficile
- **Temps** : 15-20 minutes par quiz
- **Score de passage** : 80%

## 🎓 Contenu détaillé

### 1. Introduction à Saint Thomas d'Aquin
- **Période historique** : XIIIe siècle (1225-1274)
- **Ordre religieux** : Dominicains (Ordre des Prêcheurs)
- **Œuvre principale** : La Somme théologique
- **Titre ecclésiastique** : Docteur de l'Église
- **Surnom** : Le Docteur Angélique
- **Devise** : "Contempler et transmettre"

### 2. Les 5 voies de l'existence de Dieu
1. **Le mouvement** : Tout ce qui se meut est mû par autre chose
2. **La cause efficiente** : Récursion des causes nécessite une cause première
3. **La contingence** : L'existence des êtres contingents nécessite un être nécessaire
4. **Les degrés de perfection** : L'existence de degrés implique un maximum
5. **La finalité** : L'ordre du monde implique une intelligence ordonnatrice

### 3. La Trinité
- **Distinction des personnes** : Par les relations d'origine
- **Le Père** : Distingué par la paternité
- **Le Fils** : Distingué par la filiation
- **Le Saint-Esprit** : Distingué par la spiration

### 4. L'Incarnation
- **Union hypostatique** : Union de la nature divine et humaine en une personne
- **Nécessité de l'Incarnation** : Pour sauver l'humanité du péché
- **Vrai Dieu et vrai homme** : Mystère de l'Incarnation

### 5. Les vertus
- **Vertus cardinales** (4) : Prudence, Justice, Force, Tempérance
- **Vertus théologales** (3) : Foi, Espérance, Charité
- **Prudence** : Vertu qui dirige les autres vertus cardinales

### 6. La loi et la morale
- **Types de loi** :
  - Loi éternelle (en Dieu)
  - Loi naturelle (inscrite dans les cœurs)
  - Loi humaine (promulguée par l'homme)
  - Loi divine (révélée)

### 7. Les sacrements
- **Nombre** : 7 sacrements
- **Transsubstantiation** : Conversion de la substance du pain en corps du Christ
- **Efficacité** : Ex opere operato

### 8. La grâce
- **Grâce sanctifiante** : Don permanent qui sanctifie l'âme
- **Grâce actuelle** : Secours temporaire pour agir
- **Participation divine** : La grâce rend participant de la nature divine

### 9. La fin dernière
- **Vision béatifique** : Voir Dieu face à face
- **Bonheur parfait** : Union avec Dieu
- **Souverain bien** : Dieu lui-même

### 10. La méthode scolastique
- **Structure** : Question, objections, réponse, réponses aux objections
- **Rigueur logique** : Démonstration rationnelle
- **Harmonie** : Foi et raison

## 🛠️ Utilisation technique

### Scripts de gestion

```bash
# Afficher les statistiques du parcours
npm run saint-thomas-stats

# Importer les données dans Firebase
npm run saint-thomas-populate

# Supprimer les données de Firebase
npm run saint-thomas-clear
```

### Structure des données

#### Questions
- **ID** : Préfixe `st-` (ex: `st-1`, `st-2`)
- **Catégorie** : `saint-thomas`
- **Niveaux** : 1 (facile), 2 (moyen), 3 (difficile)
- **Propriétés spéciales** :
  - `author` : "Saint Thomas d'Aquin"
  - `reference` : Référence à la Somme théologique

#### Quiz
- **ID** : Préfixe `st-` (ex: `st-intro`, `st-dieu`)
- **Structure** : Questions filtrées par thème
- **Progression** : Du niveau 1 au niveau 3

### Intégration dans l'application

Le parcours Saint Thomas d'Aquin est intégré comme **niveau 6** dans le système de formation, accessible après le niveau 3.

## 📈 Statistiques actuelles

- **Total des questions** : 25
- **Total des quiz** : 10
- **Répartition par niveau** :
  - Niveau 1 : 6 questions
  - Niveau 2 : 11 questions
  - Niveau 3 : 8 questions
- **Répartition par difficulté** :
  - Facile : 6 questions
  - Moyen : 11 questions
  - Difficile : 8 questions

## 🔄 Évolutions futures

### Questions supplémentaires possibles
- Les anges selon Saint Thomas
- La création et la providence
- Le péché et la rédemption
- La résurrection des corps
- Les dons du Saint-Esprit
- La contemplation et l'action

### Fonctionnalités envisagées
- Citations directes de la Somme théologique
- Explications détaillées des arguments
- Comparaisons avec d'autres auteurs
- Exercices de logique scolastique
- Méditations guidées

## 📚 Ressources complémentaires

### Textes de référence
- **Somme théologique** (Summa Theologiae)
- **Somme contre les Gentils** (Summa contra Gentiles)
- **Commentaires bibliques**
- **Opuscules théologiques**

### Études secondaires
- **Saint Thomas d'Aquin** par Étienne Gilson
- **Introduction à Saint Thomas d'Aquin** par Jean-Pierre Torrell
- **La philosophie de Saint Thomas d'Aquin** par Jacques Maritain

### En ligne
- [Corpus Thomisticum](http://www.corpusthomisticum.org/)
- [Somme théologique en ligne](https://www.somme-theologique.fr/)
- [Cathopedia - Saint Thomas d'Aquin](https://fr.cathopedia.org/wiki/Thomas_d%27Aquin)

## 🎯 Conseils d'utilisation

1. **Progression** : Commencer par le niveau 1 pour une introduction
2. **Méditation** : Prendre le temps de réfléchir aux explications
3. **Révision** : Revoir régulièrement les concepts fondamentaux
4. **Application** : Essayer d'appliquer les principes dans la vie quotidienne
5. **Prière** : Demander l'aide de Saint Thomas d'Aquin dans l'étude

---

*"Contempler et transmettre aux autres ce qui a été contemplé"* - Devise de Saint Thomas d'Aquin 