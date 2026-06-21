import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function ScreenHeader({ title, subtitle, onBack }) {
  return (
    <View style={styles.container}>
      <Pressable accessibilityRole="button" onPress={onBack} style={styles.back}>
        <Text style={styles.backText}>← 뒤로</Text>
      </Pressable>
      <View style={styles.titleArea}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  back: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: COLORS.background,
  },
  backText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textMuted,
  },
  titleArea: {
    gap: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
});
