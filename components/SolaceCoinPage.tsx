import React, { useState, useEffect } from 'react';
import {
    CoinIcon, UpgradeIcon, RewardIcon, DonateIcon, SecretIcon,
    QuestIcon, ChallengeIcon, CommunityIcon, SlotMachineIcon
} from './icons/Icons';

const CoinRain: React.FC = () => {
    // Fix: Use React.ReactElement instead of JSX.Element to resolve namespace issue.
    const [coins, setCoins] = useState<React.ReactElement[]>([]);

    useEffect(() => {
        const coinElements = Array.from({ length: 20 }).map((_, i) => {
            const style = {
                left: `${Math.random() * 100}vw`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random()}s`,
            };
            return <div key={i} className="absolute top-0 text-gold text-2xl animate-coin-fall" style={style}>💰</div>;
        });
        setCoins(coinElements);
    }, []);

    return <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">{coins}</div>;
};


const ActionCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode; }> = ({ icon, title, children }) => (
    <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-primary/20 rounded-full text-primary">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-light">{title}</h4>
            <p className="text-sm text-light/80">{children}</p>
        </div>
    </div>
);

export const SolaceCoinPage: React.FC = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isRaining, setIsRaining] = useState(false);

    const spendActions = [
        { icon: <UpgradeIcon className="w-6 h-6" />, title: 'Unlock Skins & Avatars', description: 'Trick out your profile, board, or mask.' },
        { icon: <RewardIcon className="w-6 h-6" />, title: 'Redeem Rewards', description: 'Exclusive merch, event perks, or IRL surprises.' },
        { icon: <DonateIcon className="w-6 h-6" />, title: 'Support the Cause', description: 'Donate coins directly to breast cancer research.' },
        { icon: <SecretIcon className="w-6 h-6" />, title: 'Access Secrets', description: 'Hidden AR content, lore drops, or VIP Hunt clues.' },
    ];

    const earnActions = [
        { icon: <QuestIcon className="w-6 h-6" />, title: 'Complete Quests', description: 'Crack riddles, solve AR puzzles, find Jay.' },
        { icon: <ChallengeIcon className="w-6 h-6" />, title: 'Sk8 Challenges', description: 'AR-tracked tricks, races, and team hunts.' },
        { icon: <CommunityIcon className="w-6 h-6" />, title: 'Community Clout', description: 'Invite friends, climb leaderboards, share Hunt clips.' },
        { icon: <SlotMachineIcon className="w-6 h-6" />, title: 'Slot Machine Moments', description: 'Find Jay-N-da-BoX and spin his board for bonus coins.' },
    ];

    return (
        <div className="container mx-auto px-4 py-8 relative">
            {isRaining && <CoinRain />}
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light">
                    <span className="text-gold">Solace Coins</span>: The Heartbeat Currency
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    Every hunter starts with 150 coins. They’re not just numbers—they’re your ticket to upgrades, rewards, and giving back.
                </p>
            </div>

            <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-12">
                <div style={{ perspective: '1000px' }}>
                    <div
                        className="relative w-64 h-64 cursor-pointer transition-transform duration-700"
                        style={{ transformStyle: 'preserve-3d', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                        title="Click to flip"
                    >
                        {/* Front of the coin */}
                        <div className="absolute w-full h-full rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center" style={{ backfaceVisibility: 'hidden', boxShadow: '0 0 30px #FFD700, inset 0 0 15px rgba(255,255,255,0.5)' }}>
                            <span className="text-7xl font-bold text-dark text-opacity-80" style={{ textShadow: '0 2px 2px rgba(0,0,0,0.3)' }}>💰</span>
                        </div>
                        {/* Back of the coin */}
                        <div className="absolute w-full h-full rounded-full bg-dark-accent flex flex-col items-center justify-center p-4" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
                           <h3 className="text-2xl font-bold text-gold">Actions</h3>
                           <ul className="text-center text-light/90 mt-2 space-y-1">
                               <li>Earn</li>
                               <li>Spend</li>
                               <li>Donate</li>
                           </ul>
                        </div>
                    </div>
                </div>
                <div className="max-w-md animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl p-6 border border-gold/30">
                        <h3 className="text-lg font-bold text-light">Your Coin Stash</h3>
                        <p className="text-sm text-light/70 mb-3">Your journey starts here.</p>
                        <div className="w-full bg-dark-accent rounded-full h-6 border-2 border-gold/50">
                            <div className="bg-gold h-full rounded-full flex items-center justify-center" style={{ width: `15%` }}>
                                <span className="text-xs font-bold text-dark">150 / 1000 SC</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-primary/20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                    <h2 className="text-2xl font-bold text-primary mb-6">What Can You Do With Them?</h2>
                    <div className="space-y-6">
                        {spendActions.map(action => <ActionCard key={action.title} icon={action.icon} title={action.title}>{action.description}</ActionCard>)}
                    </div>
                </div>
                <div 
                    className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-secondary/20 animate-fade-in-up" 
                    style={{ animationDelay: '400ms' }}
                    onMouseEnter={() => setIsRaining(true)}
                    onMouseLeave={() => setIsRaining(false)}
                >
                    <h2 className="text-2xl font-bold text-secondary mb-6">How Do You Earn Them?</h2>
                    <div className="space-y-6">
                        {earnActions.map(action => <ActionCard key={action.title} icon={action.icon} title={action.title}>{action.description}</ActionCard>)}
                    </div>
                </div>
            </div>
        </div>
    );
};