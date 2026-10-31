import { StyleSheet } from 'react-native';

export const topNavBarStyles = (COLORS) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  logo: {
    width: 36,
    height: 36,
  },
  title: {
    flex: 1,
    marginHorizontal: 12,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.accent,
    textAlign: 'center',
  },
  menuIcon: {
    fontSize: 26,
    color: COLORS.text,
  },
});
