import {useEffect, useRef, useState} from 'react';

import Container from './UI/Container.tsx';
import {useTimersContext, type Timer as TimerProps} from '../store/timer-context.tsx';

export default function Timer({name, duration}: TimerProps) {
	const interval = useRef<number | undefined>(); // stores a reference to TimerID in the scope of each component instance.
	const [remainingTime, setRemainingTime] = useState(duration * 1000); // duration is in seconds, while setInterval is in milliseconds.

	const {isRunning} = useTimersContext();

	if (remainingTime <= 0 && interval.current) {
		clearInterval(interval.current);
	}

	useEffect(() => {
		if (isRunning) {
			interval.current = window.setInterval(function () {
				setRemainingTime((prevTime) => {
					if (prevTime <= 0) {
						return prevTime;
					}
					return prevTime - 50;
				});
			}, 50);
		} else if (interval.current) {
			clearInterval(interval.current);
		}
		return () => clearInterval(interval.current); // clean-up function - called right before useEffect() is running again or when the component unmounts.
	}, [isRunning]);

	const formatRemainingTime = (remainingTime / 1000).toFixed(2);

	return (
		<Container as='article'>
			<h2>{name}</h2>
			<p>
				<progress
					max={duration * 1000}
					value={remainingTime}
				/>
			</p>
			<p>{formatRemainingTime}</p>
		</Container>
	);
}
