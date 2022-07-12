import { IUserFilterQueryParams } from "@modules/User/Services/UserService";

const UserQueries = {
    All: () => ['user'],
    List: (searchViewModel: IUserFilterQueryParams) => [...UserQueries.All(), 'List', searchViewModel]
}

export default UserQueries;