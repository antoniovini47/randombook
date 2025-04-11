/* Comentário para o teste técnico:
Aqui eu quis demonstrar um componente de busca, que interage com um outro componente de lista de usuários.

Também utilizei debounce para evitar requisições desnecessárias e uma experiência mais suave para o usuário.
*/

import { Input } from "@/components/ui/input";
import { SearchParams } from "@/types/user";
import { useTranslations } from "next-intl";
import debounce from "lodash/debounce";

type SearchBarProps = {
  onSearchParamsChange: (params: SearchParams) => void;
};

const SearchBar = ({ onSearchParamsChange }: SearchBarProps) => {
  const t = useTranslations("components.home-search-bar");

  const debouncedOnChange = debounce((typedContent: React.ChangeEvent<HTMLInputElement>) => {
    onSearchParamsChange({ name: typedContent.target.value });
  }, 500);

  return (
    <div className="flex flex-row gap-4 w-full justify-center items-center">
      <Input
        className="w-1/2"
        placeholder={t("placeholder")}
        onChange={(typedContent) => {
          debouncedOnChange(typedContent);
        }}
      />
    </div>
  );
};

export default SearchBar;
