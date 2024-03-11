import { useMutation, useQueryClient } from "react-query";
import { updateUser } from "../api/updateUser";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    onSuccess: () => {
      queryClient.invalidateQueries(["me"]);
      queryClient.invalidateQueries(["rooms", "user"]);
    },
    mutationFn: (userBody: UpdateUserBody) => updateUser(userBody),
  });
};
