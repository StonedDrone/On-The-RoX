import React, { useState } from 'react';

// Icons for accordion toggle
const PlusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
    </svg>
);
const MinusIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
    </svg>
);

const faqData = [
    { question: "1. What is On The RoX: Sk8Hunt?", answer: "It’s the first‑ever live E‑Sk8 manhunt blended with AR + music culture. 6 Hunters hit the streets chasing down JayNdaboX, while Watchers play along with the official JayNdaboX.IcU app, trying to track and intercept him too." },
    { question: "2. Is this staged or scripted?", answer: "Nope. Real streets. Real boards. Real hunters. Real shit. The only thing not 100% real is the AR overlays powered by Illust." },
    { question: "3. What’s the bigger purpose?", answer: "It’s all for Breast Cancer Awareness. Every single donation is tracked and notarized by NotaryGeek, so the public can watch funds go straight into the OTR charity account." },
    { question: "4. Who are “Watchers”?", answer: "Watchers = spectators + app users. They use JayNdaboX.IcU to follow the chase live, pick up AR clues, and can even intercept JayNdaboX in‑person." },
    {
        question: "5. What happens when a Watcher finds JayNdaboX?",
        answer: (
            <>
                <p>They get one spin on the SlotBoard — Jays LED Board built into the experience. Prizes range from:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                    <li>Exclusive game currency,</li>
                    <li>Merch + gear,</li>
                    <li>Real‑world rewards, maybe even their own board.</li>
                </ul>
            </>
        )
    },
    {
        question: "6. How many Hunters?",
        answer: (
            <>
                <p>6 official Hunters. All kitted identical:</p>
                <ul className="list-disc list-inside mt-2 space-y-1 pl-2">
                    <li>Boards (factory‑matched)</li>
                    <li>Glasses / AR setup</li>
                    <li>Triple Eight helmets, pads, and safety gear</li>
                </ul>
                <p className="mt-2">Nobody gets an unfair edge.</p>
            </>
        )
    },
    { question: "7. Isn’t this dangerous?", answer: "It’s a Hunt, so yeah — crashes happen. That’s why our first priority was safety. Gear is provided by Triple Eight. EMTs, Marshals, and event insurance are all in play." },
    { question: "8. What about bad weather?", answer: "Bring it. All boards are waterproof. If it rains, let it rain. The Hunt rolls on." },
    { question: "9. Can spectators get hurt?", answer: "Spectator areas are secured, and hunters face disqualification if they endanger the public. Marshals patrol nonstop." },
    { question: "10. What’s the app again?", answer: "JayNdaboX.IcU: The official event launch. Live hunt tracker, AR clues, donation portal, and Watcher gameplay all in one." },
    { question: "11. Where do donations go?", answer: "Directly into the On The RoX charity account, verified in real time by NotaryGeek for public transparency. No smoke, no mirrors — receipts are public." },
    { question: "12. Who’s handling the music?", answer: "Local Artists. We’re showcasing the city’s own talent on stage. The only exceptions are the two headliners (TBA)." },
    { question: "13. Do Hunters bring their own boards?", answer: "Nope. This is a standardized, level‑field hunt. Boards + safety rig issued by us." },
    { question: "14. Can I be a Watcher without skating?", answer: "Hell yes. That’s the whole point. Anybody with the app can play, chase, and maybe win prizes on the SlotBoard." },
    { question: "15. Why support this event?", answer: "Because it’s culture with a cause. Innovation, music, skate, AR — all tied to breast cancer awareness with transparent fundraising tracked live." }
];


interface FaqItemProps {
    question: string;
    answer: React.ReactNode;
    isOpen: boolean;
    onClick: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer, isOpen, onClick }) => {
    const cleanQuestion = question.replace(/^\d+\.\s*/, '');

    return (
        <div className="border-b border-secondary/20 last:border-b-0">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-5"
                aria-expanded={isOpen}
            >
                <h3 className="text-lg font-semibold text-purple hover:text-primary transition-colors">{cleanQuestion}</h3>
                <span className="text-secondary flex-shrink-0 ml-4">
                    {isOpen ? <MinusIcon className="w-6 h-6" /> : <PlusIcon className="w-6 h-6" />}
                </span>
            </button>
            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="pb-5 text-light/80">
                         {typeof answer === 'string' ? <p>{answer}</p> : answer}
                    </div>
                </div>
            </div>
        </div>
    );
};


export const FaqPage: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const handleToggle = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
            <div className="text-center mb-12">
                 <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-light">
                    What the <span className="text-secondary">FaQs</span>??
                </h1>
                <p className="mt-4 max-w-2xl mx-auto text-lg text-light/80">
                    Before you even ask, lemme see if I could answer them before you ask.
                </p>
            </div>

            <div className="max-w-4xl mx-auto bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-secondary/20">
                {faqData.map((item, index) => (
                    <FaqItem
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openIndex === index}
                        onClick={() => handleToggle(index)}
                    />
                ))}
            </div>
        </div>
    );
};