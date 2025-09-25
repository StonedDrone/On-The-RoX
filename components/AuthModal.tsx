import React, { useState, useEffect } from 'react';
import { useUser } from '../hooks/useUser';
import { CloseIcon, UserIcon } from './icons/Icons';

interface AuthModalProps {
    onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const { login } = useUser();

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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (username.trim() && email.trim()) {
            login(username.trim(), email.trim());
            onClose();
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" 
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="auth-title"
        >
            <div 
                className="bg-dark-accent rounded-2xl shadow-2xl p-8 border border-primary/20 relative max-w-sm w-full animate-pop-in" 
                onClick={(e) => e.stopPropagation()}
            >
                <button onClick={onClose} className="absolute top-4 right-4 text-light/60 hover:text-light" aria-label="Close login">
                    <CloseIcon className="w-6 h-6" />
                </button>
                <div className="text-center">
                     <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-primary/20 mb-4">
                        <UserIcon className="h-10 w-10 text-primary" style={{ filter: 'drop-shadow(0 0 8px #EC4899)' }}/>
                    </div>
                    <h2 id="auth-title" className="text-2xl font-bold text-light">Join The Hunt</h2>
                    <p className="mt-2 text-light/80">
                        Enter your details to create or load your profile.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                        <div>
                           <label htmlFor="username" className="sr-only">Username</label>
                           <input
                                type="text"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full bg-zinc-900 border border-primary/20 rounded-lg py-3 px-4 text-light focus:ring-primary focus:border-primary text-center"
                                placeholder="YourHunterAlias"
                                required
                            />
                        </div>
                        <div>
                           <label htmlFor="email" className="sr-only">Email</label>
                           <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-zinc-900 border border-primary/20 rounded-lg py-3 px-4 text-light focus:ring-primary focus:border-primary text-center"
                                placeholder="your.email@example.com"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-light font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-primary"
                        >
                            Login / Register
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};