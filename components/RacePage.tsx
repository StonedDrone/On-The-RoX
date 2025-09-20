
import React, { useState, useEffect } from 'react';
import { CostBreakdown } from './CostBreakdown';

const JAYNDABOX_ICON_BASE64 = 'data:image/png;base64,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';

export const HuntPage: React.FC = () => {
    // State for the random icon popup
    const [iconPosition, setIconPosition] = useState<{ top: number; left: number } | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const popupInterval = setInterval(() => {
            setIsVisible(false); // Trigger fade-out

            // Wait for fade-out to complete before moving and fading in
            setTimeout(() => {
                // Position between 10% and 90% to avoid edges
                const top = Math.random() * 80 + 10;
                const left = Math.random() * 80 + 10;
                setIconPosition({ top, left });
                setIsVisible(true); // Trigger fade-in
            }, 500); // 500ms for fade-out transition

        }, 3500); // Change position every 3.5 seconds

        // Initial popup after a short delay
        const initialTimeout = setTimeout(() => {
            const top = Math.random() * 80 + 10;
            const left = Math.random() * 80 + 10;
            setIconPosition({ top, left });
            setIsVisible(true);
        }, 500);


        return () => {
            clearInterval(popupInterval);
            clearTimeout(initialTimeout);
        };
    }, []);

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

                     {/* Random Icon Popup */}
                     {iconPosition && (
                         <div
                             className="absolute transition-all duration-500"
                             style={{
                                 top: `${iconPosition.top}%`,
                                 left: `${iconPosition.left}%`,
                                 opacity: isVisible ? 1 : 0,
                                 transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.75})`,
                             }}
                             aria-hidden="true"
                         >
                            <div className="relative w-16 h-16 flex items-center justify-center animate-pulse-glow">
                                <img src={JAYNDABOX_ICON_BASE64} alt="Jay-N-Da-Box Icon" className="w-14 h-14 drop-shadow-lg" />
                            </div>
                         </div>
                     )}

                     <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 pointer-events-none">
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