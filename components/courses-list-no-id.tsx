import { Category, Course } from "@prisma/client";
import CourseCardNoId from "./course-card-no-id";

type CourseWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
};

interface CourseListProps {
  items: CourseWithCategory[];
}
const CoursesListNoId = ({ items }: CourseListProps) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {items.map((item) => (
          <CourseCardNoId
            key={item.id}
            id={item.id}
            title={item.title}
            imageUrl={item.imageUrl!}
            chaptersLength={item.chapters.length}
            price={item.price!}
            category={item?.category?.name!}
          />
        ))}
      </div>
      {items.length === 0 && (
        <div className="text-center text-sm text-muted-foregound mt-10">
          Nenhum curso encontrado
        </div>
      )}
    </div>
  );
};

export default CoursesListNoId;
