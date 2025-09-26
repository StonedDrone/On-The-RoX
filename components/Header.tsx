import React from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { LogoIcon, MenuIcon, CloseIcon, UserIcon, LogoutIcon } from './icons/Icons';
import { useUser } from '../hooks/useUser';

interface HeaderProps {
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onLoginClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ isMenuOpen, setIsMenuOpen, onLoginClick }) => {
    const location = ReactRouterDom.useLocation();
    const { isLoggedIn, user, logout } = useUser();

    const navLinks = [
        { path: '/', name: 'Bounty' },
        { path: '/hunt', name: 'The Hunt' },
        { path: '/solace', name: 'Solace Coins' },
        { path: '/faq', name: 'FAQ' },
    ];

    const NavLink: React.FC<{ path: string; name: string; }> = ({ path, name }) => (
        <ReactRouterDom.Link
            to={path}
            onClick={() => setIsMenuOpen(false)}
            className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
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
                    <div className="hidden md:flex items-center">
                        <nav className="flex items-baseline space-x-4">
                            {navLinks.map((link) => (
                                <NavLink key={link.name} {...link} />
                            ))}
                        </nav>
                        <div className="ml-6 pl-6 border-l border-primary/20 flex items-center space-x-4">
                            {isLoggedIn && user ? (
                                <>
                                    <ReactRouterDom.Link to="/profile" className="flex items-center group">
                                        {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="Your Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-primary/50 group-hover:border-primary transition-colors" />
                                        ) : (
                                            <UserIcon className="w-8 h-8 p-1 rounded-full bg-dark-accent text-primary group-hover:text-secondary transition-colors" />
                                        )}
                                        <span className="ml-2 text-sm font-medium text-light/90 group-hover:text-light">{user.displayName}</span>
                                    </ReactRouterDom.Link>
                                    <button onClick={logout} className="p-2 rounded-full hover:bg-dark-accent text-light/70 hover:text-light" title="Logout">
                                        <LogoutIcon className="w-5 h-5" />
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={onLoginClick}
                                    className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-light/80 bg-dark-accent hover:bg-primary hover:text-light transition-colors"
                                >
                                    <UserIcon className="w-5 h-5 mr-1" />
                                    Login
                                </button>
                            )}
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
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-primary/20">
                        {navLinks.map((link) => (
                            <NavLink key={link.name} {...link} />
                        ))}
                        <div className="pt-4 mt-4 border-t border-primary/20 px-2">
                             {isLoggedIn && user ? (
                                <div className="flex items-center justify-between">
                                    <ReactRouterDom.Link to="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center group">
                                         {user.avatarUrl ? (
                                            <img src={user.avatarUrl} alt="Your Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-primary/50" />
                                        ) : (
                                            <UserIcon className="w-10 h-10 p-1 rounded-full bg-dark-accent text-primary" />
                                        )}
                                        <div className="ml-3">
                                            <p className="text-base font-medium text-light">{user.displayName}</p>
                                            <p className="text-sm text-light/70">View Profile</p>
                                        </div>
                                    </ReactRouterDom.Link>
                                    <button onClick={() => { logout(); setIsMenuOpen(false); }} className="p-2 rounded-md hover:bg-dark-accent text-light/70 hover:text-light" title="Logout">
                                        <LogoutIcon className="w-6 h-6" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={() => { onLoginClick(); setIsMenuOpen(false); }}
                                    className="w-full flex items-center justify-center px-3 py-2 rounded-md text-base font-medium text-light bg-primary hover:bg-pink-500 transition-colors"
                                >
                                    <UserIcon className="w-5 h-5 mr-2" />
                                    Login / Register
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};
