import { fetchQuery } from "@/lib/fetch";

export const logoutUser = async () => {
  return fetchQuery({
    method: "POST",
    endpoint: `/auth/logout`,
  });
};
