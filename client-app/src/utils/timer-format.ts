function formatTimer(timerSeconds: number): string {
  const minutes = Math.floor(timerSeconds / 60);
  const seconds = timerSeconds % 60;
  return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

export default formatTimer;
