interface IApiConfig {
    Root: string;
    Auth: {
        Login: string;
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
    },
    Authorized: {
        Menu: '/menu',
        Role: '/role'
    }
}