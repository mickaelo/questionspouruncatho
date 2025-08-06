/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Theme inspired by http://prierenligne.fr/ - Catholic and spiritual aesthetic
 */

// Couleurs inspirées du site prierenligne.fr
const tintColorLight = '#8B4513'; // Marron chaud (Saddle Brown)
const tintColorDark = '#DAA520'; // Doré (Goldenrod)

export const Colors = {
  light: {
    text: '#2C1810', // Marron très foncé pour le texte
    background: '#FFFFFF', // Blanc cassé très chaud
    tint: tintColorLight,
    icon: '#8B4513', // Marron chaud pour les icônes
    tabIconDefault: '#A0522D', // Marron plus clair pour les icônes non sélectionnées
    tabIconSelected: tintColorLight,
    // Couleurs supplémentaires pour le thème catholique
    primary: '#8B4513', // Marron chaud principal
    secondary: '#DAA520', // Doré secondaire
    accent: '#CD853F', // Marron sable
    success: '#228B22', // Vert forêt
    warning: '#FF8C00', // Orange foncé
    error: '#B22222', // Rouge brique
    menu: '#FFFFFF', // Blanc coquille d'œuf
    card: '#FFFFFF', // Blanc coquille d'œuf
    border: '#0000001a', // Marron bois clair
    shadow: '#D2B48C', // Marron tan
  },
  dark: {
    text: '#F5DEB3', // Blé clair pour le texte
    background: '#2C1810', // Marron très foncé pour le fond
    tint: tintColorDark,
    icon: '#DAA520', // Doré pour les icônes
    tabIconDefault: '#CD853F', // Marron sable pour les icônes non sélectionnées
    tabIconSelected: tintColorDark,
    // Couleurs supplémentaires pour le thème catholique (mode sombre)
    primary: '#DAA520', // Doré principal
    secondary: '#8B4513', // Marron chaud secondaire
    accent: '#CD853F', // Marron sable
    success: '#32CD32', // Vert lime
    warning: '#FFA500', // Orange
    error: '#DC143C', // Rouge cramoisi
    menu: '#3C2A21', // Marron très foncé pour le menu
    card: '#3C2A21', // Marron très foncé pour les cartes
    border: '#654321', // Marron brun
    shadow: '#1C1C1C', // Noir profond
  },
};
