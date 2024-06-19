import axios from 'axios';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../services/courseService';

jest.mock('axios');

describe('courseService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getCourses', () => {
    it('should fetch courses successfully from API', async () => {
      const mockData = [{ id: 1, title: 'Course 1' }];
      axios.get.mockResolvedValue({ data: mockData });

      const result = await getCourses();

      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/courses');
      expect(result).toEqual(mockData);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      axios.get.mockRejectedValue(new Error(errorMessage));

      try {
        await getCourses();
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('createCourse', () => {
    it('should create a new course successfully', async () => {
      const newCourse = { title: 'New Course' };
      const mockResponse = { id: 1, ...newCourse };
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await createCourse(newCourse);

      expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/courses', newCourse);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      axios.post.mockRejectedValue(new Error(errorMessage));

      try {
        await createCourse({ title: 'New Course' });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('updateCourse', () => {
    it('should update an existing course successfully', async () => {
      const updatedCourse = { title: 'Updated Course' };
      const mockResponse = { id: 1, ...updatedCourse };
      axios.put.mockResolvedValue({ data: mockResponse });

      const result = await updateCourse(1, updatedCourse);

      expect(axios.put).toHaveBeenCalledWith('http://localhost:3000/courses/1', updatedCourse);
      expect(result).toEqual(mockResponse);
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      axios.put.mockRejectedValue(new Error(errorMessage));

      try {
        await updateCourse(1, { title: 'Updated Course' });
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });

  describe('deleteCourse', () => {
    it('should delete a course successfully', async () => {
      axios.delete.mockResolvedValue({ data: {} });

      const result = await deleteCourse(1);

      expect(axios.delete).toHaveBeenCalledWith('http://localhost:3000/courses/1');
      expect(result).toEqual({});
    });

    it('should handle errors', async () => {
      const errorMessage = 'Network Error';
      axios.delete.mockRejectedValue(new Error(errorMessage));

      try {
        await deleteCourse(1);
      } catch (error) {
        expect(error.message).toBe(errorMessage);
      }
    });
  });
});
