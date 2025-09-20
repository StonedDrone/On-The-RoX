import React from 'react';
import { LogoIcon } from './icons/Icons';

export const Footer: React.FC = () => {
    return (
        <footer className="bg-black/30 border-t border-primary/20">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center text-light/60">
                <div className="flex justify-center items-center mb-4">
                    <LogoIcon className="h-8 w-auto text-primary" />
                     <span className="ml-3 text-xl font-bold tracking-tighter text-light">
                        On The <span className="text-primary">RoX</span>
                    </span>
                </div>
                <p>An Augmented Reality Sk8Hunt for JayNdaboX</p>
                <p className="mt-2 text-sm">All proceeds support <span className="text-primary font-semibold">Breast Cancer Awareness</span>.</p>
                
                <div className="mt-6 pt-6 border-t border-primary/10">
                    <p className="text-sm font-semibold uppercase tracking-wider text-light/80">Proudly Sponsored By</p>
                    <div className="mt-4 flex justify-center items-center space-x-6 text-secondary font-medium">
                        <a href="https://triple8.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Triple Eight</a>
                        <a href="https://notarygeek.net/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">NotaryGeek</a>
                        <a href="https://www.illust.space/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Illust.space</a>
                    </div>
                </div>

                <p className="mt-8 text-xs">&copy; {new Date().getFullYear()} On The RoX. All rights reserved.</p>
            </div>
        </footer>
    );
}