import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import LessonService, {
  Lesson,
  LessonInfo,
} from '../../../../../../services/LessonService';
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
      }
    });
  }, []);

  useEffect(() => {
    lessonList.sort(function (a, b) {
      return parseFloat(a?.lessonNumber) - parseFloat(b?.lessonNumber);
    });
    lessonList.forEach((lesson) => {
      if (lesson.lessonInfos && lesson.lessonInfos.length > 0) {
        lesson.lessonInfos.sort(function (a, b) {
          return parseFloat(a?.startNumber) - parseFloat(b?.startNumber);
        });
      }
    });
  }, [lessonList]);

  const lessonInfoList = (lessonInfoList: LessonInfo[]) => {
    return lessonInfoList.map((item) => (
      <Box
        sx={{
          padding: 1,
          boxShadow: 1,
          display: 'flex',
          flexDirection: 'row',
          fontSize: '12px',
        }}
      >
        <Grid container>
          <Grid item xs={5}>
            <Typography sx={{ marginRight: '15px' }}>{item.name}</Typography>
          </Grid>
          <Grid item xs={6}>
            {item.locked === 0 && item.videoLink != null ? (
              <Typography onClick={() => {}} sx={{ cursor: 'pointer' }}>
                {item.videoLink ? item.videoLink : '---'}
              </Typography>
            ) : (
              <Typography></Typography>
            )}
          </Grid>
          <Grid item xs={1}>
            <Typography>{item.content}</Typography>
          </Grid>
        </Grid>
      </Box>
    ));
  };

  return (
    <>
      <Typography sx={{ marginBottom: 2 }}>Nội dung khóa học</Typography>
      {/* <Divider /> */}
      {lessonList.map((lesson) => {
        return (
          <Accordion key={String(lesson.id)}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id={String(lesson.id)}
              key={String(lesson.id)}
            >
              <Typography>{`Bài ${lesson.lessonNumber} : ${lesson.name}`}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* <Typography>{`${lesson.name}`}</Typography> */}
              {lesson.lessonInfos && lesson.lessonInfos.length > 0 ? (
                <Box>{lessonInfoList(lesson.lessonInfos)}</Box>
              ) : (
                <></>
              )}
            </AccordionDetails>
          </Accordion>
        );
      })}
    </>
  );
};

export default CourseCurriculum;
