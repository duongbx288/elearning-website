import { useState, useEffect } from "react";
import LessonService from "../../../../../../services/LessonService";
import { LessonRequest } from "../../../../../../services/LessonService";

export type Info = {
    info: string
}

interface CourseInfo {
    courseId: number;
}
}

const CourseCurriculum: React.FC<CourseInfo> = ({courseId}: CourseInfo) => {
    
    const [lessonList, setLessonList] = useState<LessonRequest[]>([]);

    useEffect(() => {
        LessonService.getByCourseId(courseId).then((res) => {
            if (res.data) {
                setLessonList(res.data);
            }
        });
    },[]);
    
    return (
        <></>
    );
}

export default CourseCurriculum;