import { IServiceLocator } from "@services/ServiceLocator";

export interface IAppContextData {
    services: IServiceLocator;
}

export interface IAppContextProviderProps {
    services: IServiceLocator;
    children: React.ReactNode;
}