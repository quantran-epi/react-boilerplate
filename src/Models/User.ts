import { Nullable } from "@common/Types/UtilityTypes";
import { IRole } from "@models/Role";

export interface IUser {
    id: number;
    username: string;
    fullname: Nullable<string>;
    email: Nullable<string>;
    localBranch: Nullable<string>;
    phone: Nullable<string>;
    status: Nullable<string>;
    expireDt: Nullable<string>;
    effectiveDt: Nullable<string>;
    roles: IRole[];
}