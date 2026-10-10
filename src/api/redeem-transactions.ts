import { GetRedeemTransactionsAPIParams } from "@src/lib/types/redeem-transactions";
import axiosClient from "@src/utils/axios-client";

export const getRedeemTransactionsAPI = async (params?: GetRedeemTransactionsAPIParams) => {
    try {
        const result = await axiosClient.post("/redeem/get?partnerId=" + params?.partnerId, params);
        return result?.data || {};
    } catch (error: any) {
        throw error.response.data.error;
    }
};

export const exportRedeemTransactionsListAPI = async (params?: GetRedeemTransactionsAPIParams) => {
    try {
        const result = await axiosClient.post("/redeem/get/noPaging?partnerId=" + params?.partnerId, params);
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
};

// todo - type params
export const updateRedeemApproveAPI = async (params: { redeemRequestId: number; note: string; }) => {
    try {
        // const result = await axiosClient.post("/redeem/update", params);
        const result = await axiosClient.put(`/payment/masspay/cashback-redeem-requests/${params.redeemRequestId}/approveRequest`, params);
        return result.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const updateRedeemRejectAPI = async (params: { reason: string; redeemRequestId: number }) => {
    try {
        // const result = await axiosClient.post("/redeem/update", params);
        const result = await axiosClient.put(`/payment/masspay/cashback-redeem-requests/${params.redeemRequestId}/reject?reason=${params.reason}`, {params});
        return result.data;
    } catch (error: any) {
        throw error.response.data;
    }
};

export const getRedeemTransactionDocumentAPI = async (userId: string | number) => {
    try {
        const result = await axiosClient.get(`/redeem/userDocument/get?userid=${userId}`);
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}

export const getRedeemStats = async (params?: any) => {
    try {
        const result = await axiosClient.post(`/redeem/stats?partnerId=${params.partnerID}`, params);
        return result.data;
    } catch (error: any) {
        throw error.response.data.error;
    }
}