import { Accordion, AccordionDetails, AccordionSummary, Divider, Typography } from '@mui/material';
import { useState, useEffect } from 'react';
import LessonService, { Lesson } from '../../../../../../services/LessonService';
import { LessonRequest } from '../../../../../../services/LessonService';
import { ExpandMore } from '@mui/icons-material';
export type Info = {
  info: string;
};

interface CourseInfo {
  courseId: number;
}

const CourseCurriculum: React.FC<CourseInfo> = ({ courseId }: CourseInfo) => {
  const [lessonList, setLessonList] = useState<Lesson[]>([]);

  useEffect(() => {
    LessonService.getByCourseId(courseId).then((res) => {
      if (res.data) {

        setLessonList(res.data);
        console.log(res.data);
        lessonList.sort(function(a,b) {
            return parseFloat(a?.lessonNumber) - parseFloat(b?.lessonNumber)
        })
      }
    });
  }, []);

  return (
    <>
    <Typography>Nội dung khóa học</Typography>
    <Divider/>
    <br/>
      {lessonList.map((lesson) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id={String(lesson.id)}
            >
              <Typography>{`Bài ${lesson.lessonNumber} : ${lesson.name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>{`${lesson.name}`}</Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default CourseCurriculum;
