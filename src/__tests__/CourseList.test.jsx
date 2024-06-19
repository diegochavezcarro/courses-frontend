import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CourseList from '../components/CourseList';
import * as courseService from '../services/courseService';

// Mock the courseService module
jest.mock('../services/courseService');

const mockCourses = [
  { id: 1, title: 'Course 1', description: 'Description 1', duration: '10' },
  { id: 2, title: 'Course 2', description: 'Description 2', duration: '20' },
];

beforeEach(() => {
  // Reset all mocks before each test
  jest.clearAllMocks();
});

test('renders course list correctly', async () => {
  courseService.getCourses.mockResolvedValue(mockCourses);

  render(<CourseList />);

  // Wait for the courses to be loaded
  await waitFor(() => expect(courseService.getCourses).toHaveBeenCalledTimes(1));

  expect(screen.getByText('Course 1')).toBeInTheDocument();
  expect(screen.getByText('Course 2')).toBeInTheDocument();
});

test('can add a new course', async () => {
  courseService.getCourses.mockResolvedValue([]);
  courseService.createCourse.mockResolvedValue({ id: 3, title: 'New Course', description: 'New Description', duration: '30' });
  courseService.getCourses.mockResolvedValueOnce(mockCourses).mockResolvedValueOnce([
    ...mockCourses,
    { id: 3, title: 'New Course', description: 'New Description', duration: '30' },
  ]);

  render(<CourseList />);

  // Wait for the initial load
  await waitFor(() => expect(courseService.getCourses).toHaveBeenCalledTimes(1));

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Course' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
  fireEvent.change(screen.getByLabelText(/duration/i), { target: { value: '30' } });

  fireEvent.click(screen.getByText('Save'));

  await waitFor(() => expect(courseService.createCourse).toHaveBeenCalledTimes(1));

  // Wait for the second load after adding a new course
  await waitFor(() => expect(courseService.getCourses).toHaveBeenCalledTimes(2));

  expect(screen.getByText('New Course')).toBeInTheDocument();
});

test('can delete a course', async () => {
  courseService.getCourses.mockResolvedValue(mockCourses);
  courseService.deleteCourse.mockResolvedValue();
  courseService.getCourses.mockResolvedValueOnce(mockCourses).mockResolvedValueOnce([mockCourses[1]]);

  render(<CourseList />);

  // Wait for the initial load
  await waitFor(() => expect(courseService.getCourses).toHaveBeenCalledTimes(1));

  fireEvent.click(screen.getAllByText('Delete')[0]);

  await waitFor(() => expect(courseService.deleteCourse).toHaveBeenCalledTimes(1));

  // Wait for the second load after deleting a course
  await waitFor(() => expect(courseService.getCourses).toHaveBeenCalledTimes(2));

  expect(screen.queryByText('Course 1')).not.toBeInTheDocument();
  expect(screen.getByText('Course 2')).toBeInTheDocument();
});
