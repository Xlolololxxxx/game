import { totalPurchasesCurrentMonth } from "@src/api/purchases";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { GetAllPurchasesAPIParams } from "@src/lib/types/purchases";
import { useQuery } from "@tanstack/react-query";
import useAuthService from "./useAuthService";

type ServiceOperators = {
  totalPurchasesThisMonth: any;
};

export const usePaymentsService = (): Readonly<ServiceOperators> => {
  const { currentUser } = useAuthService();
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { data } = useQuery({
    queryKey: ["current-month-purchases", { selectedPartnerId}],
    queryFn: async () => {
      const reqParams: GetAllPurchasesAPIParams = {
        // size: rowsPerPage,
        // page: newPage,
        partnerId: selectedPartnerId,
      };

      // if (filterUserID) reqParams.user_id = Number(filterUserID);
      // if (status) reqParams.status = status;
      // if (paymentOption) reqParams.payment_type_id = Number(paymentOption);
      // if (orderBy && order) reqParams.sort = `${orderBy},${order}`;
      // if (fromdate) reqParams.from_date = fromdate;
      // if (todate) reqParams.to_date = todate;
      // if (year) reqParams.year = year;
      // if (month) reqParams.month = month;
      const purchaseRes = await totalPurchasesCurrentMonth(reqParams);

      return purchaseRes || {};
    },
    enabled: !!currentUser?.id,
  });

  return {
    totalPurchasesThisMonth: data || {},
  };
};
