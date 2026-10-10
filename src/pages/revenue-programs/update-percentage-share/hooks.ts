import { useMutation, useQuery } from "@tanstack/react-query";
import { partnerProvidersListAPI, providersWithShareListAPI, updatePartnerPercentShareAPI, updatePercentShareAPI } from "@src/api/game-providers";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { UpdateGameProviderAPIRequestType } from "@src/lib/types/game-providers";
import { UseProgramsServiceOperators } from "@src/lib/types/programs";
import { useSearchParams } from "react-router-dom";

export const useProgramsService = (): Readonly<UseProgramsServiceOperators> => {
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();
    const [params] = useSearchParams();
    const type = params.get('type');

    const getProvidersWithRevShareQueryKey = [
        'get-providers-with-rev-share',
        {
            partnerId: selectedPartnerId,
            type
        }
    ];

    const { data: providersWithShareData, isLoading: providersWithShareDataIsLoading, refetch: refetchProvidersWithShare } = useQuery({
        queryKey: getProvidersWithRevShareQueryKey,
        queryFn: async () => {
            if(type === "GPR"){
                const result = await providersWithShareListAPI({
                    partnerId: selectedPartnerId
                });
                return result;
            }else{
                const result = await partnerProvidersListAPI({
                    partnerId: selectedPartnerId
                });
                return result;
            }
        },
    })

    const onUpdatePercentageShare = useMutation({
        mutationKey: ['update-percent-share', {selectedPartnerId, type}],
        mutationFn: async (items: any) => {
            if(type === "GPR"){
                return await updatePercentShareAPI({ ...items, partnerId: selectedPartnerId } as UpdateGameProviderAPIRequestType);
            }else{
                return await updatePartnerPercentShareAPI({ ...items, partnerId: selectedPartnerId } as UpdateGameProviderAPIRequestType);
            }
        },
        onSuccess: () => {
            refetchProvidersWithShare();
        }
    })

    return {
        data: {} as any,
        result: {},
        isLoading: false,
        onUpdatePercentageShare,
        providersWithShareData: providersWithShareData?.items || [],
        providersWithShareDataIsLoading
    }
};