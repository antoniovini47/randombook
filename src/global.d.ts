/* Comentário para o teste técnico:
Neste arquivo fiz a tipagem global para o next-intl.

Para evitar erros e facilitar implementação com autocomplete
*/

import messages from "../messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}
