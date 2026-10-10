import { useQuery } from "@tanstack/react-query";

import { getActivePartnersAPI } from "@src/api/partners";

import { UseActivePartnerProvidersServiceOperators } from "@src/lib/types/partners";

const useActivePartner = (): Readonly<UseActivePartnerProvidersServiceOperators> => {
  const { data, isLoading } = useQuery({
    queryKey: ["payment-types"],
    queryFn: async () => {
      const result = await getActivePartnersAPI();
      const items = result?.items ?? [];
      const transformedArray = items.map((item: any ) => ({
        value: item.id,
        label: item.partnerName
      }));
      return transformedArray;
    },
  });

  return {
    partners: data || [],
    isLoading,
  };
};

export default useActivePartner;
