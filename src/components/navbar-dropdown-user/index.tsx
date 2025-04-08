/* Comentário para o teste técnico: 
Aqui é um exemplo de um componente suspenso que carregaria informações do usuário.
Ele Não tem nenhuma função e redirecionamento porque é só para fins de teste.
O componente é um menu suspenso que exibe as informações do usuário, como nome e email.
Ele imprime as iniciais do usuário na tela, mas em uma implementação real, caberia um avatar.
*/

import { User, LogOut } from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import user from "@/constants/user";
import { useTranslations } from "next-intl";

export function DropDownUser() {
  const t = useTranslations("components.navbar-dropdown-user");
  const initials = user.name
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join("");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href="/">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>{t("my-account")}</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <Button variant="ghost" className="w-full">
          <DropdownMenuItem>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{t("logout")}</span>
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
