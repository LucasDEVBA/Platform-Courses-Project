import { Menu } from "lucide-react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import CourseSidebar from "./course-sidebar";

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({ course, progressCount }: CourseNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
        <SheetContent side="left" className="p-0 bg-white w-72">
          <CourseSidebar course={course} progressCount={progressCount} />
        </SheetContent>
      </SheetTrigger>
    </Sheet>
  );
};

export default CourseMobileSidebar;
