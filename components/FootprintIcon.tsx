import React from 'react';
import Svg, { Ellipse, G, Path } from 'react-native-svg';

interface FootprintIconProps {
  width?: number;
  height?: number;
  color?: string;
  isLeft?: boolean; // Pour alterner entre pied gauche et droit
}

export const FootprintIcon: React.FC<FootprintIconProps> = ({ 
  width = 60, 
  height = 100, 
  color = '#000',
  isLeft = false
}) => {
  const transform = isLeft ? 'scale(-1, 1)' : '';
  
  return (
    <Svg width={width} height={height} viewBox="0 0 60 100">
      <G transform={transform} transformOrigin="30 50">
        {/* Empreinte principale du pied - forme plus réaliste */}
        <Path 
          d="M 30 15 
             C 35 15, 40 18, 42 25
             C 43 35, 42 45, 40 55
             C 38 65, 36 75, 32 82
             C 30 88, 28 92, 25 95
             C 22 98, 18 98, 15 95
             C 12 92, 10 88, 8 82
             C 4 75, 2 65, 0 55
             C -2 45, -1 35, 0 25
             C 2 18, 7 15, 12 15
             C 18 15, 24 15, 30 15 Z"
          fill={color}
          opacity="0.8"
        />
        
        {/* Orteils - plus petits et réalistes */}
        {/* Gros orteil */}
        <Ellipse 
          cx="18" 
          cy="8" 
          rx="6" 
          ry="8" 
          fill={color}
          opacity="0.9"
        />
        
        {/* 2ème orteil */}
        <Ellipse 
          cx="26" 
          cy="5" 
          rx="4" 
          ry="6" 
          fill={color}
          opacity="0.9"
        />
        
        {/* 3ème orteil */}
        <Ellipse 
          cx="32" 
          cy="7" 
          rx="3.5" 
          ry="5" 
          fill={color}
          opacity="0.9"
        />
        
        {/* 4ème orteil */}
        <Ellipse 
          cx="37" 
          cy="10" 
          rx="3" 
          ry="4" 
          fill={color}
          opacity="0.9"
        />
        
        {/* Petit orteil */}
        <Ellipse 
          cx="41" 
          cy="14" 
          rx="2.5" 
          ry="3.5" 
          fill={color}
          opacity="0.9"
        />
      </G>
    </Svg>
  );
};
