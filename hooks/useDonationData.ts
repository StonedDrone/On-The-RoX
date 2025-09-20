
import { useState, useEffect, useCallback } from 'react';
import type { Donation } from '../types';

const FAKE_NAMES = [
  'Sk8erBoi', 'RiderX', 'Anonymous', 'CarbonFiberFan', 'WheelieKing', 'DeckMaster', 'Anonymous', 'UrbanExplorer', 'SpeedDemon', 'Anonymous'
];

export const useDonationData = (goal: number) => {
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

    useEffect(() => {
        const interval = setInterval(() => {
            if (totalAmount < goal * 0.9) { // Stop simulating when close to the goal
                const randomAmount = Math.floor(Math.random() * 50) + 5;
                const randomName = FAKE_NAMES[Math.floor(Math.random() * FAKE_NAMES.length)];
                addDonation(randomAmount, randomName);
            }
        }, 5000); // Add a new donation every 5 seconds

        return () => clearInterval(interval);
    }, [addDonation, totalAmount, goal]);

    return { totalAmount, donorCount, donations, addDonation };
};