"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getRandomUser } from "@/services/users.service";

export default function Home() {
  const t = useTranslations();

  async function handleGetRandomUser() {
    const randomUser = await getRandomUser();
    console.log("Fetched random user: ", randomUser.results[0]);
  }

  return (
    <>
      <div className="flex flex-col gap-4 flex-1/4">
        <div>{`${t("pages./.welcome")} ${t("app-data.app-name")}`}</div>
        <div>{t("app-data.app-description")}</div>
      </div>
      <div className="flex flex-3/4">
        <Button onClick={handleGetRandomUser}>Get Random User</Button>
      </div>
    </>
  );
}
