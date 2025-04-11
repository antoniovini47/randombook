/* Comentário para o teste técnico:
Com essa pagina eu quis demonstrar o uso do App Router,
e como ele facilita a criação de rotas e acesso aos dados.

DURANTE TODA A APLICAÇÃO OPTEI POR UTILIZAR O USER.LOGIN.UUID PARA IDENTIFICAR OS USUÁRIOS,
E NÃO O USER.ID, POIS A API DO RANDOMUSERS.ME É TERRIVELMENTE IMPRECISA QUANTO A ISSO.

Não foi necessário criar um arquivo de layout, apenas copiei o layout da página principal,
filtrando para mostrar somente os usuários favoritados. Só pra demonstração
*/

"use client";

import SearchBar from "@/components/search-bar";
import HomeListUsers from "@/components/home-list-users";
import { useState } from "react";
import type { SearchParams } from "@/types/user";
import { useGetUsers } from "@/queries/user.queries";
import { defaultParams } from "@/constants/params";

export default function Home() {
  const [params, setParams] = useState<SearchParams>(defaultParams);
  const { data, isLoading, error } = useGetUsers(params);

  return (
    <>
      <div className="w-full h-auto px-24 py-6">
        <SearchBar
          onSearchParamsChange={(params) => {
            setParams((prevParams) => ({ ...prevParams, ...params }));
          }}
        />
      </div>
      <div className="flex flex-4/6 px-24 py-6">
        <HomeListUsers
          listUsers={
            data?.results
              .filter((user) =>
                (user.name.first + user.name.last)
                  .toLocaleLowerCase()
                  .includes(params.name?.toLocaleLowerCase() || "")
              )
              .filter((user) => localStorage.getItem(`favorite-${user.login?.uuid}`) === "true") ||
            []
          }
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
}
