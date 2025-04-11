/* Comentário para o teste técnico: 
Aqui eu crio as queries principais que utilizo na aplicação.

Infelizmente para esse teste apenas uma query foi necessária, mas eu quis mostrar como eu faria caso fossem necessárias mais.
*/

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { RandomUserResponse, SearchParams } from "@/types/user";
import * as UserService from "@/services/users.service";

export const useGetUsers = (
  searchParams: SearchParams,
  options?: Omit<UseQueryOptions<RandomUserResponse, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<RandomUserResponse, Error>({
    queryKey: ["search-users", searchParams],
    queryFn: () => UserService.searchUsers(searchParams),
    ...options,
  });
};
