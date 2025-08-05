import { useLoadingBarContext } from '@/contexts/LoadingBarContext';
import React from 'react';
import { LoadingBar } from './LoadingBar';

export const GlobalLoadingBar: React.FC = () => {
  const { loadingState } = useLoadingBarContext();

  return (
    <LoadingBar
      visible={loadingState.visible}
      height={loadingState.height}
      color={loadingState.color}
      duration={loadingState.duration}
    />
  );
}; 