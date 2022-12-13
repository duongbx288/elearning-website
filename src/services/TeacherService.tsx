import axios from 'axios';

export type TeacherRequest = {
    id?: number;
    teacherCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string;
}

class TeacherService {

    getAllTeacher = () => {
        return axios.get(`/api/teacher`);
    };

    getTeacherById = (id: number) => {
        return axios.get(`/api/teacher/${id}`);
    }

    getTeacherPag = (request: TeacherRequest) => {
        return axios.get(`/api/teacher/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`);
    }

    updateTeacherStatus = (request: TeacherRequest) => {
        return axios.put(`/api/teacher/update-status`, request);
    }

    updateTeacher = (request: TeacherRequest) => {
        return axios.put(`/api/teacher/update`, request);
    }
}

export default new TeacherService();