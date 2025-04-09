import { useGetUsers } from "@/queries/user.queries";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
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
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { SearchParams } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useTranslations } from "next-intl";

interface HomeListUsersProps {
  searchParams: SearchParams;
}

export const HomeListUsers = ({ searchParams }: HomeListUsersProps) => {
  const t = useTranslations("components.home-list-users");
  const { data, isLoading, error } = useGetUsers(searchParams);

  if (isLoading) {
    return (
      <div className="w-full h-full p-24">
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
            {[...Array(10)].map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-10 w-10 rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-8" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(data?.results);

  return (
    <div className="w-full h-full p-24">
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
          {data?.results.map((user, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>
                {user.name.first} {user.name.last}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.picture.thumbnail} />
                  <AvatarFallback>{user.name.first.charAt(0)}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.nat}</TableCell>
              <TableCell>{user.dob.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default HomeListUsers;
