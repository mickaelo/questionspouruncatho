import React from 'react';
import Svg, { Circle, Ellipse, Line, Path, Rect } from 'react-native-svg';

interface PilgrimIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const PilgrimIcon: React.FC<PilgrimIconProps> = ({ 
  width = 50, 
  height = 80, 
  color = '#000'
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 50 80">
             {/* Bâton de pèlerin - manche principal */}
       <Line 
         x1="8" 
         y1="32" 
         x2="8" 
         y2="75" 
         stroke={color} 
         strokeWidth="2.5"
         strokeLinecap="round"
       />
       
       {/* Coquille Saint-Jacques au sommet du bâton */}
       <Path 
         d="M 8 32 L 2 20 L 5 18 L 8 15 L 11 18 L 14 20 L 8 32 Z"
         fill={color}
         opacity="0.8"
       />
       
       {/* Nervures de la coquille */}
       <Line 
         x1="8" 
         y1="32" 
         x2="8" 
         y2="15" 
         stroke={color} 
         strokeWidth="1"
         opacity="0.6"
       />
       <Line 
         x1="8" 
         y1="32" 
         x2="5" 
         y2="18" 
         stroke={color} 
         strokeWidth="1"
         opacity="0.6"
       />
       <Line 
         x1="8" 
         y1="32" 
         x2="11" 
         y2="18" 
         stroke={color} 
         strokeWidth="1"
         opacity="0.6"
       />
      
      {/* Tête */}
      <Circle 
        cx="25" 
        cy="15" 
        r="8" 
        fill={color}
        opacity="0.8"
      />
      
      {/* Corps */}
      <Rect 
        x="20" 
        y="23" 
        width="10" 
        height="25" 
        fill={color}
        opacity="0.7"
        rx="2"
      />
      
             {/* Bras gauche tenant le bâton */}
       <Line 
         x1="20" 
         y1="30" 
         x2="10" 
         y2="40" 
         stroke={color} 
         strokeWidth="3"
         strokeLinecap="round"
       />
      
      {/* Bras droit */}
      <Line 
        x1="30" 
        y1="30" 
        x2="35" 
        y2="40" 
        stroke={color} 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Jambe gauche */}
      <Line 
        x1="22" 
        y1="48" 
        x2="18" 
        y2="65" 
        stroke={color} 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Jambe droite */}
      <Line 
        x1="28" 
        y1="48" 
        x2="32" 
        y2="65" 
        stroke={color} 
        strokeWidth="3"
        strokeLinecap="round"
      />
      
      {/* Pieds */}
      <Ellipse 
        cx="16" 
        cy="68" 
        rx="3" 
        ry="2" 
        fill={color}
        opacity="0.8"
      />
      <Ellipse 
        cx="34" 
        cy="68" 
        rx="3" 
        ry="2" 
        fill={color}
        opacity="0.8"
      />
      
      {/* Cape/Manteau (optionnel) */}
      <Path 
        d="M 18 25 C 15 28, 15 35, 18 38 L 32 38 C 35 35, 35 28, 32 25"
        fill={color}
        opacity="0.4"
      />
      
      {/* Chapeau de pèlerin */}
      <Ellipse 
        cx="25" 
        cy="10" 
        rx="10" 
        ry="4" 
        fill={color}
        opacity="0.6"
      />
      <Circle 
        cx="25" 
        cy="12" 
        r="6" 
        fill={color}
        opacity="0.5"
      />
    </Svg>
  );
};
