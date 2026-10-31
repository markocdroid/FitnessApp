import { StyleSheet } from 'react-native';
import { LIGHT_COLORS as COLORS } from './colors';

export { COLORS };

export const detailStyles = (COLORS) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 24,
  },
  image: {
    width: '100%',
    height: 220,
    borderRadius: 20,
    backgroundColor: COLORS.tagBackground,
  },
  title: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.accent,
    textAlign: 'center',
  },
  meta: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.accent,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    marginTop: 20,
    paddingHorizontal: 4,
  },
  tab: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    marginRight: 8,
  },
  tabActive: {
    backgroundColor: COLORS.accent,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.tabInactive,
  },
  tabTextActive: {
    color: COLORS.buttonText,
    fontWeight: '400',
  },
  section: {
    paddingHorizontal: 14,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.accent,
    marginBottom: 18,
  },
  bodyText: {
    fontSize: 14,
    lineHeight: 24,
    color: COLORS.tabInactive,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  heartButton: {
    width: 58,
    height: 58,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.favorite,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 22,
  },
  heartIcon: {
    width: 34,
    height: 31,
  },
  favoriteButton: {
    flex: 1,
    height: 62,
    borderRadius: 14,
    backgroundColor: COLORS.favorite,
    alignItems: 'center',
    justifyContent: 'center',
  },
  favoriteButtonText: {
    color: COLORS.buttonText,
    fontSize: 20,
    fontWeight: '700',
  },
});
