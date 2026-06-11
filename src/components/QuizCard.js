import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../constants/colors';
import PrimaryButton from './PrimaryButton';

export default function QuizCard({ quiz, categoryLabel }) {
  const [showAnswer, setShowAnswer] = useState(false);

  if (!quiz) {
    return null;
  }

  const handleToggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  return (
    <View style={styles.card}>
      {categoryLabel ? (
        <View style={styles.tag}>
          <Text style={styles.tagText}>{categoryLabel}</Text>
        </View>
      ) : null}
      <Text style={styles.label}>문제</Text>
      <Text style={styles.question}>{quiz.question}</Text>
      {showAnswer ? (
        <View style={styles.answerBox}>
          <Text style={styles.answerLabel}>정답</Text>
          <Text style={styles.answer}>{quiz.answer}</Text>
        </View>
      ) : null}
      <PrimaryButton
        title={showAnswer ? '정답 숨기기' : '정답 보기'}
        variant="outline"
        onPress={handleToggleAnswer}
        style={styles.button}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: COLORS.shadow,
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    gap: 10,
  },
  tag: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: COLORS.background,
    borderRadius: 999,
  },
  tagText: {
    fontSize: 12,
    fontWeight: '600',
    color: COLORS.primaryDark,
  },
  label: {
    fontSize: 13,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  answerBox: {
    borderRadius: 12,
    backgroundColor: COLORS.background,
    padding: 12,
    gap: 6,
  },
  answerLabel: {
    fontSize: 12,
    color: COLORS.textMuted,
    fontWeight: '600',
  },
  answer: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
  },
  button: {
    alignSelf: 'flex-start',
  },
});
