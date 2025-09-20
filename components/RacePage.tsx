import React from 'react';
import { CostBreakdown } from './CostBreakdown';

export const HuntPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tighter text-light">The Hunt</h1>
                <p className="mt-4 max-w-3xl mx-auto text-lg text-light/80">
                    JayNdaboX must survive the urban landscape in a one-of-a-kind ESk8 manhunt. Track the action live on hunt day.
                </p>
            </div>

            <div className="mt-20">
                 <h2 className="text-3xl font-bold text-center text-primary mb-8">Live Augmented Reality Spectator Overlay</h2>
                 <div className="aspect-video bg-black border-2 border-primary rounded-lg shadow-2xl shadow-primary/20 flex items-center justify-center p-4">
                     <div className="text-center">
                        <p className="text-2xl font-bold text-light/60">Hunt Day Feed Will Appear Here</p>
                        <p className="text-light/50 mt-2">Get ready for a first-of-its-kind Augmented Reality viewing experience, powered by <a href="https://www.illust.space/" target="_blank" rel="noopener noreferrer" className="font-bold text-secondary hover:text-primary transition-colors">Illust.space</a>.</p>
                        <div className="mt-4 w-24 h-1 bg-secondary mx-auto rounded-full animate-pulse"></div>
                     </div>
                 </div>
            </div>

            <div className="mt-20">
                <CostBreakdown />
            </div>
            
            <div className="mt-20">
                <h2 className="text-3xl font-bold text-center text-primary mb-8">Our Amazing Sponsors</h2>
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <a href="https://triple8.com" target="_blank" rel="noopener noreferrer" className="bg-dark-accent/50 p-8 rounded-2xl border border-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                        <p className="text-2xl font-bold text-light">Triple Eight</p>
                    </a>
                     <a href="https://notarygeek.net/" target="_blank" rel="noopener noreferrer" className="bg-dark-accent/50 p-8 rounded-2xl border border-primary/20 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                        <p className="text-2xl font-bold text-light">NotaryGeek</p>
                    </a>
                     <a href="https://www.illust.space/" target="_blank" rel="noopener noreferrer" className="bg-dark-accent/50 p-8 rounded-2xl border border-primary/20 flex flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:border-primary hover:shadow-lg hover:shadow-primary/20">
                        <p className="text-2xl font-bold text-light">Illust.space</p>
                        <p className="text-sm text-light/60 mt-1">The Augmented Reality Platform</p>
                    </a>
                </div>
            </div>
        </div>
    );
};