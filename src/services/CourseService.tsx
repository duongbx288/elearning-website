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
    createdAt?: Date;
    lastModifiedAt?: Date;
    createdBy?: string;
    lastModifiedBy?: string;
    boughtCount?: number;
    month?: number;
    year?: number;
    limit?: number;
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

    getByTeacherId = (id: number) => {
        return axios.get(`/api/course/teacherId=${id}`);
    }

    getById = (id: number) => {
        return axios.get(`/api/course/${id}`);
    }

    getSoldByTeacherId = (id: number, limit: number) => {
        return axios.get(`/api/course/course-sold/teacherId=${id}/limit=${limit}`);
    }

    getCourseSoldByTeacher = (teacherId: number, limit: number) => {
        return axios.get(`/api/course/course-sold/teacherId=${teacherId}/limit=${limit}`)
    }

    getCourseSoldAtAnyMonth = (teacherId: number, month: number, year: number, limit: number) => {
        return axios.get(`/api/course/particular-month/teacher=${teacherId}/month=${month}/year=${year}/limit=${limit}`)
    }

}

export default new CourseService();