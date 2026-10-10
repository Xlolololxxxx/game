import { useQuery } from "@tanstack/react-query";

import {
  PurchaseChartAPI,
  SubscriptionsChartAPI,
  mostPopularDealAPI,
  mostPopularGoldShopItemAPI,
  mostPopularShopItemAPI,
  totalCompletedMissionsCountAPI,
  totalSubscriptionsCountAPI,
} from "@src/api/platform-tools";

import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { UsePlatformToolsServiceOperators } from "@src/lib/types/platform-tools";

type Props = {
  period?: string;
}

export const usePlatformToolsServices = ({period}: Props): Readonly<UsePlatformToolsServiceOperators> => {
  const { state: { selectedPartnerId } } = usePartnerDropdownContext();
  
  const { data: totalMissionsCompleted } = useQuery({
    queryKey: ["total-number-missions-completed", { selectedPartnerId }],
    queryFn: async () => {
      const result = await totalCompletedMissionsCountAPI(selectedPartnerId);
      return result;
    },
  });

  const { data: mostPopularDeal } = useQuery({
    queryKey: ["most-popular-deal", selectedPartnerId],
    queryFn: async () => {
      const result = await mostPopularDealAPI({ partnerId: selectedPartnerId });
      return result;
    },
  });

  const { data: mostPopularGoldShopItem } = useQuery({
    queryKey: ["most-popular-gold-shop-item", selectedPartnerId],
    queryFn: async () => {
      const result = await mostPopularGoldShopItemAPI({ partnerId: selectedPartnerId });
      return result;
    },
  });

  const { data: mostPopularShopItem } = useQuery({
    queryKey: ["most-popular-shop-item", selectedPartnerId],
    queryFn: async () => {
      const result = await mostPopularShopItemAPI({ partnerId: selectedPartnerId });
      return result;
    },
  });

  const { data: totalSubscriptions } = useQuery({
    queryKey: ["total-number-subscriptions", selectedPartnerId],
    queryFn: async () => {
      const result = await totalSubscriptionsCountAPI({ partnerId: selectedPartnerId });
      return result;
    },
  });

  const { data: subscriptionChart, refetch: refetchSubscriptionChart } = useQuery({
    queryKey: ["subscriptions-charts", { period, selectedPartnerId }],
    queryFn: async () => {
      const result = await SubscriptionsChartAPI({
        period: period || "MONTHLY",
        partnerId: selectedPartnerId
      });

      return result;
    },
  });

  const { data: purchaseChart, refetch: refetchPurchaseChart } = useQuery({
    queryKey: ["purchase-charts", { period, selectedPartnerId }],
    queryFn: async () => {
      const result = await PurchaseChartAPI({
        period: period || "MONTHLY",
        partnerId: selectedPartnerId
      });

      return result;
    },
  });

  return {
    totalMissionsCompleted,
    mostPopularDeal,
    mostPopularGoldShopItem,
    mostPopularShopItem,
    totalSubscriptions,
    subscriptionChart,
    refetchSubscriptionChart,
    purchaseChart,
    refetchPurchaseChart,
  };
};
