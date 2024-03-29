import axios from 'axios';
import { CommentResponse } from './CommentService';
import { Lesson, LessonRequest } from './LessonService';
import { RatingResponse } from './RatingService';

export type CourseResponse = {
    course: CourseRequest;
    studentCount?: number | null;
    studentComplete?: number | null;
    comments?: CommentResponse[] | null;
    ratings?: RatingResponse[] | null;
}


export type CourseRequest = {
    id?: number;
    cover?: string;
    pageNum?: number | null;
    typeId?: number | null;
    pageLimit?: number | null;
    teacherId?: number | null;
    teacherName?: string | null;
    name?: string | null;
    description?: string | null;
    introduction?: string | null;
    price?: number | null;
    status?: string | null;
    createdDate?: Date | null;
    lastModifiedDate?: Date | null;
    createdBy?: string | null;
    lastModifiedBy?: string | null;
    boughtCount?: number | null;
    // month?: number | null;
    // year?: number | null;
    limit?: number | null;
    rating?: number | null;
    ratingCount?: number | null;
    link?: string | null;
    // For affiliate
    couponCode?: string | null;
    affiliateId?: number | null;
    discount?: number | null;
    lessons?: LessonRequest[];
}

export type CourseCriteria = {
    limit?: number;
    page?: number;
    typeId?: string;
    name?: string;
    rating?: number;
    maxPrice?: number;
    minPrice?: number;
    createdDate?: string;
    hotSeller?: boolean;
}

class CourseService {
    getAllPag = (request: CourseRequest) => {
        return axios.get(`/api/course/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`)
    }

    createCourse = (request: CourseRequest) => {
        return axios.post(`/api/course/create`, request);
    }

    getRecommendCourse = (criteria: CourseCriteria) => {
        return axios.get(`/api/course/get-recommend`, 
        {params: criteria},
        );
    }

    getHighRating = () => {
        return axios.get(`/api/course/high-rating`);
    }

    getNewCourses = () => {
        return axios.get(`/api/course/new`);
    }

    findCourses = (criteria: CourseCriteria) => {
        return axios.get(`/api/course/info/search/`, 
        {params: criteria},
        );
    }

    getTopCourse = () => {
        return axios.get(`/api/course/top-course`)
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

    getCourseInfo = (id: number) => {
        return axios.get(`/api/course/course-info/${id}`);
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

    getStudentCount = (id: number) => {
        return axios.get(`/api/course/count/${id}`);
    }

    getStudentComplete = (id: number) => {
        return axios.get(`/api/course/count-complete/${id}`);
    }

    getCommentOfCourse = (id: number) => {
        return axios.get(`/api/comment/course-id=${id}`)
    }

    getRatingOfCourse = (id: number) => {
        return axios.get(`/api/course_rating/course-id=${id}`)
    }

    getRatingOfCoursePag = (id: number, pageNum: number) => {
        return axios.get(`/api/course_rating/pag/course-id=${id}/pageNum=${pageNum}`);
    }
}

export default new CourseService();