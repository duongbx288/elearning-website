import axios from 'axios';

export type StudentRequest = {
    id?: number;
    studentCode?: string;
    pageNum?: number;
    pageLimit?: number;
    name?: string;
}

export type StudentResponse = {
    id: number;
    studentCode: string;
    name?: string;
    birth_date?: Date;
    email?: string;
    address?: string;
    city?: string;
    gender?: string;
    avatar?: string;
    status?: string;
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

    getStudentPurchaseInfo = (request: number) => {
        return axios.get(`/api/students/get-purchase-info/student-id=${request}`);
    }
}

export default new StudentService();