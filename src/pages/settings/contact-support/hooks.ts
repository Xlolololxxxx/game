import { useMutation } from "@tanstack/react-query";



import { sendContactSupport } from "@src/api/settings";
import { ContactSupportType, UseContactSupportOperators } from "@src/lib/types/settings";

export const useContactSupportService = (): Readonly<UseContactSupportOperators> => {

  const onSendEmailSupport = useMutation({
    mutationKey: ['send-email-support'],
    mutationFn: async (formData: ContactSupportType) => {
      const result = await sendContactSupport(formData);
      return result;
    },
  });

  return {
    onSendEmailSupport,
  };
};
