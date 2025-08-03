"use client";
import { useEffect, useRef } from "react";
import { useEditor } from "../../context/editor.context";

interface Props {
    onChange?: (value: string) => void;
}

declare global {
    interface Window {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        grecaptcha: any;
        onRecaptchaLoad: () => void;
    }
}

const CaptchaRoot = ({ onChange }: Props) => {
    const recaptchaRef = useRef<HTMLDivElement>(null);
    const renderedRef = useRef(false);

    //Editor
    const { captchaSiteKey } = useEditor();

    useEffect(() => {
        const renderCaptcha = () => {
            if (!recaptchaRef.current || renderedRef.current) return;
            window.grecaptcha.render(recaptchaRef.current, {
                sitekey: captchaSiteKey,
                callback: (token: string) => onChange?.(token),
            });
            renderedRef.current = true;
        };

        if (window.grecaptcha && window.grecaptcha.render) {
            renderCaptcha();
        } else {
            window.onRecaptchaLoad = () => renderCaptcha();
            const script = document.createElement("script");
            script.src = "https://www.google.com/recaptcha/api.js?onload=onRecaptchaLoad&render=explicit";
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onChange]);

    return <div ref={recaptchaRef} />;
};

export default CaptchaRoot;
