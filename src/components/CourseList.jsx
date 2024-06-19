import React, { useState, useEffect } from 'react';
import CourseCard from './CourseCard';
import CourseForm from './CourseForm';
import { getCourses, createCourse, updateCourse, deleteCourse } from '../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [currentCourse, setCurrentCourse] = useState(null);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleCreateOrUpdate = async (course) => {
    if (course.id) {
      await updateCourse(course.id, course);
    } else {
      await createCourse(course);
    }
    setCurrentCourse(null);
    loadCourses();
  };

  const handleEdit = (course) => {
    setCurrentCourse(course);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    loadCourses();
  };

  return (
    <div>
      <CourseForm onSubmit={handleCreateOrUpdate} initialCourse={currentCourse} />
      <div className="course-list">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
      </div>
    </div>
  );
};

export default CourseList;
