import React from 'react';

const CourseCard = ({ course, onEdit, onDelete }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{course.title}</h5>
        <p className="card-text">{course.description}</p>
        <p className="card-text">Duration: {course.duration} hours</p>
        <button onClick={() => onEdit(course)} className="btn btn-primary">Edit</button>
        <button onClick={() => onDelete(course.id)} className="btn btn-danger">Delete</button>
      </div>
    </div>
  );
};

export default CourseCard;

