import React, { FunctionComponent } from 'react';
import { Input as AntInput, InputProps as AntInputProps } from 'antd';

interface IInputProps extends AntInputProps {

}

export const Input: FunctionComponent<IInputProps> = (props) => {
    return <AntInput {...props} />
}