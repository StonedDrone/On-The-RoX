import React from 'react';
import type { Hunter } from '../types';

interface HunterCardProps {
    hunter: Hunter;
}

export const HunterCard: React.FC<HunterCardProps> = ({ hunter }) => {
    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-lg border border-primary/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:-translate-y-2">
            <img className="w-full h-56 object-cover" src={hunter.avatarUrl} alt={hunter.name} />
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-light">{hunter.name}</h3>
                <p className="text-primary font-semibold text-lg">"{hunter.alias}"</p>
                <p className="text-light/80 mt-4 flex-grow">{hunter.bio}</p>
                 <div className="mt-4 pt-4 border-t border-primary/20">
                    <p className="text-sm text-light/60">Board of Choice:</p>
                    <p className="font-semibold text-secondary">{hunter.esk8}</p>
                </div>
            </div>
        </div>
    );
};