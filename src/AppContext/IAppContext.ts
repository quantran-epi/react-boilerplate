import { IServiceLocator } from "@services/ServiceLocator";

export interface IAppContextData {
    services: IServiceLocator;
    data: {
        currentFunction: string;
    },
    functions: {
        setCurrentFunction: (value: string) => void;
    }
}

export interface IAppContextProviderProps {
    services: IServiceLocator;
    children: React.ReactNode;
}