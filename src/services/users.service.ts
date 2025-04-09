/* Comentário para o teste técnico: 
Neste arquivo se encontrarm as principais funções que fazem requisições para a API do RandomUser.me
Elas abstraem a lógica do api.service.ts e utilizam a função api para fazer as requisições.
*/

import { getConfig } from "@/lib/config";
import { api } from "./api.service";

const ramdomUserBaseURL = getConfig("ramdomUserBaseURL");

export async function getRandomUser() {
  const response = await api(`${ramdomUserBaseURL}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch random user");
  }

  return response.json();
}
