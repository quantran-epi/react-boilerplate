import React, { FunctionComponent } from 'react';
import { Select as AntSelect, SelectProps as AntSelectProps } from 'antd';

interface ISelectProps extends AntSelectProps {

}

export const Select: FunctionComponent<ISelectProps> = (props) => {
    return <AntSelect {...props} />
}

export const Option = AntSelect.Option;