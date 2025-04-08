import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();
  return (
    <>
      <div>{`${t("pages./.welcome")} ${t("app-data.app-name")}`}</div>
      <div>{t("app-data.app-description")}</div>
    </>
  );
}
