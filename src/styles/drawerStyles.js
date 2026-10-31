import { StyleSheet } from 'react-native';
import { COLORS } from './colors';

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  // Mirrors TopNavBar's padding and logo height so the burger lands on the same spot.
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
    marginBottom: 8,
  },
  logoSpacer: {
    width: 0,
    height: 36,
  },
  title: {
    flex: 1,
    marginRight: 12,
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.accent,
    textAlign: 'center',
  },
  menuIcon: {
    fontSize: 26,
    color: COLORS.text,
  },
  list: {
    padding: 1,
  },

  highlight: {
    padding: 5,
    borderRadius: 10,
  },
  highlightSelected: {
    backgroundColor: COLORS.scrollbar,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  logoutRow: {
    backgroundColor: COLORS.logout,
  },
  pressed: {
    opacity: 0.8,
  },
  iconTile: {
    width: 40,
    height: 40,
    borderRadius: 8,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  logoutTile: {
    backgroundColor: COLORS.card,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.accent,
  },
});
