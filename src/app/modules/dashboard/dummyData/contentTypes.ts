import { courses } from './courses';

export const getUniqueContentTypes = (): string[] => {
  const contentTypeSet = new Set<string>();

  courses.forEach((course) => {
    if (course.contentType) {
      const formatted = course.contentType
        .toLowerCase()
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      contentTypeSet.add(formatted);
    }
  });

  return [...contentTypeSet];
};
