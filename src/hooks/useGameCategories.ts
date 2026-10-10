import { useQuery } from "@tanstack/react-query";

import { gameCategoriesListAPI } from "@src/api/game-categories";

import { GameCategoryType, UseGameCategoriesServiceOperators } from "@src/lib/types/game-categories";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";


const useGameCategories = (): Readonly<UseGameCategoriesServiceOperators> => {
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();
    
    const { data, isLoading } = useQuery({
        queryKey: ["game-categories", selectedPartnerId],
        queryFn: async () => {
            const result = await gameCategoriesListAPI({ partnerId: selectedPartnerId });
            return result;
        },
        select: (resData) => {
            if (resData.content.length) {
                resData.gameCategories = resData.content?.map((category: GameCategoryType) => {
                    return {
                        value: category.id,
                        label: category.gameTypeName,
                    };
                });
            }

            return resData;
        },
        staleTime: Infinity,
        gcTime: Infinity
    });

    return {
        data,
        gameCategories: data?.gameCategories || [],
        isLoading,
    };
};

export default useGameCategories;
