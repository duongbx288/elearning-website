import {
  SelectChangeEvent,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Pagination,
  Button
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseService, {
  CourseRequest,
  CourseCriteria,
} from '../../../../../services/CourseService';
import TypeService, { TypeResponse } from '../../../../../services/TypeService';

const FindCourses = ({ studentId }) => {
  const navigate = useNavigate();

  // Pagination
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  // Criteria
  const [typeId, setTypeId] = useState<string>();
  const [name, setName] = useState<string | null>();
  const [courses, setCourses] = useState<CourseRequest[]>([]);
  const [category, setCategory] = useState<TypeResponse[]>([]);
  const [criteria, setCriteria] = useState<CourseCriteria>({});

  useEffect(() => {
    TypeService.getAllType().then((res) => {
      if (res.data) {
        setCategory(res.data);
      }
    });
  }, []);

  useEffect(() => {
    CourseService.findCourses(criteria).then((res) => {
      if (res.data) {
        setCourses(res.data.content);
        setTotalPage(res.data.totalPages);
        setPage(res.data.number + 1);
      }
    });
  }, [criteria]);


  useEffect(() => {
    const criteria1 = {
      limit: limit,
      page: page - 1,
      typeId: typeId && Number(typeId) > 0 ? typeId : null,
      name: name,
    } as CourseCriteria;
    setCriteria(criteria1);
  }, [limit, page, typeId, name]);

  const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    setTypeId(event.target.value);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Box display={'flex'} margin={1} padding={2}>
        <TextField
          value={name}
          placeholder="Nhập tên khóa học..."
          onChange={handleNameInput}
        ></TextField>
        <FormControl sx={{ marginLeft: 2, width: '300px' }}>
          <InputLabel id="demo-simple-select-label">Loại khóa học</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={typeId}
            label="Loại khóa học"
            onChange={handleTypeChange}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
              transformOrigin: {
                vertical: 'top',
                horizontal: 'left',
              },
            }}
          >
            <MenuItem value={``}>-----</MenuItem>
            {category.map((item) => {
              return (
                <MenuItem value={item.id} key={item.id}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
        {/* <Button sx={{ marginLeft: 2 }} onClick={handleSearch} variant={'outlined'}>
        Tìm kiếm
      </Button> */}
      </Box>
      <Box>
        <Box>
          {courses.map((course) => {
            return (
              <Box
                padding={1}
                display="flex"
                justifyContent={'space-between'}
                margin={0.5}
                border={1}
                key={course.id}
              >
                <Box display="flex">
                  <Box
                    component={'img'}
                    src={course.cover}
                    sx={{ width: '170px', height: '120px' }}
                    alt=""
                  ></Box>
                  <Box marginLeft={2}>
                    <Typography
                      variant={'h6'}
                      sx={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigate(`/course-info/` + course.id);
                      }}
                    >{`Khóa học: ${course.name}`}</Typography>
                    <Typography>{`Giáo viên: ${
                      course.teacherName ? course.teacherName : '---'
                    }`}</Typography>
                  </Box>
                </Box>
                <Box marginRight={1} padding={1}>
                  <Typography>{`Đánh giá: ${course.rating}`}</Typography>
                  <Typography>{`Giá: ${course.price}`}</Typography>
                  <Button variant="contained" onClick={() => {navigate(`/course-info/`+course.id)}}>Xem thông tin</Button>
                </Box>
                {/* <Typography>{course.}</Typography> */}
              </Box>
            );
          })}
        </Box>
        <Pagination
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        ></Pagination>
      </Box>
    </Box>
  );
};

export default FindCourses;
