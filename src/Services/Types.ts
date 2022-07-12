export interface IMutationResponse<TData = undefined> {
    status: number;
    message: string;
    data: TData;
}

export interface IQueryResponse<TData> {
    status: number;
    message: string;
    data: TData;
}

export interface IPaginateQueryResponse<TData> extends IQueryResponse<TData> {
    pageable: {
        page: number;
        size: number;
        total: number;
    }
}

export interface IPaginateQueryParams {
    page: number;
    size: number;
}