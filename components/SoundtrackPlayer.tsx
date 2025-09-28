import React, { useState, useRef, useEffect, memo } from 'react';
import type { CountdownState } from '../types';

interface SoundtrackPlayerProps {
    countdown: CountdownState;
}

const VolumeUpIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
  </svg>
);

const VolumeOffIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" {...props}>
    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
);


export const SoundtrackPlayer: React.FC<SoundtrackPlayerProps> = memo(({ countdown }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isMuted, setIsMuted] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Start playback on first user interaction
    useEffect(() => {
        const enableAudio = () => {
            setHasInteracted(true);
            if (audioRef.current) {
                audioRef.current.play().catch(error => console.error("Audio play failed:", error));
                setIsMuted(false); // Unmute on first interaction
            }
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('keydown', enableAudio);
        };

        window.addEventListener('click', enableAudio);
        window.addEventListener('keydown', enableAudio);

        return () => {
            window.removeEventListener('click', enableAudio);
            window.removeEventListener('keydown', enableAudio);
        };
    }, []);

    // Update playback rate based on countdown
    useEffect(() => {
        if (!audioRef.current) return;

        const { days, hours, minutes, seconds } = countdown;
        const totalSecondsRemaining = days * 86400 + hours * 3600 + minutes * 60 + seconds;
        
        let newRate = 1.0;
        if (totalSecondsRemaining <= 10) newRate = 1.5;
        else if (totalSecondsRemaining <= 60) newRate = 1.3;
        else if (totalSecondsRemaining <= 600) newRate = 1.2;
        else if (totalSecondsRemaining <= 3600) newRate = 1.1;
        else if (totalSecondsRemaining <= 86400) newRate = 1.05;

        audioRef.current.playbackRate = newRate;

    }, [countdown]);

    const toggleMute = () => {
        if (audioRef.current) {
            audioRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
            // If user mutes, ensure we don't auto-unmute on next interaction
            if (!hasInteracted) setHasInteracted(true); 
        }
    };

    return (
        <div>
            {/* Note: User must provide their own audio file at this path */}
            <audio ref={audioRef} src="/audio/cyber-dystopia-soundtrack.mp3" loop autoPlay muted={isMuted} />
            <button
                onClick={toggleMute}
                className="fixed bottom-4 right-4 z-50 p-2 bg-dark-accent/80 backdrop-blur-md rounded-full text-light/70 hover:text-light transition-colors"
                aria-label={isMuted ? "Unmute soundtrack" : "Mute soundtrack"}
            >
                {isMuted ? <VolumeOffIcon className="w-6 h-6" /> : <VolumeUpIcon className="w-6 h-6" />}
            </button>
        </div>
    );
});
SoundtrackPlayer.displayName = 'SoundtrackPlayer';