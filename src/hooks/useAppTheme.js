import { useSelector } from 'react-redux';
import { DARK_COLORS, LIGHT_COLORS } from '../styles/colors';

export function useAppTheme() {
  const isLightMode = useSelector((state) => state.theme.isLightMode);
  return {
    colors: isLightMode ? LIGHT_COLORS : DARK_COLORS,
    isLightMode,
  };
}
