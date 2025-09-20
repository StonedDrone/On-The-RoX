
import React from 'react';

type IconProps = React.SVGProps<SVGSVGElement>;

export const LogoIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
    </svg>
);

export const MenuIcon: React.FC<IconProps> = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="3" y1="12" x2="21" y2="12"></line>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <line x1="3" y1="18" x2="21" y2="18"></line>
  </svg>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export const CreditCardIcon: React.FC<IconProps> = (props) => (
  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" {...props}>
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

export const VenmoIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M16.9,4.3c-0.2-1.8-1.5-3.3-3.4-3.7C12.1,0.2,9.3,1,7.5,3C5.7,5,5.1,7.8,6.1,10.2c1.2,3,4.2,6.3,4.3,6.3c0.1,0.1,0.2,0.1,0.3,0.1 s0.2,0,0.3-0.1c0,0,3.1-3.3,4.3-6.3C16.4,7.8,17,5.8,16.9,4.3z M12,11.3c-1.8,0-3.3-1.5-3.3-3.3s1.5-3.3,3.3-3.3s3.3,1.5,3.3,3.3 S13.8,11.3,12,11.3z" />
    </svg>
);

export const CashAppIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M13.5,16h-3v-2.5H9V12h1.5V9.5H9V8h4.5 c0.828,0,1.5,0.672,1.5,1.5v5C15,15.328,14.328,16,13.5,16z M13.5,11h-3V9.5h3V11z"/>
    </svg>
);

export const HeartIcon: React.FC<IconProps> = (props) => (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
    </svg>
);
