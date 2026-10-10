export const OutageStatus = {
  PENDING: "PENDING",
  INVESTIGATING: "INVESTIGATING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
} as const

export type StatusType = keyof typeof OutageStatus