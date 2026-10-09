export interface TGetMeResponse {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "PROVIDER" | "RESIDENT";
  googleId: string | null;
  authProvider: "CREDENTIAL" | "GOOGLE";
  status: "ACTIVE" | "INACTIVE" | "BLOCKED";
  emailVerified: boolean;
  isDeleted: boolean;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
}