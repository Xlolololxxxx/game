import { getPartnerCommission } from "@src/api/programs";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { GenerateProgramsAPIParams, PartnerServiceOperators } from "@src/lib/types/programs";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import { useProgramsContext } from "../provider";

export const useProgramsService = (): Readonly<PartnerServiceOperators> => {
    const { state } = useProgramsContext();
    const { prMonth, prYear, prProviderName, autogenerate } = state || {};
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();

    const generateProgramsQueryKey = [
        'generate-partner-programs',
        {
            prMonth,
            prYear,
            prProviderName,
            partnerId: selectedPartnerId,
            autogenerate,
        }
    ];

    const { data, isLoading } = useQuery({
        queryKey: generateProgramsQueryKey,
        queryFn: async () => {
            const reqParams: GenerateProgramsAPIParams = {
                providerName: prProviderName,
                partnerId: selectedPartnerId,
                month: moment().format("MM"),
                year: moment().format("YYYY"),
            };

            if (prMonth) reqParams.month = prMonth;
            if (prYear) reqParams.year = prYear;

            const result = await getPartnerCommission(reqParams);
            return result;
        },
    });

    return {
        data,
        result: data || {},
        isLoading,
    }
};