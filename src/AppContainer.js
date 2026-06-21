import { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { COLORS } from './constants/colors';
import { QUIZ_CATEGORIES } from './constants/categories';
import { QUIZ_DATA } from './data/quizzes';
import HomeScreen from './screens/HomeScreen';
import RandomQuizScreen from './screens/RandomQuizScreen';
import CategoryScreen from './screens/CategoryScreen';

const SCREENS = {
  HOME: 'home',
  RANDOM: 'random',
  CATEGORY: 'category',
};

export default function AppContainer() {
  const [screen, setScreen] = useState({
    name: SCREENS.HOME,
    categoryId: null,
  });

  const handleOpenRandom = () => {
    setScreen({ name: SCREENS.RANDOM, categoryId: null });
  };

  const handleOpenCategory = (categoryId) => {
    setScreen({ name: SCREENS.CATEGORY, categoryId });
  };

  const handleBackHome = () => {
    setScreen({ name: SCREENS.HOME, categoryId: null });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      {screen.name === SCREENS.HOME ? (
        <HomeScreen
          quizzes={QUIZ_DATA}
          categories={QUIZ_CATEGORIES}
          onOpenRandom={handleOpenRandom}
          onOpenCategory={handleOpenCategory}
        />
      ) : null}
      {screen.name === SCREENS.RANDOM ? (
        <RandomQuizScreen
          quizzes={QUIZ_DATA}
          categories={QUIZ_CATEGORIES}
          onBack={handleBackHome}
        />
      ) : null}
      {screen.name === SCREENS.CATEGORY ? (
        <CategoryScreen
          categoryId={screen.categoryId}
          quizzes={QUIZ_DATA}
          categories={QUIZ_CATEGORIES}
          onBack={handleBackHome}
        />
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
