import axios from 'axios';

// const API_BASE_URL = 'http://localhost:8001/api/v1';
const API_BASE_URL = 'https://student-list-ckq3.onrender.com';

export default {
  createStudent(studentData) {
    return axios.post(`${API_BASE_URL}/api/v1/student`, studentData);
  },

  getAllStudents() {
    return axios.get(`${API_BASE_URL}/api/v1/students`);
  },

  getStudent(studentId) {
    return axios.get(`${API_BASE_URL}/api/v1/students/${studentId}/update`);
  },

  updateStudent(studentId, studentData) {
    return axios.put(
      `${API_BASE_URL}/api/v1/students/${studentId}/update`,
      studentData
    );
  },

  deleteStudent(studentId) {
    return axios.delete(`${API_BASE_URL}/api/v1/students/${studentId}`);
  },
};
