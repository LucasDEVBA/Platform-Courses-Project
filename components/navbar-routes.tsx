"use client";

import { UserButton } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import Link from "next/link";

export const NavbarRoutes = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isTheacherPage = pathname?.startsWith("/teacher");
  const isPlayerPage = pathname?.includes("/chapter");

  return (
    <div className="flex gap-x-2 ml-auto">
      {isTheacherPage || isPlayerPage ? (
        <Button size={"sm"} variant={"outline"}>
          <LogOut className="h-4 w-4 mr-2" />
          Exit
        </Button>
      ) : (
        <Link href={"/teacher/courses"}>
          <Button size={"sm"} variant={"outline"}>
            Teacher mode
          </Button>
        </Link>
      )}
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};
