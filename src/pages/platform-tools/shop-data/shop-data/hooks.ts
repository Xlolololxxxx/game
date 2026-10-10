import { exportMostPlayedListAPI } from "@src/api/most-played";
import { ShopDataAPI, ShopDataStatAPI } from "@src/api/platform-tools";
import { MissionAPIParams, UseMissionActivityServiceOperators } from "@src/lib/types/missions-portal";
import { downloadExcel } from "@src/utils/download-helper";
import { TABLE_HEAD_MOST_PLAYED } from "@src/utils/mockdata/table-headers";
import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";
import { useMissionActivityTrackeContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { GetMostPlayedAPIParams } from "@src/lib/types/most-played";

export const useGoldShopService = (): Readonly<UseMissionActivityServiceOperators> => {
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	const { state, handlePageChange } = useMissionActivityTrackeContext();
	const { page, debouncedSearch, rowsPerPage, order, orderBy, fromDate, toDate } = state || {};
	const newPage = (page || 0) + 1;

	const mostPlayedListQueryKey = [
		"shop-data",
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
				partnerId: selectedPartnerId,
			};

			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;

			const result = await ShopDataAPI(reqParams);

			return result;
		},
	});
	
	const { data: totalAmountPurchaseFromShop, refetch: refetchTotal } = useQuery({
    queryKey: ["total-amount-purchase-from-shop", { fromDate, toDate}],
    queryFn: async () => {
			const reqParams: MissionAPIParams = {
				partnerId: selectedPartnerId,
			};

			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;
      const usersRes = await ShopDataStatAPI(reqParams);
      return usersRes?.totalAmount;
    },
  });

	const onRefreshMission = () => {
		handlePageChange(0);
		refetch();
		refetchTotal();
	};

	const onExport = useMutation({
		mutationKey: ["export-most-played-list"],
		mutationFn: async () => {
			const reqParams: GetMostPlayedAPIParams = { 
				providerID: selectedPartnerId,
			};

			if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;

			const res = await exportMostPlayedListAPI(reqParams);

			const newJson = res.data.items.map((item: any) => {
					const result: Record<string, any> = {};

					TABLE_HEAD_MOST_PLAYED.forEach(({ id, label = '' }) => {
							let fieldValue: any;

							if (id === 'provider') fieldValue = item.gameType.provider.name;
							if (id === 'gameName') fieldValue = item.gameName;
							if (id === 'id') fieldValue = item.id;
							if (id === 'totalPlayers') fieldValue = item.totalPlayers || 0;
							if (id === 'totalSilverBet') fieldValue = numeral(item.totalSilverBet || 0).format("0,000");
							if (id === 'totalGoldBet') fieldValue = numeral(item.totalGoldBet || 0).format("0,000");

							result[label] = fieldValue;
					});

					return result;
			});

			downloadExcel(newJson, "export-most-played");
		},
	});

	return {
		data,
		missions: data?.items || [],
		isLoading,
		isRefreshing,
		onRefreshMission,
		onExport,
		totalAmountPurchase: totalAmountPurchaseFromShop
	};
}