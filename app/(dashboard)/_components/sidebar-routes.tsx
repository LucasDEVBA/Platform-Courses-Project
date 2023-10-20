"use client";

import { Layout, Compass, List, BarChart } from "lucide-react";
import { SidebarItem } from "./sidebar-item";
import { usePathname } from "next/navigation";

const guestRoutes = [
  {
    icon: Layout,
    label: "Cursos",
    href: "/",
  },
  {
    icon: Compass,
    label: "Meus Cursos",
    href: "/dashboard",
  },
];

const teacherRoute = [
  {
    icon: List,
    label: "Cursos",
    href: "/teacher/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/teacher/analytics",
  },
];

export const SidebarRoutes = () => {
  const pathname = usePathname();

  const isTheacerPage = pathname?.includes("/teacher");

  const routes = isTheacerPage ? teacherRoute : guestRoutes;
  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  );
};
