import { useQuery } from "@tanstack/react-query";

import { licensesListAPI } from "@src/api/licenses";


import { GatAllLicensesAPIParams, UseManageLicensesServiceOperators } from "@src/lib/types/control-panel";

import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useManageLicensesContext } from "./provider";

export const useManageLicensesService = (): Readonly<UseManageLicensesServiceOperators> => {
	const { state: { selectedPartnerId } } = usePartnerDropdownContext();
	const { state, handlePageChange } = useManageLicensesContext();
	const { size, page, order, orderBy, debouncedSearch } = state || {};
	const newPage = (page || 0) + 1;

	const licensesListQueryKey = [
		'manage-licenses',
		{
			size,
			newPage,
			order,
			orderBy,
			debouncedSearch,
			selectedPartnerId
		},
	];

	const { data, isLoading, isRefetching, refetch } = useQuery({
		queryKey: licensesListQueryKey,
		queryFn: async () => {
			const reqParams: GatAllLicensesAPIParams = {
				size,
				page: newPage,
				partnerId: selectedPartnerId,
			};

			if (orderBy && order) reqParams.sort = `${orderBy},${order}`;

			if (debouncedSearch) reqParams.search = debouncedSearch;

			const usersRes = await licensesListAPI(reqParams);

			return usersRes;
		},
	});

	const onRefreshLicenses = () => {
			handlePageChange(null, 0);
			refetch();
	};

	return {
		data,
		licenses: data?.items || [],
		isLoading,
		isRefreshing: isRefetching,
		onRefreshLicenses,
	};
}