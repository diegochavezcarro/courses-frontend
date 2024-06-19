import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseForm from '../components/CourseForm';

test('renders form with initial values', () => {
  const initialCourse = { title: 'Test Title', description: 'Test Description', duration: '10' };
  render(<CourseForm onSubmit={() => {}} initialCourse={initialCourse} />);

  expect(screen.getByDisplayValue('Test Title')).toBeInTheDocument();
  expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument();
  expect(screen.getByDisplayValue('10')).toBeInTheDocument();
});

test('calls onSubmit with course data when form is submitted', () => {
  const onSubmit = jest.fn();
  render(<CourseForm onSubmit={onSubmit} />);

  fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'New Title' } });
  fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'New Description' } });
  fireEvent.change(screen.getByLabelText(/duration/i), { target: { value: '20' } });

  fireEvent.click(screen.getByText('Save'));

  expect(onSubmit).toHaveBeenCalledWith({ title: 'New Title', description: 'New Description', duration: '20' });
});
