import {
  Box,
  Button,
  ButtonProps,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { purple } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { StudentResponse } from '../../../../../services/StudentService';
import BookIcon from '@mui/icons-material/Book';
import RecommendCourse from './RecommendCourse';
import FindCourses from './FindCourses';

const ExploreTab = ({ id, studentInfo }) => {
  const [studentId, setStudentId] = useState<number>(id);

  const [info, setInfo] = useState<StudentResponse>(studentInfo);

  useEffect(() => {
    console.log('explore');

  }, []);

  return (
    <Box padding={1} margin={1} border={1}>
      <Typography variant='h6'>
        <BookIcon /> {`Các khóa học được gợi ý cho bạn:`}
      </Typography>
      <Box>
        <RecommendCourse studentId={id}/>
      </Box>
      <Box
        display="flex"
        padding={1}
        margin={1}
        border={1}
        alignItems={'center'}
        justifyContent={'center'}
      >
        <Typography align='center'>
          Tham gia cộng đồng ELEARN Affiliate để cập nhật thông tin mới nhất về các chiến
          dịch, sự kiện, và các khóa học miễn phí
        </Typography>
      </Box> 
      <FindCourses studentId={id}/>
    </Box>
  );
};

export default ExploreTab;

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
