
import React, { useState } from 'react';
// Fix: Use namespace import for react-router-dom to fix module resolution errors.
import * as ReactRouterDom from 'react-router-dom';
import { DonationPage } from './components/DonationPage';
import { HuntPage } from './components/RacePage';
import { Header } from './components/Header';
import { useDonationData } from './hooks/useDonationData';
import { DONATION_GOAL, TARGET_DATE } from './constants';
import { Footer } from './components/Footer';
import { CursorTrail } from './components/CursorTrail';
import { DonationToast } from './components/DonationToast';
import type { DonationToast as DonationToastType } from './types';
import { useCountdown } from './hooks/useCountdown';
import { SoundtrackPlayer } from './components/SoundtrackPlayer';

const App: React.FC = () => {
    const { totalAmount, donorCount, donations, addDonation } = useDonationData();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [toasts, setToasts] = useState<DonationToastType[]>([]);
    const countdown = useCountdown(TARGET_DATE);

    const handleAddDonation = (amount: number, name: string, avatarUrl?: string) => {
        addDonation(amount, name, avatarUrl);
        const newToast: DonationToastType = {
            id: Date.now(),
            name: name || 'Anonymous',
            amount: amount,
        };
        setToasts(currentToasts => [...currentToasts, newToast]);
    };

    const removeToast = (id: number) => {
        setToasts(currentToasts => currentToasts.filter(t => t.id !== id));
    };


    return (
        <ReactRouterDom.HashRouter>
            <CursorTrail />
            <SoundtrackPlayer countdown={countdown} />
            <div className="min-h-screen font-sans flex flex-col relative isolate overflow-hidden">
                {/* Animated Background Grid - Layer 1 (Green, small) */}
                <div className="absolute inset-0 -z-20 h-full w-full bg-dark bg-[linear-gradient(to_right,rgba(163,230,53,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(163,230,53,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem] animate-pulse-grid" />
                {/* Animated Background Grid - Layer 2 (Pink, large, offset pulse) */}
                <div className="absolute inset-0 -z-20 h-full w-full bg-[linear-gradient(to_right,rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:6rem_6rem] animate-pulse-grid [animation-delay:-4s]" />
                
                {/* Static background ribbon outline */}
                <div className="absolute inset-0 -z-10 pointer-events-none" aria-hidden="true">
                    <svg className="absolute -top-40 -left-40 text-primary opacity-[0.06]" width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-100 100L100 -100L1100 900L900 1100Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M-100 200L200 -100L1100 800L800 1100Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    <svg className="absolute -bottom-40 -right-40 text-secondary opacity-[0.04]" width="1000" height="1000" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M-100 100L100 -100L1100 900L900 1100Z" stroke="currentColor" strokeWidth="2"/>
                        <path d="M-100 200L200 -100L1100 800L800 1100Z" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
                <main className="flex-grow pt-20">
                    <ReactRouterDom.Routes>
                        <ReactRouterDom.Route path="/hunt" element={<HuntPage />} />
                        <ReactRouterDom.Route path="/" element={
                            <DonationPage
                                totalAmount={totalAmount}
                                donorCount={donorCount}
                                donations={donations}
                                addDonation={handleAddDonation}
                                goal={DONATION_GOAL}
                            />
                        } />
                    </ReactRouterDom.Routes>
                </main>
                <Footer />
            </div>
            
            {/* Donation Toast Container */}
            <div className="fixed bottom-4 left-4 z-50 space-y-3">
                {toasts.map(toast => (
                    <DonationToast key={toast.id} toast={toast} onDismiss={() => removeToast(toast.id)} />
                ))}
            </div>
        </ReactRouterDom.HashRouter>
    );
};

export default App;