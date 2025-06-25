class CourseModel {
  courseId: string | undefined = undefined;

  teacherId: string | undefined = undefined;

  languageId: string | undefined = undefined;

  title: string | undefined = undefined;

  lessonCount: number | undefined = undefined;

  categories: string[] = [];

  status: 'ACTIVE' | 'INACTIVE' | undefined = undefined;

  contentType: 'COURSE' | 'PRONUNCIATION_LESSON' | 'DIALOGUE_LESSON' | 'GRAMMAR_LESSON' = 'COURSE';

  proficiencyLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | undefined = undefined;

  subscriptionModel: 'FREE' | 'PREMIUM' | 'PARTIALLY_FREE' | undefined = undefined;

  version: string | undefined = undefined;

  iconUrl: string | undefined = undefined;

  createdAt: string | undefined = undefined;

  updatedAt: string | undefined = undefined;
}

export default CourseModel;
