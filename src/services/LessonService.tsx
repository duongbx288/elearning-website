import axios from 'axios';

export type LessonRequest = {
    id?: number;
    pageNum?: number;
    pageLimit?: number;
    courseId?: number;
    name?: string;
    videoLink?: string;
    content?: string;
    introduction?: string;
    status?: string;
    lessonNumber?: string;
}

class LessonService {
    getAllPag = (request: LessonRequest) => {
        return axios.get(`/api/lesson/pagination/pageNum=${request.pageNum}/pageLimit=${request.pageLimit}`)
    }

    getAll = (request: LessonRequest) => {
        return axios.get(`/api/lesson`);
    }

    updateLessonStatus = (request: LessonRequest) => {
        return axios.put(`/api/lesson/update-status`, request);
    }

    updateLesson = (request: LessonRequest) => {
        return axios.put(`/api/lesson/update`, request);
    }

    getByCourseId = (request: LessonRequest) => {
        return axios.get(`/api/lesson/courseId=${request.courseId}`);
    }

    getById = (request: LessonRequest) => {
        return axios.get(`/api/lesson/${request.id}`);
    }

}

export default new LessonService();