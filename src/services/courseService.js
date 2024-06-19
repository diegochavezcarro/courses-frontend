import axios from 'axios';

const API_URL = 'http://localhost:3000/courses';

export const getCourses = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createCourse = async (course) => {
  const response = await axios.post(API_URL, course);
  return response.data;
};

export const updateCourse = async (id, course) => {
  const response = await axios.put(`${API_URL}/${id}`, course);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
