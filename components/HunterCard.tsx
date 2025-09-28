import React, { memo } from 'react';
import type { Hunter } from '../types';
import { CoinIcon } from './icons/Icons';

interface HunterCardProps {
    hunter: Hunter;
    onToggleGps?: (name: string) => void;
}

export const HunterCard: React.FC<HunterCardProps> = memo(({ hunter, onToggleGps }) => {
    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-lg border border-primary/20 overflow-hidden h-full flex flex-col transition-all duration-300 hover:border-primary hover:shadow-primary/20 hover:-translate-y-2">
            <img className="w-full h-56 object-cover" src={hunter.avatarUrl} alt={hunter.name} />
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-light">{hunter.name}</h3>
                <p className="text-primary font-semibold text-lg">"{hunter.alias}"</p>
                <p className="text-light/80 mt-4 flex-grow">{hunter.bio}</p>
                 <div className="mt-4 pt-4 border-t border-primary/20">
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm text-light/60">Board of Choice:</p>
                            <p className="font-semibold text-secondary">{hunter.esk8}</p>
                        </div>
                         <div className="text-right">
                            <p className="text-sm text-light/60">Coin Balance:</p>
                            <p className="font-semibold text-gold flex items-center justify-end">
                                <CoinIcon className="w-4 h-4 mr-1"/>
                                <span>150 SC</span>
                            </p>
                        </div>
                    </div>
                    {/* Only show GPS toggle if onToggleGps is provided and it's not the main target */}
                    { onToggleGps && hunter.name !== 'JayNdaboX' && (
                        <div className="mt-4 pt-4 border-t border-primary/10 flex items-center justify-between">
                             <div className="flex flex-col">
                                <span className="text-sm text-light/60 font-medium">GPS Status</span>
                                <span className={`font-bold text-xs uppercase tracking-wider ${hunter.gps_enabled ? 'text-secondary' : 'text-red-400'}`}>
                                    {hunter.gps_enabled ? 'ONLINE' : 'OFFLINE'}
                                </span>
                            </div>
                            <button
                                id={`gps-toggle-${hunter.name}`}
                                onClick={() => onToggleGps(hunter.name)}
                                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-primary ${hunter.gps_enabled ? 'bg-secondary' : 'bg-zinc-700'}`}
                                role="switch"
                                aria-checked={hunter.gps_enabled}
                                aria-label={`Toggle GPS for ${hunter.name}`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`inline-block w-5 h-5 rounded-full bg-light shadow-lg transform ring-0 transition ease-in-out duration-200 ${hunter.gps_enabled ? 'translate-x-5' : 'translate-x-0'}`}
                                />
                            </button>
                        </div>
                    )}
                 </div>
            </div>
        </div>
    );
});
HunterCard.displayName = 'HunterCard';
