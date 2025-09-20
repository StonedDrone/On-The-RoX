export interface Donation {
    id: string;
    name: string;
    amount: number;
    timestamp: Date;
    avatarUrl?: string;
}

export interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

// Fix: Add missing Hunter interface based on its usage in HunterCard.tsx
export interface Hunter {
    avatarUrl: string;
    name: string;
    alias: string;
    bio: string;
    esk8: string;
}