import { StyleSheet } from 'react-native';
import { COLORS } from './colors';


export const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    scrollbarColor: COLORS.scrollbar,
    paddingHorizontal: 10,
    paddingTop: 12,
    paddingBottom: 40,
  },
  greeting: {
    marginTop: 20,
    fontSize: 15,
    color: COLORS.subtitle,
  },
  pageTitle: {
    marginTop: 4,
    fontSize: 24,
    fontWeight: '700',
    color: COLORS.accent,
  },
  quoteBox: {
    marginTop: 20,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 18,
  },
  quoteText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: COLORS.subtitle,
    textAlign: 'center',
  },
  quoteAuthor: {
    marginTop: 6,
    fontSize: 12,
    color: COLORS.subtitle,
    textAlign: 'center',
  },
  quoteAttribution: {
    marginTop: 8,
    fontSize: 10,
    color: COLORS.link,
    textAlign: 'center',
  },
  sectionTitle: {
    marginTop: 28,
    marginBottom: 14,
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.accent,
  },
  popularList: {
    paddingRight: 4,
    paddingBottom: 12,
  },
  workoutCard: {
    width: 190,
    backgroundColor: COLORS.card,
    borderRadius: 14,
    marginRight: 14,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  workoutImage: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    backgroundColor: COLORS.tagBackground,
  },
  tagPill: {
    alignSelf: 'flex-start',
    backgroundColor: COLORS.tagBackground,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 10,
  },
  tagText: {
    fontSize: 12,
    color: COLORS.tagText,
  },
  workoutTitle: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.text,
  },
  workoutDescription: {
    marginTop: 4,
    fontSize: 12,
    color: COLORS.subtitle,
    lineHeight: 17,
  },
  workoutDuration: {
    marginTop: 8,
    fontSize: 12,
    color: COLORS.subtitle,
  },
  dailyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  dailyImage: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.tagBackground,
  },
  dailyInfo: {
    padding: 16,
  },
  dailyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  dailyTag: {
    marginTop: 4,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  dailyDuration: {
    marginTop: 2,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  completionControl: {
    alignSelf: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
    padding: 4,
  },
  completionControlPressed: {
    opacity: 0.7,
  },
  completionLabel: {
    marginRight: 8,
    fontSize: 13,
    color: COLORS.subtitle,
  },
  completionCheckbox: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.subtitle,
    borderRadius: 5,
  },
  completionCheckboxSelected: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  completionMark: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.card,
  },
});
