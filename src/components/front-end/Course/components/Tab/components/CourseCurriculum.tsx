import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  List,
  Typography,
} from '@mui/material';
import { useState, useEffect } from 'react';
import LessonService, {
  Lesson,
  LessonInfo,
} from '../../../../../../services/LessonService';
import { ExpandMore } from '@mui/icons-material';
import ReactPlayer from 'react-player';

export type Info = {
  info: string;
};

interface CourseInfo {
  courseId: number;
}

const CourseCurriculum: React.FC<CourseInfo> = ({ courseId }: CourseInfo) => {
  const [lessonList, setLessonList] = useState<Lesson[]>([]);

  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [vidLink, setVidLink] = useState<string>('');

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
  }, [lessonList]);

  const handleOpen = (link: string | undefined) => {
    if (link) {
      setVidLink(link);
      setOpenDialog(true);
    } else return;
  };

  const handleClose = () => {
    setVidLink('');
    setOpenDialog(false);
  };

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
              <Typography
                onClick={() => handleOpen(item.videoLink)}
                sx={{ cursor: 'pointer' }}
                color='blueviolet'
              >
                {item.videoLink ? 'Học thử' : '---'}
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
              {/* {lesson.lessonInfos && lesson.lessonInfos.length > 0 ? (
                <Box>{lessonInfoList(lesson.lessonInfos)}</Box>
              ) : (
                <></>
              )} */}
            </AccordionDetails>
          </Accordion>
        );
      })}
      <Dialog open={openDialog} fullWidth maxWidth={'md'} onClose={handleClose}>
        <DialogTitle>Video</DialogTitle>
        <DialogContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          <ReactPlayer 
            controls
          url={vidLink}></ReactPlayer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Thoát</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseCurriculum;
