import React from 'react';

interface ProgressBarProps {
    current: number;
    goal: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, goal }) => {
    const percentage = Math.min((current / goal) * 100, 100);

    return (
        <div>
            <div className="flex justify-between mb-1">
                 <span className="text-base font-medium text-primary">Progress</span>
                 <span className="text-sm font-medium text-primary">{percentage.toFixed(2)}%</span>
            </div>
            <div className="w-full bg-dark-accent rounded-full h-4">
                <div
                    className="bg-primary h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>
        </div>
    );
};