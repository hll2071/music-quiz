export function generateOptions(quiz, allQuizzes) {
  const others = allQuizzes.filter((q) => q.id !== quiz.id);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  const wrongAnswers = shuffled.slice(0, 3).map((q) => q.answer);
  const options = [...wrongAnswers, quiz.answer].sort(() => Math.random() - 0.5);
  return options;
}
