import React, { FunctionComponent } from 'react';
import { Dropdown as AntDropdown, DropdownProps as AntDropdownProps } from 'antd';

interface IDropdownProps extends AntDropdownProps {

}

export const Dropdown: FunctionComponent<IDropdownProps> = (props) => {
    return <AntDropdown {...props} />
}