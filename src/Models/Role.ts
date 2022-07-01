import { Nullable } from "@common/Types/UtilityTypes";

export interface IRole {
    id: number;
    name: string;
    description: Nullable<string>;
    createdBy: Nullable<string>;
    createdAt: Nullable<string>;
    modifiedAt: Nullable<string>;
    status: string;
    menu: number[];
}