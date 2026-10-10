"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export const logout = async (): Promise<void> => {
  const cookieStore = await cookies()

  cookieStore.delete("accessToken")
  cookieStore.delete("refreshToken")

  redirect("/login")
}