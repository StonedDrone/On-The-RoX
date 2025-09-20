import React from 'react';
import { CostBreakdown } from './CostBreakdown';

export const HuntPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                <div className="relative inline-block font-extrabold tracking-tighter text-4xl sm:text-5xl" style={{ filter: 'brightness(1.2)' }}>
                    <h1 className="relative text-light p-2 z-10">
                        The Hunt
                    </h1>
                    <div className="absolute inset-0 p-2 text-primary animate-glitch-1" aria-hidden="true">The Hunt</div>
                    <div className="absolute inset-0 p-2 text-secondary animate-glitch-2" aria-hidden="true">The Hunt</div>
                </div>

                <p className="mt-4 max-w-3xl mx-auto text-lg text-light/80">
                    This isn't just for the pros—the entire city is the arena! Anyone can join the Sk8Hunt. Find JayNdaboX, scan his unique marker, and you could win big from the live jackpot. Track the action here on hunt day.
                </p>
            </div>

            <div className="mt-20">
                 <h2 className="text-3xl font-bold text-center text-primary mb-8">The Hunting Grounds</h2>
                 <div className="aspect-video bg-black border-2 border-primary rounded-lg shadow-2xl shadow-primary/20 flex items-center justify-center p-0 overflow-hidden relative">
                     <img 
                         src="https://images.unsplash.com/photo-1533414254844-39f14b62f790?q=80&w=1280&h=720&auto=format&fit=crop"
                         alt="Map of the French Quarter, New Orleans"
                         className="w-full h-full object-cover"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6">
                         <h3 className="text-2xl font-bold text-light drop-shadow-lg">The Arena: French Quarter, New Orleans</h3>
                         <p className="text-light/90 mt-1 drop-shadow-md">The hunt is confined to the historic streets of the Vieux Carré. Plan your route wisely.</p>
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