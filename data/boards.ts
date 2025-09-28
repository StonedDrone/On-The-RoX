import type { Board } from '../types';

export const boards: Board[] = [
    {
        id: 'starter-deck',
        name: 'Starter Deck',
        description: 'The reliable default. Gets you from A to B without any fuss.',
        cost: 0,
        imageUrl: 'https://i.imgur.com/a9hGL2j.png', 
    },
    {
        id: 'urban-glider',
        name: 'Urban Glider',
        description: 'Lightweight and agile, with enhanced battery for longer city hunts.',
        cost: 250,
        imageUrl: 'https://i.imgur.com/Fw5g5s0.png', 
    },
    {
        id: 'off-road-beast',
        name: 'Off-Road Beast',
        description: 'Tackle any terrain with rugged wheels and a reinforced frame.',
        cost: 500,
        imageUrl: 'https://i.imgur.com/c8JqV3p.png',
    },
    {
        id: 'ar-spectre',
        name: 'AR Spectre',
        description: 'High-tech deck with integrated AR display and a stealth-mode finish.',
        cost: 1000,
        imageUrl: 'https://i.imgur.com/Y3v1r0T.png',
    }
];
