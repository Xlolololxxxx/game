import { useMutation, useQuery } from "@tanstack/react-query";

import { partnerActivateLicenseKeyAPI, partnerLicensesAPI } from "@src/api/licenses";

import { ActivateLicenseAPIParams } from "@src/lib/types/licenses";
import { AlertType } from "@src/lib/types/toaster";

import { useToasterContext } from "@src/context/Toaster";
import { getCompanyProfileAPI, updateCompanyProfileAPI } from "@src/api/company-profile";
import { UpdateCompanyProfileAPI, UseCompanyProfileServiceOperators } from "@src/lib/types/company-profile";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";

export const useCompanyProfileService = (): Readonly<UseCompanyProfileServiceOperators> => {
  const { triggerOpen } = useToasterContext();
    const { state: { selectedPartnerId } } = usePartnerDropdownContext();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["company-profile", selectedPartnerId],
    queryFn: async () => {
      const res = await getCompanyProfileAPI({ partnerId: selectedPartnerId });
      return res;
    },
  });

  const { data: partnerLicenseData, isLoading: partnerLicenseIsLoading } = useQuery({
    queryKey: ["partnerLicenses"],
    queryFn: async () => {
      const res = await partnerLicensesAPI();
      return res;
    },
  });

  const onPartnerActivateLicense = useMutation({
    mutationKey: ['partner-activate-license'],
    mutationFn: async (formData: ActivateLicenseAPIParams) => {
      const result = await partnerActivateLicenseKeyAPI(formData);
      return result;
    },
    onSuccess: () => {
      triggerOpen({
        title: "Activate license",
        message: "Successfully activated a new license",
      });
    },
    onError: () => {
      triggerOpen({
        type: AlertType.error,
        title: "Activate license",
        message: "Failed to activate a new license",
      });
    },
  });

  const onUpdateCompanyProfile = useMutation({
    mutationKey: ['update-company-profile'],
    mutationFn: async (formData: UpdateCompanyProfileAPI) => {
      const result = await updateCompanyProfileAPI(formData);
      return result;
    },
    onSuccess: () => {
      refetch();
      triggerOpen({
        title: "Update Company Profile",
        message: "Successfully updated partner profile",
      });
    },
    onError: () => {
      triggerOpen({
        type: AlertType.error,
        title: "Update Company Profile",
        message: "Failed to update partner profile",
      });
    },
  });

  return {
    data,
    isLoading,
    partnerLicenseData,
    partnerLicenseIsLoading,
    onPartnerActivateLicense,
    onUpdateCompanyProfile,
  };
};
