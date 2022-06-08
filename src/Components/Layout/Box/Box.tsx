import React, { FunctionComponent } from 'react';

interface IBoxProps {
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
}

export const Box: FunctionComponent<IBoxProps> = ({
    width,
    height,
    style,
    children
}) => {
    const _style = (): React.CSSProperties => {
        let o: React.CSSProperties = {};

        if (width !== undefined) o.width = width;
        if (height !== undefined) o.height = height;
        return {
            ...o,
            ...style
        }
    }

    return <div style={_style()}>
        {children}
    </div>
}