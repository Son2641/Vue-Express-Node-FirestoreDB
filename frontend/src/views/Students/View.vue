
<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>
          Students
          <RouterLink to="/students/create" class="btn btn-primary float-end">Add Student</RouterLink>
        </h4>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Course</th>
                <th>Email</th>
                <th>Phone</th>
                <th>School</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody v-if="this.students.length > 0">
              <tr v-for="(student, index) in this.students" :key="index">
                <td>{{ student.name }}</td>
                <td>{{ student.course }}</td>
                <td>{{ student.email }}</td>
                <td>{{ student.phone }}</td>
                <td>{{ student.school }}</td>
                <td>
                  <RouterLink :to="{ path: '/students/'+student.id+'/update' }" class="btn btn-success mx-2">Edit</RouterLink>
                  <button type="button" @click="deleteData(student.id)" class="btn btn-danger mx-2">Delete</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="6">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import studentService from '../../../services/studentService.js'
export default {
  name: 'students',
  data() {
    return {
      students: []
    }
  },
  mounted() {
    this.getStudents();
  },
  methods: {
    getStudents() {
      studentService.getAllStudents()
        .then(res => {
          this.students = res.data;
        })
        .catch(error => {
          console.error('Error fetching students:', error);
        });
    },
    deleteData(studentId) {
      if(confirm('Do you want to delete this student?')) {
        studentService.deleteStudent(studentId).then(res => {
          alert(res.data.message);
          this.getStudents()
        })
      }
      console.log(studentId)
    }
  },
}
</script>