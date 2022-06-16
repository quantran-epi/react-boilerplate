import { RegisterServices } from '@services/ServiceLocator';
import create from 'zustand';
import { IAppContext } from './AppContext';
export * from './AppContext';

export const useStore = create<IAppContext>((set) => ({
    services: RegisterServices(),
    currentFunction: "",
    setCurrentFunction: (value: string) => set(state => ({ currentFunction: value }))
}))
