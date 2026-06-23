import { useMemo, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';
import { generateOptions } from '../utils/quizOptions';

export default function QuizCard({ quiz, categoryLabel, allQuizzes = [] }) {
  const options = useMemo(
    () => generateOptions(quiz, allQuizzes),
    [quiz, allQuizzes]
  );
  const [selected, setSelected] = useState(null);

  if (!quiz) return null;

  const answered = selected !== null;

  const handleSelect = (option) => {
    if (answered) return;
    setSelected(option);
  };

  const getOptionStyle = (option) => {
    if (!answered) return styles.option;
    if (option === quiz.answer) return [styles.option, styles.optionCorrect];
    if (option === selected) return [styles.option, styles.optionWrong];
    return [styles.option, styles.optionDimmed];
  };

  const getOptionTextStyle = (option) => {
    if (!answered) return styles.optionText;
    if (option === quiz.answer) return [styles.optionText, styles.optionTextCorrect];
    if (option === selected) return [styles.optionText, styles.optionTextWrong];
    return [styles.optionText, styles.optionTextDimmed];
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
      <View style={styles.optionList}>
        {options.map((option, i) => (
          <TouchableOpacity
            key={i}
            style={getOptionStyle(option)}
            onPress={() => handleSelect(option)}
            activeOpacity={answered ? 1 : 0.7}
          >
            <Text style={styles.optionNumber}>{i + 1}</Text>
            <Text style={getOptionTextStyle(option)}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {answered ? (
        <Text style={selected === quiz.answer ? styles.resultCorrect : styles.resultWrong}>
          {selected === quiz.answer ? '정답이에요!' : '아쉬워요, 정답은 초록색이에요.'}
        </Text>
      ) : null}
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
    gap: 12,
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
  optionList: {
    gap: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
    padding: 12,
  },
  optionCorrect: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0FAF0',
  },
  optionWrong: {
    borderColor: COLORS.error,
    backgroundColor: '#FFF0F0',
  },
  optionDimmed: {
    opacity: 0.45,
  },
  optionNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textMuted,
    minWidth: 16,
    marginTop: 1,
  },
  optionText: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 20,
    flex: 1,
  },
  optionTextCorrect: {
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  optionTextWrong: {
    color: COLORS.error,
  },
  optionTextDimmed: {
    color: COLORS.textMuted,
  },
  resultCorrect: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primaryDark,
  },
  resultWrong: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.error,
  },
});
