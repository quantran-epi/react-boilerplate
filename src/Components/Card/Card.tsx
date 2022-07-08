import React, { FunctionComponent } from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';
import { AppShadow } from '@common/Constants/AppShadow';

interface ICardProps extends AntCardProps {

}

export const Card: FunctionComponent<ICardProps> = (props) => {
    const _style = (): React.CSSProperties => {
        return {
            borderRadius: 10,
            boxShadow: AppShadow.card,
            ...props.style
        }
    }

    return <AntCard {...props} style={_style()} />
}