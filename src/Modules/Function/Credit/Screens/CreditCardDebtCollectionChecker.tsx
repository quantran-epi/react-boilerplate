import { ObjectPropertyHelper } from '@common/Helpers/ObjectProperty';
import { Form, Input } from '@components/Form';
import { Option, Select } from '@components/Form/Select';
import { DatePicker, Space } from 'antd';
import moment from 'moment';
import React, { useState } from 'react';
import { ICreditCardDebtCollectionCheckerSearchViewModel } from '../ViewModels/ICreditCardDebtCollectionCheckerViewModel';

export const CreditCardDebtCollectionCheckerScreen = () => {
    const [form] = Form.useForm<ICreditCardDebtCollectionCheckerSearchViewModel>();
    const [_searchModel] = useState<ICreditCardDebtCollectionCheckerSearchViewModel>({
        refNo: "",
        bin: "",
        reversal: "",
        fromMakeDate: moment(),
        toMakeDate: moment()
    })

    return <div>
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
                    <Select defaultValue="2">
                        <Option value="1">1</Option>
                        <Option value="2">
                            Item 1
                        </Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    name={ObjectPropertyHelper.nameof(_searchModel, e => e.fromMakeDate)}
                    label={"From Make Date"}>
                    <DatePicker value={_searchModel.fromMakeDate} />
                </Form.Item>
                <Form.Item
                    name={ObjectPropertyHelper.nameof(_searchModel, e => e.toMakeDate)}
                    label={"To Make Date"}>
                    <DatePicker value={_searchModel.toMakeDate} />
                </Form.Item>
            </Space>
        </Form>
    </div>
} 