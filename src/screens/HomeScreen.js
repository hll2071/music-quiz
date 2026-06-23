import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { COLORS } from '../constants/colors';
import SectionHeader from '../components/SectionHeader';
import PrimaryButton from '../components/PrimaryButton';
import QuizCard from '../components/QuizCard';
import CategoryCard from '../components/CategoryCard';
import EmptyState from '../components/EmptyState';
import { formatDateLabel, pickDailyQuizzes } from '../utils/dailyPicker';

export default function HomeScreen({
  quizzes,
  categories,
  onOpenRandom,
  onOpenCategory,
}) {
  const [dailyQuizzes, setDailyQuizzes] = useState(null);
  const [loadError, setLoadError] = useState('');

  const categoryLabels = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category.label;
      return acc;
    }, {});
  }, [categories]);

  const categoryCounts = useMemo(() => {
    const counts = categories.reduce((acc, category) => {
      acc[category.id] = 0;
      return acc;
    }, {});
    quizzes.forEach((quiz) => {
      if (counts[quiz.categoryId] !== undefined) {
        counts[quiz.categoryId] += 1;
      }
    });
    return counts;
  }, [categories, quizzes]);

  useEffect(() => {
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      setLoadError('퀴즈 데이터가 준비되지 않았어요.');
      setDailyQuizzes([]);
      return;
    }
    setLoadError('');
    setDailyQuizzes(pickDailyQuizzes(quizzes, 3));
  }, [quizzes]);

  const handleReload = () => {
    if (!Array.isArray(quizzes) || quizzes.length === 0) {
      setLoadError('퀴즈 데이터가 준비되지 않았어요.');
      setDailyQuizzes([]);
      return;
    }
    setLoadError('');
    setDailyQuizzes(pickDailyQuizzes(quizzes, 3));
  };

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.heroText}>
          <Text style={styles.heroTitle}>랜덤 음악 퀴즈</Text>
          <Text style={styles.heroDescription}>
            오늘 바로 풀 수 있는 랜덤 퀴즈를 받아보세요.
          </Text>
        </View>
        <PrimaryButton title="랜덤 퀴즈 받기" onPress={onOpenRandom} />
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="오늘의 음악 상식"
          subtitle={`${formatDateLabel()} · 하루 3문제`}
        />
        {dailyQuizzes === null ? (
          <View style={styles.loading}>
            <ActivityIndicator color={COLORS.primary} />
            <Text style={styles.loadingText}>오늘의 퀴즈를 준비하는 중...</Text>
          </View>
        ) : loadError ? (
          <EmptyState
            title="퀴즈를 불러올 수 없어요"
            description={loadError}
            actionLabel="다시 불러오기"
            onAction={handleReload}
          />
        ) : dailyQuizzes.length === 0 ? (
          <EmptyState
            title="오늘의 퀴즈가 비어 있어요"
            description="데이터가 준비되면 다시 확인해 주세요."
          />
        ) : (
          <View style={styles.quizList}>
            {dailyQuizzes.map((quiz) => (
              <QuizCard
                key={quiz.id}
                quiz={quiz}
                categoryLabel={categoryLabels[quiz.categoryId]}
                allQuizzes={quizzes}
              />
            ))}
          </View>
        )}
      </View>

      <View style={styles.section}>
        <SectionHeader
          title="분야별 퀴즈"
          subtitle="악기, 장르 등 원하는 분야를 골라 풀어보세요."
        />
        <View style={styles.categoryList}>
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              label={category.label}
              description={category.description}
              count={categoryCounts[category.id] ?? 0}
              onPress={() => onOpenCategory(category.id)}
              disabled={(categoryCounts[category.id] ?? 0) === 0}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 24,
  },
  hero: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
    gap: 16,
  },
  heroText: {
    gap: 8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.text,
  },
  heroDescription: {
    fontSize: 14,
    color: COLORS.textMuted,
    lineHeight: 20,
  },
  section: {
    gap: 16,
  },
  quizList: {
    gap: 12,
  },
  categoryList: {
    gap: 12,
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
});
