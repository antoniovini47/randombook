/* Comentário para o teste técnico: 
Aqui eu quis demonstrar como centralizaria as configurações da aplicação,
como por exemplo, as variáveis de ambiente.
Isso é importante para manter o código limpo e organizado, além de facilitar a manutenção.
*/

import get from "lodash/get";

export const config = {
  ramdomUserBaseURL: process.env.NEXT_PUBLIC_RANDOM_USER_BASE_URL,
};

type Paths<T> = T extends object
  ? { [K in keyof T]: `${Exclude<K, symbol>}${"" | `.${Paths<T[K]>}`}` }[keyof T]
  : never;

type Key = Paths<typeof config>;

export function getConfig<T>(key: Key, defaultValue?: T): T {
  return get(config, key, defaultValue as T) as T;
}
