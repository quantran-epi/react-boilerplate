import { useContext } from "react";
import { AppContext } from './AppContextProvider';
import { IAppContextData } from './IAppContext';

interface IUseAppContext extends IAppContextData {
}

interface IUseAppContextProps {

}

export const useAppContext = (props?: IUseAppContextProps): IUseAppContext => {
    const contextData = useContext<IAppContextData>(AppContext);

    return {
        ...contextData
    }
}