import { ContactSupportType } from "@src/lib/types/settings";
import axiosClient from "@src/utils/axios-client";

export const partnerLicensesAPI = async () => {
  try {
    const licenses = await axiosClient.get("/partner-licenses");
    return licenses.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};

export const sendContactSupport = async (params: ContactSupportType) => {
  try {
      const result = await axiosClient.post("/partners/support", params);
      return result.data;
  } catch (error: any) {
      throw error.response.data.error;
  }
}
