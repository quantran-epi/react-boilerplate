import React, { FunctionComponent } from 'react';
import { ISpaceProps, Space } from '../Space';

interface IStackProps {
    direction?: "row" | "column";
    justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly" | "initial" | "inherit";
    align?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
    wrap?: "nowrap" | "wrap" | "wrap-reverse" | "initial" | "inherit";
    alignSelf?: "auto" | "stretch" | "center" | "flex-start" | "flex-end" | "baseline" | "initial" | "inherit";
    gap?: ISpaceProps["size"];
    children: React.ReactNode;
    style?: React.CSSProperties;
    onClick?: () => void;
    className?: string;
}

export const Stack: FunctionComponent<IStackProps> = ({
    align,
    direction,
    justify,
    alignSelf,
    wrap,
    gap = "middle",
    children,
    style,
    onClick,
    className
}) => {
    const _styles = (): React.CSSProperties => {
        return {
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            alignSelf: alignSelf,
            flexWrap: wrap,
            ...style
        }
    }

    return <Space style={_styles()} size={gap} onClick={onClick} className={className}>
        {children}
    </Space>
}