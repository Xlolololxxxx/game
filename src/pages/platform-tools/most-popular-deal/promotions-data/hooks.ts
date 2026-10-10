import { PromotionsDataAPI, PromotionsDataStatAPI } from "@src/api/platform-tools";
import { MissionAPIParams, UseMissionActivityServiceOperators } from "@src/lib/types/missions-portal";
import { useQuery } from "@tanstack/react-query";
import { useMissionActivityTrackeContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useGoldShopService = (): Readonly<UseMissionActivityServiceOperators> => {
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	const { state, handlePageChange } = useMissionActivityTrackeContext();
	const { page, debouncedSearch, rowsPerPage, order, orderBy, fromDate, toDate } = state || {};
	const newPage = (page || 0) + 1;

	const mostPlayedListQueryKey = [
		"promotions-data",
		{
			newPage,
			order,
			orderBy,
			rowsPerPage,
			debouncedSearch,
			fromDate,
			toDate,
			selectedPartnerId
		},
	];

	const { data, refetch, isRefetching: isRefreshing, isLoading } = useQuery({
		queryKey: mostPlayedListQueryKey,
		queryFn: async () => {
			const reqParams: MissionAPIParams = {
				size: rowsPerPage,
				page: newPage,
				partnerId: selectedPartnerId
			};

			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;

			const result = await PromotionsDataAPI(reqParams);

			return result;
		},
	});
	
	const { data: totalAmountPurchaseFromShop, refetch: refetchTotal } = useQuery({
    queryKey: ["total-sales-from-promotions", {selectedPartnerId, fromDate, toDate}],
    queryFn: async () => {
			const reqParams: MissionAPIParams = {
				partnerId: selectedPartnerId
			};

			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;
      const usersRes = await PromotionsDataStatAPI(reqParams);
      return usersRes?.totalAmount;
    },
  });

	const onRefreshMission = () => {
		handlePageChange(0);
		refetch();
		refetchTotal();
	};

	return {
		data,
		missions: data?.items || [],
		isLoading,
		isRefreshing,
		onRefreshMission,
		totalAmountPurchase: totalAmountPurchaseFromShop
	};
}