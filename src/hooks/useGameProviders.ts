import { useQuery } from "@tanstack/react-query";

import { providersListAPI } from "@src/api/game-providers";

import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { UseGameProvidersServiceOperators } from "@src/lib/types/game-providers";

const useGameProviders = (): Readonly<UseGameProvidersServiceOperators> => {
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { data, isLoading } = useQuery({
    queryKey: ["game-providers", selectedPartnerId],
    queryFn: async () => {
      const result = await providersListAPI({ partnerId: selectedPartnerId });
      return result;
    },
  });

  return {
    data,
    gameProviders: data?.items || [],
    isLoading,
  };
};

export default useGameProviders;
