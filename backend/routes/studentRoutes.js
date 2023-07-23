import express from 'express';
import {
  createStudent,
  getAllStudents,
  getStudent,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';
import firestoreDB from '../firestoreConfig.js';

const router = express.Router();

// Create
router.post('/student', createStudent);

// Read
router.get('/students', getAllStudents);
router.get('/students/:studentId/update', getStudent);

// Update
router.put('/students/:studentId/update', updateStudent);

// Delete
router.delete('/students/:studentId', deleteStudent);

export default router;
