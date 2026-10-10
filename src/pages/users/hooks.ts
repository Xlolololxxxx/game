import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _capitalize from "lodash/capitalize";
import _unionBy from "lodash/unionBy";
import numeral from "numeral";
import { useSearchParams } from "react-router-dom";
import {
  allUsersAPI,
  exportUsersListAPI,
  getActiveUsersAPI,
  getUsersDemographicBy,
  totalActiveSessionThisMonthAPI,
  totalActiveUsersAPI,
  totalUsersAPI,
  updatePasswordAPI,
  updateUserBalanceAPI,
  updateUserDetailsAPI,
  updateUserTierLevelAPI,
} from "@src/api/users";
import { useToasterContext } from "@src/context/Toaster";
import {
  GetActiveUsersAPIParams,
  GetAllUsersParams,
  UpdateUserPasswordAPIParams,
  UseUsersServiceOperators,
  UseUsersServiceParams,
  UserBalanceListType,
  UserObjectType,
  UsersAPIREquest,
  UsersDemographicRequestType,
} from "@src/lib/types/users";
import { getCurrentMonthDays } from "@src/utils/current-month";
import {
  getAmountBalanceByCoinType,
  transformUsersWithBalance,
} from "@src/utils/filter-helper";
import { downloadExcel } from "@src/utils/download-helper";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { USERTYPES } from "@src/lib/constants";
import { AlertType } from "@src/lib/types/toaster";
import { useAuthService } from "@src/store/hooks";
import { TABLE_HEAD_ACTIVE_USERS, TABLE_HEAD_USERS, TABLE_HEAD_USERS_GAMBLY, TABLE_HEAD_USERS_PALMSPLAY } from "@src/utils/mockdata/table-headers";
import _ from "lodash";
import moment from "moment";
import { useUsersContext } from "./provider";

export const useUsersService = (
  args?: UseUsersServiceParams
): Readonly<UseUsersServiceOperators> => {
  const queryClient = useQueryClient();
  const { state: { selectedPartnerId }, partner } = usePartnerDropdownContext();
  const {
    listQueryKey = "users",
    fetchList = false,
    fetchDemographics = false,
    fetchTotalUsers = false,
    fetchTotalUsersThisMonth = false,
    fetchTotalActiveUsers = false,
    fetchTotalActiveSessionThisMonth = false,
  } = args || {};

  const [params] = useSearchParams();
  const userId = params.get("u");
  const onlyNewUsers = params.get('newUsers') === 'true';
  const onlyActiveUsers = params.get('activeUsers') === 'true';

  const {
    state,
    handlePageChange,
    handleCloseMoreDetails,
    handleCloseUpdateBalance,
    handleCloseUpdateTierLevel,
  } = useUsersContext();

  const { currentUser } = useAuthService();
  const { triggerOpen } = useToasterContext();

  const {
    page,
    size = 10,
    debouncedSearch = "",
    fromDate,
    toDate,
    selectedDemographicCategory,
    order,
    orderBy,
  } = state ?? {};
  const newPage = (page || 0) + 1;

  const usersListQueryKey = [
    listQueryKey,
    {
      size,
      debouncedSearch,
      newPage,
      fromDate,
      toDate,
      userId,
      order,
      orderBy,
      userTypeIDs: [USERTYPES.PLAYER],
      onlyNewUsers,
      selectedPartnerId
    },
  ];

  const activeUsersListQueryKey = [
    'active-users',
    {
      size,
      debouncedSearch,
      newPage,
      fromDate,
      toDate,
      order,
      orderBy,
      selectedPartnerId
    },
  ]

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: usersListQueryKey,
    queryFn: async () => {
      const reqParams: GetAllUsersParams = {
        size,
        page: newPage,
        userTypeIDs: [USERTYPES.PLAYER],
        partnerId: selectedPartnerId,
      };

      const { fromDate: startDate, toDate: endDate } = getCurrentMonthDays();

      if(userId) reqParams.userID = Number(userId);
      if (onlyNewUsers) {
        reqParams.startDate = startDate;
        reqParams.endDate = endDate;
        delete reqParams.userID;
      }
      if (fromDate) {
        reqParams.startDate = fromDate;
        delete reqParams.userID;
      }
      if (toDate) reqParams.endDate = toDate;
      if (debouncedSearch) {
        reqParams.search = debouncedSearch;
        delete reqParams.userID;
      }
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const usersRes = await allUsersAPI(reqParams);

      const usersWithBalance = await transformUsersWithBalance(usersRes.items);

      usersRes.items = usersWithBalance;

      return usersRes;
    },
    enabled: fetchList,
  });

  const { data: activeUsers, isLoading: activeUsersLoading, isRefetching: activeUsersRefetching, refetch: activeUsersRefetch } = useQuery({
    queryKey: activeUsersListQueryKey,
    queryFn: async () => {
      const reqParams: GetActiveUsersAPIParams = {
        size,
        page: newPage,
        partnerId: selectedPartnerId
      };

      if (fromDate) reqParams.fromDate = fromDate;
      if (toDate) reqParams.toDate = toDate;
      if (debouncedSearch) reqParams.search = debouncedSearch;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      const usersRes = await getActiveUsersAPI(reqParams);

      return usersRes;
    },
    enabled: onlyActiveUsers,
  })

  const { data: demographicsData } = useQuery({
    queryKey: ["user-demographics", {selectedDemographicCategory, selectedPartnerId}],
    queryFn: async () => {
      const usersRes = await getUsersDemographicBy(
        selectedDemographicCategory as UsersDemographicRequestType,
        selectedPartnerId
      );
      return usersRes;
    },
    select: ({ data }) => {
      return data?.groups?.map((group: any) => {
        if (selectedDemographicCategory === "age") {
          group.name = group.ageRange.split("_").filter(Boolean).join(" - ");
        }

        if (selectedDemographicCategory === "gender") {
          group.name = _capitalize(group.genderName);
        }

        if (selectedDemographicCategory === "country") {
          group.name = _capitalize(group.countryName);
        }

        return group;
      });
    },
    enabled: fetchDemographics,
  });

  const { data: totalUsers } = useQuery({
    queryKey: ["total-users", { selectedPartnerId }],
    queryFn: async () => {
      const usersRes = await totalUsersAPI(selectedPartnerId, {
        userTypeID: USERTYPES.PLAYER
      });
      return usersRes;
    },
    enabled: fetchTotalUsers,
  });

  const { data: totalActiveUsers } = useQuery({
    queryKey: ["total-active-users", {
      fromDate,
      toDate,
      selectedPartnerId,
    }],
    queryFn: async () => {
      const reqParams: GetActiveUsersAPIParams = {
        partnerId: selectedPartnerId,
      };

      if(onlyActiveUsers){
        if (fromDate) reqParams.fromDate = fromDate;
        if (toDate) reqParams.toDate = toDate;
      }

      const usersRes = await totalActiveUsersAPI(reqParams);
      return usersRes;
    },
    enabled: fetchTotalActiveUsers,
  });

  const { data: totalActiveSessionThisMonth } = useQuery({
    queryKey: ["total-active-session-this-month", {
      debouncedSearch,
      fromDate,
      toDate,
      selectedPartnerId,
    }],
    queryFn: async () => {
      const reqParams: GetActiveUsersAPIParams = {
        partnerId: selectedPartnerId
      };

      if (fromDate) reqParams.fromDate = fromDate;
      if (toDate) reqParams.toDate = toDate;
      if (debouncedSearch) reqParams.search = debouncedSearch;

      const usersRes = await totalActiveSessionThisMonthAPI(reqParams);
      return usersRes;
    },
    enabled: fetchTotalActiveSessionThisMonth,
  });

  const { data: totalUsersThisMonth } = useQuery({
    queryKey: ["total-users-this-month", {
      debouncedSearch,
      fromDate,
      toDate,
      onlyNewUsers,
      selectedPartnerId
    }],
    queryFn: async () => {
      const { fromDate: startDate, toDate: endDate } = getCurrentMonthDays();
      const sd = onlyNewUsers ? fromDate || startDate : startDate;
      const ed = onlyNewUsers ? toDate || endDate : endDate;

      const gamesRes = await totalUsersAPI(selectedPartnerId, {
        startDate: sd,
        endDate: ed,
      });
      return gamesRes;
    },
    enabled: fetchTotalUsersThisMonth,
  });

  const onRefreshUsers = () => {
    handlePageChange(null, 0);
    refetch();
  };

  const onRefreshActiveUsers = () => {
    handlePageChange(null, 0);
    activeUsersRefetch();
  };

  const _updateUserItemFromList = (newUserData: UserObjectType) => {
    queryClient.setQueryData(usersListQueryKey, (usersRes: UsersAPIREquest) => {
      const newItems = usersRes?.items?.map((user: UserObjectType) => {
        if (user.id === newUserData.id) {
          return {
            ...user,
            ...newUserData,
          };
        }

        return user;
      });

      return {
        ...usersRes,
        items: newItems,
      };
    });
  };

  const _updateUserBalanceFromList = (newBalanceItem: UserBalanceListType) => {
    queryClient.setQueryData(usersListQueryKey, (usersRes: UsersAPIREquest) => {
      const newItems = usersRes?.items?.map((user: UserObjectType) => {
        if (user.id === state.selectedUser?.id) {
          return {
            ...user,
            userBalanceList: _unionBy(
              [newBalanceItem],
              user.userBalanceList,
              "id"
            ),
          };
        }

        return user;
      });

      return {
        ...usersRes,
        items: newItems,
      };
    });
  };

  const onUpdateUserDetails = useMutation({
    mutationKey: ["update-user-details"],
    mutationFn: updateUserDetailsAPI,
    onSuccess: async ({ data: { data: updatedUser } }) => {
      _updateUserItemFromList(updatedUser);

      if (updatedUser.id === currentUser.id) queryClient.setQueryData(["current-user"], updatedUser);

      triggerOpen({
        message: "Successfully updated user details.",
      });

      handleCloseMoreDetails();
    },
  });

  const onUpdateUserBalance = useMutation({
    mutationKey: ["update-user-balance"],
    mutationFn: updateUserBalanceAPI,
    onSuccess: ({ data }) => {
      _updateUserBalanceFromList(data.data);

      triggerOpen({
        message: "Successfully updated user balance.",
      });

      handleCloseUpdateBalance();
    },
    onError: (error) => {
      triggerOpen({
        type: AlertType.error,
        title: "Failed to update user balance.",
        message: error.message
      });
    },
  });

  const onUpdateUserTierLevel = useMutation({
    mutationKey: ["update-user-tier-level"],
    mutationFn: updateUserTierLevelAPI,
    onSuccess: ({ data }) => {
      _updateUserItemFromList(data.data);

      triggerOpen({
        message: "Successfully updated user tier level.",
      });

      handleCloseUpdateTierLevel();
    },
    onError: (error) => {
      triggerOpen({
        type: AlertType.error,
        title: "Failed to update user tier level.",
        message: error.message
      });
    },
  });

  const onUpdateUserPassword = useMutation({
    mutationKey: ["update-user-password"],
    mutationFn: async (params: UpdateUserPasswordAPIParams) => {
      const result = await updatePasswordAPI(params);
      return result;
    },
    onSuccess: ({ data }) => {
      triggerOpen({
        message: "Successfully updated password.",
      });
    },
    onError: (error: any) => {
      if (error?.response?.data?.error?.message !== "Incorrect current password") {
        triggerOpen({
          type: AlertType.error,
          title: "Failed to update password.",
          message: error?.response?.data?.error?.message
        });
      }
    },
  });

  const onExportUsersList = useMutation({
    mutationKey: ["export-users-list", {
      fromDate,
      toDate,
      debouncedSearch,
      onlyNewUsers,
    }],
    mutationFn: () => {
      const reqParams: GetAllUsersParams = {
        userTypeIDs: [USERTYPES.PLAYER],
        partnerId: selectedPartnerId,
      };

      const { fromDate: startDate, toDate: endDate } = getCurrentMonthDays();

      if (onlyNewUsers) {
        reqParams.startDate = startDate;
        reqParams.endDate = endDate;
      }

      if (fromDate) reqParams.startDate = fromDate;
      if (toDate) reqParams.endDate = toDate;
      if (debouncedSearch) reqParams.search = debouncedSearch;
      if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

      return exportUsersListAPI(reqParams);
    },
    onSuccess: ({ data }) => {
      const promises: any = [];

      _.forEach(data.items, (item, index: number) => {
        const promise = new Promise((innerResolve) => {
          const result: Record<string, any> = {};
          let headers = partner === "palmsplay"
              ? TABLE_HEAD_USERS_PALMSPLAY
              : partner === "gambly"
              ? TABLE_HEAD_USERS_GAMBLY
              : TABLE_HEAD_USERS;
          const coins: any = getAmountBalanceByCoinType(item.userBalanceList || []);

          headers.forEach(({ id, label = "" }) => {
            let fieldValue: any;
  
            if (id === "id") fieldValue = item.id;
            if (id === "firstName") fieldValue = (`${item.firstName || ""} ${item.lastName || ""}`).trim();
            if (id === "lastName") fieldValue = item.lastName;
            if (id === "emailAddress") fieldValue = item.emailAddress;
            if (id === "displayName") fieldValue = item.displayName;
            if (id === "enrollmentDate") fieldValue = item.enrollmentDate;
            if (id === "kycStatus") fieldValue = item.kycStatus;
            if (id === "isDeleted") fieldValue = item.isDeleted ? "Deactivated" : "Active";
            if (id === "SILVER") fieldValue = numeral(coins[id] || 0).format("0,000");
            if (id === "GOLD") fieldValue = numeral(coins?.GOLD || 0).format("0,000.00");
            if (id === "GOLD BONUS") fieldValue = numeral(coins["GOLD BONUS"] || 0).format("0,000.00");
            if (id === "isVerified") fieldValue = item.isVerified ? "Yes" : "No";
  
            result[label] = fieldValue;
          })
          innerResolve(result);
        });
  
        promises.push(promise);
      });

      Promise.all(promises)
      .then((newJson) => {
        downloadExcel(newJson, "export-users");
      })
      .catch((error) => {
        console.log("error", error)
      });
    },
  });

  const onExportUsersSessionList = useMutation({
    mutationKey: ["export-users-session-list"],
    mutationFn: () => {
      const reqParams: any = {
        unpage: true,
        partnerId: selectedPartnerId
      };

      if (fromDate) reqParams.fromDate = fromDate;
      if (toDate) reqParams.toDate = toDate;
      if (debouncedSearch) reqParams.search = debouncedSearch;

      return getActiveUsersAPI(reqParams);
    },
    onSuccess: ({ items }) => {
      const newJson = items.map((item: any) => {
        const result: Record<string, any> = {};
        const headers = TABLE_HEAD_ACTIVE_USERS;

        headers.forEach(({ id, label = "" }) => {
          let fieldValue: any;

          if (id === "id") fieldValue = item.user.id;
          if (id === "displayName") fieldValue = item.user.displayName;
          if (id === "loginDate") fieldValue = item.startedAt ? moment(item.startedAt).format("MM-DD-YYYY") : '-'
          if (id === "loginTime") fieldValue = item.startedAt ? moment.parseZone(item.startedAt).format("hh:mm A") : '-';
          if (id === "logoutTime") fieldValue = item.endedAt ? moment.parseZone(item.endedAt).format("hh:mm A") : '-';

          result[label] = fieldValue;
        })

        return result;
      });

      downloadExcel(newJson, "export-users-session");
    },
  });

  return {
    data,
    demographicsData: demographicsData || [],
    users: data?.items,
    totalRecords: data?.totalRecords || 0,
    totalPages: data?.totalPages || 0,
    totalUsers,
    totalUsersThisMonth,
    totalActiveUsers,
    isLoading,
    isRefreshing: isRefetching,
    activeUsersData: activeUsers,
    activeUsers: activeUsers?.items || [],
    activeUsersLoading,
    activeUsersRefetching,
    onRefreshActiveUsers,
    onRefreshUsers,
    onUpdateUserDetails,
    onUpdateUserBalance,
    onUpdateUserTierLevel,
    onExportUsersList,
    onUpdateUserPassword,
    onExportUsersSessionList,
    totalActiveSessionThisMonth,
  };
};
