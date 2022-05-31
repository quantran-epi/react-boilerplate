import { useAppContext } from '@app-context';
import { ObjectPropertyHelper } from '@common/Helpers/ObjectProperty';
import { Button } from '@components/Button';
import { DataTable } from '@components/DataTable';
import { Form, Input } from '@components/Form';
import { Option, Select } from '@components/Form/Select';
import { Col, Row } from '@components/Grid';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { ICreditCardDebtCollectionMakerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionMakerViewModel';

export const CreditCardDebtCollectionMakerScreen = () => {
    const [form] = Form.useForm<ICreditCardDebtCollectionMakerSearchViewModel>();
    const [_searchModel] = useState<ICreditCardDebtCollectionMakerSearchViewModel>({
        refNo: "",
        bin: "",
        reversal: "",
        fromTxnDate: moment(),
        toTxnDate: moment()
    });
    const { services } = useAppContext();
    const [_page, _setPage] = useState<number>(1);

    const { data, isFetching, refetch } = useQuery(['Credit', 'CreditCardDebtCollection', 'Maker', _searchModel, _page], {
        queryFn: async (context) => {
            let data = await services.Function.Credit.CreditCardDebtCollection
                .searchMaker(context.queryKey[3] as ICreditCardDebtCollectionMakerSearchViewModel, _page)
            return data;
        },
        keepPreviousData: true
    });

    const _onSearchBtnClick = () => {
        refetch();
    }

    const columns = [
        {
            title: 'Column 1',
            dataIndex: 'column1',
            key: 'column1',
        },
        {
            title: 'Column 2',
            dataIndex: 'column2',
            key: 'column2',
        },
        {
            title: 'Column 3',
            dataIndex: 'column3',
            key: 'column3',
        },
        {
            title: 'Column 4',
            dataIndex: 'column4',
            key: 'column4',
        },
        {
            title: 'Column 5',
            dataIndex: 'column5',
            key: 'column5',
        }
    ];

    return <Space direction="vertical" size={"middle"}>
        <Space direction="vertical" size={'middle'} className="app-search-area">
            <Form
                layout={"inline"}
                form={form}
                initialValues={_searchModel}>
                <Space size={"small"}>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.refNo)}
                        label={"RefNo"}>
                        <Input value={_searchModel.refNo} onChange={(event) => form.setFieldsValue({
                            refNo: event.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.bin)}
                        label={"BIN"}>
                        <Input value={_searchModel.bin} onChange={(event) => form.setFieldsValue({
                            bin: event.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.reversal)}
                        label={"Reversal"}>
                        {/* dump */}
                        <Select>
                            <Option value="">Tất cả</Option>
                            <Option value="1">Item 1</Option>
                            <Option value="2">
                                Item 2
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.fromTxnDate)}
                        label={"From Make Date"}>
                        <DatePicker value={_searchModel.fromTxnDate} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.toTxnDate)}
                        label={"To Make Date"}>
                        <DatePicker value={_searchModel.toTxnDate} />
                    </Form.Item>
                </Space>
            </Form>
            <Row>
                <Col span={24} style={{ textAlign: 'left' }}>
                    <Space size={"small"}>
                        <Button type="primary" htmlType="submit" onClick={_onSearchBtnClick}>
                            Search
                        </Button>
                        <Button>
                            Send Authorial
                        </Button>
                        <Button
                            onClick={() => {
                                form.resetFields();
                            }}>
                            Cancel
                        </Button>
                    </Space>
                </Col>
            </Row>
        </Space>
        <DataTable
            loading={isFetching}
            size={"small"}
            dataSource={data?.data}
            columns={columns}
            pagination={{
                total: data?.totalItems,
                onChange: (page: number) => _setPage(page),
                showSizeChanger: false
            }} />
    </Space>
} 