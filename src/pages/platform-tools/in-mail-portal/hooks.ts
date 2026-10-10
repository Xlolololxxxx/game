import { allMailResultsAPI, createInMailAPI, gamesAPI, mailDetailsAPI, productsAPI, updateMailDetailsAPI, updateMailStatusAPI, uploadImageAPI } from "@src/api/in-mail-portal";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useToasterContext } from "@src/context/Toaster";
import { CreateMailContextStateType, InMailAPIParams, UseInMailServiceOperators, UseInMailServiceParams } from "@src/lib/types/in-mail-portal";
import { AlertType } from "@src/lib/types/toaster";
import { useMutation, useQuery } from "@tanstack/react-query";
import _ from "lodash";
import { useSearchParams } from "react-router-dom";
import { useInMailContext } from "./provider";

export const useInMailService =
  (args?: UseInMailServiceParams): Readonly<UseInMailServiceOperators> => {
    const [params] = useSearchParams();
    const userId = params.get("u");
    const { triggerOpen } = useToasterContext();
    const { state, handlePageChange } = useInMailContext();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();
    const { subject, page, order, orderBy, rowsPerPage, editDetails } = state || {};
    const newPage = (page || 0) + 1;

    const QUERY_KEY = [
      "in-mail-portal",
      {
        subject,
        userId,
        newPage,
        order,
        orderBy,
        rowsPerPage,
        selectedPartnerId
      },
    ];

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: QUERY_KEY,
      queryFn: async () => {
        const reqParams: InMailAPIParams = {
          size: rowsPerPage,
          page: newPage,
          partnerId: selectedPartnerId
        };

        if (subject) reqParams.subject = subject;


        const result = await allMailResultsAPI(reqParams);

        return result;
      },
    });

    const onCreateInMail = useMutation({
      mutationKey: ['in-mail-creation', { selectedPartnerId }],
      mutationFn: async (args?: Partial<CreateMailContextStateType>) => {
        const result = await createInMailAPI({
          ...args,
          partnerId: selectedPartnerId
        });
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Create Mail",
          message: "Successfully mail creation",
        });
      },
      onError: (error: any) => {
        console.log("errorerror", error)
        triggerOpen({
          type: AlertType.error,
          title: "Create Mail",
          message: error?.error?.message || "Failed to create mail",
        });
      },
    });

    const { data: getMailDetails, isLoading: getMailDetailsLoading } = useQuery({
      queryKey: ["mail-details", editDetails?.id, editDetails?.lastModifiedAt, selectedPartnerId],
      queryFn: async () => {
        if (!_.isEmpty(editDetails)) {
          const result = await mailDetailsAPI(editDetails?.id, { partnerId: selectedPartnerId });
          return result;
        }
      },
      enabled: !!editDetails?.id && args?.getInMailDetails,
    });

    const { data: products, isLoading: productsLoading } = useQuery({
      queryKey: ["store-products", selectedPartnerId],
      queryFn: async () => {
        const result = await productsAPI({ partnerId: selectedPartnerId });
        return result;
      },
    });

    const { data: games, isLoading: gamesLoading } = useQuery({
      queryKey: ["games", selectedPartnerId],
      queryFn: async () => {
        const result = await gamesAPI({ partnerId: selectedPartnerId });
        return result;
      },
    });

    const updateMailStatus = useMutation({
      mutationKey: ['update-mail-status'],
      mutationFn: async (params: any) => {
        const result = await updateMailStatusAPI(params.id, {
          isActive: params.isActive
        });
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Update Mail Status",
          message: "Change status successfully",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update Mail Status",
          message: "Failed to update mail status",
        });
      },
    });

    const updateMailDetails = useMutation({
      mutationKey: ['update-mail-details'],
      mutationFn: async (params: any) => {
        const result = await updateMailDetailsAPI(params);
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Update Mail Details",
          message: "Change details successfully",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update Mail Details",
          message: "Failed to update mail details",
        });
      },
    });

    const uploadImage = useMutation({
      mutationKey: ['upload-image'],
      mutationFn: async (params?: Partial<any>) => {
        const result = await uploadImageAPI(params);
        return {
          type: params?.get("type"),
          result: result?.data ?? {}
        };
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Uploading Image",
          message: "Failed to upload image.",
        });
      },
    });

    const onRefreshInMail = () => {
      handlePageChange(null, 0);
      refetch();
    };

    return {
      data,
      mails: data?.items ?? [],
      isLoading,
      isRefreshing: isRefetching,
      onRefreshInMail,
      onCreateInMail,
      getMailDetails,
      getMailDetailsLoading,
      updateMailStatus,
      updateMailDetails,
      uploadImage,
      products, productsLoading,
      games, gamesLoading
    };
  };
