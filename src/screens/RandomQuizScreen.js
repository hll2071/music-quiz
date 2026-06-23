import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import ScreenHeader from '../components/ScreenHeader';
import QuizCard from '../components/QuizCard';
import PrimaryButton from '../components/PrimaryButton';
import EmptyState from '../components/EmptyState';
import { getRandomQuiz } from '../utils/randomQuiz';

export default function RandomQuizScreen({ quizzes, categories, onBack }) {
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const categoryLabels = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category.label;
      return acc;
    }, {});
  }, [categories]);

  useEffect(() => {
    setCurrentQuiz(getRandomQuiz(quizzes));
  }, [quizzes]);

  const handleNextQuiz = () => {
    setCurrentQuiz(getRandomQuiz(quizzes, currentQuiz?.id));
  };

  if (!Array.isArray(quizzes) || quizzes.length === 0) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="랜덤 퀴즈" onBack={onBack} />
        <EmptyState
          title="랜덤 퀴즈를 준비 중이에요"
          description="퀴즈 데이터가 준비되면 다시 시도해 주세요."
          actionLabel="홈으로"
          onAction={onBack}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader
        title="랜덤 퀴즈"
        subtitle="새로운 문제로 감각을 깨워보세요."
        onBack={onBack}
      />
      {currentQuiz ? (
        <QuizCard
          key={currentQuiz.id}
          quiz={currentQuiz}
          categoryLabel={categoryLabels[currentQuiz.categoryId]}
          allQuizzes={quizzes}
        />
      ) : (
        <View style={styles.loading}>
          <ActivityIndicator color={COLORS.primary} />
          <Text style={styles.loadingText}>퀴즈를 준비하는 중...</Text>
        </View>
      )}
      <View style={styles.buttonRow}>
        <PrimaryButton title="다음 랜덤 퀴즈" onPress={handleNextQuiz} />
        <PrimaryButton title="홈으로" variant="outline" onPress={onBack} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 20,
  },
  loading: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: COLORS.textMuted,
  },
  buttonRow: {
    gap: 12,
  },
});
