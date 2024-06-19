import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CourseCard from '../components/CourseCard';

const mockCourse = {
  id: 1,
  title: 'Workshop de Kubernetes',
  description: 'Cursos con practicas',
  duration: '18',
};

test('renders course details correctly', () => {
  render(<CourseCard course={mockCourse} onEdit={() => {}} onDelete={() => {}} />);

  expect(screen.getByText('Workshop de Kubernetes')).toBeInTheDocument();
  expect(screen.getByText('Cursos con practicas')).toBeInTheDocument();
  expect(screen.getByText('Duration: 18 hours')).toBeInTheDocument();
});

test('calls onEdit when Edit button is clicked', () => {
  const onEdit = jest.fn();
  render(<CourseCard course={mockCourse} onEdit={onEdit} onDelete={() => {}} />);

  fireEvent.click(screen.getByText('Edit'));
  expect(onEdit).toHaveBeenCalledWith(mockCourse);
});

test('calls onDelete when Delete button is clicked', () => {
  const onDelete = jest.fn();
  render(<CourseCard course={mockCourse} onEdit={() => {}} onDelete={onDelete} />);

  fireEvent.click(screen.getByText('Delete'));
  expect(onDelete).toHaveBeenCalledWith(mockCourse.id);
});
