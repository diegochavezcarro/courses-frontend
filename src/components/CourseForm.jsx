import React, { useState, useEffect } from 'react';

const CourseForm = ({ onSubmit, initialCourse }) => {
  const [course, setCourse] = useState(initialCourse || { title: '', description: '', duration: '' });

  useEffect(() => {
    setCourse(initialCourse || { title: '', description: '', duration: '' });
  }, [initialCourse]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" className="form-control" value={course.title} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <input type="text" id="description" name="description" className="form-control" value={course.description} onChange={handleChange} />
      </div>
      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input type="text" id="duration" name="duration" className="form-control" value={course.duration} onChange={handleChange} />
      </div>
      <button type="submit" className="btn btn-primary">Save</button>
    </form>
  );
};

export default CourseForm;


