import {createContext, useContext, useReducer, type ReactNode} from 'react';

type Timer = {
	name: string;
	duration: number;
};

type TimersState = {
	isRunning: boolean;
	timers: Timer[];
};

const initialState: TimersState = {
	isRunning: false,
	timers: [],
};

type TimerContextValue = TimersState & {
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

type Action = {
	type: 'ADD_TIMER' | 'START_TIMERS' | 'STOP_TIMERS';
};

function timersReducer(state: TimersState, action: Action): TimersState {
	if (action.type === 'START_TIMERS') {
		return {
			...state,
			isRunning: true,
		};
	}

	if (action.type === 'STOP_TIMERS') {
		return {
			...state,
			isRunning: false,
		};
	}

	if (action.type === 'ADD_TIMER') {
		// ...
	}
}

export default function TimersContextProvider({children}: TimerConextProviderProps) {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const ctx: TimerContextValue = {
		isRunning: false,
		timers: [],
		addTimer(timerData) {
			dispatch({type: 'ADD_TIMER'});
		},
		startTimers() {
			dispatch({type: 'START_TIMERS'});
		},
		stopTimers() {
			dispatch({type: 'STOP_TIMERS'});
		},
	};
	return <TimersContext.Provider value={ctx}>{children}</TimersContext.Provider>;
}
