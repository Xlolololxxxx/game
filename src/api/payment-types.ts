import axiosClient from "@src/utils/axios-client";

export const paymentTypesListAPI = async () => {
  try {
    const result = await axiosClient.get("/payment-types");
    return result.data || {};
  } catch (error: any) {
    throw error.response.data.error;
  }
};
