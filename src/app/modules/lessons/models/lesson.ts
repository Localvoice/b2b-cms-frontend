class LessonModel {
  lessonId: string | undefined = undefined;

  teacherId: string | undefined = undefined;

  languageId: string | undefined = undefined;

  title: string | undefined = undefined;

  courseId: string | undefined = undefined;

  courseTitle: string | undefined = undefined;

  category: string | undefined = undefined;

  contentType: 'COURSE' | 'PRONUNCIATION_LESSON' | 'DIALOGUE_LESSON' | 'GRAMMAR_LESSON' | undefined = undefined;

  subscriptionModel: 'FREE' | 'PREMIUM' | 'PARTIALLY_FREE' | undefined = undefined;

  lessonExamples: string[] = [];

  status: 'ACTIVE' | 'INACTIVE' | undefined = undefined;

  proficiencyLevel: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | undefined = undefined;

  iconUrl: string | undefined = undefined;

  isContentPromoted: boolean = false;

  isContentDuringTesting: boolean = false;

  isContentPublished: boolean = false;

  createdAt: string | undefined = undefined;

  updatedAt: string | undefined = undefined;
}

export default LessonModel;
