import { auth } from "@clerk/nextjs";

import { db } from "@/lib/db";
import Categories from "./_components/categories";
import SearchInput from "@/components/search-input";
import getCourses from "@/actions/get-courses";
import CoursesList from "@/components/courses-list";
import getCoursesNoId from "@/actions/get-course-no-id";
import CoursesListNoId from "@/components/courses-list-no-id";

interface SearchPageProps {
  searchParams: {
    title: string;
    categoryId: string;
  };
}

const SearchPage = async ({ searchParams }: SearchPageProps) => {
  const { userId } = auth();

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!userId) {
    const courseNoId = await getCoursesNoId({
      ...searchParams,
    });
    return (
      <>
        <div className="px-6 pt-6 md:hidden md:mb-0 block">
          <SearchInput />
        </div>
        <div className="p-6 space-y-4">
          <Categories items={categories} />
          <CoursesListNoId items={courseNoId} />
        </div>
      </>
    );
  }

  const courses = await getCourses({
    userId,
    ...searchParams,
  });

  return (
    <>
      <div className="px-6 pt-6 md:hidden md:mb-0 block">
        <SearchInput />
      </div>
      <div className="p-6 space-y-4">
        <Categories items={categories} />
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default SearchPage;
