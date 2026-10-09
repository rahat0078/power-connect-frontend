import { fetcher } from "@/lib/fetcher";
import { PowerSchedule, ScheduleQueryParams } from "@/types/schedule";


export const getRecentSchedules = async (
  params?: ScheduleQueryParams,
) => {
  const query = new URLSearchParams();

  if (params?.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params?.area) query.set("area", params.area);
  if (params?.status) query.set("status", params.status);
  if (params?.startDate) query.set("startDate", params.startDate);
  if (params?.endDate) query.set("endDate", params.endDate);
  if (params?.page !== undefined)
    query.set("page", String(params.page));
  if (params?.limit !== undefined)
    query.set("limit", String(params.limit));
  if (params?.sortBy) query.set("sortBy", params.sortBy);
  if (params?.sortOrder) query.set("sortOrder", params.sortOrder);

  const queryString = query.toString();

  const res = await fetcher<PowerSchedule[]>(
    `/schedule${queryString ? `?${queryString}` : ""}`,
    {next: {revalidate: 60}}
  );

  return res;
};