import React, { FunctionComponent } from 'react';
import { Select as AntSelect } from 'antd';
import { OptionProps as AntOptionProps } from 'antd/lib/select';

const { Option: AntOption } = AntSelect;

interface IOptionProps extends AntOptionProps {

}

export const Option: FunctionComponent<IOptionProps> = (props) => {
    return <AntOption {...props} />
}