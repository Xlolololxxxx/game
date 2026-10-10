import { PromotionsDataUsersPurchaseAPI } from "@src/api/platform-tools";
import { MissionAPIParams, UseMissionActivityServiceOperators } from "@src/lib/types/missions-portal";
import { useQuery } from "@tanstack/react-query";
import { useMissionActivityTrackeContext } from "../promotions-data/provider";
import { usePurchasingUsersContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useMissionTrackerService = (): Readonly<UseMissionActivityServiceOperators> => {
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	const { state, handlePageChange } = usePurchasingUsersContext();
	const { state: PROMOTION } = useMissionActivityTrackeContext();
	const { page, debouncedSearch, rowsPerPage, order, orderBy, fromDate, toDate } = state || {};
	const newPage = (page || 0) + 1;
	const dealId = PROMOTION?.selectedItem?.id;

	const mostPlayedListQueryKey = [
		"promotion-purchase-records",
		{
			newPage,
			order,
			orderBy,
			rowsPerPage,
			debouncedSearch,
			fromDate,
			toDate,
			dealId,
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
			if (dealId) reqParams.dealId = dealId;
			if (debouncedSearch) reqParams.search = debouncedSearch;

			if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;

			const result = await PromotionsDataUsersPurchaseAPI(reqParams);

			return result;
		},
	});

	const onRefreshMission = () => {
			handlePageChange(0);
			refetch();
	};

	return {
		data,
		missions: data?.items || [],
		isLoading,
		isRefreshing,
		onRefreshMission,
	};
}