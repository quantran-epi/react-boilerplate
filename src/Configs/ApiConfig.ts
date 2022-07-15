interface IApiConfig {
    Root: string;
    Auth: {
        Login: string;
    },
    Authorized: {
        Menu: string;
        MenuDelete: string;
        Role: string;
        RoleDelete: string;
        User: string;
        UserDelete: string;

        ATM: {
            ATMCyle: {
                Search: string;
            }
        }
    }
}

export const ApiConfig: IApiConfig = {
    Root: process.env.REACT_APP_ROOT_API_URL || "",
    Auth: {
        Login: '/auth/signin',
    },
    Authorized: {
        Menu: '/menu',
        MenuDelete: '/menu/delete',
        Role: '/role',
        RoleDelete: '/role/delete',
        User: '/users',
        UserDelete: '/users/delete',

        ATM: {
            ATMCyle: {
                Search: ''
            }
        }
    }
}