import { fetcher } from "@/lib/fetcher";
import { PowerService, ServiceQueryParams } from "@/types/service";


export const getPublicServices = async (
  params?: ServiceQueryParams,
) => {
  const query = new URLSearchParams();

  if (params?.searchTerm) query.set("searchTerm", params.searchTerm);
  if (params?.minPrice !== undefined)
    query.set("minPrice", String(params.minPrice));
  if (params?.maxPrice !== undefined)
    query.set("maxPrice", String(params.maxPrice));
  if (params?.page !== undefined)
    query.set("page", String(params.page));
  if (params?.limit !== undefined)
    query.set("limit", String(params.limit));

  const queryString = query.toString();

  const res = await fetcher<PowerService[]>(
    `/services${queryString ? `?${queryString}` : ""}`,
    {next: {revalidate: 60}}
  );

  return res;
};