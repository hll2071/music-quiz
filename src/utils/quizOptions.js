export function generateOptions(quiz, allQuizzes) {
  const wrongAnswers = quiz.distractors
    ? [...quiz.distractors]
    : allQuizzes
        .filter((q) => q.id !== quiz.id)
        .sort(() => Math.random() - 0.5)
        .slice(0, 3)
        .map((q) => q.answer);

  return [...wrongAnswers, quiz.answer].sort(() => Math.random() - 0.5);
}
