interface IApiConfig {
    Root: string;
    Auth: {
        Login: string;
    },
    Authorized: {

    }
}

export const ApiConfig: IApiConfig = {
    Root: process.env.REACT_APP_ROOT_API_URL || "",
    Auth: {
        Login: '/auth/signin',
    },
    Authorized: {

    }
}