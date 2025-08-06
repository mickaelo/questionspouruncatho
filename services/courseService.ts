import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { Course } from '../types/quiz';

// Collection name
const COURSES_COLLECTION = 'courses';

export interface CourseService {
  // Course retrieval
  getCourse(id: string): Promise<Course | null>;
  getAllCourses(): Promise<Course[]>;
  
  // Course management
  createCourse(course: Omit<Course, 'id'>): Promise<string>;
  updateCourse(id: string, course: Partial<Course>): Promise<void>;
  deleteCourse(id: string): Promise<void>;
  
  // Statistics
  getCourseStatistics(): Promise<{
    totalCourses: number;
    coursesByDifficulty: Record<number, number>;
  }>;
}

class CourseServiceImpl implements CourseService {

  async getCourse(id: string): Promise<Course | null> {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as any;
      }

      return null;
    } catch (error) {
      console.error('Error getting course:', error);
      throw new Error('Failed to get course');
    }
  }

  async getAllCourses(): Promise<Course[]> {
    try {
      const q = query(collection(db, COURSES_COLLECTION), orderBy('id'));
      const querySnapshot = await getDocs(q);

      const courses = querySnapshot.docs.map(doc => ({
        id: parseInt(doc.id),
        ...doc.data()
      })) as Course[];

      // Trier les courses par ID côté client
      return courses.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error getting all courses:', error);
      throw new Error('Failed to get courses');
    }
  }

  async createCourse(course: Omit<Course, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, COURSES_COLLECTION), course);
      return docRef.id;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error('Failed to create course');
    }
  }

  async updateCourse(id: string, course: Partial<Course>): Promise<void> {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      await updateDoc(docRef, course);
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error('Failed to update course');
    }
  }

  async deleteCourse(id: string): Promise<void> {
    try {
      const docRef = doc(db, COURSES_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error('Failed to delete course');
    }
  }

  async getCourseStatistics(): Promise<{
    totalCourses: number;
    coursesByDifficulty: Record<number, number>;
  }> {
    try {
      const courses = await this.getAllCourses();

      const coursesByDifficulty: Record<number, number> = {};
      
      // Compter les courses par difficulté (basé sur l'ID)
      courses.forEach(course => {
        coursesByDifficulty[course.id] = (coursesByDifficulty[course.id] || 0) + 1;
      });

      return {
        totalCourses: courses.length,
        coursesByDifficulty
      };
    } catch (error) {
      console.error('Error getting course statistics:', error);
      throw new Error('Failed to get course statistics');
    }
  }
}

export const courseService = new CourseServiceImpl(); 