import { useAppContext } from '@app-context';
import { IUser } from '@models/User';
import React, { FunctionComponent } from 'react';
import { useMutation, useQuery } from 'react-query';
import { useParams } from 'react-router-dom';

interface ILoginScreenProps {

}

export const LoginScreen: FunctionComponent<ILoginScreenProps> = ({

}) => {
    const { services } = useAppContext();
    const { data } = useQuery('user', async () => new Promise<IUser>(res => res({})));
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