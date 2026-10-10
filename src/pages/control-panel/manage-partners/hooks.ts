import { useMutation, useQuery } from "@tanstack/react-query";

import { useToasterContext } from "@src/context/Toaster";
import { UseManagePartnersServiceOperators } from "@src/lib/types/control-panel";
import {
  CreatePartnerFormData,
  GetPartnersListAPIParams,
  UpdatePartnerStatusAPIParams,
} from "@src/lib/types/partners";

import { createLicenseAPI } from "@src/api/licenses";
import { createPartnerAPI, getPartnerDetailsAPI, partnersListAPI, updatePartnerAPI, updatePartnerStatusAPI } from "@src/api/partners";
import { CreateLicenseFormData } from "@src/lib/types/licenses";
import { AlertType } from "@src/lib/types/toaster";
import queryClient from "@src/query-client";
import { useManagePartnersContext } from "./provider";

export const useManagePartnersService =
  (): Readonly<UseManagePartnersServiceOperators> => {
    const { triggerOpen } = useToasterContext();
    const { state, handlePageChange } = useManagePartnersContext();
    const { size, page, order, orderBy, selectedPartner, generateLicenseKeyDialogOpen } = state || {};
    const newPage = (page || 0) + 1;
    const { id: selectedPartnerID } = selectedPartner || {};

    const partnersListQueryKey = [
      "manage-partners",
      {
        size,
        newPage,
        order,
        orderBy,
      },
    ];

    const allPartnersListQueryKey = [
      'manage-partners-all',
      {
        order,
        orderBy,
      }
    ]

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: partnersListQueryKey,
      queryFn: async () => {
        const reqParams: GetPartnersListAPIParams = {
          size,
          page: newPage,
        };

        if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

        const usersRes = await partnersListAPI(reqParams);

        return usersRes;
      },
    });

    const { data: allPartnersData, isLoading: isLoadingAllPartners } = useQuery({
      queryKey: allPartnersListQueryKey,
      queryFn: async () => {
        const reqParams: GetPartnersListAPIParams = {};

        if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

        const usersRes = await partnersListAPI(reqParams);

        return usersRes;
      }
    });

    const { data: partnerDetails, isLoading: isLoadingPartnerDetails, refetch: refetchPartnerDetails } = useQuery({
      queryKey: ['manage-partners', 'get-details', selectedPartnerID],
      queryFn: async () => {
        if (selectedPartnerID) {
          const result = await getPartnerDetailsAPI(selectedPartnerID);
          return result;
        }
      },
      enabled: !!selectedPartnerID && generateLicenseKeyDialogOpen,
    });

    const onRefreshPartners = () => {
      handlePageChange(null, 0);
      refetch();
    };

    const onRefreshPartnerDetails = () => {
      refetchPartnerDetails();
    }

    const onCreatePartner = useMutation({
      mutationFn: async (formData: CreatePartnerFormData) => {
        const result = await createPartnerAPI(formData);
        return result;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partnersListQueryKey,
        });
        triggerOpen({
          title: "Create partner",
          message: "Successfully created a new partner",
        });
      },
      onError: () => {
        triggerOpen({
          type: AlertType.error,
          title: "Create partner",
          message: "Failed to create a new partner",
        });
      },
    });

    const onUpdatePartner = useMutation({
      mutationFn: async (formData: CreatePartnerFormData) => {
        const partnerId = selectedPartner?.id;
        if (partnerId) {
          const result = await updatePartnerAPI(partnerId, formData);
          return result;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partnersListQueryKey,
        });
        queryClient.invalidateQueries({
          queryKey: ['manage-partners', 'get-details', selectedPartnerID],
        });
        triggerOpen({
          title: "Update partner",
          message: "Successfully updated a new partner",
        });
      },
      onError: () => {
        triggerOpen({
          type: AlertType.error,
          title: "Update partner",
          message: "Failed to update a new partner",
        });
      },
    });

    const onUpdatePartnerStatus = useMutation({
      mutationFn: async (formData: UpdatePartnerStatusAPIParams) => {
        const partnerId = selectedPartner?.id;
        if (partnerId) {
          const result = await updatePartnerStatusAPI(partnerId, formData);
          return result;
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: partnersListQueryKey,
        });
        queryClient.invalidateQueries({
          queryKey: ['manage-partners', 'get-details', selectedPartnerID],
        });
        triggerOpen({
          title: "Update partner status",
          message: "Successfully updated a new partner status",
        });
      },
      onError: () => {
        triggerOpen({
          type: AlertType.error,
          title: "Update partner status",
          message: "Failed to update a new partner status",
        });
      },
    });

    const onCreateLicense = useMutation({
      mutationFn: async (formData: CreateLicenseFormData) => {
        const result = await createLicenseAPI(formData);
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Create license",
          message: "Successfully created a new license",
        });
      },
      onError: () => {
        triggerOpen({
          type: AlertType.error,
          title: "Create license",
          message: "Failed to create a new license",
        });
      },
    });

    return {
      data,
      allPartnersData,
      partners: data?.items || [],
      partnerDetails,
      isLoadingPartnerDetails,
      isLoadingAllPartners,
      isLoading,
      isRefreshing: isRefetching,
      onRefreshPartners,
      onRefreshPartnerDetails,
      onCreatePartner,
      onCreateLicense,
      onUpdatePartner,
      onUpdatePartnerStatus,
    };
  };
