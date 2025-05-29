import CourseModel from '../models/course';
import { CourseWithSingleCategory } from './state';

type SortDirection = 'asc' | 'desc';

export const sortByDateAndField = <T extends { updatedAt: string | undefined }>(
  items: T[],
  secondaryField: keyof T | null = null,
  dateDirection: SortDirection = 'asc',
  secondaryDirection: SortDirection | null = null
): T[] => {
  return [...items].sort((a, b) => {
    if (secondaryField) {
      const aVal = a[secondaryField];
      const bVal = b[secondaryField];

      const aStr =
        Array.isArray(aVal) && typeof aVal[0] === 'string' ? aVal[0] : typeof aVal === 'string' ? aVal : null;

      const bStr =
        Array.isArray(bVal) && typeof bVal[0] === 'string' ? bVal[0] : typeof bVal === 'string' ? bVal : null;

      if (aStr !== null && bStr !== null) {
        const comp = aStr.localeCompare(bStr);
        if (comp !== 0) {
          return secondaryDirection === 'desc' ? -comp : comp;
        }
      } else if (aStr !== bStr) {
        return aStr === null ? 1 : -1;
      }
    }

    const dateA = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const dateB = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;

    return dateDirection === 'desc' ? dateB - dateA : dateA - dateB;
  });
};

export const getTotalPages = (totalItems: number, limit: number): number => {
  if (limit <= 0) return 1;
  return Math.ceil(totalItems / limit);
};

export const mapCoursesToTableData = (coursesList: CourseModel[]): CourseWithSingleCategory[] => {
  return coursesList.map((course) => ({
    courseId: course.courseId,
    teacherId: course.teacherId,
    languageId: course.languageId,
    title: course.title,
    category: course.categories[0] ? course.categories[0] : '',
    status: course.status,
    contentType: course.contentType,
    proficiencyLevel: course.proficiencyLevel,
    subscriptionModel: course.subscriptionModel,
    iconUrl: course.iconUrl,
    createdAt: course.createdAt,
    updatedAt: course.updatedAt,
    version: course.version
  }));
};
