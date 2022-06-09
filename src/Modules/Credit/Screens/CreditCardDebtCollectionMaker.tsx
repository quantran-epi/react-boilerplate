import { useAppContext } from '@app-context';
import { ExcelHelper } from '@common/Helpers/Excel';
import { ObjectPropertyHelper } from '@common/Helpers/ObjectProperty';
import { PdfHelper } from '@common/Helpers/Pdf';
import { Button } from '@components/Button';
import { DataTable } from '@components/DataTable';
import { Form } from '@components/Form';
import { Input } from '@components/Form/Input';
import { Option, Select } from '@components/Form/Select';
import { Col, Row } from '@components/Grid';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { ICreditCardDebtCollectionMakerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionMakerViewModel';

export const CreditCardDebtCollectionMakerScreen = () => {
    const { t } = useTranslation("Credit", { keyPrefix: "CreditCardDebtCollectionMaker" })
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
            let data = await services.Credit.CreditCardDebtCollection
                .searchMaker(context.queryKey[3] as ICreditCardDebtCollectionMakerSearchViewModel,
                    context.queryKey[4] as number)
            return data;
        },
        keepPreviousData: true,
        refetchOnWindowFocus: false
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

    return <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
        <Space direction="vertical" size={0} className="app-search-area">
            <Form
                layout={"vertical"}
                form={form}
                initialValues={_searchModel}>
                <Space size={"middle"}>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.refNo)}
                        label={t("Search.RefNo")}>
                        <Input value={_searchModel.refNo} onChange={(event) => form.setFieldsValue({
                            refNo: event.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.bin)}
                        label={t("Search.Bin")}>
                        <Input value={_searchModel.bin} onChange={(event) => form.setFieldsValue({
                            bin: event.target.value
                        })} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.reversal)}
                        label={t("Search.Reversal")}>
                        {/* dump */}
                        <Select defaultValue="2">
                            <Option value="">Tất cả</Option>
                            <Option value="1">Item 1</Option>
                            <Option value="2">
                                Item 2
                            </Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.fromTxnDate)}
                        label={t("Search.FromTxnDate")}>
                        <DatePicker value={_searchModel.fromTxnDate} />
                    </Form.Item>
                    <Form.Item
                        name={ObjectPropertyHelper.nameof(_searchModel, e => e.toTxnDate)}
                        label={t("Search.ToTxnDate")}>
                        <DatePicker value={_searchModel.toTxnDate} />
                    </Form.Item>
                </Space>
            </Form>
            <Row>
                <Col span={24} style={{ textAlign: 'left' }}>
                    <Space size={"small"}>
                        <Button disabled={isFetching} type="primary" htmlType="submit" onClick={_onSearchBtnClick}>
                            Search
                        </Button>
                        <Button disabled={isFetching} onClick={() => {
                            new ExcelHelper().saveFromDataSet({
                                rows: data?.data.map(e => {
                                    let data = e;
                                    delete data["key"];
                                    return data;
                                }) || [],
                                columns: columns.map(e => ({
                                    key: e.key,
                                    label: e.title
                                }))
                            });
                        }}>
                            Send Authorial
                        </Button>
                        <Button
                            disabled={isFetching}
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
            id='test-table'
            rowSelection={{
                type: "checkbox",
            }}
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