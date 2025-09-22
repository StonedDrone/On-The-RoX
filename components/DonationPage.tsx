import React from 'react';
import type { Donation } from '../types';
import { Countdown } from './Countdown';
import { ProgressBar } from './ProgressBar';
import { DonationForm } from './DonationForm';
import { RecentDonors } from './RecentDonors';
import { SocialShare } from './SocialShare'; // Import the new component
import { TARGET_DATE } from '../constants';
import { CauseDivider } from './CauseDivider';

interface DonationPageProps {
    totalAmount: number;
    donorCount: number;
    donations: Donation[];
    addDonation: (amount: number, name: string, avatarUrl?: string) => void;
    goal: number;
}

export const DonationPage: React.FC<DonationPageProps> = ({ totalAmount, donorCount, donations, addDonation, goal }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light">
                    <span className="text-primary">On The RoX</span>: Augmented Reality
                    <span className="relative inline-block mx-2" style={{ filter: 'brightness(1.2)' }}>
                        <span className="relative z-10">Sk8Hunt</span>
                        <span className="absolute inset-0 text-primary animate-glitch-1" aria-hidden="true">Sk8Hunt</span>
                        <span className="absolute inset-0 text-secondary animate-glitch-2" aria-hidden="true">Sk8Hunt</span>
                    </span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    Join the city-wide chase! Your bounty fuels the core hunt team and powers the grand prize jackpot. Find JayNdaboX, win real-world rewards, and support a great cause.
                </p>
            </div>

            {/* Social Share Section */}
            <div className="mt-8">
                <SocialShare />
            </div>

            <div className="mt-12 max-w-4xl mx-auto">
                <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20">
                    <Countdown targetDate={TARGET_DATE} />
                    <div className="mt-8">
                        <ProgressBar current={totalAmount} goal={goal} />
                        <div className="flex justify-between items-center mt-4 text-sm font-medium text-light/80">
                            <div>
                                <span className="text-2xl font-bold text-light">${totalAmount.toLocaleString()}</span> raised of ${goal.toLocaleString()}
                            </div>
                            <div>
                                <span className="text-2xl font-bold text-light">{donorCount}</span> supporters
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Cause Section */}
            <div className="my-16 max-w-4xl mx-auto text-center animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <CauseDivider />
                <h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-wider mt-6">The Cause</h2>
                <div className="mt-6 text-base sm:text-lg text-light/90 space-y-4 max-w-3xl mx-auto">
                    <p>I’m Jay-N-da-BoX, creator of On The RoX and founder of Stoned Drone Productions.</p>
                    <p>I live every day with Stage 4 Hodgkin’s Lymphoma. And while I fight my own battle, I’m also rolling for another — the fight against <strong className="font-bold text-primary">breast cancer</strong>.</p>
                    <p>Too many friends, family, and warriors in our city are touched by it. That’s why every coin in this hunt, every bounty, and every ride fuels more than just prizes. It fuels <strong className="font-bold text-secondary">hope, research, and support</strong> for those who need it most.</p>
                    <p>When you join the hunt, you’re not just chasing Jay-N-da-BoX. <strong className="font-bold text-primary">You’re chasing a future where cancer doesn’t get the final word.</strong></p>
                </div>
            </div>
            
            <div id="donation-form-section" className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
                <div className="lg:col-span-3">
                    <DonationForm addDonation={addDonation} />
                </div>
                <div className="lg:col-span-2">
                    <RecentDonors donations={donations} />
                </div>
            </div>
        </div>
    );
};