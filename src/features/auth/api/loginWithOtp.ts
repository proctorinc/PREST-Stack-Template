import { fetchQuery } from "@/lib/fetch";
import { LoginRequest, User } from "@/types";

export const loginWithOtp = async (loginRequest: LoginRequest) => {
  return fetchQuery<User>({
    method: "POST",
    endpoint: `/auth/token/validate`,
    body: {
      ...loginRequest,
    },
  });
};
