import React from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
    targetDate: string;
}

const CountdownItem: React.FC<{ value: number; label: string }> = ({ value, label }) => (
    <div className="flex flex-col items-center">
        <div className="text-4xl md:text-6xl font-extrabold text-light tracking-tighter w-20 md:w-28 text-center bg-black/20 p-2 rounded-lg border border-primary/20">
            {String(value).padStart(2, '0')}
        </div>
        <span className="mt-2 text-xs md:text-sm font-medium uppercase text-light/60 tracking-wider">{label}</span>
    </div>
);

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    return (
        <div>
            <h2 className="text-center text-lg font-semibold text-secondary mb-4 uppercase tracking-widest">Race Starts In</h2>
            <div className="flex justify-center space-x-2 md:space-x-4">
                <CountdownItem value={days} label="Days" />
                <CountdownItem value={hours} label="Hours" />
                <CountdownItem value={minutes} label="Minutes" />
                <CountdownItem value={seconds} label="Seconds" />
            </div>
        </div>
    );
};