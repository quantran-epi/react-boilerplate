import { Space } from "@components/Layout/Space";
import React, { FunctionComponent } from "react";
import { BellOutlined } from '@ant-design/icons';
import { Dropdown } from "@components/Dropdown";
import { Menu } from "@components/Menu";
import { Button } from "@components/Button";
import { AppShadow } from "@common/Constants/Shadow";
import { Typography } from "@components/Typography";
import { Divider } from "@components/Layout/Divider";
import { Badge } from "@components/Badge";


interface INotificationWidgetProps {

}

export const NotificationWidget: FunctionComponent<INotificationWidgetProps> = ({

}) => {
    const _fakeNotifications = new Array(7).fill(1).map((e, i) => ({
        key: i,
        label: <Space size={0} direction="vertical" style={{}}>
            <Typography.Title style={{ margin: 0 }} level={5}>Lorem ipsum dolor sit amet</Typography.Title>
            <Typography.Text type="secondary">Lorem ipsum dolor sit amet, consectetur adipis.</Typography.Text>
        </Space>
    }))

    return <Dropdown
        overlayStyle={{
            width: 350,
            maxHeight: 300,
            overflowY: "auto",
            boxShadow: AppShadow.notification
        }}
        placement="bottomRight"
        overlay={<Menu
            items={_fakeNotifications}
        />} trigger={['click']}>
        <Button type="text" shape="circle" icon={<BellOutlined />} size="large" />
    </Dropdown>
}