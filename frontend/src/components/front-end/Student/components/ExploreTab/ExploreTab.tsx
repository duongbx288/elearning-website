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
import { useNavigate } from 'react-router-dom';

const ExploreTab = ({ id, studentInfo }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState<number>(id);

  const [info, setInfo] = useState<StudentResponse>(studentInfo);
  // User-info
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    console.log('explore');
      let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
      if (info) {
        var inf = JSON.parse(info);
        setUserInfo(inf);
      }
  }, []);

  const handleGoToAffiliate = () => {
    if (userInfo.affiliateId && userInfo.affiliateId != null) {
    navigate('/affiliate-page/' + userInfo?.affiliateId, {
      state: { id: userInfo?.affiliateId },
    });
    } else {navigate('/affiliate-register')}
  };

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
        flexDirection={'column'}
      >
        <Typography align='center'>
          Tham gia cộng đồng ELEARN Affiliate để cập nhật thông tin mới nhất về các chiến
          dịch, sự kiện, và các khóa học miễn phí
        </Typography>
        <Button variant={'outlined'} onClick={handleGoToAffiliate}> Đăng ký cộng tác viên </Button>
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
