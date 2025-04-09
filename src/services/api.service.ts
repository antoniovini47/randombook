/* Comentário para o teste técnico: 
Utilizo deste arquivo para concentrar a lógica da minha api para fazer requisiçÕes
Isso evita repetições de código e facilita a manutenção,
Coisas como headers, token e etc já estão abstraídas aqui

Aqui entraria também cacheamento de tokens do usuário, caso necessário.
*/

/* Comentário para o teste técnico: import { getConfig } from "@/lib/config"; */

/* Comentário para o teste técnico:  Examples: const acessToken = getConfig("apiKeyIfExisted"); */

export async function api(
  input: string | URL | globalThis.Request,
  init?: RequestInit
): Promise<Response> {
  const defaultHeaders: Record<string, string> = {
    /* Comentário para o teste técnico:  Examples: Authorization: `Bearer ${acessToken}`, */
  };

  if (init?.body) {
    defaultHeaders["Content-Type"] = "application/json";
  }

  const response = await fetch(input, {
    ...init,
    headers: {
      ...defaultHeaders,
      ...init?.headers,
    },
  });

  return response;
}
