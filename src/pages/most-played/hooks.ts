import { useMutation, useQuery } from "@tanstack/react-query";
import numeral from "numeral";

import { downloadExcel } from "@src/utils/download-helper";
import { TABLE_HEAD_MOST_PLAYED } from "@src/utils/mockdata/table-headers";

import { GetMostPlayedAPIParams, UseMostPlayedServiceOperators } from "@src/lib/types/most-played";

import { exportMostPlayedListAPI, getMostPlayedAPI } from "@src/api/most-played";

import { useSearchParams } from "react-router-dom";
import { useMostPlayedContext } from "./provider";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useMostPlayedService = (): Readonly<UseMostPlayedServiceOperators> => {
	const [searchParams] = useSearchParams();
  const sortValue = searchParams.get('sort');
  const sortByValue = searchParams.get('sortBy');
	const { state, handlePageChange } = useMostPlayedContext();
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	const { page, debouncedSearch, rowsPerPage, order, orderBy, fromDate, toDate } = state || {};
	const newPage = (page || 0) + 1;
	const newSort = sortValue || order;
	const newSortBy = sortByValue || orderBy;

	const mostPlayedListQueryKey = [
		"most-played",
		{
			newPage,
			order: newSort,
			orderBy: newSortBy,
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
			const reqParams: GetMostPlayedAPIParams = {
				size: rowsPerPage,
				page: newPage,
				partnerId: selectedPartnerId
			};

			if (debouncedSearch) reqParams.search = debouncedSearch;

			if (newSortBy && newSort) reqParams.sort = `${newSortBy},${newSort}`;

			if (fromDate) reqParams.fromDate = fromDate;
			if (toDate) reqParams.toDate = toDate;

			const gamesRes = await getMostPlayedAPI(reqParams);

			return gamesRes;
		},
	});

	const onRefreshMostPlayedList = () => {
		handlePageChange(null, 0);
		refetch();
	};

	const onExportMostPlayedList = useMutation({
		mutationKey: ["export-most-played-list"],
		mutationFn: async () => {
			const reqParams: GetMostPlayedAPIParams = { 
				size: null,
				partnerId: selectedPartnerId
			};

			if (debouncedSearch) reqParams.search = debouncedSearch;
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
		games: data?.items || [],
		isLoading,
		isRefreshing,
		onRefreshMostPlayedList,
		onExportMostPlayedList,
	};
}