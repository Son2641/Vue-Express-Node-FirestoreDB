import firestoreDB from '../firestoreConfig.js';

// Create
export const createStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    const { name, course, email, phone, school } = req.body;

    if (!name || !course || !email || !phone || !school) {
      return res.status(422).json({ error: 'All fields are required.' });
    }
    // Add timestamps to the student data
    const timestamp = new Date();

    const studentData = {
      name,
      course,
      email,
      phone,
      school,
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Save the student data to Firestore
    const newStudentRef = await firestoreDB
      .collection('students')
      .add(studentData);

    res.status(201).json({
      message: 'Student added successfully',
      id: newStudentRef.id,
      ...studentData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create student.' });
  }
};

// Read
export const getAllStudents = async (req, res) => {
  try {
    // Get all student documents from Firestore
    const querySnapshot = await firestoreDB.collection('students').get();

    // Create an array to store the student data
    const students = [];
    querySnapshot.forEach((doc) => {
      const studentData = doc.data();
      students.push({
        id: doc.id,
        ...studentData,
      });
    });

    // Check if there are students added
    if (students.length === 0) {
      return res.status(404).json({ message: 'There are no students yet.' });
    }

    res.status(200).json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get students.' });
  }
};

export const getStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Check if the student exists in Firestore
    const studentRef = await firestoreDB.collection('students').doc(studentId);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return res.status(404).json({ error: 'Student not found.' });
    }
    // Send the student data in the response
    const studentData = studentDoc.data();
    res.status(200).json({ studentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get student.' });
  }
};

// Update
export const updateStudent = async (req, res) => {
  try {
    // Extract student data from the request body
    const { name, course, email, phone, school } = req.body;

    if (!name || !course || !email || !phone || !school) {
      return res.status(422).json({ error: 'All fields are required.' });
    }

    // Get the student ID from the request parameters
    const { studentId } = req.params;

    // Check if the student exists in Firestore
    const studentRef = await firestoreDB.collection('students').doc(studentId);
    const studentDoc = await studentRef.get();

    if (!studentDoc.exists) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Add timestamps to the student data
    const timestamp = new Date();
    const updatedStudentData = {
      name,
      course,
      email,
      phone,
      school,
      updatedAt: timestamp,
    };

    await studentRef.update(updatedStudentData);

    res.status(200).json({ id: studentId, ...updatedStudentData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update student.' });
  }
};

// Delete
export const deleteStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    // Get the student document reference
    const studentRef = firestoreDB.collection('students').doc(studentId);

    // Check if the student exists
    const studentDoc = await studentRef.get();
    if (!studentDoc.exists) {
      return res.status(404).json({ error: 'Student not found.' });
    }

    // Delete the student document
    await studentRef.delete();

    res.status(200).json({ message: 'Student deleted successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete student.' });
  }
};
