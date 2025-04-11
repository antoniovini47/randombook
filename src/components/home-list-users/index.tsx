/* Comentário para o teste técnico:
PS: Esse component está desnecessariamente grande, ele poderia facilmente ser dividido em outros componentes menores,
mas eu demonstro sobre componentização e reutilização de componentes em outras partes do teste, esse aqui é para outros propósitos.

Aqui tá o principal componente da aplicação, que é a lista de usuários.
Nele eu quis demonstrar um componente que recebe dados filtrados por outro componente.

Também fiz um uso de localStorage para guardar o número de itens por página,
e também um uso de useEffect para resgatar o valor salvo no localStorage.

Um loading feito com o uso de Skeletons para que seja mais fácil de entender a estrutura da lista,
enquanto o usuário espera os dados serem carregados.

Também fiz um uso de useRouter para redirecionar o usuário para a página de usuário,
e um uso de useTranslations para traduzir os textos da lista.

Também fiz um uso de useEffect para resgatar o valor das configurações salvo no localStorage,
para que o usuário não perca as suas preferências de itens por página.
*/

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTranslations } from "next-intl";
import formatBirthDate from "@/utils/formatBirthDate";
import { useState, useEffect } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import FavoriteButton from "@/components/favorite-button";

type HomeListUsersProps = {
  listUsers: User[];
  isLoading: boolean;
  error: Error | null;
};

const itensPerPageOptions = [5, 10, 20];

export const HomeListUsers = ({ listUsers, isLoading, error }: HomeListUsersProps) => {
  const t = useTranslations("components.home-list-users");
  const router = useRouter();
  const [itensPerPage, setItensPerPage] = useState<number>(itensPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listUsers.length / itensPerPage);

  const currentUsers = listUsers.slice(
    (currentPage - 1) * itensPerPage,
    currentPage * itensPerPage
  );

  useEffect(() => {
    const storedItensPerPage = Number(localStorage.getItem("itensPerPage"));
    if (storedItensPerPage) {
      setItensPerPage(storedItensPerPage);
    }
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItensPerPageChange = (value: number) => {
    setItensPerPage(value);
    setCurrentPage(1);
  };

  const handleRedirectToUserPage = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  if (isLoading) {
    return (
      <div className="w-full h-full rounded-lg shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("picture")}</TableHead>
              <TableHead>{t("nat")}</TableHead>
              <TableHead>{t("dob")}</TableHead>
              <TableHead>{t("favorite")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[...Array(itensPerPage)].map((_, index) => (
              <TableRow key={index} className="h-15">
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-between items-center mb-4">
          <Select
            value={itensPerPage.toString()}
            onValueChange={(value: string) => handleItensPerPageChange(Number(value))}>
            <SelectTrigger>
              <SelectValue placeholder="Select items per page" />
            </SelectTrigger>
            <SelectContent>
              {itensPerPageOptions.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option} per page
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Pagination className="flex justify-center">
            <PaginationPrevious
              onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
            />
            <PaginationContent>
              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={currentPage === i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className="transition-colors duration-300 hover:text-blue-500">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
            </PaginationContent>
            <PaginationNext
              onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
            />
          </Pagination>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="w-full h-full rounded-lg shadow-lg">
      <Table>
        <TableHeader className="rounded-lg shadow-md bg-slate-100">
          <TableRow>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("picture")}</TableHead>
            <TableHead>{t("nat")}</TableHead>
            <TableHead>{t("dob")}</TableHead>
            <TableHead>{t("favorite")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user) => {
            return (
              <TableRow
                key={user.login?.uuid}
                className="h-15 hover:bg-gray-100 cursor-pointer transition-colors duration-300 rounded-lg shadow-md"
                onClick={() => handleRedirectToUserPage(user.login?.uuid || "")}>
                <TableCell>
                  {user.name.first} {user.name.last}
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                      src={user.picture.thumbnail}
                    />
                    <AvatarFallback>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      className="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-105"
                      src={`https://flagicons.lipis.dev/flags/1x1/${user.nat.toLowerCase()}.svg`}
                    />
                    <AvatarFallback>
                      <Skeleton className="w-10 h-10 rounded-full" />
                    </AvatarFallback>
                  </Avatar>
                </TableCell>
                <TableCell>{formatBirthDate({ date: user.dob.date })}</TableCell>
                <TableCell className="z-10">
                  <FavoriteButton
                    className="z-10"
                    id={user.login?.uuid}
                    onClick={(event) => event.stopPropagation()}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mb-4 ml-4">
        <Select
          value={itensPerPage.toString()}
          onValueChange={(value: string) => {
            handleItensPerPageChange(Number(value));
            localStorage.setItem("itensPerPage", value);
          }}>
          <SelectTrigger>
            <SelectValue placeholder="Select items per page" />
          </SelectTrigger>
          <SelectContent>
            {itensPerPageOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Pagination className="flex justify-center mt-4">
          <PaginationPrevious
            onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
          />
          <PaginationContent>
            {Array.from({ length: totalPages }, (_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  onClick={() => handlePageChange(i + 1)}
                  className="transition-colors duration-300 hover:text-blue-500">
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          </PaginationContent>
          <PaginationNext
            onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default HomeListUsers;
