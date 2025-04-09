/* Comentário para o teste técnico: 
Aqui eu crio as queries principais que utilizo na aplicação.

Uma simples como useGetMovieDetails que recebe apenas o id do filme e retorna os detalhes dele.

Outras mais complexas, uma que varia de acordo com o que o usuário pesquisa, que é a useSearchMovies,
e outra que varia de acordo com a function que é passada pra ela.
*/

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { RandomUserResponse } from "@/types/user";

export const useGetUsers = (
  queryKey: string,
  queryFn: () => Promise<RandomUserResponse>,
  options?: Omit<UseQueryOptions<RandomUserResponse, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<RandomUserResponse, Error>({
    queryKey: [queryKey],
    queryFn,
    ...options,
  });
};
