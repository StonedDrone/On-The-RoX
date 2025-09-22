import React from 'react';

const HeatmapPing: React.FC<{ cx: number; cy: number; delay: string; username: string; message: string; }> = ({ cx, cy, delay, username, message }) => (
    <g className="cursor-pointer">
        <circle cx={cx} cy={cy} r="4" fill="#FFD700"/>
        <circle cx={cx} cy={cy} r="4" fill="#FFD700" className="animate-map-ping" style={{ animationDelay: delay, transformOrigin: `${cx}px ${cy}px`, animationDuration: '2s' }} />
        <title>{`@${username}: ${message}`}</title>
    </g>
);

export const NeonMap: React.FC = () => {
    return (
        <svg width="100%" height="100%" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
            <defs>
                <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
                 <filter id="neon-glow-gold" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2" result="coloredBlurGold" />
                    <feMerge>
                        <feMergeNode in="coloredBlurGold" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
            {/* Grid background */}
            <path d="M0 25H400 M0 50H400 M0 75H400 M0 100H400 M0 125H400 M0 150H400 M0 175H400 M0 200H400" stroke="#A3E635" strokeOpacity="0.1" strokeWidth="1"/>
            <path d="M25 0V225 M50 0V225 M75 0V225 M100 0V225 M125 0V225 M150 0V225 M175 0V225 M200 0V225 M225 0V225 M250 0V225 M275 0V225 M300 0V225 M325 0V225 M350 0V225 M375 0V225" stroke="#A3E635" strokeOpacity="0.1" strokeWidth="1"/>
            
            {/* Main streets */}
            <g filter="url(#neon-glow)">
                <path d="M50 0V225" stroke="#A3E635" strokeWidth="2"/>
                <path d="M150 0V225" stroke="#A3E635" strokeWidth="2"/>
                <path d="M250 0V225" stroke="#A3E635" strokeWidth="2"/>
                <path d="M350 0V225" stroke="#A3E635" strokeWidth="2"/>
                <path d="M0 75H400" stroke="#A3E635" strokeWidth="2.5"/>
                <path d="M0 175H400" stroke="#A3E635" strokeWidth="2"/>
            </g>

            {/* Heatmap pings */}
             <g filter="url(#neon-glow-gold)">
                <HeatmapPing cx={100} cy={75} delay="0.1s" username="NOLA_Skater99" message="Getting ready for the #Sk8Hunt!" />
                <HeatmapPing cx={280} cy={120} delay="0.6s" username="AR_Fanatic" message="Can't wait to see the tech in action #Sk8Hunt" />
                <HeatmapPing cx={55} cy={180} delay="1.1s" username="BountyHunterB" message="JayNdaboX is going down! #Sk8Hunt" />
                <HeatmapPing cx={370} cy={60} delay="0.3s" username="CharityRider" message="Let's raise some money! #Sk8Hunt" />
                <HeatmapPing cx={180} cy={20} delay="0.8s" username="VieuxCarreVibes" message="The French Quarter is the perfect spot #Sk8Hunt" />
            </g>

            {/* AR Markers */}
            <g>
                <circle cx="80" cy="110" r="5" fill="#EC4899"/>
                <circle cx="80" cy="110" r="5" fill="#EC4899" className="animate-map-ping" style={{ transformOrigin: '80px 110px' }} />
            </g>
            <g>
                <circle cx="220" cy="50" r="5" fill="#EC4899"/>
                <circle cx="220" cy="50" r="5" fill="#EC4899" className="animate-map-ping" style={{ animationDelay: '0.5s', transformOrigin: '220px 50px' }}/>
            </g>
            <g>
                <circle cx="310" cy="190" r="5" fill="#EC4899"/>
                <circle cx="310" cy="190" r="5" fill="#EC4899" className="animate-map-ping" style={{ animationDelay: '1s', transformOrigin: '310px 190px' }}/>
            </g>
             <g>
                <circle cx="150" cy="175" r="5" fill="#EC4899"/>
                <circle cx="150" cy="175" r="5" fill="#EC4899" className="animate-map-ping" style={{ animationDelay: '0.2s', transformOrigin: '150px 175px' }}/>
            </g>
        </svg>
    );
};