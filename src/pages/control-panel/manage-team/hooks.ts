import { useMutation, useQuery } from "@tanstack/react-query";

import queryClient from "@src/query-client";

import { deleteTeamMemberAPI, inviteTeamMemberAPI } from "@src/api/control-panel";
import { allUsersAPI, updateUserDetailsAPI } from "@src/api/users";
import {
  GetAllUsersParams,
  UserObjectType,
  UsersAPIREquest,
  UserTypeID,
} from "@src/lib/types/users";

import { useToasterContext } from "@src/context/Toaster";
import {
  InviteUserFormValues,
  UseManageTeamServiceOperators,
} from "@src/lib/types/control-panel";
import { AlertType } from "@src/lib/types/toaster";

import { useAuthService } from "@src/store/hooks";

import { useManageTeamContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useManageTeamService =
  (): Readonly<UseManageTeamServiceOperators> => {
    const { currentUser } = useAuthService();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();

    const { triggerOpen } = useToasterContext();
    const {
      state,
      handleToggleInviteModal,
      handlePageChange,
      handleToggleUpdateUserModal,
    } = useManageTeamContext();
    const { size, page, order, orderBy } = state || {};
    const newPage = (page || 0) + 1;

    // allow all access roles except Player
    const allowedUserAccess: Record<UserTypeID, number[]> = {
      2: [2, 3, 4, 5, 6], // developer
      3: [3, 4, 5],    // owner
      4: [3, 4, 5],    // admin
      5: [5],          // general
      6: [6],          // game provider
    };

    const userAccess = allowedUserAccess[currentUser?.userTypeID as UserTypeID];

    const usersListQueryKey = [
      "manage-team-users",
      {
        size,
        newPage,
        order,
        orderBy,
        userTypeIDs: userAccess,
        selectedPartnerId,
      },
    ];

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: usersListQueryKey,
      queryFn: async () => {
        const reqParams: GetAllUsersParams = {
          size,
          page: newPage,
          userTypeIDs: userAccess,
          partnerId: selectedPartnerId,
        };

        if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

        const usersRes = await allUsersAPI(reqParams);

        return usersRes;
      },
    }); 

    const onInviteUser = useMutation({
      mutationFn: async (formData: InviteUserFormValues) => {
        try {
          console.log("formDataformData", formData)
          await inviteTeamMemberAPI({
            partnerId: selectedPartnerId,
            ...formData,
          });
          handleToggleInviteModal(false);
          triggerOpen({
            title: "Invite user",
            message: "Successfully sent invitation to user",
          });
        } catch (error: any) {
          triggerOpen({
            type: AlertType.error,
            title: "Invite user",
            message: error.message
          });
        }
      },
    });

    const _updateUserItemFromList = (newUserData: UserObjectType) => {
      queryClient.setQueryData(
        usersListQueryKey,
        (usersRes: UsersAPIREquest) => {
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
        }
      );
    };

    const onUpdateUserDetails = useMutation({
      mutationKey: ["manage-team-update-user-details"],
      mutationFn: updateUserDetailsAPI,
      onSuccess: ({ data }) => {
        console.log("onUpdateUserDetails", data)
        _updateUserItemFromList(data.data);

        triggerOpen({
          message: "Successfully updated user details.",
        });

        handleToggleUpdateUserModal();
      },
    });

    const onDeleteUser = useMutation({
      mutationKey: ["manage-team-delete-user"],
      mutationFn: async (params: any) => {
        const payload = {
          partnerId: params?.partnerId || selectedPartnerId,
          ...params,
        };
        return deleteTeamMemberAPI(payload);
      },
      onSuccess: () => {
        refetch();
        triggerOpen({
          message: "Successfully deleted user.",
        });
        handleToggleUpdateUserModal();
      },
    });

    const onRefreshUsers = () => {
      handlePageChange(null, 0);
      refetch();
    };

    return {
      data,
      users: data?.items,
      isLoading,
      isRefreshing: isRefetching,
      onInviteUser,
      onRefreshUsers,
      onUpdateUserDetails,
      onDeleteUser,
    };
  };
