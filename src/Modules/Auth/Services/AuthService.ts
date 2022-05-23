import { IUser } from "@models/User";
import { BaseService, IServiceHelperCollection } from "@services/BaseService";
import { ILoginViewModel } from "../ViewModels/LoginViewModel";

interface IAuthService {
    login: (data: ILoginViewModel) => Promise<IUser | null>;
}

export class AuthService extends BaseService implements IAuthService {
    constructor(helpers: IServiceHelperCollection) {
        super(helpers);
    }

    async login(data: ILoginViewModel): Promise<IUser | null> {
        return null;
    }
}