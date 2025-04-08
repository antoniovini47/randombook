"use client";

import { useLocale } from "next-intl";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { locales, defaultLocale } from "@/i18n/locales";

const flags: Record<string, string> = {
  en: "🇺🇸",
  pt: "🇧🇷",
};

const LocaleSelector = () => {
  const currentLocale = useLocale();

  const handleLocaleChange = (locale: string) => {
    document.cookie = `userLocale=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;

    if (typeof window !== "undefined") {
      window.localStorage.setItem("userLocale", locale);
      window.location.reload();
    }
  };

  return (
    <Select onValueChange={handleLocaleChange} defaultValue={currentLocale ?? defaultLocale}>
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            <span className="flex items-center gap-2">
              <span>{flags[locale]}</span>
              {locale.toUpperCase()}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LocaleSelector;
