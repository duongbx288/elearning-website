import { Avatar, Grid, Typography } from '@mui/material';
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

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          {typeof teacherInfo !== 'undefined' && teacherInfo?.avatar ? (
            <Avatar
              {...stringAvatar(teacherInfo?.name)}
              sx={{ marginRight: '5px', cursor: 'pointer' }}
              alt={'Avatar'}
            ></Avatar>
          ) : (
            <Avatar src={teacherInfo?.avatar}></Avatar>
          )}
        </Grid>
        <Grid item xs={8}>
          <Typography>{teacherInfo?.id}</Typography>
          <Typography>{teacherInfo?.name}</Typography>
          <Typography>{teacherInfo?.id}</Typography>
          <Typography>{teacherInfo?.id}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TeacherInfo;
