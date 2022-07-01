import { Nullable } from "@common/Types/UtilityTypes";

export interface IServerMenuItem {
    id: number;
    title: string;
    link: Nullable<string>;
    viewStatus: string;
    parentId: Nullable<number>;
}