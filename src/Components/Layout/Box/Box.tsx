import React, { FunctionComponent } from 'react';

interface IBoxProps {
    width?: string | number;
    height?: string | number;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

export const Box = React.forwardRef<HTMLDivElement, IBoxProps>(({
    width,
    height,
    style,
    children,
    className,
    onClick
}, ref) => {
    const _style = (): React.CSSProperties => {
        let o: React.CSSProperties = {};

        if (width !== undefined) o.width = width;
        if (height !== undefined) o.height = height;
        return {
            ...o,
            ...style
        }
    }

    return <div ref={ref} style={_style()} className={className} onClick={onClick}>
        {children}
    </div>
})