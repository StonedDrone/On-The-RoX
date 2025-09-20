
import { useState, useCallback } from 'react';
import type { Donation } from '../types';

export const useDonationData = () => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [donorCount, setDonorCount] = useState(0);
    const [donations, setDonations] = useState<Donation[]>([]);

    const addDonation = useCallback((amount: number, name: string) => {
        setTotalAmount(prev => prev + amount);
        setDonorCount(prev => prev + 1);
        const newDonation: Donation = {
            id: new Date().toISOString(),
            name: name || 'Anonymous',
            amount,
            timestamp: new Date()
        };
        setDonations(prev => [newDonation, ...prev.slice(0, 14)]);
    }, []);

    return { totalAmount, donorCount, donations, addDonation };
};
