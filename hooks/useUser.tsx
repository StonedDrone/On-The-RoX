import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserDonation } from '../types';

const USERS_DB_KEY = 'ontherox_users_db';
const CURRENT_USER_KEY = 'ontherox_current_user';

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (username: string, email: string) => void;
    logout: () => void;
    updateUser: (data: Partial<Omit<User, 'username'>>) => void;
    addDonationToProfile: (donation: Omit<UserDonation, 'timestamp'> & { timestamp?: Date }) => void;
    referralMessage: string | null;
    clearReferralMessage: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [referralMessage, setReferralMessage] = useState<string | null>(null);

    const getUsersDb = (): { [key: string]: User } => {
        try {
            const dbString = localStorage.getItem(USERS_DB_KEY);
            return dbString ? JSON.parse(dbString) : {};
        } catch (e) {
            console.error("Failed to parse users DB", e);
            return {};
        }
    };

    const saveUsersDb = (db: { [key: string]: User }) => {
        try {
            localStorage.setItem(USERS_DB_KEY, JSON.stringify(db));
        } catch (error) {
            console.error("Failed to save users DB", error);
        }
    };

    useEffect(() => {
        // Handle referral link on initial load
        const url = new URL(window.location.href);
        const refUsername = url.hash.includes('?ref=') ? url.hash.split('?ref=')[1] : null;

        if (refUsername) {
            sessionStorage.setItem('ontherox_referrer', refUsername);
            const cleanUrl = url.origin + url.pathname + url.hash.split('?')[0];
            window.history.replaceState({}, document.title, cleanUrl);
        }

        // Auto-login user if available
        try {
            const currentUsername = localStorage.getItem(CURRENT_USER_KEY);
            if (currentUsername) {
                const usersDb = getUsersDb();
                const storedUser = usersDb[currentUsername.toLowerCase()];
                if (storedUser) {
                    storedUser.donations = storedUser.donations.map((d: any) => ({...d, timestamp: new Date(d.timestamp)}));
                    setUser(storedUser);
                }
            }
        } catch (error) {
            console.error("Failed to auto-login user", error);
        }
    }, []);

    const login = useCallback((username: string, email: string) => {
        if (!username || !email) return;

        const usersDb = getUsersDb();
        const lowerCaseUsername = username.toLowerCase();

        if (usersDb[lowerCaseUsername]) {
            // Existing user login
            setUser(usersDb[lowerCaseUsername]);
            localStorage.setItem(CURRENT_USER_KEY, username);
        } else {
            // New user registration
            const newUser: User = {
                username,
                email,
                displayName: username,
                solaceCoins: 150,
                donations: [],
            };

            // Check for referral
            const refUsername = sessionStorage.getItem('ontherox_referrer');
            if (refUsername) {
                const lowerCaseRefUsername = refUsername.toLowerCase();
                if (usersDb[lowerCaseRefUsername]) {
                    usersDb[lowerCaseRefUsername].solaceCoins += 25;
                    setReferralMessage(`Referral success! ${refUsername} was awarded 25 Solace Coins.`);
                }
                sessionStorage.removeItem('ontherox_referrer');
            }

            usersDb[lowerCaseUsername] = newUser;
            setUser(newUser);
            localStorage.setItem(CURRENT_USER_KEY, username);
            saveUsersDb(usersDb);

            // Send email notification for marketing purposes for the new user registration
            const subject = `New Hunter Registration: ${username}`;
            const body = `A new user has registered for the On The RoX Sk8Hunt!\n\nUsername: ${username}\nEmail: ${email}\nTimestamp: ${new Date().toLocaleString()}`;
            const mailtoLink = `mailto:ontherox2026@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.open(mailtoLink, '_blank');
        }
    }, []);

    const logout = useCallback(() => {
        setUser(null);
        localStorage.removeItem(CURRENT_USER_KEY);
    }, []);

    const updateUser = useCallback((data: Partial<Omit<User, 'username'>>) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const updatedUser = { ...currentUser, ...data };
            
            const usersDb = getUsersDb();
            usersDb[updatedUser.username.toLowerCase()] = updatedUser;
            saveUsersDb(usersDb);

            return updatedUser;
        });
    }, []);
    
    const addDonationToProfile = useCallback((donation: Omit<UserDonation, 'timestamp'> & { timestamp?: Date }) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const newDonation: UserDonation = {
                amount: donation.amount,
                timestamp: donation.timestamp || new Date(),
            };
            const updatedUser = {
                ...currentUser,
                donations: [newDonation, ...currentUser.donations],
            };
            
            const usersDb = getUsersDb();
            usersDb[updatedUser.username.toLowerCase()] = updatedUser;
            saveUsersDb(usersDb);

            return updatedUser;
        });
    }, []);
    
    const clearReferralMessage = useCallback(() => {
        setReferralMessage(null);
    }, []);

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
        addDonationToProfile,
        referralMessage,
        clearReferralMessage,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};