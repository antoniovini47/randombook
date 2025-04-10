/* Comentário para o teste técnico:
Aqui representa a página principal da aplicação,
onde tem o componente de lista de usuários e
demonstra a interação entre componentes através de props.

O valores da seed e da page são fixos para que sempre 
represente o mesmo conjunto de usuários, para demonstrações
de como a aplicação funciona.

{ seed: "SmartHow", results: 50, page: 1 }
*/

"use client";

import { useTranslations } from "next-intl";
import SearchBar from "@/components/search-bar";
import HomeListUsers from "@/components/home-list-users";
import { useState } from "react";
import type { SearchParams } from "@/types/user";
import { useGetUsers } from "@/queries/user.queries";

export default function Home() {
  const t = useTranslations();
  const [params, setParams] = useState<SearchParams>({ results: 50, seed: "SmartHow", page: 1 });
  const { data, isLoading, error } = useGetUsers(params);

  return (
    <>
      <div className="flex flex-col gap-4 flex-1/6 justify-center items-center py-6">
        <div>{`${t("pages./.welcome")} ${t("app-data.app-name")}`}</div>
        <div>{t("app-data.app-description")}</div>
      </div>
      <div className="w-full h-auto px-24 py-6">
        <SearchBar
          onSearchParamsChange={(params) => {
            setParams(params);
          }}
        />
      </div>
      <div className="flex flex-4/6 px-24 py-6">
        <HomeListUsers listUsers={data?.results || []} isLoading={isLoading} error={error} />
      </div>
    </>
  );
}
