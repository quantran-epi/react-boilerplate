import { IAppContextData } from './IAppContext';
import { useContext } from "react"
import { AppContext } from './AppContextProvider';
import { IServiceLocator } from '@services/ServiceLocator';

interface IUseAppContext {
    services: IServiceLocator;
}

interface IUseAppContextProps {

}

export const useAppContext = (props?: IUseAppContextProps): IUseAppContext => {
    const contextData = useContext<IAppContextData>(AppContext);

    return {
        services: contextData.services
    }
}