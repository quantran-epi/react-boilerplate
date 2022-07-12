import { ObjectPropertyHelper } from '@common/Helpers/ObjectProperty';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { DataTable } from '@components/DataTable';
import { Form } from '@components/Form';
import { Input } from '@components/Form/Input';
import { Option, Select } from '@components/Form/Select';
import { Col, Row } from '@components/Grid';
import { QueryFactory } from '@queries';
import { useStore } from '@store';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { ICreditCardDebtCollectionMakerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionMakerViewModel';

export const CreditCardDebtCollectionMakerScreen = () => {
    const { t } = useTranslation("Credit", { keyPrefix: "CreditCardDebtCollectionMaker" })
    const [form] = Form.useForm<ICreditCardDebtCollectionMakerSearchViewModel>();
    const [_searchModel, _setSearchModel] = useState<ICreditCardDebtCollectionMakerSearchViewModel>({
        refNo: "",
        bin: "",
        reversal: "",
        fromTxnDate: moment(),
        toTxnDate: moment()
    });
    const services = useStore(state => state.services);
    const [_page, _setPage] = useState<number>(1);
    const setCurrentFunction = useStore(state => state.setCurrentFunction);

    const { data, isFetching } = useQuery(QueryFactory.Credit.CreditCardDebtCollection.Maker(_searchModel, _page), {
        queryFn: async (context) => {
            let data = await services.Credit.CreditCardDebtCollection
                .searchMaker(context.queryKey[3] as ICreditCardDebtCollectionMakerSearchViewModel,
                    context.queryKey[4] as number)
            return data;
        },
        keepPreviousData: true,
    });

    const _onSearchBtnClick = () => {
        _setSearchModel(form.getFieldsValue());
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

    useEffect(() => {
        setCurrentFunction(t("Header.Subtitle"));

        return () => {
            setCurrentFunction("");
        }
    }, [])

    return <React.Fragment>
        <Card>
            <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
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
                                <Button disabled={isFetching}>
                                    Processing
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
                    rowSelection={{
                        type: "checkbox",
                    }}
                    loading={isFetching}
                    size={"small"}
                    dataSource={data?.data}
                    columns={columns}
                    pagination={{
                        total: data?.pageable?.total,
                        onChange: (page: number) => _setPage(page),
                        showSizeChanger: false
                    }} />
            </Space>
        </Card>
    </React.Fragment>
} 