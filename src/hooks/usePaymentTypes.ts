import { useQuery } from "@tanstack/react-query";

import { paymentTypesListAPI } from "@src/api/payment-types";

import { UsePaymentProvidersServiceOperators } from "@src/lib/types/payment-types";

const usePaymentTypes = (): Readonly<UsePaymentProvidersServiceOperators> => {
  const { data, isLoading } = useQuery({
    queryKey: ["payment-types"],
    queryFn: async () => {
      const result = await paymentTypesListAPI();
      return result;
    },
  });

  return {
    data,
    paymentTypes: data?.items || [],
    isLoading,
  };
};

export default usePaymentTypes;
