import React from 'react';
import CourseList from './components/CourseList';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="container">
      <h1>Courses</h1>
      <CourseList />
    </div>
  );
};

export default App;
