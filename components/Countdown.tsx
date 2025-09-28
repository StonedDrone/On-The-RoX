import React, { memo } from 'react';
import { useCountdown } from '../hooks/useCountdown';

interface CountdownProps {
    targetDate: string;
}

const CountdownItem = memo<{ value: number; label: string }>(({ value, label }) => (
    <div className="flex flex-col items-center">
        <div 
            className="flex items-center justify-center w-20 h-20 md:w-28 md:h-28 bg-dark/50 rounded-full border-2 border-secondary"
            style={{ boxShadow: '0 0 15px #A3E635, inset 0 0 8px #A3E635' }}
        >
             <div className="h-[2.5rem] md:h-[4rem] overflow-hidden" style={{ perspective: '300px' }}>
                <span 
                    key={value} 
                    className="text-4xl md:text-6xl font-extrabold text-light tracking-tighter animate-wheel-roll tabular-nums block"
                >
                     {String(value).padStart(2, '0')}
                </span>
            </div>
        </div>
        <span className="mt-3 text-xs md:text-sm font-medium uppercase text-light/60 tracking-wider">{label}</span>
    </div>
));
CountdownItem.displayName = 'CountdownItem';

export const Countdown: React.FC<CountdownProps> = memo(({ targetDate }) => {
    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    return (
        <div>
            <h2 className="text-center text-lg font-semibold text-secondary mb-4 uppercase tracking-widest">Hunt Starts In</h2>
            <div className="flex justify-center space-x-2 md:space-x-4">
                <CountdownItem value={days} label="Days" />
                <CountdownItem value={hours} label="Hours" />
                <CountdownItem value={minutes} label="Minutes" />
                <CountdownItem value={seconds} label="Seconds" />
            </div>
        </div>
    );
});
Countdown.displayName = 'Countdown';