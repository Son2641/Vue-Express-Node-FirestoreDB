<template>
  <div class="container mt-5">
    <div id="card">
      <div id="card-header">
        <h4>Edit Students</h4>
      </div>
      <div class="mb-3">
        <label for="">Name</label>
        <input type="text" v-model="model.student.name" class="form-control" />
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label for="">Course</label>
          <input type="text" v-model="model.student.course" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Email</label>
          <input type="text" v-model="model.student.email" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">Phone</label>
          <input type="text" v-model="model.student.phone" class="form-control" />
        </div>
        <div class="mb-3">
          <label for="">School</label>
          <input type="text" v-model="model.student.school" class="form-control" />
        </div>
        <div class="mb-3">
          <button type="button" @click="editStudent" class="btn btn-primary">Update</button>
        </div>
        <div class="mb-3">
          <RouterLink to="/students" class="btn btn-danger">Cancel</RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import { RouterLink } from 'vue-router';
import studentService from '../../../services/studentService';
export default {
  name: 'StudentUpdate',
  data() {
    return {
      studentId: '',
      model: {
        student: {
          name: '',
          course: '',
          email: '',
          phone: '',
          school: '',
        }
      },
    }
  },
  mounted() {
    this.studentId = this.$route.params.id
    this.getStudentData(this.studentId)
  },
  methods: {
    getStudentData(studentId) {
      studentService.getStudent(studentId).then(res => {
        this.model.student = res.data.studentData
      })
      .catch((error) => {
          if (error.response) {
            if (error.response.status == 404) {
              alert('Error: No Student Found');
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {

            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

        });
    },
    editStudent() {
      studentService.updateStudent(this.studentId, this.model.student).then(res => {
        alert('Student Updated Successfully');
        this.$router.push('/students');
      })
        .catch((error) => {
          if (error.response) {
            if (error.response.status == 422) {
              alert('Error: All fields are required.');
            }
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {

            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
          console.log(error.config);

        });
    }
  }
}
</script>