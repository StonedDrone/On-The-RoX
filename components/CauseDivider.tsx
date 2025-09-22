import React from 'react';

export const CauseDivider: React.FC = () => (
    <svg width="100%" height="80" viewBox="0 0 600 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <filter id="graffiti-glow-pink" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id="graffiti-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id="graffiti-glow-purple" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
            <filter id="graffiti-glow-green" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                </feMerge>
            </filter>
        </defs>

        {/* Graffiti Splatters */}
        <path d="M50 45 C 40 30, 70 20, 80 40 S 90 60, 75 55 Z" fill="#BF40BF" filter="url(#graffiti-glow-purple)" opacity="0.8" />
        <path d="M520 35 C 530 20, 500 15, 490 35 S 480 55, 495 50 Z" fill="#A3E635" filter="url(#graffiti-glow-green)" opacity="0.8" />
        
        {/* Graffiti Lines */}
        <polyline points="100 20, 150 60, 200 30" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" filter="url(#graffiti-glow-gold)" />
        <polyline points="450 50, 480 20, 510 55" stroke="#BF40BF" strokeWidth="2.5" strokeLinecap="round" filter="url(#graffiti-glow-purple)" />
        
        {/* Pink Ribbon Path */}
        <path 
            d="M 200 40 C 250 10, 350 70, 400 40 L 410 50 C 360 80, 260 0, 210 30 L 200 40 Z" 
            stroke="#EC4899" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            filter="url(#graffiti-glow-pink)"
        />

        {/* More Graffiti Drips */}
        <circle cx="280" cy="55" r="3" fill="#A3E635" filter="url(#graffiti-glow-green)" />
        <path d="M280 58 C 278 65, 282 65, 280 70" stroke="#A3E635" strokeWidth="2" filter="url(#graffiti-glow-green)" />
        <circle cx="380" cy="28" r="2.5" fill="#FFD700" filter="url(#graffiti-glow-gold)" />
        <path d="M380 30 C 379 35, 381 35, 380 39" stroke="#FFD700" strokeWidth="1.5" filter="url(#graffiti-glow-gold)" />

    </svg>
);