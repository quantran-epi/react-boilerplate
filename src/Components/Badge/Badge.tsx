import { FunctionComponent } from "react";
import { Badge as AntBadge, BadgeProps as AntBadgeProps } from 'antd';

interface IBadgeProps extends AntBadgeProps {

}

export const Badge: FunctionComponent<IBadgeProps> = (props) => {
    return <AntBadge {...props} />
}