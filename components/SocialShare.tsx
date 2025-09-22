

import React from 'react';
import { FacebookIcon, TwitterIcon, InstagramIcon, LinkedInIcon } from './icons/Icons';
import { SOCIAL_PROFILES } from '../constants';

export const SocialShare: React.FC = () => {
    
    const handleFuelClick = () => {
        const donationSection = document.getElementById('donation-form-section');
        if (donationSection) {
            donationSection.scrollIntoView({ behavior: 'smooth' });
        }
    };
    
    const ActionButton: React.FC<{
        href?: string;
        onClick?: () => void;
        children: React.ReactNode;
        label: string;
    }> = ({ href, onClick, children, label }) => {
        const commonProps = {
            className: "w-12 h-12 flex items-center justify-center bg-dark-accent rounded-full border-2 border-primary/20 text-light/80 hover:text-light hover:border-primary hover:scale-110 transition-all duration-300",
            "aria-label": label,
            title: label,
        };

        if (href) {
            return (
                <a href={href} target="_blank" rel="noopener noreferrer" {...commonProps}>
                    {children}
                </a>
            );
        }

        return (
            <button onClick={onClick} {...commonProps}>
                {children}
            </button>
        );
    };

    return (
        <div className="flex flex-col items-center justify-center animate-fade-in-up space-y-8" style={{animationDelay: '200ms'}}>
            <button
                onClick={handleFuelClick}
                className="text-dark bg-secondary font-bold py-4 px-10 rounded-lg text-xl uppercase tracking-wider transition-all duration-300 hover:scale-105 animate-pulse-glow-green"
            >
                Fuel the Hunt
            </button>
            
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4 text-center">Follow The Journey</h3>
                <div className="flex items-center space-x-4">
                    <ActionButton href={SOCIAL_PROFILES.facebook} label="Facebook Profile">
                        <FacebookIcon className="w-6 h-6" />
                    </ActionButton>
                    <ActionButton href={SOCIAL_PROFILES.instagram} label="Instagram Profile">
                        <InstagramIcon className="w-6 h-6" />
                    </ActionButton>
                     <ActionButton href={SOCIAL_PROFILES.x} label="X Profile">
                        <TwitterIcon className="w-6 h-6" />
                    </ActionButton>
                     <ActionButton href={SOCIAL_PROFILES.linkedin} label="LinkedIn Profile">
                        <LinkedInIcon className="w-6 h-6" />
                    </ActionButton>
                </div>
            </div>
        </div>
    );
};