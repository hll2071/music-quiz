import { Pressable, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

export default function PrimaryButton({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  style,
}) {
  const isOutline = variant === 'outline';
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isOutline ? styles.outline : styles.primary,
        pressed && !disabled ? styles.pressed : null,
        disabled ? styles.disabled : null,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          isOutline ? styles.textOutline : styles.textPrimary,
          disabled ? styles.textDisabled : null,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  pressed: {
    opacity: 0.9,
  },
  disabled: {
    backgroundColor: COLORS.border,
    borderColor: COLORS.border,
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
  },
  textPrimary: {
    color: COLORS.text,
  },
  textOutline: {
    color: COLORS.primaryDark,
  },
  textDisabled: {
    color: COLORS.textMuted,
  },
});
