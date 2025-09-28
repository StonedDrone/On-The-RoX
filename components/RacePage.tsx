// Fix: Implement and export the HuntPage component to resolve the module resolution error in App.tsx.
import React, { useState } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { CostBreakdown } from './CostBreakdown';
import { NeonMap } from './NeonMap';
import { HunterCard } from './HunterCard';
import { allHunters as initialHunters } from '../data/hunters';
import { MinusIcon, PlusIcon } from './icons/Icons';


const HuntPage: React.FC = () => {
    const [isAllocationOpen, setIsAllocationOpen] = useState(false);
    const [hunters, setHunters] = useState(initialHunters);

    const toggleGps = (hunterName: string) => {
        setHunters(currentHunters =>
            currentHunters.map(hunter =>
                hunter.name === hunterName
                    ? { ...hunter, gps_enabled: !hunter.gps_enabled }
                    : hunter
            )
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light font-heading">
                    THE RIVAL <span className="text-primary">HUNTERS</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    These are the other professionals tracking JayNdaboX. Study their profiles, learn their tactics, and don't get in their way. They're also after the bounty.
                </p>
            </div>

            {/* Hunter Cards */}
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {hunters.map((hunter, index) => (
                    <div key={hunter.name} className="animate-fade-in-up" style={{ animationDelay: `${100 + index * 100}ms` }}>
                         <HunterCard hunter={hunter} onToggleGps={toggleGps} />
                    </div>
                ))}
            </div>

            {/* Bounty Allocation Section */}
            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-secondary tracking-wider">
                            Bounty Allocation
                        </h2>
                        <p className="text-light/70 text-sm mt-1">
                             For a deeper dive into the cost structure, <a href="https://jayndabox.myfreesites.net/j-tao" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">check out the J-Tao</a>.
                        </p>
                    </div>
                    <button
                        onClick={() => setIsAllocationOpen(!isAllocationOpen)}
                        className="p-2 rounded-full hover:bg-dark-accent text-light/70 hover:text-light transition-colors"
                        aria-expanded={isAllocationOpen}
                        aria-controls="bounty-allocation-details"
                    >
                        {isAllocationOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                        <span className="sr-only">{isAllocationOpen ? 'Collapse' : 'Expand'} Bounty Allocation</span>
                    </button>
                </div>
                {isAllocationOpen && (
                    <div id="bounty-allocation-details">
                        <CostBreakdown />
                    </div>
                )}
            </div>

            {/* Live Map Section */}
            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary tracking-wider mb-8 font-heading">LIVE TARGET TRACKER</h2>
                <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-primary/20 aspect-video lg:aspect-[2/1] max-w-5xl mx-auto">
                    <NeonMap />
                </div>
                <p className="text-center mt-4 text-sm text-light/70 max-w-2xl mx-auto">
                    This map displays AR marker locations and recent social media activity tagged with <span className="font-bold text-secondary">#Sk8Hunt</span>. Heatmap pings indicate high engagement zones—potential hotspots for hunter activity or clues.
                </p>
            </div>
        </div>
    );
};

export default HuntPage;