import React, { FunctionComponent } from 'react';
import { Button as AntButton, ButtonProps as AntButtonProps } from 'antd';

interface IButtonProps extends AntButtonProps {

}

export const Button: FunctionComponent<IButtonProps> = (props) => {
    return <AntButton {...props} />
}