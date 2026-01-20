import { useState, useEffect } from 'react';

const QUERY = '(prefers-reduced-motion: no-preference)';

export function useReducedMotion() {
    // Default to no-preference to avoid hydration mismatch
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQueryList = window.matchMedia(QUERY);

        // Set initial value
        setPrefersReducedMotion(!mediaQueryList.matches);

        const listener = (event: MediaQueryListEvent) => {
            setPrefersReducedMotion(!event.matches);
        };

        if (mediaQueryList.addEventListener) {
            mediaQueryList.addEventListener('change', listener);
        } else {
            // Fallback for older browsers
            mediaQueryList.addListener(listener);
        }

        return () => {
            if (mediaQueryList.removeEventListener) {
                mediaQueryList.removeEventListener('change', listener);
            } else {
                mediaQueryList.removeListener(listener);
            }
        };
    }, []);

    return prefersReducedMotion;
}
