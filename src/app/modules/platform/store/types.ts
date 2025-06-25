import CourseModel from '../models/Course';

export type CourseWithSingleCategory = Omit<CourseModel, 'categories'> & {
  category: string;
};

export type ActiveView = 'courses' | 'lessons';

export type DataFilters = {
  category: string[];
  proficiencyLevel: string[];
  contentType: string[];
  subscriptionModel: string[];
  status: string[];
  latestVersions: boolean;
};
