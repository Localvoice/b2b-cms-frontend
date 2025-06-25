import { courses } from '../dummyData/courses';

export const getUniqueCategories = (): string[] => {
  const categorySet = new Set<string>();

  courses.forEach((course) => {
    course.categories.forEach((category) => categorySet.add(category));
  });

  return [...categorySet];
};
