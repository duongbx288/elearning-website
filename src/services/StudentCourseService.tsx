import axios from 'axios';

class StudentCourseService {

    getByStudentId = (id: number) => {
        return axios.get(`/api/student_course/studentId=${id}`);
    }

}

export default new StudentCourseService();