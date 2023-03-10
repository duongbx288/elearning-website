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

    getListIdCourseOfStudent = (studentId: number) => {
        return axios.get(`/api/student_course/listCourse/student=${studentId}`);
    }

    getByStudentIdAndCourseId = (id: number, courseId: number) => {
        return axios.get(`/api/student_course/studentId=${id}/courseId=${courseId}`);
    }

}

export default new StudentCourseService();