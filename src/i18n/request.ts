/* Comentário para o teste técnico: 
Configuração da Internacionalização usando a biblioteca i18n,
nela primeiro tenta importar as configurações de cookies, caso não a encontre
seta pra default e salva
*/

import { cookies } from "next/headers";
import { getRequestConfig, setRequestLocale } from "next-intl/server";
import { locales, defaultLocale } from "./locales";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("userLocale")?.value;
  const locale = cookieLocale && locales.includes(cookieLocale) ? cookieLocale : defaultLocale;
  setRequestLocale(locale);

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
