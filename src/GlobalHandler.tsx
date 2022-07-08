import { useEffect } from "react";

export const GlobalHandler = () => {
    useEffect(() => {
        window.addEventListener('online', () => alert('Became online'));
        window.addEventListener('offline', () => alert('Became offline'));
    }, [])

    return null;
}