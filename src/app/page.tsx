"use client";

import { useTranslations } from "next-intl";
import HomeListUsers from "@/components/home-list-users";

export default function Home() {
  const t = useTranslations();

  return (
    <>
      <div className="flex flex-col gap-4 flex-1/4">
        <div>{`${t("pages./.welcome")} ${t("app-data.app-name")}`}</div>
        <div>{t("app-data.app-description")}</div>
      </div>
      <div className="flex flex-3/4 p-24">
        <HomeListUsers searchParams={{ results: 30 }} />
      </div>
    </>
  );
}
