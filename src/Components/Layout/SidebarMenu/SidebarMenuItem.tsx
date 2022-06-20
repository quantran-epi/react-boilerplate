import { CaretDownOutlined, CaretRightOutlined, CaretUpOutlined, PieChartOutlined } from '@ant-design/icons';
import { AppColor } from '@common/Constants/AppColor';
import { AppShadow } from '@common/Constants/Shadow';
import { Button } from "@components/Button";
import { OutsideClick } from '@components/OutsideClick';
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
    onClose?: (item: ISidebarItem) => void;
}

export const SidebarMenuItem: FunctionComponent<ISidebarMenuItemProps> = ({
    children,
    data,
    mode,
    open = false,
    selected = false,
    hasChildren = false,
    onClick,
    onClose
}) => {
    const _renderIcon = () => {
        return <div style={{
            fontSize: 24,
            marginLeft: mode === "collapsed" ? 5 : 0,
        }}>
            <PieChartOutlined />
        </div>
        // return <Box style={{
        //     fontSize: 24,
        //     marginLeft: mode === "collapsed" ? 5 : 0,
        //     marginTop: mode === "expanded" ? 3 : 0
        // }}>
        //     {(mode === "collapsed" && !data.icon && data.level === 0) ? <Typography.Title style={{ margin: 0 }} level={5}>{data.label.substring(0, 1)}</Typography.Title>
        //         : data.icon}
        // </Box>
    }

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
            borderRight: "6px solid " + AppColor.primary
        }
    }

    const _containerStyle = (): React.CSSProperties => {
        return {
            marginRight: -3,
            ..._containerModeStyle(),
            ...open ? _openedStyle() : {},
            ...selected ? _selectedStyle() : {},
            ...data.parent !== undefined ? { paddingLeft: (mode === "expanded" && data.level !== undefined ? data.level : 0) * 25 } : {}
        }
    }

    const _buttonStyle = (): React.CSSProperties => {
        return {
            height: SIDEBAR_ITEM_HEIGHT,
            textAlign: "left",
            padding: "0 15px",
            ..._buttonModeStyle()
        }
    }

    const _onCloseMenuOnClickOutside = () => {
        if (!onClose) return;
        onClose(data);
    }

    return <OutsideClick disabled={mode === "expanded" || data.level !== 0} onClickOutside={_onCloseMenuOnClickOutside}>
        <Stack direction="column" align="stretch" gap={0}>
            <Box
                style={_containerStyle()}
                className={classNames("sidebar-menu-item-wrapper",
                    { "open": open, "selected": selected, "expanded": mode === "expanded" })}>
                <Button type="link" block onClick={onClick} style={_buttonStyle()}>
                    <Stack align="center" justify="space-between" gap={12} direction="row">
                        <Space>
                            {_renderIcon()}
                            {(mode === "expanded" || (mode === "collapsed" && data.level !== 0)) && <Typography.Text>{data.label}</Typography.Text>}
                        </Space>
                        {hasChildren && mode === "expanded" && (open ? <CaretUpOutlined /> : <CaretDownOutlined />)}
                        {hasChildren && mode === "collapsed" && data.level !== 0 && <CaretRightOutlined />}
                    </Stack>
                </Button>
            </Box>

            {open && mode === "expanded"
                && <Stack
                    className={classNames("sidebar-submenu", "expanded")}
                    direction="column"
                    align="stretch"
                    style={{
                        backgroundColor: "#fafafa",
                        // height: data.children ? data.children.length * SIDEBAR_ITEM_HEIGHT : "auto",
                    }}
                    gap={0}>
                    {children}
                </Stack>}
            {open && mode === "collapsed"
                && <Stack
                    className={classNames("sidebar-submenu", "collapsed")}
                    direction="column"
                    align="stretch"
                    style={{
                        position: "absolute",
                        top: 0,
                        left: "100%",
                        height: "100%",
                        backgroundColor: "#fafafa",
                        width: 300,
                        zIndex: 99999,
                        paddingLeft: 15,
                        // height: data.children ? data.children.length * SIDEBAR_ITEM_HEIGHT : "auto",
                        boxShadow: AppShadow.card
                    }}
                    gap={0}>
                    {children}
                </Stack>}
        </Stack>
    </OutsideClick>
}