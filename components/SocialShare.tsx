
import React, { useState } from 'react';
import { FacebookIcon, TwitterIcon, LinkIcon, InstagramIcon, LinkedInIcon } from './icons/Icons';
import { SOCIAL_PROFILES } from '../constants';

export const SocialShare: React.FC = () => {
    const [isCopied, setIsCopied] = useState(false);
    
    const pageUrl = window.location.href;
    const shareTitle = "On The RoX: An Augmented Reality Sk8Hunt"; 
    const shareText = "Support On The RoX: An Augmented Reality Sk8Hunt for a great cause! #OnTheRoX #Sk8Hunt #Charity";
    
    const encodedUrl = encodeURIComponent(pageUrl);
    const encodedTitle = encodeURIComponent(shareTitle);
    const encodedText = encodeURIComponent(shareText);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedText}`,
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(pageUrl).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
        });
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
            <div>
                <h3 className="text-sm font-semibold uppercase tracking-widest text-secondary mb-4 text-center">Share The Cause</h3>
                <div className="flex items-center space-x-4">
                    <ActionButton href={shareLinks.facebook} label="Share on Facebook">
                        <FacebookIcon className="w-6 h-6" />
                    </ActionButton>
                    <ActionButton href={shareLinks.twitter} label="Share on X">
                        <TwitterIcon className="w-6 h-6" />
                    </ActionButton>
                     <ActionButton href={shareLinks.linkedin} label="Share on LinkedIn">
                        <LinkedInIcon className="w-6 h-6" />
                    </ActionButton>
                    <div className="relative">
                        <ActionButton onClick={handleCopyLink} label="Copy link">
                            <LinkIcon className="w-6 h-6" />
                        </ActionButton>
                        {isCopied && (
                             <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-secondary text-dark text-xs font-bold px-2 py-1 rounded-md">
                                Copied!
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
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