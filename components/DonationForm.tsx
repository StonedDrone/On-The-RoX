import React, { useState, useEffect } from 'react';
import { PRESET_AMOUNTS, CASHAPP_QR_URL } from '../constants';
import { QRCodeModal } from './QRCodeModal';
import { ConfirmationModal } from './ConfirmationModal';
import { CashAppIcon, UploadIcon, CloseIcon } from './icons/Icons';
import { useUser } from '../hooks/useUser';

interface DonationFormProps {
    addDonation: (amount: number, name: string, avatarUrl?: string) => void;
}

export const DonationForm: React.FC<DonationFormProps> = ({ addDonation }) => {
    const { user, isLoggedIn } = useUser();
    const [amount, setAmount] = useState<number | ''>(50);
    const [name, setName] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [modalContent, setModalContent] = useState<{ type: 'cashapp'; qr: string; } | null>(null);
    const [error, setError] = useState('');
    const [avatar, setAvatar] = useState<string | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
    const [stagedDonation, setStagedDonation] = useState<{ amount: number; name: string; avatarUrl?: string; } | null>(null);

    useEffect(() => {
        if (isLoggedIn && user) {
            setName(user.displayName);
            setAvatar(user.avatarUrl || null);
            setFileName(null); // Don't show a filename for profile avatars
        } else {
            setName('');
            setAvatar(null);
        }
    }, [isLoggedIn, user]);

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

    const handlePayment = () => {
        if (typeof amount !== 'number' || amount <= 0) {
            setError('Please enter a valid bounty amount.');
            return;
        }
        setError('');

        const donorName = isAnonymous ? 'Anonymous' : (isLoggedIn && user ? user.displayName : (name || 'JayNdaboX Fan'));
        const donationAmount = amount;
        const donorAvatar = isAnonymous ? undefined : (isLoggedIn && user ? user.avatarUrl : avatar) ?? undefined;


        // Stage the donation for confirmation
        setStagedDonation({ amount: donationAmount, name: donorName, avatarUrl: donorAvatar });

        // Send email receipt for business records
        const subject = `New On The RoX Bounty: $${donationAmount} from ${donorName}`;
        const bodyLines = [
            `A new bounty has been placed for the On The RoX Sk8Hunt!`,
            ``,
            `Details:`,
            `- Amount: $${donationAmount.toLocaleString()}`,
            `- Name: ${donorName}`,
            `- Timestamp: ${new Date().toLocaleString()}`,
            `- Payment Method: Cash App`,
            ``,
            `This is an automated receipt for business records.`
        ];
        const body = bodyLines.join('\n');
        const mailtoLink = `mailto:ontherox2026@outlook.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.open(mailtoLink, '_blank');

        // Show QR code modal
        const qrUrl = CASHAPP_QR_URL;
        setModalContent({ type: 'cashapp', qr: qrUrl });
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

    const handleQRCodeModalClose = () => {
        setModalContent(null);
        // The confirmation modal will now appear via conditional rendering
    };

    const handleConfirmDonation = () => {
        if (stagedDonation) {
            addDonation(stagedDonation.amount, stagedDonation.name, stagedDonation.avatarUrl);
        }
        // Reset form and state
        setStagedDonation(null);
        setAmount(50);
        if (!isLoggedIn) {
            setName('');
            removeAvatar();
        }
        setIsAnonymous(false);
    };

    const handleCancelDonation = () => {
        setStagedDonation(null);
    };

    return (
        <div className="bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20 h-full">
            <h2 className="text-2xl font-bold text-light mb-6">Place a Bounty</h2>
            <div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-light/80 mb-2">Choose an amount</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {PRESET_AMOUNTS.map(p_amount => (
                            <button
                                type="button"
                                key={p_amount}
                                onClick={() => handleAmountClick(p_amount)}
                                className={`py-3 px-4 rounded-lg font-semibold transition-all duration-200 border-2 ${
                                    amount === p_amount 
                                    ? 'bg-purple/80 text-light border-purple' 
                                    : 'bg-dark-accent border-transparent hover:border-gold/50 text-light'
                                }`}
                                style={amount === p_amount ? { boxShadow: '0 0 12px #BF40BF' } : {}}
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
                            className="w-full bg-zinc-900 border border-primary/20 rounded-lg py-3 pl-7 pr-4 text-light focus:ring-primary focus:border-primary"
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
                        disabled={isAnonymous || isLoggedIn}
                        className="w-full bg-zinc-900 border border-primary/20 rounded-lg py-3 px-4 text-light disabled:opacity-50 focus:ring-primary focus:border-primary"
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
                
                {!isLoggedIn && (
                    <div className="mb-8">
                        <label className="block text-sm font-medium text-light/80 mb-2">Add a Profile Picture (Optional)</label>
                        <div className="mt-1 flex items-center">
                            <label htmlFor="avatar-upload" className="cursor-pointer bg-zinc-900 border border-primary/20 rounded-md py-2 px-3 text-sm font-medium text-light hover:bg-zinc-800 flex items-center transition-colors">
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
                )}


                <div className="space-y-4 pt-4 border-t border-primary/10">
                    <p className="text-center text-sm font-medium text-light/80">Complete your bounty using:</p>
                     <div className="flex justify-center">
                        <button 
                            type="button" 
                            onClick={handlePayment} 
                            className="w-full sm:w-auto flex items-center justify-center bg-dark-accent text-light font-bold py-4 px-8 rounded-lg transition-all duration-300 hover:scale-105 border-2 border-gold hover:bg-gold/20"
                            style={{ boxShadow: '0 0 12px #FFD700' }}
                        >
                            <CashAppIcon className="w-6 h-6 mr-2 text-secondary" /> Pay with Cash App
                        </button>
                     </div>
                </div>
            </div>
            {modalContent && <QRCodeModal content={modalContent} onClose={handleQRCodeModalClose} />}
            {stagedDonation && !modalContent && (
                <ConfirmationModal
                    details={stagedDonation}
                    onClose={handleCancelDonation}
                    onConfirm={handleConfirmDonation}
                />
            )}
        </div>
    );
};