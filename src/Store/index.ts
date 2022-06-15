import create from 'zustand';
import { IAppContext } from './AppContext';
export * from './AppContext';

export const useStore = create<IAppContext>((set) => ({
    currentFunction: "",
    setCurrentFunction: (value: string) => set(state => ({ currentFunction: value }))
}))
