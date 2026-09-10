import { StyleSheet } from 'react-native';

export const COLORS = {
  background: '#eef0f7',
  inputBackground: '#ffffff',
  inputBorder: '#c7c9d1',
  text: '#1c1c28',
  placeholder: '#8a8a94',
  button: '#2c1a4d',
  buttonText: '#ffffff',
  link: '#3554f0',
  error: '#d63447',
};

export const authStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  logo: {
    width: 90,
    height: 90,
    alignSelf: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: COLORS.inputBackground,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: COLORS.text,
  },
  inputError: {
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: 13,
    marginTop: 4,
  },
  fieldSpacing: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.button,
    borderRadius: 10,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: COLORS.buttonText,
    fontSize: 17,
    fontWeight: '700',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    color: COLORS.text,
    fontSize: 14,
  },
  footerLink: {
    color: COLORS.link,
    fontSize: 14,
    fontWeight: '600',
  },
});
