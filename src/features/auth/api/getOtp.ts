import { fetchQuery } from "@/lib/fetch";

export const getOtp = async (email: string) => {
  return fetchQuery({
    method: "POST",
    endpoint: `/auth/token`,
    body: {
      email,
    },
  });
};
