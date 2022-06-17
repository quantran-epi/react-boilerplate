import { CaretDownOutlined, CaretUpOutlined, YoutubeOutlined } from '@ant-design/icons';
import { AppColor } from '@common/Constants/AppColor';
import { Button } from "@components/Button";
import { Typography } from "@components/Typography";
import { ISidebarItem } from "@models/Sidebar";
import 'animate.css';
import classNames from "classnames";
import React, { FunctionComponent } from "react";
import { Box } from "../Box";
import { Space } from "../Space";
import { Stack } from "../Stack";
import { SIDEBAR_ITEM_HEIGHT } from "./SidebarMenu.constants";
import { SidebarMenuMode } from "./SidebarMenu.types";
import './SidebarMenuItem.less';

interface ISidebarMenuItemProps {
    data: ISidebarItem;
    mode: SidebarMenuMode;
    children?: React.ReactNode;
    open: boolean;
    hasChildren?: boolean;
    selected?: boolean;
    onClick?: () => void;
}

export const SidebarMenuItem: FunctionComponent<ISidebarMenuItemProps> = ({
    children,
    data,
    mode,
    open = false,
    selected = false,
    hasChildren = false,
    onClick,
}) => {
    const _containerModeStyle = (): React.CSSProperties => {
        switch (mode) {
            case "collapsed": return {
                borderTopLeftRadius: 30,
                borderBottomLeftRadius: 30
            }
            case "expanded": return {}
            default: return {}
        }
    }

    const _buttonModeStyle = (): React.CSSProperties => {
        switch (mode) {
            case "collapsed": return {
                // padding: "15px 0",
                height: 60
            }
            case "expanded": return {}
            default: return {}
        }
    }

    const _openedStyle = (): React.CSSProperties => {
        return {
            position: "relative"
        }
    }

    const _selectedStyle = (): React.CSSProperties => {
        return {
            ..._openedStyle(),
            backgroundColor: mode === "collapsed" ? "#fff" : AppColor.primaryFade,
            borderRight: "4px solid " + AppColor.primary
        }
    }

    const _containerStyle = (): React.CSSProperties => {
        return {
            marginRight: -0.8,
            ..._containerModeStyle(),
            ...open ? _openedStyle() : {},
            ...selected ? _selectedStyle() : {},
            ...data.parent !== undefined ? { paddingLeft: (data.level !== undefined ? data.level : 0) * 25 } : {}
        }
    }

    const _buttonStyle = (): React.CSSProperties => {
        return {
            height: SIDEBAR_ITEM_HEIGHT,
            textAlign: "left",
            ..._buttonModeStyle()
        }
    }

    return <Stack direction="column" align="stretch" gap={0}>
        <Box
            style={_containerStyle()}
            className={classNames("sidebar-menu-item-wrapper",
                { "open": open, "selected": selected, "expanded": mode === "expanded" })}>
            <Button type="link" block onClick={onClick} style={_buttonStyle()}>
                <Stack align="center" justify="space-between" gap={12} direction="row">
                    <Space>
                        <YoutubeOutlined
                            style={{
                                fontSize: 24,
                                marginLeft: mode === "collapsed" ? 5 : 0,
                                marginTop: mode === "expanded" ? 3 : 0
                            }} />
                        {mode === "expanded" && <Typography.Text>{data.label}</Typography.Text>}
                    </Space>
                    {hasChildren && mode === "expanded" && (open ? <CaretUpOutlined /> : <CaretDownOutlined />)}
                </Stack>
            </Button>
        </Box>

        {open && mode === "expanded"
            && <Stack
                className="sidebar-submenu"
                direction="column"
                align="stretch"
                style={{
                    backgroundColor: "#fafafa",
                    // height: data.children ? data.children.length * SIDEBAR_ITEM_HEIGHT : "auto",
                }}
                gap={0}>
                {children}
            </Stack>}
    </Stack>
}