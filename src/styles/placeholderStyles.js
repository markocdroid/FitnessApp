import { StyleSheet } from 'react-native';

export const placeholderStyles = (COLORS) => StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: COLORS.text,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.subtitle,
    textAlign: 'center',
  },
});
