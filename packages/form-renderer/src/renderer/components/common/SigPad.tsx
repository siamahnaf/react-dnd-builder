import React, { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from "react";
import SignaturePad, { Options, PointGroup, ToSVGOptions } from "signature_pad";

export interface SignatureCanvasProps extends Options {
    canvasProps?: React.CanvasHTMLAttributes<HTMLCanvasElement>;
    clearOnResize?: boolean;
    background?: string;
    onChange?: (hasContent: boolean) => void; // New onChange prop
}

type FileType = "image/jpeg" | "image/svg+xml" | "image/png";

export interface SignatureCanvasRef {
    clear: () => void;
    isEmpty: () => boolean;
    toDataURL: (type?: FileType, encoderOptions?: number) => string;
    toFile: (type?: FileType, encoderOptions?: number) => File;
    toSVG: (options?: ToSVGOptions) => string;
    fromDataURL: (dataUrl: string, options?: { ratio?: number; width?: number; height?: number; xOffset?: number; yOffset?: number }) => Promise<void>;
    toData: () => PointGroup[];
    fromData: (pointGroups: PointGroup[], options?: { clear?: boolean }) => void;
    getCanvas: () => HTMLCanvasElement;
    getSignaturePad: () => SignaturePad;
    on: () => void;
    off: () => void;
}

const SignatureCanvas = forwardRef<SignatureCanvasRef, SignatureCanvasProps>(
    ({ canvasProps, clearOnResize = true, background, onChange, ...sigPadProps }, ref) => {
        const canvasRef = useRef<HTMLCanvasElement | null>(null);
        const sigPadRef = useRef<SignaturePad | null>(null);
        const hasContentRef = useRef(false); // Track if canvas has content
        const onChangeRef = useRef(onChange); // Ref to latest onChange function

        // Update onChange ref when prop changes
        useEffect(() => {
            onChangeRef.current = onChange;
        }, [onChange]);

        // Function to notify parent of content changes
        const notifyContentChange = useCallback((hasContent: boolean) => {
            if (hasContent !== hasContentRef.current) {
                hasContentRef.current = hasContent;
                onChangeRef.current?.(hasContent);
            }
        }, []);

        useEffect(() => {
            if (canvasRef.current) {
                sigPadRef.current = new SignaturePad(canvasRef.current, sigPadProps);

                // Set up event listeners
                const handleBeginStroke = () => notifyContentChange(true);
                const handleEndStroke = () => {
                    // Check if canvas is empty after stroke ends
                    if (sigPadRef.current?.isEmpty()) {
                        notifyContentChange(false);
                    }
                };

                sigPadRef.current.addEventListener('beginStroke', handleBeginStroke);
                sigPadRef.current.addEventListener('endStroke', handleEndStroke);

                resizeCanvas();
                window.addEventListener("resize", handleResize);

                return () => {
                    window.removeEventListener("resize", handleResize);
                    sigPadRef.current?.off();
                };
            }
        }, [notifyContentChange]);

        useEffect(() => {
            if (sigPadRef.current) {
                Object.assign(sigPadRef.current, sigPadProps);
            }
        }, [sigPadProps]);

        const getCanvas = (): HTMLCanvasElement => {
            if (!canvasRef.current) {
                throw new Error("Canvas reference is null.");
            }
            return canvasRef.current;
        };

        const getSignaturePad = (): SignaturePad => {
            if (!sigPadRef.current) {
                throw new Error("SignaturePad reference is null.");
            }
            return sigPadRef.current;
        };

        const handleResize = () => {
            if (clearOnResize) {
                resizeCanvas();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        };

        const resizeCanvas = () => {
            if (!canvasRef.current) return;
            const canvas = getCanvas();
            const ratio = Math.max(window.devicePixelRatio ?? 1, 1);
            if (!canvasProps?.width) {
                canvas.width = canvas.offsetWidth * ratio;
            }
            if (!canvasProps?.height) {
                canvas.height = canvas.offsetHeight * ratio;
            }
            canvas.getContext("2d")!.scale(ratio, ratio);
            getSignaturePad().clear();
            notifyContentChange(false); // Notify after clear
        };

        const dataURLToBlob = (dataURL: string) => {
            const arr = dataURL.split(",");
            const mime = arr[0].match(/:(.*?);/)![1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        };

        // Expose methods
        useImperativeHandle(ref, () => ({
            clear: () => {
                getSignaturePad().clear();
                notifyContentChange(false); // Notify after clear
            },
            isEmpty: () => getSignaturePad().isEmpty(),
            toDataURL: (type = "image/png", encoderOptions?: number) => getSignaturePad().toDataURL(type, encoderOptions),
            toFile: (type = "image/png", encoderOptions?: number) => {
                const dataURL = getSignaturePad().toDataURL(type, encoderOptions);
                const blob = dataURLToBlob(dataURL);
                const ext = type === "image/png" ? ".png" : type === "image/jpeg" ? ".jpg" : ".svg";
                const file = new File([blob], `signature${ext}`, { type: type });
                return file;
            },
            toSVG: (options?: ToSVGOptions) => getSignaturePad().toSVG(options),
            fromDataURL: (dataUrl: string, options?: { ratio?: number; width?: number; height?: number; xOffset?: number; yOffset?: number }) =>
                getSignaturePad().fromDataURL(dataUrl, options).then(() => {
                    // Check if canvas has content after loading data
                    notifyContentChange(!getSignaturePad().isEmpty());
                }),
            toData: () => getSignaturePad().toData(),
            fromData: (pointGroups: PointGroup[], options?: { clear?: boolean }) => {
                getSignaturePad().fromData(pointGroups, options);
                notifyContentChange(!getSignaturePad().isEmpty()); // Check content after loading data
            },
            getCanvas: () => getCanvas(),
            getSignaturePad: () => getSignaturePad(),
            on: () => getSignaturePad().on(),
            off: () => getSignaturePad().off()
        }));

        return <canvas ref={canvasRef} {...canvasProps} style={{ background }} />;
    }
);

export default SignatureCanvas;

SignatureCanvas.displayName = "SignatureCanvas";