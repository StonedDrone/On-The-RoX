import React, { useEffect, memo } from 'react';
import { CloseIcon, HeartIcon } from './icons/Icons';

interface ConfirmationModalProps {
    details: {
        amount: number;
        name: string;
    };
    onClose: () => void;
    onConfirm: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = memo(({ details, onClose, onConfirm }) => {
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirmation-title"
        >
            <div 
                className="bg-dark-accent rounded-2xl shadow-2xl p-8 border border-secondary/20 relative max-w-sm w-full animate-pop-in" 
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-light/60 hover:text-light" aria-label="Cancel donation">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                    <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-secondary/20 mb-4">
                        <HeartIcon className="h-10 w-10 text-secondary" style={{ filter: 'drop-shadow(0 0 8px #A3E635)' }}/>
                    </div>
                    <h2 id="confirmation-title" className="text-2xl font-bold text-light">Confirm Your Bounty</h2>
                    <p className="mt-2 text-light/80">
                        You are placing a <span className="font-bold text-secondary">${details.amount.toLocaleString()}</span> bounty as <span className="font-bold text-light">{details.name}</span>.
                    </p>
                    <p className="mt-4 text-sm text-light/60">
                        Please click the button below after you have successfully sent the payment. Your contribution will then appear on the public bounty board.
                    </p>
                    <button
                        onClick={onConfirm}
                        className="mt-6 w-full bg-primary text-light font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-primary animate-pulse-glow"
                    >
                        I've Sent The Payment!
                    </button>
                </div>
            </div>
        </div>
    );
});
ConfirmationModal.displayName = 'ConfirmationModal';