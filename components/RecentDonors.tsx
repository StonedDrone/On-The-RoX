import React from 'react';
import type { Donation } from '../types';
import { HeartIcon } from './icons/Icons';

interface RecentDonorsProps {
    donations: Donation[];
}

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    if (seconds < 5) return "just now";
    return Math.floor(seconds) + " seconds ago";
};


export const RecentDonors: React.FC<RecentDonorsProps> = ({ donations }) => {
    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20 h-full">
            <h2 className="text-2xl font-bold text-light mb-6">Bounty Board</h2>
            <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {donations.length === 0 ? (
                    <p className="text-light/60">Be the first to place a bounty!</p>
                ) : (
                    donations.map((donation, index) => (
                        <div key={donation.id} className="flex items-center justify-between p-3 bg-black/20 rounded-lg animate-fade-in-up" style={{ animationDelay: `${index * 50}ms`, opacity: 0 }}>
                            <div className="flex items-center">
                                {donation.avatarUrl ? (
                                    <img src={donation.avatarUrl} alt={`${donation.name}'s avatar`} className="w-10 h-10 rounded-full object-cover mr-3 shrink-0" />
                                ) : (
                                    <div className="p-2 bg-primary/20 rounded-full mr-3 shrink-0">
                                        <HeartIcon className="w-5 h-5 text-primary" />
                                    </div>
                                )}
                                <div>
                                    <p className="font-semibold text-light">{donation.name}</p>
                                    <p className="text-xs text-light/60">{timeAgo(donation.timestamp)}</p>
                                </div>
                            </div>
                            <p className="font-bold text-secondary text-lg">${donation.amount.toLocaleString()}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};