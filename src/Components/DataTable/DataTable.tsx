import React, { FunctionComponent } from 'react';
import { Table as AntTable, TableProps as AntTableProps } from 'antd';

interface IDataTableProps<RecordType> extends AntTableProps<RecordType> {

}

export function DataTable<RecordType extends object = any>(props: IDataTableProps<RecordType>) {
    const {
        ...antTableProps
    } = props;

    return <AntTable {...antTableProps} />
}