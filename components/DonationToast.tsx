import React, { useEffect } from 'react';
import type { DonationToast as DonationToastType } from '../types';
import { HeartIcon } from './icons/Icons';

interface DonationToastProps {
    toast: DonationToastType;
    onDismiss: () => void;
}

export const DonationToast: React.FC<DonationToastProps> = ({ toast, onDismiss }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss();
        }, 5000); // Duration matches CSS animation

        return () => {
            clearTimeout(timer);
        };
    }, [onDismiss]);

    return (
        <div 
            className="flex items-center bg-dark-accent/80 backdrop-blur-md border-l-4 border-secondary rounded-lg shadow-2xl p-4 w-72 animate-slide-in-out"
            role="alert"
        >
            <div className="p-2 bg-secondary/20 rounded-full mr-3 shrink-0">
                <HeartIcon className="w-5 h-5 text-secondary" />
            </div>
            <div>
                <p className="font-semibold text-light text-sm">{toast.name}</p>
                <p className="text-xs text-light/80">just placed a <span className="font-bold text-secondary">${toast.amount}</span> bounty!</p>
            </div>
        </div>
    );
};
