import axios from 'axios';

export type StudentCourseType = {
    studentId?: number;
    courseId?: number;
    lessonId?: number;
    teacherId?: number;
    courseName?: string;
    description?: string;
    introduction?: string;
    price?: number;
    status?: string;
    cover?: string;
    link?: string;
}

class StudentCourseService {

    getByStudentId = (id: number) => {
        return axios.get(`/api/student_course/studentId=${id}`);
    }

}

export default new StudentCourseService();