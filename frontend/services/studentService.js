import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api/v1';

export default {
  createStudent(studentData) {
    return axios.post(`${API_BASE_URL}/student`, studentData);
  },

  getAllStudents() {
    return axios.get(`${API_BASE_URL}/students`);
  },

  getStudent(studentId) {
    return axios.get(`${API_BASE_URL}/students/${studentId}/update`);
  },

  updateStudent(studentId, studentData) {
    return axios.put(
      `${API_BASE_URL}/students/${studentId}/update`,
      studentData
    );
  },

  deleteStudent(studentId) {
    return axios.delete(`${API_BASE_URL}/students/${studentId}`);
  },
};
