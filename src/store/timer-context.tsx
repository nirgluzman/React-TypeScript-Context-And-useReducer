import {createContext} from 'react';

type Timer = {
	name: string;
	duration: number;
};

type TimerState = {
	isRunning: boolean;
	timers: Timer[];
};

type TimerContextValue = TimerState & {
	addTimer: (timeData: Timer) => void;
	startTimers: () => void;
	stopTimers: () => void;
};

const TimersContext = createContext<TimerContextValue | null>(null);
