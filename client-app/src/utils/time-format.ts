function secondsToTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours} год ${minutes} хв ${secs} сек`;
  }

  if (minutes > 0) {
    return `${minutes} хв ${secs} сек`;
  }

  return `${secs} сек`;
}

export default secondsToTime;
