import { useAppContext } from '@app-context';
import { ObjectPropertyHelper } from '@common/Helpers/ObjectProperty';
import { Button } from '@components/Button';
import { Card } from '@components/Card';
import { DataTable } from '@components/DataTable';
import { Form } from '@components/Form';
import { Input } from '@components/Form/Input';
import { Option, Select } from '@components/Form/Select';
import { Col, Row } from '@components/Grid';
import { useStore } from '@store';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { ICreditCardDebtCollectionCheckerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionCheckerViewModel';

export const CreditCardDebtCollectionCheckerScreen = () => {
    const { t } = useTranslation('Credit', { keyPrefix: "CreditCardDebtCollectionChecker" });
    const [form] = Form.useForm<ICreditCardDebtCollectionCheckerSearchViewModel>();
    const [_searchModel] = useState<ICreditCardDebtCollectionCheckerSearchViewModel>({
        refNo: "",
        bin: "",
        reversal: "",
        fromMakeDate: moment(),
        toMakeDate: moment()
    });
    const { services } = useAppContext();
    const [_page, _setPage] = useState<number>(1);
    const setCurrentFunction = useStore((state: any) => state.setCurrentFunction);

    useEffect(() => {
        setCurrentFunction(t("Header.Subtitle"));

        return () => {
            setCurrentFunction("");
        }
    }, [])

    const { data, isFetching, refetch } = useQuery(['Credit', 'CreditCardDebtCollection', 'Checker', _searchModel, _page], {
        queryFn: async (context) => {
            let data = await services.Credit.CreditCardDebtCollection
                .searchChecker(context.queryKey[3] as ICreditCardDebtCollectionCheckerSearchViewModel,
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
                                <Select defaultValue="2">
                                    <Option value="">Tất cả</Option>
                                    <Option value="1">Item 1</Option>
                                    <Option value="2">
                                        Item 2
                                    </Option>
                                </Select>
                            </Form.Item>
                            <Form.Item
                                name={ObjectPropertyHelper.nameof(_searchModel, e => e.fromMakeDate)}
                                label={t("Search.FromMakeDate")}>
                                <DatePicker value={_searchModel.fromMakeDate} />
                            </Form.Item>
                            <Form.Item
                                name={ObjectPropertyHelper.nameof(_searchModel, e => e.toMakeDate)}
                                label={t("Search.ToMakeDate")}>
                                <DatePicker value={_searchModel.toMakeDate} />
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
                        total: data?.totalItems,
                        onChange: (page: number) => _setPage(page),
                        showSizeChanger: false
                    }} />
            </Space>
        </Card>
    </React.Fragment>
} 