import { useQuery } from "react-query";
import { User } from "@/types";
import { getUser } from "../api/getUser";

type UserQueryProps = {
  onError: () => void;
};

export const useUserQuery = ({ onError }: UserQueryProps) => {
  return useQuery<User, Error>({
    queryKey: ["me"],
    queryFn: getUser,
    retry: false,
    onError,
  });
};
