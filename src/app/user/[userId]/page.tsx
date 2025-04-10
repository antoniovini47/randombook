/* Comentário para o teste técnico: 
Nesse arquivo quis demonstrar principalmente como eu faria para fazer uma página que pegasse
dados através dos seus parâmetros, como por exemplo o id do usuario, e então consumisse a API
e mostrasse os resultados da sua resposta.

Pegando o id através do "use" do react e usando o react query para controlar o estado da requisição.
Foquei na funcionalidade e não na estética aqui.
A página é bem simples, mas tem um loading e um erro caso a requisição falhe.

E diferente pa lista, aqui optei por fazer um Loading Generico que pode ser reutilizado em outras partes da aplicação,
em vez de criar skeletons para cada item que seria exibido, apesar de que seria o ideal. Foi só pra demonstração.

Como a API não possui um endpoint para buscar um usuário específico, foi necessário buscar todos os usuários
dentro da lista que tinha predeterminada e pegar o usuário pelo id, que nesse caso vai ser a posicao dele no array.
*/
"use client";

import LoadingIcon from "@/components/loading-icon";
import { use } from "react";
import { useGetUsers } from "@/queries/user.queries";
import { defaultParams } from "@/constants/params";
import formatBirthDate from "@/utils/formatBirthDate";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

const UserDetailsPage = ({ params }: { params: Promise<{ userId: string }> }) => {
  const { userId } = use(params);
  const { data, isLoading, isError, error } = useGetUsers(defaultParams);
  const user = data?.results[parseInt(userId) - 1];

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
    <div className="container mx-auto p-4 w-[50vh] h-[50vh] transition-transform duration-300 hover:scale-105 mt-4">
      <h1 className="text-2xl font-bold mb-4">User Details</h1>
      <div className="bg-white shadow-md rounded p-4 ">
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
          <h3 className="text-lg font-semibold">ID</h3>
          <p>
            {user.id.name}: {user.id.value}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">
            {user.name.title} {user.name.first} {user.name.last}
          </h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Location</h3>
          <p>
            {user.location?.city}, {user.location?.state}, {user.location?.country}
          </p>
          <p>{user.location?.postcode}</p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Date of Birth</h3>
            <Badge variant="default">Age: {user.dob.age}</Badge>
          </span>
          <p>{formatBirthDate({ date: user.dob.date, showDaysSinceLastBirthday: true })}</p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Nationality</h3>
            <Badge variant="default">{user.nat}</Badge>
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p>Phone: {user.phone}</p>
          <p>Cell: {user.cell}</p>
          <p>Email: {user.email}</p>
        </div>
        <div className="mb-4">
          <span className="flex items-center gap-2">
            <h3 className="text-lg font-semibold">Gender</h3>
            <Badge variant="default">{user.gender}</Badge>
          </span>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Street Address</h3>
          <p>
            {user.location?.street?.number} {user.location?.street?.name}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Coordinates</h3>
          <p>Latitude: {user.location?.coordinates?.latitude}</p>
          <p>Longitude: {user.location?.coordinates?.longitude}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Timezone</h3>
          <p>Offset: {user.location?.timezone?.offset}</p>
          <p>Description: {user.location?.timezone?.description}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Login Information</h3>
          <p>Username: {user.login?.username}</p>
          <p>Password: {user.login?.password}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
