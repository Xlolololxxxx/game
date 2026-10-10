import { getCoinTransactionBetStatsAPI } from "@src/api/coin-transactions";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useQuery } from "@tanstack/react-query";

const useCoinTransactionBetStats = (period: string) => {
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	
	const { data, isLoading } = useQuery({
		queryKey: ["coin-transaction-bet-chart", {period, selectedPartnerId}],
		queryFn: async () => {
			const result = await getCoinTransactionBetStatsAPI({ partnerId: selectedPartnerId, period});
			return result;
		},
	});

	return {
		data,
		isLoading,
	};
};

export default useCoinTransactionBetStats;