import { CleaningTask, DEFAULT_TASKS } from '@/types/cleaning';

const STORAGE_KEY = 'sparkles_cleaning_tasks';

export const loadTasks = (): CleaningTask[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading tasks:', error);
  }
  return DEFAULT_TASKS;
};

export const saveTasks = (tasks: CleaningTask[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

export const resetTasks = (): CleaningTask[] => {
  saveTasks(DEFAULT_TASKS);
  return DEFAULT_TASKS;
};
