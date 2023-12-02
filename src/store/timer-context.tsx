import {createContext, useContext, type ReactNode} from 'react';

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

export function useTimersContext() {
	const timersCtx = useContext(TimersContext);

	if (timersCtx === null) {
		throw new Error('TimersContext is null - that should not be the case!');
	}

	return timersCtx;
}

type TimerConextProviderProps = {
	children: ReactNode;
};

export default function TimersContextProvider({children}: TimerConextProviderProps) {
	const ctx: TimerContextValue = {
		isRunning: false,
		timers: [],
		addTimer(timerData) {
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
