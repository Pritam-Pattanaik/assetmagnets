'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export function RecaptchaScript() {
    // Handle script load in a client component
    const handleScriptLoad = () => {
        console.log('reCAPTCHA script loaded successfully');
    };

    return (
        <Script
            src="https://www.google.com/recaptcha/api.js?render=explicit"
            strategy="afterInteractive"
            onLoad={handleScriptLoad}
        />
    );
}