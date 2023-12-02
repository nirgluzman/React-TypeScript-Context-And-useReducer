import {createContext, useContext, useReducer, type ReactNode} from 'react';

export type Timer = {
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

type StartTimersAction = {
	type: 'START_TIMERS';
};

type StopTimersAction = {
	type: 'STOP_TIMERS';
};

type AddTimerAction = {
	type: 'ADD_TIMER';
	payload: Timer;
};

type Action = StartTimersAction | StopTimersAction | AddTimerAction;

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
		return {
			...state,
			timers: [
				...state.timers,
				{
					name: action.payload.name,
					duration: action.payload.duration,
				},
			],
		};
	}

	return state;
}

export default function TimersContextProvider({children}: TimerConextProviderProps) {
	const [timersState, dispatch] = useReducer(timersReducer, initialState);

	const ctx: TimerContextValue = {
		isRunning: timersState.isRunning,
		timers: timersState.timers,
		addTimer(timerData) {
			dispatch({type: 'ADD_TIMER', payload: timerData});
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
