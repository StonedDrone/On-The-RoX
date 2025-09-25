import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, UserDonation } from '../types';

const USER_STORAGE_KEY = 'ontherox_user';

interface UserContextType {
    user: User | null;
    isLoggedIn: boolean;
    login: (username: string) => void;
    logout: () => void;
    updateUser: (data: Partial<Omit<User, 'username'>>) => void;
    addDonationToProfile: (donation: Omit<UserDonation, 'timestamp'> & { timestamp?: Date }) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem(USER_STORAGE_KEY);
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                // Make sure date objects are correctly parsed
                parsedUser.donations = parsedUser.donations.map((d: any) => ({...d, timestamp: new Date(d.timestamp)}));
                setUser(parsedUser);
            }
        } catch (error) {
            console.error("Failed to load user from localStorage", error);
            localStorage.removeItem(USER_STORAGE_KEY);
        }
    }, []);

    const saveUser = (userData: User | null) => {
        if (userData) {
            localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userData));
        } else {
            localStorage.removeItem(USER_STORAGE_KEY);
        }
        setUser(userData);
    };

    const login = useCallback((username: string) => {
        if (!username) return;
        
        // For this client-side example, we'll just create a new user or load if exists.
        // A real app would have a backend check.
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            if (parsedUser.username.toLowerCase() === username.toLowerCase()) {
                 saveUser(parsedUser);
                 return;
            }
        }

        const newUser: User = {
            username,
            displayName: username,
            solaceCoins: 150,
            donations: [],
        };
        saveUser(newUser);
    }, []);

    const logout = useCallback(() => {
        saveUser(null);
    }, []);

    const updateUser = useCallback((data: Partial<Omit<User, 'username'>>) => {
        setUser(currentUser => {
            if (!currentUser) return null;
            const updatedUser = { ...currentUser, ...data };
            saveUser(updatedUser);
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
            saveUser(updatedUser);
            return updatedUser;
        });
    }, []);

    const value = {
        user,
        isLoggedIn: !!user,
        login,
        logout,
        updateUser,
        addDonationToProfile
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