import React, { FunctionComponent } from 'react';
import { Layout as AntLayout, LayoutProps as AntLayoutProps } from 'antd';

const { Content: AntContent } = AntLayout;

interface IContentProps extends AntLayoutProps {

}

export const Content: FunctionComponent<IContentProps> = (props) => {
    return <AntContent {...props} />
}