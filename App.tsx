import React, { useState, useEffect } from 'react';
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
import { SolaceCoinPage } from './components/SolaceCoinPage';
import { ProfilePage } from './components/ProfilePage';
import { UserProvider, useUser } from './hooks/useUser';
import { AuthModal } from './components/AuthModal';
import { CoinIcon } from './components/icons/Icons';
import { TermsPage } from './components/TermsPage';

// New generic toast component for informational messages like referrals
const InfoToast: React.FC<{ message: string; onDismiss: () => void; }> = ({ message, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 5000); // Auto-dismiss after 5 seconds
        return () => clearTimeout(timer);
    }, [onDismiss]);

    return (
        <div 
            className="flex items-center bg-dark-accent/80 backdrop-blur-md border-l-4 border-gold rounded-lg shadow-2xl p-4 w-72 animate-slide-in-out"
            role="alert"
        >
            <div className="p-2 bg-gold/20 rounded-full mr-3 shrink-0">
                <CoinIcon className="w-5 h-5 text-gold" />
            </div>
            <div>
                <p className="font-semibold text-light text-sm whitespace-pre-wrap">{message}</p>
            </div>
        </div>
    );
};

// Define union type for different kinds of toasts
interface DonationToastInfo extends DonationToastType {
    type: 'donation';
}
interface InfoToastInfo {
    type: 'info';
    id: number;
    message: string;
}
type ToastInfo = DonationToastInfo | InfoToastInfo;


const AppContent: React.FC = () => {
    const { totalAmount, donorCount, donations, addDonation } = useDonationData();
    const { user, addDonationToProfile, referralMessage, clearReferralMessage } = useUser();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [toasts, setToasts] = useState<ToastInfo[]>([]);
    const countdown = useCountdown(TARGET_DATE);

    useEffect(() => {
        if (referralMessage) {
            const newToast: InfoToastInfo = {
                type: 'info',
                id: Date.now(),
                message: referralMessage,
            };
            setToasts(currentToasts => [...currentToasts, newToast]);
            clearReferralMessage();
        }
    }, [referralMessage, clearReferralMessage]);

    const handleAddDonation = (amount: number, name: string, avatarUrl?: string) => {
        addDonation(amount, name, avatarUrl);
        if (user) {
            addDonationToProfile({ amount });
        }
        const newToast: DonationToastInfo = {
            type: 'donation',
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

                <Header isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} onLoginClick={() => setIsAuthModalOpen(true)} />
                <main className="flex-grow pt-20">
                    <ReactRouterDom.Routes>
                        <ReactRouterDom.Route path="/hunt" element={<HuntPage />} />
                        <ReactRouterDom.Route path="/solace" element={<SolaceCoinPage />} />
                        <ReactRouterDom.Route path="/profile" element={<ProfilePage />} />
                        <ReactRouterDom.Route path="/terms" element={<TermsPage />} />
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
            
            {/* Toast Container */}
            <div className="fixed bottom-4 left-4 z-50 space-y-3">
                {toasts.map(toast => {
                    if (toast.type === 'donation') {
                         const donationToastData: DonationToastType = { id: toast.id, name: toast.name, amount: toast.amount };
                         return <DonationToast key={toast.id} toast={donationToastData} onDismiss={() => removeToast(toast.id)} />;
                    }
                     if (toast.type === 'info') {
                        return <InfoToast key={toast.id} message={toast.message} onDismiss={() => removeToast(toast.id)} />;
                    }
                    return null;
                })}
            </div>
            {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
        </ReactRouterDom.HashRouter>
    );
}

const App: React.FC = () => {
    return (
        <UserProvider>
            <AppContent />
        </UserProvider>
    );
};

export default App;