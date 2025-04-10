import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchParams } from "@/types/user";
import { useTranslations } from "next-intl";

type SearchBarProps = {
  onSearchParamsChange: (params: SearchParams) => void;
};

const SearchBar = ({ onSearchParamsChange }: SearchBarProps) => {
  const t = useTranslations("components.home-search-bar");

  return (
    <div className="flex flex-row gap-4 w-full justify-center items-center">
      <Input className="w-1/2" placeholder={t("placeholder")} />
      <Button>{t("search")}</Button>
    </div>
  );
};

export default SearchBar;
