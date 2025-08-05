import { useCallback, useState } from 'react';

interface LoadingBarState {
  visible: boolean;
  height?: number;
  color?: string;
  duration?: number;
}

export const useLoadingBar = () => {
  const [loadingState, setLoadingState] = useState<LoadingBarState>({
    visible: false,
    height: 3,
    color: undefined,
    duration: 2000,
  });

  const showLoading = useCallback((
    options: {
      height?: number;
      color?: string;
      duration?: number;
    } = {}
  ) => {
    setLoadingState({
      visible: true,
      height: options.height || 3,
      color: options.color,
      duration: options.duration || 2000,
    });
  }, []);

  const hideLoading = useCallback(() => {
    setLoadingState(prev => ({
      ...prev,
      visible: false,
    }));
  }, []);

  const setLoading = useCallback((
    visible: boolean,
    options: {
      height?: number;
      color?: string;
      duration?: number;
    } = {}
  ) => {
    setLoadingState({
      visible,
      height: options.height || 3,
      color: options.color,
      duration: options.duration || 2000,
    });
  }, []);

  return {
    loadingState,
    showLoading,
    hideLoading,
    setLoading,
  };
}; 