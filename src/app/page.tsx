/* Comentário para o teste técnico:
Aqui representa a página principal da aplicação,

Seria uma melhor prática a busca ser feita dentro do componente de lista de usuários,
mas para fins de demonstração da interação entre componentes através de props, eu quis fazer assim.

O valores da seed e da page são fixos para que sempre 
represente o mesmo conjunto de usuários, para demonstrações
de como a aplicação funciona. Neste caso, é sempre um mesmo grupo de 50 usuários.

defaultParams: { seed: "SmartHow", results: 50, page: 1 }

Também a busca pelo nome de forma bem direta, sem utilizar uma função de busca mais complexa,
no caso de uma aplicação real, utilizaria de uma função utilitária para isso.

Tem uma alteração no título da página pra diferenciar as branches main (production) e develop (preview).
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
      <div className="flex flex-col gap-4 flex-1/6 justify-center items-center py-6">
        AQUI É O PREVIEW! SÓ PRA DEMONSTRAÇÃO DO CD DA VERCEL
      </div>
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
            data?.results.filter((user) =>
              (user.name.first + user.name.last)
                .toLocaleLowerCase()
                .includes(params.name?.toLocaleLowerCase() || "")
            ) || []
          }
          isLoading={isLoading}
          error={error}
        />
      </div>
    </>
  );
}
