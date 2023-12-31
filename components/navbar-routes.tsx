"use client";

import {
  SignInButton,
  UserButton,
  auth,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";
import SearchInput from "./search-input";

export const NavbarRoutes = () => {
  const pathname = usePathname();

  const isTheacherPage = pathname?.startsWith("/teacher");
  const isCoursePage = pathname?.includes("/courses");
  const isSearchPage = pathname === "/";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        {isTheacherPage || isCoursePage ? (
          <Link href={"/"}>
            <Button size={"sm"} variant={"outline"}>
              <LogOut className="h-4 w-4 mr-2" />
              Sair
            </Button>
          </Link>
        ) : (
          <Link href={"/teacher/courses"}>
            <Button size={"sm"} variant={"outline"}>
              Área ADM
            </Button>
          </Link>
        )}
        <SignedOut>
          <SignInButton mode="modal">
            <Button className="ml-2">Entrar</Button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
      </div>
    </>
  );
};
