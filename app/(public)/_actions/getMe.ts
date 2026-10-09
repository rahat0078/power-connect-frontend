import { cookies } from "next/headers";
import { fetcher } from "@/lib/fetcher";
import { TGetMeResponse } from "@/types/getMeResponse";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken");

  if (!accessToken) {
    return null;
  }

  try {
    const result = await fetcher<TGetMeResponse>("/auth/me", {
      headers: {
        Cookie: `accessToken=${accessToken.value}`,
      },
      cache: "no-store",
    });

    return result.data;
  } catch {
    return null;
  }
};