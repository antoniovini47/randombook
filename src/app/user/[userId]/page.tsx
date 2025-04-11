/* Comentário para o teste técnico: 
Nesse arquivo quis demonstrar principalmente como eu faria para fazer uma página que pegasse
dados através dos seus parâmetros de URL, como por exemplo o id do usuario, e então consumisse a API
e mostrasse os resultados da sua resposta.

Pegando o id através do "use" do react e usando o react query para controlar o estado da requisição.
Foquei na funcionalidade e não na estética aqui.
A página é bem simples, mas tem um loading e um erro caso a requisição falhe.

E diferente da lista, aqui optei por fazer um Loading Generico que pode ser reutilizado em outras partes da aplicação,
em vez de criar skeletons para cada item que seria exibido, apesar de que seria o ideal. Foi só pra demonstração de um outro tipo de loading.

Como a API não possui um endpoint para buscar um usuário específico, foi necessário buscar todos os usuários
daquele meu conjunto de dados da lista que tinha predeterminada e encontrar o usuário pelo user.login.uuid
*/
"use client";

import LoadingIcon from "@/components/loading-icon";
import { use } from "react";
import { useGetUsers } from "@/queries/user.queries";
import { defaultParams } from "@/constants/params";
import formatBirthDate from "@/utils/formatBirthDate";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useTranslations } from "next-intl";

const UserDetailsPage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const { data, isLoading, isError, error } = useGetUsers(defaultParams);
  const user = data?.results.find((user) => user.login?.uuid === userId);
  const t = useTranslations("pages.user");

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen p-24">
        <LoadingIcon size={96} />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen p-24">
        <p className="text-red-500">Error: {error.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen p-24">
        <p className="text-red-500">User not found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 w-[50vw] h-[50vh] transition-transform duration-300 hover:scale-105 mt-4 rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{t("userDetails")}</h1>
      <div className="bg-white shadow-md rounded-lg p-4 transition-transform duration-300  hover:shadow-xl">
        <div className="mb-4">
          <Image
            className="w-32 h-32 rounded-full mx-auto transition-transform duration-300 hover:scale-110 hover:shadow-lg"
            src={user.picture.large}
            alt="User Picture"
            width={128}
            height={128}
          />
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("id")}</h3>
          <p>{user.login?.uuid}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("location")}</h3>
          <p>
            {user.location?.city}, {user.location?.state}, {user.location?.country}
          </p>
          <p>{user.location?.postcode}</p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{t("dateOfBirth")}</h3>
            <Badge variant="default">
              {t("age")}: {user.dob.age}
            </Badge>
          </span>
          <p>{formatBirthDate({ date: user.dob.date, showDaysSinceLastBirthday: true })}</p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{t("nationality")}</h3>
            <Badge variant="default">{user.nat}</Badge>
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("contact")}</h3>
          <p>
            {t("phone")}: {user.phone}
          </p>
          <p>
            {t("cell")}: {user.cell}
          </p>
          <p>
            {t("email")}: {user.email}
          </p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">{t("gender")}</h3>
            <Badge variant="default">{user.gender}</Badge>
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("streetAddress")}</h3>
          <p>
            {user.location?.street?.number} {user.location?.street?.name}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("coordinates")}</h3>
          <p>
            {t("latitude")}: {user.location?.coordinates?.latitude}
          </p>
          <p>
            {t("longitude")}: {user.location?.coordinates?.longitude}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("timezone")}</h3>
          <p>
            {t("offset")}: {user.location?.timezone?.offset}
          </p>
          <p>
            {t("description")}: {user.location?.timezone?.description}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{t("loginInformation")}</h3>
          <p>
            {t("username")}: {user.login?.username}
          </p>
          <p>
            {t("password")}: {user.login?.password}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
