import { useQuery } from "@tanstack/react-query";

import {
  MissionsActivityChartAPI,
  totalCompletedMissionsCountAPI
} from "@src/api/platform-tools";

import { UsePlatformToolsServiceOperators } from "@src/lib/types/platform-tools";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

type Props = {
  period?: string;
}

export const usePlatformToolsServices =
  ({period}: Props): Readonly<UsePlatformToolsServiceOperators> => {
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

    const { data: totalMissionsCompleted } = useQuery({
      queryKey: ["total-number-missions-completed", selectedPartnerId],
      queryFn: async () => {
        const result = await totalCompletedMissionsCountAPI(selectedPartnerId);
        return result;
      },
    });

    const { data: missionActivityChart, refetch: refetchMissionActivityChart } = useQuery({
      queryKey: ["mission-activity-charts", period, selectedPartnerId],
      queryFn: async () => {
        const result = await MissionsActivityChartAPI({
          period: period || "MONTHLY",
          partnerId: selectedPartnerId
        });

        return result;
      },
    });

    return {
      totalMissionsCompleted,
      missionActivityChart,
      refetchMissionActivityChart,
    };
  };
