import { StyleSheet } from 'react-native';

export const settingsStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingBottom: 10,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 32,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 26,
    paddingVertical: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileDetails: {
    flex: 1,
    marginLeft: 20,
  },
  profileName: {
    fontSize: 22,
    fontWeight: '700',
  },
  profileEmail: {
    marginTop: 4,
    fontSize: 16,
  },
  formContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
  },
  sectionTitle: {
    marginBottom: 10,
    fontSize: 14,
    letterSpacing: 1,
  },
  appearanceCard: {
    minHeight: 72,
    borderRadius: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appearanceLabel: {
    fontSize: 19,
    fontWeight: '700',
  },
  accountTitle: {
    marginTop: 32,
  },
  fieldsCard: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  field: {
    minHeight: 75,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  fieldHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputLocked: {
    opacity: 0.55,
  },
  fieldLabel: {
    fontSize: 13,
    letterSpacing: 0.4,
  },
  input: {
    padding: 0,
    marginTop: 3,
    fontSize: 18,
    minHeight: 25,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 32,
    gap: 14,
  },
  button: {
    minHeight: 66,
    borderRadius: 15,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  saveButton: {
    backgroundColor: '#ff7657',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  buttonLabel: {
    fontSize: 18,
    fontWeight: '700',
  },
  saveButtonLabel: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '700',
  },
  pressed: {
    opacity: 0.75,
  },
  message: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 14,
  },
});
