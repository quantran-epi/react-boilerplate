import { AppQueryKeys } from "@common/Constants/AppQueryKeys";
import { Card } from "@components/Card";
import { DataTable } from "@components/DataTable";
import { useStore } from "@store";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useQuery } from "react-query";
import { IUserFilterQueryParams } from "../Services/UserService";

export const UserListScreen = () => {
    const [_filterQueryParams, _setFilterQueryParams] = useState<IUserFilterQueryParams>({
        page: 1,
        size: 10
    });
    const { t } = useTranslation('User', { keyPrefix: 'UserList' });
    const setCurrentFunction = useStore((state: any) => state.setCurrentFunction);
    const services = useStore(state => state.services);
    const { data, isFetching } = useQuery([AppQueryKeys["User.Filter"], _filterQueryParams], {
        queryFn: async (context) => {
            return await services.User.filter(context.queryKey[1] as IUserFilterQueryParams);
        },
        keepPreviousData: true
    })

    useEffect(() => {
        setCurrentFunction(t('Header.Title'));
    }, [])

    const columns = [
        {
            title: t("Table.Username"),
            dataIndex: 'username',
            key: 'username',
        },
        {
            title: t("Table.Fullname"),
            dataIndex: 'fullname',
            key: 'fullname',
        }
    ];

    return <Card>
        <DataTable
            rowSelection={{
                type: "checkbox",
            }}
            loading={isFetching}
            size={"small"}
            dataSource={data?.data}
            columns={columns}
            pagination={{
                total: data?.pageable?.total,
                onChange: (page: number) => _setFilterQueryParams({
                    ..._filterQueryParams,
                    page: page
                }),
                showSizeChanger: false
            }} />
    </Card>
}