function secondsToTime(allMinutes: number): string {
  const hours = Math.floor(allMinutes / 3600);
  const minutes = allMinutes % 60;

  if (hours > 0) {
    return `${hours} год ${minutes} хв`;
  }

  return `${minutes} хв`;
}

export default secondsToTime;
