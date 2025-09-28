import React, { useState, useEffect } from 'react';
import * as ReactRouterDom from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { CoinIcon, UploadIcon, UserIcon, HeartIcon, LinkIcon } from './icons/Icons';
import { boards } from '../data/boards';
import type { Board } from '../types';

const timeAgo = (date: Date): string => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
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

const ProfilePage: React.FC = () => {
    const { user, updateUser, isLoggedIn, selectOrPurchaseBoard } = useUser();
    const navigate = ReactRouterDom.useNavigate();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [avatar, setAvatar] = useState(user?.avatarUrl || '');
    const [message, setMessage] = useState('');
    const [copyMessage, setCopyMessage] = useState('');
    const [boardMessage, setBoardMessage] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/'); // Redirect to home if not logged in
        } else if (user) {
            setDisplayName(user.displayName);
            setAvatar(user.avatarUrl || '');
        }
    }, [user, isLoggedIn, navigate]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = () => {
        updateUser({ displayName, avatarUrl: avatar });
        setMessage('Profile updated successfully!');
        setTimeout(() => setMessage(''), 3000);
    };

    const handleShare = () => {
        if (!user) return;
        const baseUrl = window.location.href.split('#')[0];
        const profileUrl = `${baseUrl}#/?ref=${user.username}`;
        navigator.clipboard.writeText(profileUrl).then(() => {
            setCopyMessage('Referral link copied!');
            setTimeout(() => setCopyMessage(''), 3000);
        }, (err) => {
            setCopyMessage('Failed to copy link.');
            console.error('Could not copy text: ', err);
            setTimeout(() => setCopyMessage(''), 3000);
        });
    };
    
    const handleBoardSelection = (board: Board) => {
        if (!user) return;
    
        const isUnlocked = user.unlockedBoards.includes(board.id);
    
        if (isUnlocked) {
            selectOrPurchaseBoard(board.id);
            setBoardMessage(`${board.name} equipped!`);
        } else {
            if (user.solaceCoins >= board.cost) {
                selectOrPurchaseBoard(board.id);
                setBoardMessage(`Unlocked ${board.name}!`);
            } else {
                setBoardMessage(`Not enough coins for ${board.name}.`);
            }
        }
        setTimeout(() => setBoardMessage(''), 3000);
    }


    if (!user) {
        return null; // Or a loading spinner
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light">
                    Hunter <span className="text-primary">Profile</span>
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    Customize your identity for the hunt. Your alias, your look.
                </p>
            </div>

            <div className="mt-12 max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Profile Details Card */}
                <div className="lg:col-span-1 bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-primary/20 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                    <h2 className="text-2xl font-bold text-light mb-6">Your Alias</h2>
                    <div className="flex flex-col items-center">
                        {avatar ? (
                             <img src={avatar} alt="Avatar" className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-primary" />
                        ) : (
                            <div className="w-32 h-32 rounded-full bg-dark flex items-center justify-center mb-4 border-4 border-primary/50">
                                <UserIcon className="w-16 h-16 text-primary" />
                            </div>
                        )}
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-zinc-900 border border-primary/20 rounded-md py-2 px-3 text-sm font-medium text-light hover:bg-zinc-800 flex items-center transition-colors">
                            <UploadIcon className="w-5 h-5 mr-2" />
                            <span>Change Avatar</span>
                        </label>
                        <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                        
                        <div className="w-full mt-6">
                            <label htmlFor="displayName" className="block text-sm font-medium text-light/80 mb-2">Display Name</label>
                            <input
                                type="text"
                                id="displayName"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                                className="w-full bg-zinc-900 border border-primary/20 rounded-lg py-2 px-3 text-light focus:ring-primary focus:border-primary"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="w-full mt-4">
                            <label htmlFor="email" className="block text-sm font-medium text-light/80 mb-2">Email Address</label>
                            <input
                                type="email"
                                id="email"
                                value={user.email || ''}
                                disabled
                                className="w-full bg-zinc-900/50 border border-primary/20 rounded-lg py-2 px-3 text-light/70 cursor-not-allowed"
                            />
                        </div>

                         <button
                            onClick={handleSaveChanges}
                            className="mt-6 w-full bg-primary text-light font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-primary"
                        >
                            Save Changes
                        </button>
                        {message && <p className="text-secondary text-sm mt-3 text-center">{message}</p>}
                    </div>
                </div>

                {/* Stats and History */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stash & Referral Card */}
                    <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-gold/20 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                         <h3 className="text-2xl font-bold text-light mb-4">Your Stash</h3>
                         <div className="flex items-center justify-between flex-wrap gap-4">
                            <div className="flex items-center space-x-4">
                                <CoinIcon className="w-10 h-10 text-gold" style={{ filter: 'drop-shadow(0 0 8px #FFD700)' }}/>
                                <div>
                                    <p className="text-3xl font-bold text-gold">{user.solaceCoins.toLocaleString()}</p>
                                    <p className="text-sm text-gold/80">Solace Coins</p>
                                </div>
                            </div>
                         </div>
                         <div className="mt-6 pt-6 border-t border-gold/20 text-center">
                            <h4 className="font-bold text-gold">Refer a Hunter, Earn Coins!</h4>
                            <p className="text-sm text-light/80 mt-2 max-w-md mx-auto">Share your unique link. When a new hunter signs up, you'll get <strong className="text-light">25 bonus Solace Coins</strong>!</p>
                             <button
                                onClick={handleShare}
                                className="mt-4 inline-flex items-center justify-center bg-secondary text-dark font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-lime-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-accent focus:ring-secondary"
                            >
                                <LinkIcon className="w-5 h-5 mr-2" />
                                {copyMessage ? copyMessage : 'Copy Your Referral Link'}
                            </button>
                         </div>
                    </div>
                     <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-secondary/20 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                        <h2 className="text-2xl font-bold text-light mb-6">Your Bounty History</h2>
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                            {user.donations.length === 0 ? (
                                <p className="text-light/60">You haven't placed any bounties yet.</p>
                            ) : (
                                user.donations.map((donation, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-black/20 rounded-lg">
                                        <div className="flex items-center">
                                            <div className="p-2 bg-secondary/20 rounded-full mr-3 shrink-0">
                                                <HeartIcon className="w-5 h-5 text-secondary" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-light">Bounty Placed</p>
                                                <p className="text-xs text-light/60">{timeAgo(donation.timestamp)}</p>
                                            </div>
                                        </div>
                                        <p className="font-bold text-secondary text-lg">${donation.amount.toLocaleString()}</p>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                     {/* Board Selection Card */}
                    <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border border-primary/20 animate-fade-in-up" style={{ animationDelay: '500ms' }}>
                        <h2 className="text-2xl font-bold text-light mb-2">Board Selection</h2>
                        <p className="text-sm text-light/70 mb-6">Choose your ride for the hunt. Unlock new boards with Solace Coins.</p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {boards.map(board => {
                                const isSelected = user.selectedBoard === board.id;
                                const isUnlocked = user.unlockedBoards.includes(board.id);
                                const canAfford = user.solaceCoins >= board.cost;

                                let button;
                                if (isSelected) {
                                    button = <button disabled className="w-full mt-auto bg-secondary text-dark font-bold py-2 px-4 rounded-lg cursor-default">Equipped</button>;
                                } else if (isUnlocked) {
                                    button = <button onClick={() => handleBoardSelection(board)} className="w-full mt-auto bg-primary text-light font-bold py-2 px-4 rounded-lg transition-colors hover:bg-pink-500">Equip</button>;
                                } else { // Locked
                                    button = <button onClick={() => handleBoardSelection(board)} disabled={!canAfford} className="w-full mt-auto bg-dark text-light font-bold py-2 px-4 rounded-lg border border-gold transition-colors enabled:hover:bg-gold/20 disabled:opacity-50 disabled:cursor-not-allowed">
                                        <div className="flex items-center justify-center">
                                            <CoinIcon className="w-4 h-4 mr-2 text-gold" />
                                            <span>{board.cost}</span>
                                        </div>
                                    </button>;
                                }

                                return (
                                    <div key={board.id} className={`flex flex-col p-4 rounded-lg border-2 transition-all ${isSelected ? 'border-secondary bg-secondary/10' : 'border-primary/20 bg-dark'}`}>
                                        <img src={board.imageUrl} alt={board.name} className="w-full h-24 object-contain rounded mb-4 bg-black/20 p-2" />
                                        <h4 className="font-bold text-light">{board.name}</h4>
                                        <p className="text-xs text-light/80 flex-grow mb-4">{board.description}</p>
                                        {button}
                                    </div>
                                );
                            })}
                        </div>
                        {boardMessage && <p className="text-secondary text-sm mt-4 text-center">{boardMessage}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;