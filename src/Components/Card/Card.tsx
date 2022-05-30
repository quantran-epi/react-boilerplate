import React, { FunctionComponent } from 'react';
import { Card as AntCard, CardProps as AntCardProps } from 'antd';

interface ICardProps extends AntCardProps {

}

export const Card: FunctionComponent<ICardProps> = (props) => {
    return <AntCard {...props} />
}