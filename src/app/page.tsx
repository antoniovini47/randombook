"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { getRandomUser } from "@/services/users.service";
import type { User } from "@/types/User";

export default function Home() {
  const t = useTranslations();

  const newUser: User = {
    name: {
      first: "John",
    },
    phone: "1234567890",
  };

  async function handleGetRandomUser() {
    const randomUser = await getRandomUser();
    console.log("Fetched random user: ", randomUser.results[0]);
  }

  return (
    <>
      <div>{`${t("pages./.welcome")} ${t("app-data.app-name")}`}</div>
      <div>{t("app-data.app-description")}</div>
      <Button onClick={handleGetRandomUser}>Get Random User</Button>
    </>
  );
}
