import {createContext, type ReactNode} from 'react';

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

type TimerConextProviderProps = {
	children: ReactNode;
};

export default function TimersContextProvider({children}: TimerConextProviderProps) {
	const ctx: TimerContextValue = {
		isRunning: false,
		timers: [],
		AddTimer(timerData) {
			// ...
		},
		startTimers() {
			// ...
		},
		stopTimers() {
			// ...
		},
	};
	return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
}
