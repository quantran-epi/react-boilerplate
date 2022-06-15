import React, { FunctionComponent, useEffect, useState } from 'react';
import { IAppContextData, IAppContextProviderProps } from './IAppContext';

const defaultContextData: IAppContextData = {
    services: {} as any,
    data: {
        currentFunction: ""
    },
    functions: {
        setCurrentFunction: (value) => { }
    }
};
export const AppContext = React.createContext<IAppContextData>(defaultContextData);

export const AppContextProvider: FunctionComponent<IAppContextProviderProps> = ({
    services,
    children
}) => {
    const [_currentFunction, _setCurrentFunction] = useState("");

    const _reloadContext = () => {
        _setContextData({
            ..._contextData,
            data: {
                currentFunction: _currentFunction
            }
        })
    }

    const [_contextData, _setContextData] = useState<IAppContextData>({
        ...defaultContextData,
        services
    });

    useEffect(() => {
        _reloadContext();
    }, [_currentFunction])

    return <AppContext.Provider value={_contextData}>
        {children}
    </AppContext.Provider>
}