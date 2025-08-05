import { useLoadingBar } from '@/hooks/useLoadingBar';
import React, { createContext, ReactNode, useContext } from 'react';

interface LoadingBarContextType {
  loadingState: {
    visible: boolean;
    height?: number;
    color?: string;
    duration?: number;
  };
  showLoading: (options?: {
    height?: number;
    color?: string;
    duration?: number;
  }) => void;
  hideLoading: () => void;
  setLoading: (
    visible: boolean,
    options?: {
      height?: number;
      color?: string;
      duration?: number;
    }
  ) => void;
}

const LoadingBarContext = createContext<LoadingBarContextType | undefined>(undefined);

export const useLoadingBarContext = () => {
  const context = useContext(LoadingBarContext);
  if (context === undefined) {
    throw new Error('useLoadingBarContext must be used within a LoadingBarProvider');
  }
  return context;
};

interface LoadingBarProviderProps {
  children: ReactNode;
}

export const LoadingBarProvider: React.FC<LoadingBarProviderProps> = ({ children }) => {
  const loadingBar = useLoadingBar();

  return (
    <LoadingBarContext.Provider value={loadingBar}>
      {children}
    </LoadingBarContext.Provider>
  );
}; 