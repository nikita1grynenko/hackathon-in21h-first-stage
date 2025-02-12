function formatTime(allMinutes: number): string {
  const hours = Math.floor(allMinutes / 60);
  const minutes = allMinutes % 60;

  if (hours > 0) {
    return `${hours} год ${minutes} хв`;
  }

  return `${minutes} хв`;
}

export default formatTime;
