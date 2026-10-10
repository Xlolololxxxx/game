import { exportRedeemTransactionsListAPI, getRedeemStats, getRedeemTransactionDocumentAPI, getRedeemTransactionsAPI, updateRedeemApproveAPI, updateRedeemRejectAPI } from "@src/api/redeem-transactions";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useToasterContext } from "@src/context/Toaster";
import { GetRedeemTransactionsAPIParams, UseRedeemTransactionsServiceOperators } from "@src/lib/types/redeem-transactions";
import { AlertType } from "@src/lib/types/toaster";
import { getCurrentMonthDays } from "@src/utils/current-month";
import { downloadExcel } from "@src/utils/download-helper";
import { redeemExchangeStatus, redeemStatus, redeemTypeName } from "@src/utils/filter-helper";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import _reduce from "lodash/reduce";
import moment from "moment";
import numeral from "numeral";
import { useRedeemTransactionsContext } from "./provider";

export const useRedeemTransactionsService = 
(args?: any): Readonly<UseRedeemTransactionsServiceOperators> => {
	const queryClient = useQueryClient();
	const { allowFetchStats } = args || {};
	const { triggerOpen } = useToasterContext();
	const { state, handlePageChange } = useRedeemTransactionsContext();
	const { state: { selectedPartnerId }, partner } = usePartnerDropdownContext();
	const {
		page,
		debouncedSearch,
		rowsPerPage,
		order,
		orderBy,
		selected,
		fromDate,
		toDate,
		currentTab
	} = state || {};
	const newPage = (page || 0) + 1;

	const redeemTransactionsListQueryKey = [
		'redeem-transactions',
		{
			newPage,
			debouncedSearch,
			rowsPerPage,
			order,
			orderBy,
			fromDate,
			toDate,
			selectedPartnerId,
			currentTab
		}
	];

	const userDocumentQueryKey = [
		'redeem-userdocument',
		{ 
			userId: selected?.userID,
			newPage,
			debouncedSearch,
			rowsPerPage,
			order,
			orderBy,
			fromDate,
			toDate,
			selectedPartnerId,
			currentTab
		}
	];

	const { data, refetch, isRefetching: isRefreshing, isLoading } = useQuery({
		queryKey: redeemTransactionsListQueryKey,
		queryFn: async () => {
			const { fromDate: startDate, toDate: endDate } = getCurrentMonthDays();

			const reqParams: GetRedeemTransactionsAPIParams = {
				size: rowsPerPage,
				page: newPage,
				from_date: startDate,
        to_date: endDate,
				partnerId: selectedPartnerId,
			};
			
			if (currentTab === "exchange") reqParams.redeemTypeID = 6;
			if (currentTab === "pending") reqParams.redeemStatusIDs = [2];
			if (currentTab === "processing") reqParams.redeemStatusIDs = [1,3,4,7,9,13];
			if (currentTab === "history") reqParams.redeemStatusIDs = [1,2,3,4,7,9,13, 5,12, 6,8,10,11];
			if (debouncedSearch) reqParams.userID = Number(debouncedSearch);
			if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
			if (fromDate) reqParams.from_date = fromDate;
			if (toDate) reqParams.to_date = toDate;

			const result = await getRedeemTransactionsAPI(reqParams);

			return result;
		},
	});

	const { data: userDocumentData, isLoading: isLoadingUserDocuments } = useQuery({
		queryKey: userDocumentQueryKey,
		queryFn: async () => {
			if (selected?.userID) {
				const result = await getRedeemTransactionDocumentAPI(selected?.userID);
				return result;
			}
		},
		enabled: !!selected?.userID
	});

	const { data: rewardStats } = useQuery({
		queryKey: [
			'rewards-stats',
			{ 
				userId: selected?.userID,
				newPage,
				rowsPerPage,
				order,
				orderBy,
				fromDate,
				toDate,
				selectedPartnerId,
			}
		],
		queryFn: async () => {
			if (allowFetchStats) {
				const reqParams: GetRedeemTransactionsAPIParams = {
					size: rowsPerPage,
					page: newPage,
					partnerID: selectedPartnerId,
				};
				
				// if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
				if (fromDate) reqParams.from_date = fromDate;
				if (toDate) reqParams.to_date = toDate;

				const result = await getRedeemStats(reqParams);
				return result;
			}
		},
		enabled: allowFetchStats
	});

	const { data: goldExchangeStats } = useQuery({
		queryKey: [
			'gold-exchange-stats',
			{ 
				userId: selected?.userID,
				newPage,
				rowsPerPage,
				order,
				orderBy,
				fromDate,
				toDate,
				selectedPartnerId,
			}
		],
		queryFn: async () => {
			if (allowFetchStats) {
				const reqParams: GetRedeemTransactionsAPIParams = {
					size: rowsPerPage,
					page: newPage,
					partnerID: selectedPartnerId,
					redeemTypeID: 6
				};
				
				// if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
				if (fromDate) reqParams.from_date = fromDate;
				if (toDate) reqParams.to_date = toDate;

				const result = await getRedeemStats(reqParams);
				return result;
			}
		},
		enabled: allowFetchStats
	});

	const onRefreshRedeemTransactionsList = () => {
			handlePageChange(null, 0);
			refetch();
	};

	const onExportRedeemTransactionsList = useMutation({
		mutationKey: ["export-redeem-transactions-list", { currentTab, partner}],
		mutationFn: async () => {
			const { fromDate: startDate, toDate: endDate } = getCurrentMonthDays();
			const reqParams: GetRedeemTransactionsAPIParams = {
				from_date: startDate,
        to_date: endDate,
				partnerId: selectedPartnerId,
			};

			if (currentTab === "exchange") reqParams.redeemTypeID = 6;
			if (currentTab === "pending") reqParams.redeemStatusIDs = [2];
			if (currentTab === "processing") reqParams.redeemStatusIDs = [1,3,4,7,9,13];
			if (currentTab === "history") reqParams.redeemStatusIDs = [1,2,3,4,7,9,13, 5,12, 6,8,10,11];
			if (debouncedSearch) reqParams.userID = Number(debouncedSearch);
			if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
			if (fromDate) reqParams.from_date = fromDate;
			if (toDate) reqParams.to_date = toDate;

			const res = await exportRedeemTransactionsListAPI(reqParams);

			const newJson = _reduce(
				res.items,
				(result: any, value: any, key) => {
					if(partner === "palmsplay"){
						result.push({
							'User ID': value.userID,
							'User Name': value.user?.displayName,
							'Amount PG': value.goldAmount,
							'Transaction Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
						});
					}else{
						if(state.currentTab === "exchange"){
							result.push({
								'User ID': value.userID,
								'User Name': value?.user?.displayName,
								'SC Amount': numeral(value.goldAmount).format("0,000.00"),
								'Transaction Type': redeemTypeName(value.redeemTypeID),
								'Silver Coin': numeral(value.creditAmount).format("0,000.00"),
								'Request Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
								'Status': redeemExchangeStatus(value.redeemStatusID),
							});
						}else if(state.currentTab === "processing"){
							result.push({
								'User ID': value.userID,
								'User Name': value?.user?.displayName,
								'SC Amount': numeral(value.goldAmount).format("0,000.00"),
								'Service Type': redeemTypeName(value.redeemTypeID),
								'Request Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
								'Transaction ID': value.id,
								'Last Updated': moment.parseZone(value.lastUpdatedTime).format("MM-DD-YYYY hh:mm A"),
								'Status': redeemStatus(value.redeemStatusID),
							});
						}else if(state.currentTab === "history"){
							result.push({
								'User ID': value.userID,
								'User Name': value?.user?.displayName,
								'SC Amount': numeral(value.goldAmount).format("0,000.00"),
								'Service Type': redeemTypeName(value.redeemTypeID),
								'Request Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
								'Transaction ID': value.id,
								'Status': redeemStatus(value.redeemStatusID),
							});
						}else if(state.currentTab === "pending"){
							result.push({
								'User ID': value.userID,
								'User Name': value?.user?.displayName,
								'SC Amount': numeral(value.goldAmount).format("0,000.00"),
								'Service Type': redeemTypeName(value.redeemTypeID),
								'Request Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
								'Transaction ID': value.id,
							});
						}else{
							result.push({
								'User ID': value.userID,
								'User Name': value?.user?.displayName,
								'SC Amount': numeral(value.goldAmount).format("0,000.00"),
								'Service Type': value.bank_Name?.replace("RTP - Real Time Payments", "Bank Transfer"),
								'Request Date': moment.parseZone(value.requestDate).format("MM-DD-YYYY hh:mm A"),
								'Transaction ID': value.id,
								'Status': value.redeemStatusName,
							});
						}
					}
					return result;
				},
				[]
			);

			let downloadName = "export-redeem-transactions";

			if(currentTab === "exchange") downloadName = "export-gold-exchange-transactions";
			if(currentTab === "history") downloadName = "export-redemption-history";
			if(currentTab === "pending") downloadName = "export-pending-redemption";
			
			downloadExcel(newJson, downloadName);
		}
	});

	const onUpdateRedeemTransaction = useMutation({
		mutationKey: ['update-redeem-transaction'],
		mutationFn: async (formData: any ) => {
			if(formData.approvalStatus === "APPROVE"){
				return await updateRedeemApproveAPI({ redeemRequestId: formData.redeemRequestId, note: formData.reason });
			}else if(formData.approvalStatus === "REJECT"){
				return await updateRedeemRejectAPI({ redeemRequestId: formData.redeemRequestId, reason: formData.reason });
			}
		},
		onSuccess: () => {
			refetch();
		},
	});

	return {
		data,
		isLoading,
		isRefreshing,
		userDocumentData,
		isLoadingUserDocuments,
		onUpdateRedeemTransaction,
		onExportRedeemTransactionsList,
		onRefreshRedeemTransactionsList,
		redeemTransactions: data?.items || [],
		rewardsTotal: rewardStats?.totalGoldAmount ?? 0,
		goldEchangeTotal: goldExchangeStats?.totalGoldAmount ?? 0,
	};
}