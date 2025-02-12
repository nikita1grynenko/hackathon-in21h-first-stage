import { useEffect, useState } from "react";

const TimerState = ['EnoughTime', 'RunningOut', 'TimeIsUp'] as const;

const useTimer = (initialTimeMinutes: number) => {
  const initialTime = initialTimeMinutes * 60;
  const [timeSeconds, setTime] = useState(initialTime);
  const [timerState, setTimerState] = useState<typeof TimerState[number]>(TimerState[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (timeSeconds < initialTime * 0.4) {
      setTimerState(TimerState[1]);
    } else if (timeSeconds < initialTime * 0.05) {
      setTimerState(TimerState[2]);
    }
  }, [initialTime, timeSeconds]);

  return [timeSeconds, timerState] as const;
};

export default useTimer;
