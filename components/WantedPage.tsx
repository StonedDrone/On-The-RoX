import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { allHunters } from '../data/hunters';
import { HunterCard } from './HunterCard';
import { LinkIcon } from './icons/Icons';

interface WantedPageProps {
    totalAmount: number;
}

const WantedPage: React.FC<WantedPageProps> = ({ totalAmount }) => {
    const [jayNdaboX, ...rivalHunters] = allHunters;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-dark-accent/80 backdrop-blur-md rounded-2xl shadow-2xl p-6 md:p-8 border-4 border-double border-gold/70 relative overflow-hidden animate-fade-in-up">
                
                {/* Background texture - subtle old paper effect */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/old-paper.png')] opacity-5 pointer-events-none"></div>

                {/* Poster Header */}
                <div className="text-center mb-6">
                    <p className="font-mono text-secondary tracking-widest">CASE FILE: JNDBX-001</p>
                    <h1 className="text-6xl sm:text-7xl md:text-8xl font-black tracking-widest text-red-500/90 font-heading" style={{ textShadow: '3px 3px 0px #0D0D0D' }}>
                        WANTED
                    </h1>
                    <p className="text-xl font-semibold text-light/80 font-heading">
                        BY <span className="text-primary">ON THE ROX</span>
                    </p>
                </div>

                <div className="my-8 flex flex-col md:flex-row items-center gap-8">
                    <img 
                        src={jayNdaboX.avatarUrl} 
                        alt={jayNdaboX.name} 
                        className="w-52 h-52 object-cover rounded-full border-4 border-primary shadow-lg animate-pulse-glow"
                    />
                    <div className="text-left">
                        <h2 className="text-4xl font-bold text-light">{jayNdaboX.name}</h2>
                        <p className="text-2xl font-semibold text-primary">A.K.A. "{jayNdaboX.alias}"</p>
                        <p className="mt-4 text-light/90">{jayNdaboX.bio}</p>
                        <div className="mt-4 pt-4 border-t border-primary/20">
                            <p className="text-sm text-light/60">Known Equipment:</p>
                            <p className="font-semibold text-secondary text-lg">{jayNdaboX.esk8}</p>
                        </div>
                    </div>
                </div>

                <div className="my-8 bg-dark/50 p-4 rounded-lg border border-dashed border-secondary/40">
                    <h3 className="text-lg font-bold text-secondary font-mono tracking-widest mb-3">BOLO // ALL POINTS BULLETIN</h3>
                    <ul className="space-y-2 font-mono text-sm text-light/90">
                        <li><span className="text-secondary/80 w-32 inline-block">SUBJECT CLASS:</span> ELUSIVE // AR SPECIALIST</li>
                        <li><span className="text-secondary/80 w-32 inline-block">LAST SEEN:</span> DOWNTOWN CORE // NOLA DISTRICT</li>
                        <li><span className="text-secondary/80 w-32 inline-block">THREAT LEVEL:</span> HIGH // PROCEEDS SUPPORT CHARITY</li>
                        <li className="pt-2 mt-2 border-t border-secondary/20 flex items-center">
                            <span className="text-secondary/80 w-32 inline-block shrink-0">LAST KNOWN INFO:</span> 
                            <a 
                                href="https://jayndabox.myfreesites.net/" 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gold font-bold hover:underline hover:text-yellow-300 transition-colors flex items-center"
                            >
                                <LinkIcon className="w-4 h-4 mr-2"/>
                                jayndabox.myfreesites.net
                            </a>
                        </li>
                    </ul>
                </div>


                <div className="bg-dark/50 rounded-lg p-6 border-2 border-dashed border-secondary/50">
                    <h3 className="text-2xl font-bold uppercase tracking-wider text-secondary font-heading">Bounty Reward</h3>
                    <p className="text-5xl md:text-6xl font-extrabold text-gold my-2 animate-pulse-glow-green" style={{ filter: 'brightness(1.2)'}}>
                        ${totalAmount > 0 ? totalAmount.toLocaleString() : '---'}
                    </p>
                    <p className="text-light/70">and <span className="font-bold text-gold">150 Solace Coins</span></p>
                </div>

                <p className="mt-8 text-light/80 text-center">
                    If you have information, proceed to the bounty board.
                </p>
                <div className="text-center mt-4">
                    <ReactRouterDom.Link 
                        to="/" 
                        className="inline-block bg-primary text-light font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-primary"
                    >
                        Place a Bounty
                    </ReactRouterDom.Link>
                </div>
            </div>

            {/* Rival Hunters Section */}
            <div className="mt-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-primary tracking-wider mb-8 font-heading">
                    Rival Hunter Dossiers
                </h2>
                <p className="text-center max-w-2xl mx-auto text-lg text-light/80 mb-12">
                    These are the other skilled hunters on the prowl. They are also after the bounty. Do not underestimate them.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {rivalHunters.map((hunter, index) => (
                        <div key={hunter.name} className="animate-fade-in-up" style={{ animationDelay: `${300 + index * 100}ms` }}>
                             <HunterCard hunter={hunter} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default WantedPage;