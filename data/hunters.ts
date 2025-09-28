import type { Hunter } from '../types';

export const jayNdaboX: Hunter = {
    avatarUrl: 'https://i.imgur.com/gB43j6b.jpeg',
    name: 'JayNdaboX',
    alias: 'The Game Genie',
    bio: 'The elusive target. A master of the urban landscape, Jay combines high-speed esk8 skills with AR trickery to stay one step ahead. His custom board, "The SlotBoard," is a dazzling LED-powered machine, rumored to unlock hidden routes and abilities.',
    esk8: 'The SlotBoard (Custom AR-Integrated)',
    gps_enabled: false, // The target's GPS is always "offline"
};

export const rivalHunters: Hunter[] = [
    {
        avatarUrl: 'https://i.imgur.com/u5f8sL4.jpeg',
        name: 'Alex "Apex" Chen',
        alias: 'The Ghost Rider',
        bio: 'A former downhill champion, Apex is known for his aggressive lines and unparalleled cornering. He sees the hunt as the ultimate test of skill and is obsessed with being the first to the finish line.',
        esk8: 'Lacroix Nazaré Lonestar',
        gps_enabled: true,
    },
    {
        avatarUrl: 'https://i.imgur.com/r33d1oB.jpeg',
        name: 'Maya "Valkyrie" Jensen',
        alias: 'The Valkyrie',
        bio: 'A tech genius and data analyst, Valkyrie uses a network of public cameras and predictive algorithms to track her targets. Her approach is cold, calculating, and ruthlessly efficient.',
        esk8: 'Kaly NYC 2.0',
        gps_enabled: true,
    },
    {
        avatarUrl: 'https://i.imgur.com/sIzeR3Y.jpeg',
        name: 'Jax "Nomad" Ryder',
        alias: 'The Nomad',
        bio: 'A thrill-seeking explorer who knows the city\'s underbelly better than anyone. Nomad relies on instinct and knowledge of forgotten shortcuts and hidden paths to close in on his prey.',
        esk8: 'Bioboards Thorium X4',
        gps_enabled: false,
    },
    {
        avatarUrl: 'https://i.imgur.com/R3O2V3b.jpeg',
        name: 'Lena "Banshee" Petrova',
        alias: 'The Banshee',
        bio: 'An adrenaline junkie with a background in extreme sports. Banshee is fearless, known for taking high-risk, high-reward routes that other hunters wouldn\'t dare attempt.',
        esk8: 'Propel Endeavor 2S',
        gps_enabled: true,
    },
    {
        avatarUrl: 'https://i.imgur.com/fplEX4A.jpeg',
        name: 'Kenji "Ronin" Tanaka',
        alias: 'The Ronin',
        bio: 'A disciplined and patient hunter, Ronin is a master of observation. He studies his target\'s patterns, waiting for the perfect moment to strike with precision and speed.',
        esk8: 'Acedeck NYX Z1',
        gps_enabled: false,
    },
];

export const allHunters = [jayNdaboX, ...rivalHunters];
