import React, { useEffect } from 'react';
import { CloseIcon } from './icons/Icons';

interface QRCodeModalProps {
    content: {
        type: 'venmo' | 'cashapp';
        qr: string;
    };
    onClose: () => void;
}

export const QRCodeModal: React.FC<QRCodeModalProps> = ({ content, onClose }) => {
    
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
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-dark-accent rounded-2xl shadow-2xl p-8 border border-primary/20 relative max-w-sm w-full animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-4 right-4 text-light/60 hover:text-light">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-center mb-4 capitalize text-light">
                    Scan to Pay with {content.type}
                </h2>
                <img src={content.qr} alt={`${content.type} QR Code`} className="w-full h-auto rounded-lg border-4 border-primary" />
                <p className="text-center text-light/60 mt-4 text-sm">
                    Open your {content.type} app and scan this code to complete your donation.
                </p>
            </div>
        </div>
    );
};