import { useQuery } from "@tanstack/react-query";
import { generateProgramsAPI } from "@src/api/programs";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { GenerateProgramsAPIParams, UseProgramsServiceOperators } from "@src/lib/types/programs";
import moment from "moment";
import { useProgramsContext } from "../provider";

export const useProgramsService = (): Readonly<UseProgramsServiceOperators> => {
    const { state } = useProgramsContext();
    const { gprMonth, gprYear, gprProviderName, autogenerate } = state || {};
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();

    const generateProgramsQueryKey = [
        'generate-programs',
        {
            gprMonth,
            gprYear,
            gprProviderName,
            partnerId: selectedPartnerId,
            autogenerate,
        }
    ];

    const { data, isLoading } = useQuery({
        queryKey: generateProgramsQueryKey,
        queryFn: async () => {
            const reqParams: GenerateProgramsAPIParams = {
                providerName: gprProviderName,
                partnerId: selectedPartnerId,
                month: moment().format("MM"),
                year: moment().format("YYYY"),
            };

            if (gprMonth) reqParams.month = gprMonth;
            if (gprYear) reqParams.year = gprYear;

            const result = await generateProgramsAPI(reqParams);
            return result;
        },
    });


    return {
        data,
        result: data?.data || {},
        isLoading,
        onUpdatePercentageShare: [] as any,
        providersWithShareData: [] as any,
        providersWithShareDataIsLoading: false
    }
};