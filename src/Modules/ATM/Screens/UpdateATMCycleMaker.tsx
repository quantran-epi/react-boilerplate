import { ObjectPropertyHelper } from "@common/Helpers/ObjectProperty";
import { Button } from "@components/Button";
import { Card } from "@components/Card";
import { Form } from '@components/Form';
import { Option, Select } from "@components/Form/Select";
import { Col, Row } from "@components/Grid";
import { Space } from "@components/Layout/Space";
import { Spin } from "@components/Spin";
import { QueryFactory } from "@queries";
import { useStore } from "@store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { IUpdateATMCycleMakerSearchViewModel } from "../ViewModels/UpdateATMCycleMakerSearchViewModel";

export const UpdateATMCycleMakerScreen = () => {
    const { t: transCommon } = useTranslation('Common');
    const { t } = useTranslation('ATM', { keyPrefix: "UpdateATMCycle" });
    const setCurrentFunction = useStore((state: any) => state.setCurrentFunction);
    const services = useStore(state => state.services);
    const [searchForm] = Form.useForm<IUpdateATMCycleMakerSearchViewModel>();
    const [_searchViewModel, _setSearchViewModel] = useState<IUpdateATMCycleMakerSearchViewModel>({
        posId: "",
        atmCode: "",
        atmCycle: ""
    });
    // const { data, isFetching } = useQuery(QueryFactory.ATM.ATMCycle.Search(_searchViewModel), {
    //     queryFn: async (context) => {
    //         return await services.ATM.ATMCycle.search(context.queryKey[2] as IUpdateATMCycleMakerSearchViewModel);
    //     },
    // });

    useEffect(() => {
        setCurrentFunction(t("Header.Title"));

        return () => {
            setCurrentFunction("");
        }
    }, [])

    const _onSearchBtnClick = () => {
        _setSearchViewModel(searchForm.getFieldsValue());
    }

    return <Card>
        <Space direction="vertical" size={"middle"} style={{ width: "100%" }}>
            <Space direction="vertical" size={0} style={{ width: "100%" }}>
                <Form
                    layout={"vertical"}
                    form={searchForm}
                    initialValues={_searchViewModel}>
                    <Row>
                        <Col span={6} style={{ paddingRight: 15 }}>
                            <Form.Item
                                name={ObjectPropertyHelper.nameof(_searchViewModel, e => e.posId)}
                                label={t("Search.PosId")}>
                                {/* dump */}
                                <Select showSearch>
                                    <Option value="">Tất cả</Option>
                                    <Option value="1">Item 1</Option>
                                    <Option value="2">
                                        Item 2
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{ paddingRight: 15 }}>
                            <Form.Item
                                name={ObjectPropertyHelper.nameof(_searchViewModel, e => e.atmCode)}
                                label={t("Search.AtmCode")}>
                                {/* dump */}
                                <Select showSearch>
                                    <Option value="">Tất cả</Option>
                                    <Option value="1">Item 1</Option>
                                    <Option value="2">
                                        Item 2
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={6} style={{ paddingRight: 15 }}>
                            <Form.Item
                                name={ObjectPropertyHelper.nameof(_searchViewModel, e => e.atmCycle)}
                                label={t("Search.AtmCycle")}>
                                {/* dump */}
                                <Select showSearch>
                                    <Option value="">Tất cả</Option>
                                    <Option value="1">Item 1</Option>
                                    <Option value="2">
                                        Item 2
                                    </Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Space>
                            <Button type="default" htmlType="submit" onClick={_onSearchBtnClick}>
                                {transCommon('Common:Button.Search')}
                            </Button>
                            <Button type="primary" htmlType="submit" onClick={_onSearchBtnClick}>
                                {t('Search.Button.SendRequest')}
                            </Button>
                            <Button type="default" htmlType="submit" onClick={_onSearchBtnClick}>
                                {t('Search.Button.ViewHistory')}
                            </Button>
                        </Space>
                    </Row>
                </Form>

                {/* <Spin spinning={isFetching}>
                    <Form
                        layout={"vertical"}
                        form={searchForm}
                        initialValues={_searchViewModel}>

                    </Form>
                </Spin> */}
            </Space>
        </Space>
    </Card>
}