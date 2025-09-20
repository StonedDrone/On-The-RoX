import React, { useState } from 'react';
import { PRESET_AMOUNTS, VENMO_QR_URL, CASHAPP_QR_URL } from '../constants';
import { QRCodeModal } from './QRCodeModal';
import { CreditCardIcon, VenmoIcon, CashAppIcon, UploadIcon, CloseIcon } from './icons/Icons';

interface DonationFormProps {
    addDonation: (amount: number, name: string, avatarUrl?: string) => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ addDonation }) => {
    const [amount, setAmount] = useState<number | ''>(50);
    const [name, setName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [modalContent, setModalContent] = useState<{ type: 'venmo' | 'cashapp'; qr: string; } | null>(null);
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setFileName(file.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatar(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeAvatar = () => {
        setAvatar(null);
        setFileName(null);
        const fileInput = document.getElementById('avatar-upload') as HTMLInputElement;
        if (fileInput) {
            fileInput.value = '';
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (typeof amount !== 'number' || amount <= 0) {
            setError('Please enter a valid bounty amount.');
            return;
        }
        setError('');
        addDonation(amount, isAnonymous ? 'Anonymous' : name, avatar ?? undefined);
        // Reset form
        setAmount(50);
        setName('');
        setIsAnonymous(false);
        removeAvatar();
    };
    
    const handleAmountClick = (presetAmount: number) => {
        setAmount(presetAmount);
        setError('');
    }

    const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setError('');
        if (value === '') {
            setAmount('');
        } else {
            setAmount(Number(value));
        }
    }

    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20 h-full">
            <h2 className="text-2xl font-bold text-light mb-6">Place a Bounty</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-light/80 mb-2">Choose an amount</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map(p_amount => (
                            <button
                                type="button"
                                key={p_amount}
                                onClick={() => handleAmountClick(p_amount)}
                                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${amount === p_amount ? 'bg-primary text-light ring-2 ring-primary' : 'bg-dark-accent hover:bg-purple-700 text-light'}`}
                            >
                                ${p_amount}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mb-6">
                    <label htmlFor="custom-amount" className="block text-sm font-medium text-light/80 mb-2">Or enter a custom amount</label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-light/60">$</span>
                        <input
                            type="number"
                            id="custom-amount"
                            value={amount}
                            onChange={handleCustomAmountChange}
                            className="w-full bg-purple-900/50 border border-primary/20 rounded-lg py-3 pl-7 pr-4 text-light focus:ring-primary focus:border-primary"
                            placeholder="5.00"
                            min="1"
                        />
                    </div>
                     {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-light/80 mb-2">Your Name (Optional)</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isAnonymous}
                        className="w-full bg-purple-900/50 border border-primary/20 rounded-lg py-3 px-4 text-light disabled:opacity-50 focus:ring-primary focus:border-primary"
                        placeholder="JayNdaboX Fan"
                    />
                </div>
                
                <div className="mb-6">
                     <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={isAnonymous}
                            onChange={(e) => setIsAnonymous(e.target.checked)}
                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="ml-2 text-light/80">Place bounty anonymously</span>
                    </label>
                </div>
                
                <div className="mb-8">
                    <label className="block text-sm font-medium text-light/80 mb-2">Add a Profile Picture (Optional)</label>
                    <div className="mt-1 flex items-center">
                        <label htmlFor="avatar-upload" className="cursor-pointer bg-purple-900/50 border border-primary/20 rounded-md py-2 px-3 text-sm font-medium text-light hover:bg-purple-800/50 flex items-center transition-colors">
                            <UploadIcon className="w-5 h-5 mr-2" />
                            <span>Choose File</span>
                        </label>
                        <input id="avatar-upload" name="avatar-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </div>
                    {avatar && fileName && (
                        <div className="mt-3 flex items-center">
                            <img src={avatar} alt="Avatar preview" className="w-10 h-10 rounded-full object-cover" />
                            <span className="ml-3 text-sm text-light/80 truncate">{fileName}</span>
                            <button type="button" onClick={removeAvatar} className="ml-3 text-red-400 hover:text-red-300 transition-colors" aria-label="Remove image">
                                <CloseIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    )}
                </div>

                <div className="space-y-4">
                     <button type="submit" className="w-full flex items-center justify-center bg-primary hover:bg-pink-600 text-light font-bold py-4 px-4 rounded-lg transition-transform duration-200 hover:scale-105 animate-pulse-glow">
                        <CreditCardIcon className="w-6 h-6 mr-2" /> Place Bounty with Card (Primary)
                     </button>
                     <div className="grid grid-cols-2 gap-4">
                        <button type="button" onClick={() => setModalContent({ type: 'venmo', qr: VENMO_QR_URL })} className="w-full flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-light font-bold py-3 px-4 rounded-lg transition-transform duration-200 hover:scale-105">
                            <VenmoIcon className="w-6 h-6 mr-2" /> Venmo
                        </button>
                        <button type="button" onClick={() => setModalContent({ type: 'cashapp', qr: CASHAPP_QR_URL })} className="w-full flex items-center justify-center bg-secondary hover:bg-lime-500 text-dark font-bold py-3 px-4 rounded-lg transition-transform duration-200 hover:scale-105">
                            <CashAppIcon className="w-6 h-6 mr-2" /> Cash App
                        </button>
                     </div>
                </div>
            </form>
            {modalContent && <QRCodeModal content={modalContent} onClose={() => setModalContent(null)} />}
        </div>
    );
};