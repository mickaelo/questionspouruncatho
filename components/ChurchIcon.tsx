import React from 'react';
import Svg, { Polygon, Rect } from 'react-native-svg';

interface ChurchIconProps {
  width?: number;
  height?: number;
  color?: string;
}

export const ChurchIcon: React.FC<ChurchIconProps> = ({ 
  width = 200, 
  height = 200, 
  color = '#000' 
}) => {
  return (
    <Svg width={width} height={height} viewBox="0 0 200 200">
      {/* Corps de l'église */}
      <Rect x="50" y="80" width="100" height="80" fill={color} stroke={color} strokeWidth="2"/>
      
      {/* Toit */}
      <Polygon points="40,80 100,30 160,80" fill={color} stroke={color} strokeWidth="2"/>
      
      {/* Porte */}
      <Rect x="90" y="120" width="20" height="40" fill={color} stroke={color} strokeWidth="1"/>
      
      {/* Croix */}
      <Rect x="95" y="10" width="10" height="40" fill={color}/>
      <Rect x="80" y="25" width="40" height="10" fill={color}/>
    </Svg>
  );
};
