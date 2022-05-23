import React, { FunctionComponent, useState } from 'react';
import { IAppContextData, IAppContextProviderProps } from './IAppContext';

const defaultContextData: IAppContextData = {
    services: {} as any
};
export const AppContext = React.createContext<IAppContextData>(defaultContextData);

export const AppContextProvider: FunctionComponent<IAppContextProviderProps> = ({
    children
}) => {
    const [_contextData, _setContextData] = useState<IAppContextData>(defaultContextData);

    return <AppContext.Provider value={_contextData}>
        {children}
    </AppContext.Provider>
}