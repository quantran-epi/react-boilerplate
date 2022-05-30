import React, { FunctionComponent } from 'react';
import { DatePicker as AntDatePicker, DatePickerProps as AntDatePickerProps } from 'antd';

type IDatePickerProps = AntDatePickerProps & {

}

export const DatePicker: FunctionComponent<IDatePickerProps> = (props) => {
    return <AntDatePicker {...props} />
}