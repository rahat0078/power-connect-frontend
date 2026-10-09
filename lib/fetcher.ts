import { TApiResponse } from "@/types/apiResponse";

type FetchOptions = RequestInit & {
  next?: NextFetchRequestConfig;
};

export const fetcher = async <T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<TApiResponse<T>> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
    {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    },
  );

  const result: TApiResponse<T> = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Something went wrong");
  }

  return result;
};
