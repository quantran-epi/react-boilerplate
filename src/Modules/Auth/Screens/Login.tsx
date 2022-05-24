import { useAppContext } from '@app-context';
import React, { FunctionComponent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

interface ILoginScreenProps {

}

export const LoginScreen: FunctionComponent<ILoginScreenProps> = ({

}) => {
    const id = 5;
    const { services } = useAppContext();
    const mutation = useMutation(services.Auth.login, {
        onSuccess: (user) => {

        }
    });
    mutation.mutate({
        username: "",
        password: ""
    })

    return <div>login</div>;
}