import {
  addDays,
  addWeeks,
  addMonths,
  parseISO,
  format,
  startOfDay,
} from "date-fns";
import { saveDocument } from "./useFirebase";
import { db } from "../firebase.js";
import {
  collection,
  getDocs,
  writeBatch,
  doc,
  query,
  where,
} from "firebase/firestore";

const MAX_OCCURRENCES = 365; // Maximum number of recurring classes

export const createRecurringClasses = async baseClass => {
  const { recurrence, date, ...classData } = baseClass;

  if (recurrence.type === "none") {
    return [baseClass];
  }

  if (recurrence.occurrences > MAX_OCCURRENCES) {
    throw new Error(
      `Maximum number of occurrences (${MAX_OCCURRENCES}) exceeded`
    );
  }

  const classes = [baseClass];
  const startDate = parseISO(date);
  let currentDate = startDate;
  let count = 1;

  const getNextDate = (date, type, interval) => {
    switch (type) {
      case "daily":
        return addDays(date, interval);
      case "weekly":
        return addWeeks(date, interval);
      case "monthly":
        return addMonths(date, interval);
      default:
        return date;
    }
  };

  const shouldCreateClass = (date, type, weekDays) => {
    if (type !== "weekly" || !weekDays.length) return true;
    const dayName = format(date, "EEEE").toLowerCase();
    return weekDays.includes(dayName);
  };

  while (count < recurrence.occurrences) {
    if (recurrence.type === "custom") {
      currentDate = getNextDate(
        currentDate,
        recurrence.frequency,
        recurrence.interval
      );
      if (
        shouldCreateClass(
          currentDate,
          recurrence.frequency,
          recurrence.weekDays
        )
      ) {
        classes.push({
          ...classData,
          date: format(currentDate, "yyyy-MM-dd"),
          recurrence: { ...recurrence, isRecurringInstance: true },
        });
        count++;
      }
    } else {
      currentDate = getNextDate(currentDate, recurrence.type, 1);
      classes.push({
        ...classData,
        date: format(currentDate, "yyyy-MM-dd"),
        recurrence: { ...recurrence, isRecurringInstance: true },
      });
      count++;
    }
  }

  return classes;
};

export const saveRecurringClasses = async (classes, userId) => {
  const savedClasses = [];

  for (const classData of classes) {
    try {
      const savedClass = await saveDocument(
        `coaches/${userId}/classes`,
        classData
      );
      savedClasses.push(savedClass);
    } catch (error) {
      console.error("Error saving recurring class:", error);
      throw error;
    }
  }

  return savedClasses;
};

export const cleanupPastClasses = async userId => {
  const today = startOfDay(new Date());

  try {
    const classesCollectionRef = collection(db, `coaches/${userId}/classes`);
    const classesQuery = query(
      classesCollectionRef,
      where("date", "<", format(today, "yyyy-MM-dd"))
    );

    const classesSnapshot = await getDocs(classesQuery);
    const batch = writeBatch(db);
    let deletedCount = 0;

    classesSnapshot.forEach(classDoc => {
      const classRef = doc(db, `coaches/${userId}/classes`, classDoc.id);
      batch.delete(classRef);
      deletedCount++;
    });

    if (deletedCount > 0) {
      await batch.commit();
      console.log(`Successfully deleted ${deletedCount} past classes.`);
    }

    return deletedCount;
  } catch (error) {
    console.error("Error cleaning up past classes:", error);
    throw error;
  }
};

// New function to get future classes
export const getFutureClasses = async userId => {
  const today = startOfDay(new Date());

  try {
    const classesCollectionRef = collection(db, `coaches/${userId}/classes`);
    const classesQuery = query(
      classesCollectionRef,
      where("date", ">=", format(today, "yyyy-MM-dd"))
    );

    const classesSnapshot = await getDocs(classesQuery);
    return classesSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching future classes:", error);
    throw error;
  }
};
