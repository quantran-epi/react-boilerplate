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
    styles?: React.CSSProperties;
}

export const Stack: FunctionComponent<IStackProps> = ({
    align,
    direction,
    justify,
    alignSelf,
    wrap,
    gap = "middle",
    children,
    styles
}) => {
    const _styles = (): React.CSSProperties => {
        return {
            display: "flex",
            flexDirection: direction,
            justifyContent: justify,
            alignItems: align,
            alignSelf: alignSelf,
            flexWrap: wrap,
            ...styles
        }
    }

    return <Space style={_styles()} size={gap}>
        {children}
    </Space>
}