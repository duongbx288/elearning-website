
import axios from 'axios';

export type CourseRatingRequest = {
    studentId?: number;
    courseId?: number;
    content?: string;
    value?: number;
    status?: string;
    createdDate?: Date;
    lastModifiedDate?: Date;
    // from course
    cover?: string;
    link?: string;
    avatar?: string;
}

class CourseRatingService {

    createCourseRating = (request: CourseRatingRequest) => {
        return axios.post(`api/course_rating/create`, request);
    }

    getByStudentAndCourseId = (courseId: number, studentId: number) => {
        return axios.get(`api/course_rating/course-id=${courseId}/student-id=${studentId}`)
    }

}


export default new CourseRatingService();