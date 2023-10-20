import { Category, Course } from "@prisma/client";

import { db } from "@/lib/db";

type CourseWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};

type GetCourses = {
  title?: string;
  categoryId?: string;
};

const getCoursesNoId = async ({
  title,
  categoryId,
}: GetCourses): Promise<CourseWithCategory[]> => {
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        title: {
          contains: title,
        },
        categoryId,
      },
      include: {
        category: true,
        chapters: {
          where: {
            isPublished: true,
          },
          select: {
            id: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return courses;
  } catch (error) {
    console.log("[GET_COURSES_NO_ID]", error);
    return [];
  }
};

export default getCoursesNoId;
