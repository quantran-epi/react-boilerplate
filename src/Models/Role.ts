import { Nullable } from "@common/Types/UtilityTypes";
import { IServerMenuItem } from "./Server/ServerMenuItem";

export interface IRole {
    id: number;
    name: string;
    description: Nullable<string>;
    createdBy: Nullable<string>;
    createdAt: Nullable<string>;
    modifiedAt: Nullable<string>;
    status: string;
    menu: IServerMenuItem[];
}