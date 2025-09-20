import React from 'react';
// Fix: Use namespace import for react-router-dom to fix module resolution errors.
import * as ReactRouterDom from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon } from './icons/Icons';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen }) => {
    const location = ReactRouterDom.useLocation();

    const navLinks = [
        { path: '/', name: 'Bounty' },
        { path: '/hunt', name: 'The Hunt' },
    ];

    const NavLink: React.FC<{ path: string; name: string; }> = ({ path, name }) => (
        <ReactRouterDom.Link
            to={path}
            onClick={() => setIsMenuOpen(false)}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
                location.pathname === path
                    ? 'bg-primary text-light'
                    : 'text-light/80 hover:bg-dark-accent hover:text-light'
            }`}
        >
            {name}
        </ReactRouterDom.Link>
    );

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-lg border-b border-primary/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <ReactRouterDom.Link to="/" className="flex-shrink-0 flex items-center group">
                        <LogoIcon className="h-10 w-auto text-primary group-hover:text-secondary transition-colors duration-300" />
                        <span className="ml-3 text-2xl font-bold tracking-tighter text-light">
                            On The <span className="text-primary">RoX</span>
                        </span>
                    </ReactRouterDom.Link>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <NavLink key={link.name} {...link} />
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="bg-dark-accent inline-flex items-center justify-center p-2 rounded-md text-light/70 hover:text-light hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark focus:ring-light"
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? <CloseIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} {...link} />
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};