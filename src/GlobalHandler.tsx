import { useEffect } from "react";

export const GlobalHandler = () => {
    useEffect(() => {
        window.addEventListener('online', () => console.log('Became online'));
        window.addEventListener('offline', () => console.log('Became offline'));
    }, [])

    return null;
}