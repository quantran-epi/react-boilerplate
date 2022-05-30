import { RootRoutes } from '@routing/RootRoutes';
import React from 'react';
import { Link } from 'react-router-dom';

export const CreditCardDebtCollectionCheckerScreen = () => {
    return <div>
        CreditCardDebtCollectionCheckerScreen
        <Link to={RootRoutes.CreditRoutes.CreditCardDebtCollectionMaker} title="go to maker">
            Go to maker
        </Link>
    </div>
} 