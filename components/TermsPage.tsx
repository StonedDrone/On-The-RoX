import React from 'react';
import * as ReactRouterDom from 'react-router-dom';

export const TermsPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8 animate-fade-in-up">
            <div className="max-w-4xl mx-auto bg-dark-accent/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-primary/20">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tighter text-light mb-6">
                    Terms & Conditions
                </h1>
                <div className="prose prose-invert prose-p:text-light/80 prose-headings:text-secondary prose-strong:text-light space-y-4 max-w-none">
                    <p>Welcome to On The RoX: Sk8Hunt! By participating, you agree to these terms. Please read them carefully.</p>
                    
                    <h2 className="text-2xl font-bold text-secondary">1. Participation</h2>
                    <p>
                        All participants must be 18 years of age or older. By registering, you confirm that you meet this requirement. You agree to participate safely and responsibly, respecting all local laws, traffic regulations, and private property. The organizers are not liable for any injuries or damages that may occur during the hunt.
                    </p>

                    <h2 className="text-2xl font-bold text-secondary">2. User Conduct</h2>
                    <p>
                        Hunters are expected to demonstrate good sportsmanship. Harassment, cheating, or any form of unsportsmanlike conduct will result in immediate disqualification and a ban from future events. User-generated content (display names, avatars) must not be offensive, hateful, or infringe on copyright.
                    </p>

                    <h2 className="text-2xl font-bold text-secondary">3. Data & Privacy</h2>
                    <p>
                        We collect your username and email address for identification, communication, and marketing purposes related to the Sk8Hunt. We will never sell your data to third parties. By registering, you agree to receive occasional email updates about the event.
                    </p>
                    
                    <h2 className="text-2xl font-bold text-secondary">4. Solace Coins & Donations</h2>
                    <p>
                        Solace Coins are a virtual currency with no real-world cash value. They can only be earned and spent within the On The RoX ecosystem. All donations are final and non-refundable. Proceeds support breast cancer awareness charities and event operational costs as outlined on the "The Hunt" page.
                    </p>

                    <h2 className="text-2xl font-bold text-secondary">5. Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. We will notify registered users of any significant changes. Continued participation after such changes constitutes your consent to the new terms.
                    </p>

                    <div className="text-center pt-6">
                         <ReactRouterDom.Link 
                            to="/" 
                            className="inline-block bg-primary text-light font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:bg-pink-500"
                        >
                            Back to the Bounty
                        </ReactRouterDom.Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
