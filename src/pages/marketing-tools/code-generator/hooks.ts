import { allCodesResultsAPI, createAPI, updateCodeDetailsAPI, updateCodeStatusAPI } from "@src/api/code-generator";
import { useToasterContext } from "@src/context/Toaster";
import { CodeGeneratorAPIParams, CreateCodeGeneratorContextStateType, UseCodeGeneratorServiceOperators, UseCodeGeneratorServiceParams } from "@src/lib/types/code-generator";
import { AlertType } from "@src/lib/types/toaster";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { useCodeGeneratorContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useCodeGeneratorService =
  (args?: UseCodeGeneratorServiceParams): Readonly<UseCodeGeneratorServiceOperators> => {
    const [params] = useSearchParams();
    const userId = params.get("u");
    const { triggerOpen } = useToasterContext();
    const { state, handlePageChange } = useCodeGeneratorContext();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();
    const { name, page, rowsPerPage, editDetails, fromDate, toDate, status } = state || {};
    const newPage = (page || 0) + 1;

    const QUERY_KEY = [
      "code-generator-list",
      {
        name,
        userId,
        newPage,
        rowsPerPage,
        fromDate,
        toDate,
        status,
        selectedPartnerId
      },
    ];

    const { data, isLoading, isRefetching, refetch } = useQuery({
      queryKey: QUERY_KEY,
      queryFn: async () => {
        const reqParams: CodeGeneratorAPIParams = {
          size: rowsPerPage,
          page: newPage,
          partnerId: selectedPartnerId
        };

        if (name) reqParams.search = name;
        if (fromDate) reqParams.fromDate = fromDate;
        if (toDate) reqParams.toDate = toDate;
        if (status) reqParams.status = status;

        const result = await allCodesResultsAPI(reqParams);

        return result;
      },
    });

    const onCreateCodeGenerator = useMutation({
      mutationKey: ['code-generator-creation'],
      mutationFn: async (args?: Partial<CreateCodeGeneratorContextStateType>) => {
        const result = await createAPI(args);
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Create Code Generator",
          message: "Successfully created!",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Create Code Generator",
          message: "Failed to create code generator",
        });
      },
    });

    const { data: getCodeGeneratorDetails, isLoading: getCodeGeneratorDetailsLoading } = useQuery({
      queryKey: ["mission-details", editDetails?.name, editDetails?.lastModifiedDate, editDetails?.status],
      queryFn: async () => {
        // if (!_.isEmpty(editDetails)) {
        //   const result = await codeDetailsAPI(editDetails?.id);
        //   return result;
        // }
      },
      enabled: !!editDetails?.id && args?.getCodeGeneratorDetails,
    });

    const updateCodeGeneratorStatus = useMutation({
      mutationKey: ['update-mission-status'],
      mutationFn: async (params: any) => {
        const result = await updateCodeStatusAPI(params.id, {
          status: params.status
        });
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Update Status",
          message: "Change status successfully",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update Status",
          message: "Failed to update status",
        });
      },
    });

    const updateCodeGeneratorDetails = useMutation({
      mutationKey: ['update-mission-details'],
      mutationFn: async (params: any) => {
        const result = await updateCodeDetailsAPI(params);
        return result;
      },
      onSuccess: () => {
        triggerOpen({
          title: "Update CodeGenerator Details",
          message: "Change details successfully",
        });
      },
      onError: (error) => {
        triggerOpen({
          type: AlertType.error,
          title: "Update CodeGenerator Details",
          message: "Failed to update mission details",
        });
      },
    });

    const onRefreshCodeGenerator = () => {
      handlePageChange(null, 0);
      refetch();
    };

    return {
      data,
      codes: data?.items ?? [],
      isLoading,
      isRefreshing: isRefetching,
      onRefreshCodeGenerator,
      onCreateCodeGenerator,
      getCodeGeneratorDetails,
      getCodeGeneratorDetailsLoading,
      updateCodeGeneratorStatus,
      updateCodeGeneratorDetails,
    };
  };
