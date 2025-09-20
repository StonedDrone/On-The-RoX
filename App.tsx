
import React, { useState } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import { DonationPage } from './components/DonationPage';
import { RacePage } from './components/RacePage';
import { Header } from './components/Header';
import { useDonationData } from './hooks/useDonationData';
import { DONATION_GOAL } from './constants';
import { Footer } from './components/Footer';

const App: React.FC = () => {
    const { totalAmount, donorCount, donations, addDonation } = useDonationData(DONATION_GOAL);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <HashRouter>
            <div className="min-h-screen bg-dark font-sans flex flex-col relative isolate overflow-hidden">
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
                    <Routes>
                        <Route path="/race" element={<RacePage />} />
                        <Route path="/" element={
                            <DonationPage
                                totalAmount={totalAmount}
                                donorCount={donorCount}
                                donations={donations}
                                addDonation={addDonation}
                                goal={DONATION_GOAL}
                            />
                        } />
                    </Routes>
                </main>
                <Footer />
            </div>
        </HashRouter>
    );
};

export default App;
