const createSeedFromDate = (date) => {
  const dateString = date.toISOString().slice(0, 10);
  let seed = 0;
  for (let i = 0; i < dateString.length; i += 1) {
    seed = (seed * 31 + dateString.charCodeAt(i)) % 1000000;
  }
  return seed;
};

const createSeededRandom = (seed) => {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
};

const shuffleWithRandom = (items, random) => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

export const pickDailyQuizzes = (items, count, date = new Date()) => {
  if (!Array.isArray(items)) {
    return [];
  }

  const limitedCount = Math.min(count, items.length);
  if (limitedCount === 0) {
    return [];
  }

  const seed = createSeedFromDate(date);
  const random = createSeededRandom(seed);
  return shuffleWithRandom(items, random).slice(0, limitedCount);
};

export const formatDateLabel = (date = new Date()) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};
