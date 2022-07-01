import { IServerMenuItem } from '@models/Server/ServerMenuItem';
import { IServiceLocator } from "@services/ServiceLocator";

export interface IAppContext {
    services: IServiceLocator;
    currentFunction: string;
    setCurrentFunction: (value: string) => void;
}