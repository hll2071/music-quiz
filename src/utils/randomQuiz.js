export const getRandomQuiz = (items, previousId) => {
  if (!Array.isArray(items) || items.length === 0) {
    return null;
  }

  if (items.length === 1) {
    return items[0];
  }

  let nextQuiz = items[Math.floor(Math.random() * items.length)];
  if (previousId) {
    let attempts = 0;
    while (nextQuiz.id === previousId && attempts < 5) {
      nextQuiz = items[Math.floor(Math.random() * items.length)];
      attempts += 1;
    }

    if (nextQuiz.id === previousId) {
      return items.find((quiz) => quiz.id !== previousId) || nextQuiz;
    }
  }

  return nextQuiz;
};
