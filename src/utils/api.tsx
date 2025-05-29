import { getFilterValue } from "../components/data/filterData";
import axiosInstance from "../config.ts/axiosInstance";

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axiosInstance.post("/suppliers/login", data);

  return response.data;
};

export const registerUser = async (
  data: Record<string, string | number | boolean | null>
) => {
  const response = await axiosInstance.post("/supplier/register", data);
  return response.data;
};

export const forgotPassword = async (
  data: Record<string, string | number | boolean | null>
) => {
  const response = await axiosInstance.post(
    "/supplier/resetPassword/link",
    data
  );

  return response?.data;
};

export const orderPieChartData = async () => {
  const { data } = await axiosInstance.get("/admin/home/overview/order");
  return data.result;
};

export const homepageSummary = async () => {
  const { data } = await axiosInstance.get("/admin/home/overview");
  return data;
};

export const supplierLikesData = async (
  filter: "yearly" | "monthly" | "weekly"
) => {
  const { data } = await axiosInstance.get(
    `/admin/home/overview/likes?filter=${filter}`
  );
  return data;
};

export const productLikeData = async (
  filter: "yearly" | "monthly" | "weekly"
) => {
  const { data } = await axiosInstance.get(
    `/admin/home/overview/productLikes?filter=${filter}`
  );
  return data;
};

export const productVisitData = async (
  filter: "yearly" | "monthly" | "weekly"
) => {
  const { data } = await axiosInstance.get(
    `/admin/home/overview/productVisits?filter=${filter}`
  );
  return data;
};

export const fetchNotifications = async () => {
  const { data } = await axiosInstance.get(
    "/admin/notification/list?limit=100&page=1"
  );
  return data.notification;
};

export const fetchSupplierLikeDetails = async (
  timeFilter: "yearly" | "monthly" | "weekly",
  filterValue: string | number
) => {
  const valueToSend = getFilterValue(timeFilter, filterValue);

  const response = await axiosInstance.get(
    `/admin/home/analytics/likes/${timeFilter}?value=${valueToSend}`
  );

  return response.data;
};

//vagiho8046@avulos.com
//https://devapi.annapurnagalleries.com/api/admin/home/analytics/productsales/yearly?value=0
