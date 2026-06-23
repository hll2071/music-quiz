import { useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import ScreenHeader from '../components/ScreenHeader';
import SectionHeader from '../components/SectionHeader';
import QuizCard from '../components/QuizCard';
import EmptyState from '../components/EmptyState';

export default function CategoryScreen({
  categoryId,
  categories,
  quizzes = [],
  onBack,
}) {
  const category = useMemo(
    () => categories.find((item) => item.id === categoryId),
    [categories, categoryId]
  );

  const categoryQuizzes = useMemo(
    () => quizzes.filter((quiz) => quiz.categoryId === categoryId),
    [quizzes, categoryId]
  );

  if (!category) {
    return (
      <ScrollView contentContainerStyle={styles.content}>
        <ScreenHeader title="분야별 퀴즈" onBack={onBack} />
        <EmptyState
          title="선택한 분야를 찾을 수 없어요"
          description="홈으로 돌아가 다른 분야를 선택해 주세요."
          actionLabel="홈으로"
          onAction={onBack}
        />
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <ScreenHeader
        title={`${category.label} 퀴즈`}
        subtitle={category.description}
        onBack={onBack}
      />
      <View style={styles.section}>
        <SectionHeader
          title={`${categoryQuizzes.length}문제`}
          subtitle="정답은 카드에서 바로 확인할 수 있어요."
        />
        {categoryQuizzes.length === 0 ? (
          <EmptyState
            title="아직 준비된 문제가 없어요"
            description="다른 분야를 먼저 풀어보세요."
            actionLabel="홈으로"
            onAction={onBack}
          />
        ) : (
          <View style={styles.quizList}>
            {categoryQuizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} allQuizzes={quizzes} />
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 20,
  },
  section: {
    gap: 16,
  },
  quizList: {
    gap: 12,
  },
});
