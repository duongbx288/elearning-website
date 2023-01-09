import { Avatar, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import TeacherService, {
  TeacherResponse,
} from '../../../../../../services/TeacherService';
import {
  stringToColor,
  stringAvatar,
} from '../../../../../../services/helpers/CourseInfoHelpders';
import { useNavigate } from 'react-router-dom';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export type Info = {
  info: string;
};

interface TeacherProps {
  teacherId: number;
}

const TeacherInfo: React.FC<TeacherProps> = ({ teacherId }: TeacherProps) => {
  const navigate = useNavigate();
  const [teacherInfo, setTeacherInfo] = useState<TeacherResponse>();
  const [expand, setExpand] = useState<boolean>(false);

  useEffect(() => {
    if (teacherId) {
      TeacherService.getTeacherById(teacherId).then((res) => {
        if (res.data) {
          console.log(res.data);
          setTeacherInfo(res.data);
        }
      });
    }
  }, []);

  const handleTeacher = () => {};

  const handleExpandClose = () => {
    setExpand(false);
    return;
  };

  const handleExpandOpen = () => {
    setExpand(true);
    return;
  };

  const getDescription = (description: any) => {
    if (description && description.length > 0) {
      if (expand)
        return (
          <>
            <Typography sx={{ marginBottom: 1 }}>{teacherInfo?.description}</Typography>
            <Button variant="outlined" onClick={handleExpandClose}>
              Thu nhỏ
            </Button>
          </>
        );
      else
        return (
          <>
            <Typography
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                marginBottom: 1,
              }}
            >
              {teacherInfo?.description}
            </Typography>
            <Button variant="outlined" onClick={handleExpandOpen}>
              Xem thêm
            </Button>
          </>
        );
    }
  };

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Thông tin giảng viên
      </Typography>
      <Grid container>
        <Grid item marginRight={2}>
          {typeof teacherInfo !== 'undefined' && teacherInfo?.avatar ? (
            <Avatar
              sx={{ marginRight: '5px', width: 80, height: 80, border: '1px solid' }}
              src={teacherInfo?.avatar}
            ></Avatar>
          ) : (
            <Avatar
              {...stringAvatar(teacherInfo?.name)}
              sx={{ marginRight: '5px', cursor: 'pointer', width: 72, height: 72 }}
              alt={'Avatar'}
            ></Avatar>
          )}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="h6">{teacherInfo?.name}</Typography>
          <Typography sx={{ fontStyle: 'italic', marginBottom: '2px' }}>{teacherInfo?.title}</Typography>
          <Typography>{`${teacherInfo?.name} là ai?`}</Typography>
          {getDescription(teacherInfo?.description)}
        </Grid>
      </Grid>
    </>
  );
};

export default TeacherInfo;
