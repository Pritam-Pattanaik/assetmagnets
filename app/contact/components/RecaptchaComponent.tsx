'use client';

import { useEffect, useRef } from 'react';

interface RecaptchaComponentProps {
    siteKey: string;
}

const RecaptchaComponent = ({ siteKey }: RecaptchaComponentProps) => {
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const scriptLoaded = useRef(false);

    useEffect(() => {
        // Only run this once
        if (scriptLoaded.current) return;

        // Create and load the reCAPTCHA script
        const loadRecaptchaScript = () => {
            const script = document.createElement('script');
            script.src = 'https://www.google.com/recaptcha/api.js';
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
            scriptLoaded.current = true;
        };

        // Define the callback function that will be called by reCAPTCHA
        window.handleRecaptchaVerify = (token: string) => {
            // Create and dispatch a custom event with the token
            const event = new CustomEvent('recaptchaVerified', { detail: token });
            window.dispatchEvent(event);
        };

        loadRecaptchaScript();

        // Cleanup function
        return () => {
            delete window.handleRecaptchaVerify;
            // Remove the script if component unmounts
            const scripts = document.querySelectorAll('script');
            scripts.forEach(script => {
                if (script.src.includes('recaptcha/api.js')) {
                    script.remove();
                }
            });
        };
    }, []);

    return (
        <>
            <div
                ref={recaptchaRef}
                className="g-recaptcha"
                data-sitekey={siteKey}
                data-callback="handleRecaptchaVerify"
            ></div>
            <p className="text-xs text-gray-500 mt-1">Please complete the reCAPTCHA verification above</p>
        </>
    );
};

// Add the global type declaration for the window object
declare global {
    interface Window {
        handleRecaptchaVerify: (token: string) => void;
    }
}

export default RecaptchaComponent;