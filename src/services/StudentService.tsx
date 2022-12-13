import axios from 'axios';

export type StudentRequest = {
    id?: number;
    studentCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string;
}

class StudentService {

    getAllStudent = () => {
        return axios.get(`/api/students`);
    };

    getStudentById = (id: number) => {
        return axios.get(`/api/students/${id}`);
    }

    getStudentPag = (request: StudentRequest) => {
        return axios.get(`/api/students/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`);
    }

    updateStudentStatus = (request: StudentRequest) => {
        return axios.put(`/api/students/update-status`, request);
    }

    updateStudent = (request: StudentRequest) => {
        return axios.put(`/api/students/update`, request);
    }
}

export default new StudentService();