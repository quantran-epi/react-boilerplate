import React, { FunctionComponent } from 'react';
import { Space } from '../Space';

interface ICenterProps {
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export const Center: FunctionComponent<ICenterProps> = (props) => {
    return <div style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        ...props.style
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