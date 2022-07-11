interface IApiConfig {
    Root: string;
    Auth: {
        Login: string;
        User: string;
    },
    Authorized: {
        Menu: string;
        Role: string;
    }
}

export const ApiConfig: IApiConfig = {
    Root: process.env.REACT_APP_ROOT_API_URL || "",
    Auth: {
        Login: '/auth/signin',
        User: 'users'
    },
    Authorized: {
        Menu: '/menu',
        Role: '/role'
    }
}