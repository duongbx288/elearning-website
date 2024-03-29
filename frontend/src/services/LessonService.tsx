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
    locked?: string;
}

export type Lesson = {
    id: number;
    pageNum?: number;
    pageLimit?: number;
    courseId?: number;
    name?: string;
    videoLink?: string;
    content?: string;
    introduction?: string;
    status?: string;
    lessonNumber: string;
    locked?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
}

export type LessonInfo = {
    id: number;
    name?: string;
    lessonId?: string;
    introduction?: string;
    content?: string;
    startNumber: string;
    createDate?: Date;
    lastModifiedDate?: Date;
    videoLink?: string;
    locked: number;
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

    getByCourseId = (courseId: number) => {
        return axios.get(`/api/lesson/courseId=${courseId}`);
    }

    getById = (request: LessonRequest) => {
        return axios.get(`/api/lesson/${request.id}`);
    }

}

export default new LessonService();