/* Comentário para o teste técnico: 
Somente um arquivo para salvar o padrão dos parametros que serão utilizados na aplicação.

Esses valores se mantém os mesmos para garantir que a lista de usuários seja a mesma em todas as vezes.
*/

import { SearchParams } from "@/types/user";

export const defaultParams: SearchParams = { results: 50, seed: "SmartHow", page: 1 };
