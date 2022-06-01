import React, { FunctionComponent } from 'react';
import { Space } from '../Space';

interface ICenterProps {
    children: React.ReactNode;
}

export const Center: FunctionComponent<ICenterProps> = (props) => {
    return <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center"
    }}>
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
        }}>
            {props.children}
        </div>
    </div>
}