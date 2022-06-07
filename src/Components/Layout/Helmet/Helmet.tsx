import React, { FunctionComponent } from 'react';
import { Helmet as ReactHelmet } from 'react-helmet';

interface IHelmetProps {
    title: string;
    description?: string;
}

export const Helmet: FunctionComponent<IHelmetProps> = ({
    title,
    description
}) => {
    return <ReactHelmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </ReactHelmet>
}