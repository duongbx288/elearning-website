import axios from 'axios';

export type TeacherRequest = {
    id?: number;
    teacherCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string;
}

export type TeacherResponse = {
    id?: number;
    teacherCode?: string;
    name?: string;
    avatar?: string;
    birthDate?: Date | string;
    title?: string;
    description?: string;
    phoneNumber?: string;
    city?: string;
    status?: string;
    username?: string;
}

class TeacherService {

    getAllTeacher = () => {
        return axios.get(`/api/teacher`);
    };

    registerTeacher = (request: TeacherRequest) => {
        return axios.post(`/api/teacher/add`, request);
    }


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