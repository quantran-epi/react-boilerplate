import React, { FunctionComponent } from 'react';
import { Space as AntSpace, SpaceProps as AntSpaceProps } from 'antd';

interface ISpaceProps extends AntSpaceProps {

}

export const Space: FunctionComponent<ISpaceProps> = (props) => {
    return <AntSpace {...props} />
}