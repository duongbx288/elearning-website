import { Box, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CourseRequest } from '../../../../../services/CourseService';
import TeacherService, { TeacherResponse } from '../../../../../services/TeacherService';

const CreateCourse = () => {
  const { id } = useParams();
  const temp = {} as CourseRequest;
  const [courseInfo, setCourseInfo] = useState<CourseRequest>();
  const [teacherInfo, setTeacherInfo] = useState<TeacherResponse>();

  const [teacherId, setTeacherId] = useState<number>();
  const [teacherName, setTeacherName] = useState<string>('');
  const [name, setName] = useState<string>(''); // ten khoa hoc
  const [description, setDescription] = useState<string>('');
  const [introduction, setIntroduction] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [typeId, setTypeId] = useState<number>();
  const [link, setLink] = useState<string>(); // Video gioi thieu
  const [cover, setCover] = useState<string>(); // Hinh anh gioi thieu khoa hoc

  useEffect(() => {
    document.title = 'Tạo khóa học';
    if (id !== null && typeof id === 'string') {
      TeacherService.getTeacherById(Number(id)).then((res) => {
        if (res.data) {
          setTeacherInfo(res.data);
        }
      });
    }
  }, []);


  return (
    <>
      <Box
        display={'flex'}
        alignItems={'center'}
        sx={{ bgcolor: '#f6f9fc' }}
        flexDirection="column"
      >
        <Box sx={{ width: '80%', bgcolor: '#2a004d', padding: 2 }}>
          <Typography variant="h4" sx={{ color: 'white' }}>
            Giáo viên: {teacherInfo?.name}
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Tạo mới khóa học
          </Typography>
          <Box sx={{ p: 3, mt: 1 }} />
        </Box>
        <Typography>Hello</Typography>
        <TextField></TextField>
      </Box>
    </>
  );
};

export default CreateCourse;
