/* Comentário para o teste técnico:
Aqui eu crio as funções que interagem com a API do RandomUser.me
Foi necessario apenas uma para esse teste, mas queria demoonstrar da estrutura de uma service.
Além da utilização da biblioteca axios para fazer as requisições.
E o Objeto de URL do javascript para facilitar a construção da URL com os parâmetros.

Aqui o "name" que foi adicionado ao tipo de SearchParams seria bem útil em uma aplicação real,
podendo já filtrar na requisição ao backend. Porém a randomUser.me é muito simples e não possui um endpoint para isso, será apenas ignorado nesse caso.
*/

import { getConfig } from "@/lib/config";
import axios from "axios";
import { SearchParams } from "@/types/user";

const ramdomUserBaseURL: string | URL = getConfig("ramdomUserBaseURL");

export async function searchUsers(searchParams: SearchParams) {
  const url = new URL(ramdomUserBaseURL);

  Object.entries(searchParams).forEach(([key, value]) => {
    if (!value) return;
    return Array.isArray(value)
      ? url.searchParams.append(key, value.join(","))
      : url.searchParams.append(key, value.toString());
  });

  const response = await axios.get(url.toString());

  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }

  return response.data;
}
