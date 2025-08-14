export const IsStudent = (id: string) => {
  if (id.startsWith("STUD")) {
    return true;
  } else {
    return false;
  }
};
export const IsQuiz = (id: string) => {
  if (id.startsWith("QUIZ")) {
    return true;
  } else {
    return false;
  }
};

export const IsDashboardAccessible = (student: any, examId: string) => {
  let studentSubscription = null;
  let isDashboardAccessible = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }

  if (studentSubscription) {
    isDashboardAccessible =
      studentSubscription.featuresAccess.accessJournerSoFar;
  }

  return isDashboardAccessible;
};

export const IsProModulesAccessible = (student: any, examId: string) => {
  let studentSubscription = null;
  let isProModulesAccessible = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }

  if (studentSubscription) {
    isProModulesAccessible =
      studentSubscription.featuresAccess.accessProModules;
  }

  return isProModulesAccessible;
};

export const IsSupportAndNotificationsAccessible = (
  student: any,
  examId: string
) => {
  let studentSubscription = null;
  let accessSupportAndNotifications = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }
  if (studentSubscription) {
    accessSupportAndNotifications =
      studentSubscription.featuresAccess.accessSupportAndNotifications;
  }
  return accessSupportAndNotifications;
};

export const IsVideoLibraryAccessible = (student: any, examId: string) => {
  let studentSubscription = null;
  let accessVideoLibrary = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }
  if (studentSubscription) {
    accessVideoLibrary = studentSubscription.featuresAccess.accessVideoLibrary;
  }
  return accessVideoLibrary;
};

export const IsVideoComboAccessible = (student: any, examId: string) => {
  let studentSubscription = null;
  let accessVideoCombo = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }
  if (studentSubscription) {
    accessVideoCombo = studentSubscription.featuresAccess.accessVideoCombo;
  }
  return accessVideoCombo;
};

export const IsPrioritySupportAccessible = (student: any, examId: string) => {
  let studentSubscription = null;
  let accessPrioritySupport = false;
  if (student.subscriptions && student.subscriptions.length > 0) {
    studentSubscription = student.subscriptions.find(
      (subs: any) => subs.examId === examId
    );
  }
  if (studentSubscription) {
    accessPrioritySupport =
      studentSubscription.featuresAccess.accessPrioritySupport;
  }
  return accessPrioritySupport;
};
