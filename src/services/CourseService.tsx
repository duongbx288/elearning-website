import axios from 'axios';

export type CourseRequest = {
    id?: number;
    pageNum?: number;
    pageLimit?: number;
    teacherId?: number;
    name?: string;
    description?: string;
    introduction?: string;
    price?: string;
    status?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
}

class CourseService {
    getAllPag = (request: CourseRequest) => {
        return axios.get(`/api/course/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`)
    }

    updateCourseStatus = (request: CourseRequest) => {
        return axios.put(`/api/course/update-status`, request);
    }

    updateCourse = (request: CourseRequest) => {
        return axios.put(`/api/course/update`, request);
    }

    getByTeacherId = (request: CourseRequest) => {
        return axios.get(`/api/course/teacherId=${request.teacherId}`);
    }

    getById = (id: number) => {
        return axios.get(`/api/course/${id}`);
    }

}

export default new CourseService();