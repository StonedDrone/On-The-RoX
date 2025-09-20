import React from 'react';
import type { Donation } from '../types';
import { Countdown } from './Countdown';
import { ProgressBar } from './ProgressBar';
import { DonationForm } from './DonationForm';
import { RecentDonors } from './RecentDonors';
import { TARGET_DATE } from '../constants';

interface DonationPageProps {
    totalAmount: number;
    donorCount: number;
    donations: Donation[];
    addDonation: (amount: number, name: string) => void;
    goal: number;
}

export const DonationPage: React.FC<DonationPageProps> = ({ totalAmount, donorCount, donations, addDonation, goal }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light">
                    <span className="text-primary">On The RoX</span>: ESk8 Augmented Reality Manhunt
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    Join the chase. Support JayNdaboX in a high-stakes Augmented Reality manhunt race. All proceeds support breast cancer awareness.
                </p>
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
                                <span className="text-2xl font-bold text-light">{donorCount}</span> donors
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 max-w-7xl mx-auto">
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