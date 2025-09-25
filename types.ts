export interface Donation {
    id: string;
    name: string;
    amount: number;
    timestamp: Date;
    avatarUrl?: string;
}

export interface UserDonation {
    amount: number;
    timestamp: Date;
}

export interface User {
    username: string;
    email: string;
    displayName: string;
    avatarUrl?: string;
    solaceCoins: number;
    donations: UserDonation[];
}

export interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface Hunter {
    avatarUrl: string;
    name: string;
    alias: string;
    bio: string;
    esk8: string;
}

export interface DonationToast {
    id: number;
    name: string;
    amount: number;
}