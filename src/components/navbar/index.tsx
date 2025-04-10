/* Comentário para o teste técnico: 
Aqui eu quis demonstrar como pode ser feito um menu responsivo utilizando o componente Sheet do shadcn.
Ele possui 3 estágios para demonstração de diferentes telas: desktop/tablet/smartphone, por exemplo.
*/

"use client";

import { Home, Info, Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useTranslations } from "next-intl";

import DropDownUser from "@/components/navbar-dropdown-user";
import LocaleSelector from "@/components/locale-selector";

const Navbar = () => {
  const t = useTranslations();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLinkClick = () => {
    setIsSheetOpen(false);
  };

  const navItems = [
    { name: t("components.navbar.home"), href: "/", icon: Home },
    { name: t("components.navbar.about"), href: "/", icon: Info },
  ];
  return (
    <header className="w-full p-4 border-b bg-white">
      <div className="flex items-center justify-between">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="mr-2 md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>
              <Link href="/dashboard">
                <div onClick={() => setIsSheetOpen(!isSheetOpen)} className="flex gap-2 mb-5">
                  <span className="font-bold">{t("app-data.app-name")}</span>
                </div>
              </Link>
            </SheetTitle>

            <SheetDescription className="mt-4 flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  onClick={handleLinkClick}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </SheetDescription>
          </SheetContent>
        </Sheet>

        <Link href="/dashboard" className="mr-6 flex items-center space-x-2">
          <span className="font-bold sm:inline-block">{t("app-data.app-name")}</span>
        </Link>
        <div className="mr-4 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              {navItems.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex flex-row gap-4 items-center">
          <LocaleSelector />
          <DropDownUser />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
