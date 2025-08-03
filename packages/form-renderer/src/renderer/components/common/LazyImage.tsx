import { useEffect, useRef, useState } from "react";

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallback?: React.ReactNode;
    className?: string;
}

const LazyImage = ({ src, alt = "", fallback = null, className = "", ...rest }: LazyImageProps) => {
    const imgRef = useRef<HTMLImageElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!imgRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // only load once
                }
            },
            {
                rootMargin: "100px",
                threshold: 0.1,
            }
        );

        observer.observe(imgRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <div className={className} ref={imgRef}>
            {isVisible ? (
                <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                    {...rest}
                />
            ) : (
                fallback
            )}
        </div>
    );
};

export default LazyImage;
