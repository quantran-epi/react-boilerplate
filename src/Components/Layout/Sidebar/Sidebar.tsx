import React, { FunctionComponent } from 'react';
import { Layout as AntLayout, SiderProps as AntSiderProps } from 'antd';
import './Sidebar.less';

const { Sider: AntSider } = AntLayout;

interface ISidebarProps extends AntSiderProps {

}

export const Sidebar: FunctionComponent<ISidebarProps> = (props) => {
    return <AntSider {...props} />
}