import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function CategoryCard({
  label,
  description,
  count,
  onPress,
  disabled = false,
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.card,
        disabled ? styles.cardDisabled : null,
        pressed && !disabled ? styles.cardPressed : null,
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}문제</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.actionText}>
        {disabled ? '준비중' : '퀴즈 풀기 →'}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 8,
  },
  cardPressed: {
    opacity: 0.9,
  },
  cardDisabled: {
    opacity: 0.5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.text,
  },
  countBadge: {
    backgroundColor: COLORS.background,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  countText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  description: {
    fontSize: 13,
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
});
