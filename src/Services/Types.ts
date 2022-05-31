export interface IQueryResponse<TData> {
    status: number;
    data: TData;
}

export interface IPaginateQueryResponse<TData> extends IQueryResponse<TData> {
    page: number;
    pageSize: number;
    totalItems: number;
}