import { fetchQuery } from "@/lib/fetch";
import { User } from "@/types";

export const authenticateAsGuest = async () => {
  return fetchQuery<User>({
    method: "POST",
    endpoint: `/auth/guest`,
  });
};
