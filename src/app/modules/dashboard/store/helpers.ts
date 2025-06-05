import LessonModel from '~app/modules/lessons/models/lesson';
import CourseModel from '../models/course';
import { CourseWithSingleCategory, DataFilters } from './state';

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

      const getComparableValue = (val: any): string | number | null => {
        if (Array.isArray(val)) val = val[0];
        if (typeof val === 'string' || typeof val === 'number') return val;
        return null;
      };

      const aComp = getComparableValue(aVal);
      const bComp = getComparableValue(bVal);

      if (aComp !== null && bComp !== null) {
        let comp = 0;
        if (typeof aComp === 'number' && typeof bComp === 'number') {
          comp = aComp - bComp;
        } else {
          comp = String(aComp).localeCompare(String(bComp));
        }

        if (comp !== 0) {
          return secondaryDirection === 'desc' ? -comp : comp;
        }
      } else if (aComp !== bComp) {
        return aComp === null ? 1 : -1;
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
    lessonCount: course.lessonCount,
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

export const filterCourses = (courses: CourseWithSingleCategory[], filters: DataFilters) => {
  return courses.filter((course) => {
    const { category, proficiencyLevel, contentType, subscriptionModel, status } = filters;

    if (!course.proficiencyLevel || !course.subscriptionModel || !course.status) {
      return courses;
    }

    const matchCategory = !category.length || category.some((cat) => cat === course.category);
    const matchProficiency = !proficiencyLevel.length || proficiencyLevel.includes(course.proficiencyLevel);
    const matchContentType = !contentType.length || contentType.includes(course.contentType);
    const matchSubscription = !subscriptionModel.length || subscriptionModel.includes(course.subscriptionModel);
    const matchStatus = !status.length || status.includes(course.status);

    return matchCategory && matchProficiency && matchContentType && matchSubscription && matchStatus;
  });
};

export const filterLessons = (lessons: LessonModel[], filters: DataFilters) => {
  return lessons.filter((lesson) => {
    const { category, proficiencyLevel, contentType, subscriptionModel, status } = filters;

    if (!lesson.proficiencyLevel || !lesson.subscriptionModel || !lesson.status) {
      return false;
    }

    const matchCategory = !category.length || category.some((cat) => cat === lesson.category);
    const matchProficiency = !proficiencyLevel.length || proficiencyLevel.includes(lesson.proficiencyLevel);
    const matchContentType = !contentType.length || contentType.includes(lesson.contentType || '');
    const matchSubscription = !subscriptionModel.length || subscriptionModel.includes(lesson.subscriptionModel);
    const matchStatus = !status.length || status.includes(lesson.status);

    return matchCategory && matchProficiency && matchContentType && matchSubscription && matchStatus;
  });
};
