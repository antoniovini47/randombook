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
import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

type HomeListUsersProps = {
  listUsers: User[];
  isLoading: boolean;
  error: Error | null;
};

const itensPerPageOptions = [5, 10, 20];

export const HomeListUsers = ({ listUsers, isLoading, error }: HomeListUsersProps) => {
  const t = useTranslations("components.home-list-users");
  const [itensPerPage, setItensPerPage] = useState(itensPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(listUsers.length / itensPerPage);

  const currentUsers = listUsers.slice(
    (currentPage - 1) * itensPerPage,
    currentPage * itensPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItensPerPageChange = (value: number) => {
    setItensPerPage(value);
    setCurrentPage(1); // Reset to first page when items per page change
  };

  if (isLoading) {
    return (
      <div className="w-full h-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("id")}</TableHead>
              <TableHead>{t("name")}</TableHead>
              <TableHead>{t("email")}</TableHead>
              <TableHead>{t("picture")}</TableHead>
              <TableHead>{t("nat")}</TableHead>
              <TableHead>{t("dob")}</TableHead>
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
                    onClick={() => handlePageChange(i + 1)}>
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
    <div className="w-full h-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("id")}</TableHead>
            <TableHead>{t("name")}</TableHead>
            <TableHead>{t("email")}</TableHead>
            <TableHead>{t("picture")}</TableHead>
            <TableHead>{t("nat")}</TableHead>
            <TableHead>{t("dob")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentUsers.map((user, index) => (
            <TableRow key={index} className="h-15 hover:bg-gray-100">
              <TableCell>{index + 1 + (currentPage - 1) * itensPerPage}</TableCell>
              <TableCell>
                {user.name.first} {user.name.last}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage className="w-10 h-10 rounded-full" src={user.picture.thumbnail} />
                  <AvatarFallback>
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage
                    className="w-10 h-10 rounded-full"
                    src={`https://flagicons.lipis.dev/flags/1x1/${user.nat.toLowerCase()}.svg`}
                  />
                  <AvatarFallback>
                    <Skeleton className="w-10 h-10 rounded-full" />
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{formatBirthDate(user.dob.date)}</TableCell>
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
                  onClick={() => handlePageChange(i + 1)}>
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
