import {
  Box,
  Chip,
  Typography,
  Button,
  TableCell,
  TableRow,
  Divider,
  Table,
  TableBody,
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import Toolbar from '../../../layout/Toolbar';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { BoxStyle, CellTable } from '../../../styles/style';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import StudentCourseService from '../../../services/StudentCourseService';
import { Course } from './type';
import CourseService from '../../../services/CourseService';
import { CourseRatingRequest } from '../../../services/CourseRatingService';

interface CustomerState {
  id: number;
}

type Comment = {
  lessonId?: string;
  courseId?: string;
  content?: string;
  userId?: number;
  status?: string;
}

type Rating = {
  userId?: number;
  content?: string;
  status?: string;
  value?: number;
}

const CourseDetail = () => {
  const location = useLocation();
  const courseId = location.state as CustomerState;
  const navigate = useNavigate();

  const [courseInfo, setCourseInfo] = useState<Course>();
  const [data, setData] = useState<Course[]>([]);
  const [rating, setRating] = useState([]);
  const [studentCount, setStudentCount] = useState<number>(0);
  const [studentComplete, setStudentComplete] = useState<number>(0);
  useEffect(() => {
    CourseService.getById(courseId.id).then((response) => {
      if (response.data) {
        console.log(response);
        setCourseInfo(response.data);
      }
      CourseService.getStudentCount(courseId.id).then((res1) => {
        if(res1.data){
          setStudentCount(res1.data);
        }
      });
      CourseService.getStudentComplete(courseId.id).then((res2) => {
        if(res2.data){
          setStudentComplete(res2.data);
        }
      })
      CourseService.getRatingOfCourse(courseId.id).then((res3) => {
        if(res3.data){
          setRating(res3.data);
        }
      })
    });
  }, []);

  const statusProcess = (status: any) => {
    if (String(status) === 'active') {
      return <Chip color="success" size={'small'} label={'Hoạt động'} />;
    } else if (String(status) === 'inactive') {
      return <Chip color="warning" size={'small'} label={'Tạm ngừng'} />;
    } else if (String(status) === 'deleted') {
      return <Chip color="error" size={'small'} label={'Đã xóa'} />;
    } else return;
  };

  const columns = useMemo<MRT_ColumnDef<CourseRatingRequest>[]>(
    () => [
      {
        accessorKey: 'studentId',
        header: 'Id học viên',
      },
      {
        accessorKey: 'value',
        header: 'Điểm đánh giá',
      },
      {
        accessorKey: 'content',
        header: 'Nội dung',
        size: 200,
        Cell: ({ cell }) => {
          return statusProcess(cell.getValue());
        },
      },
    ],
    []
  );

  const formatDate = (date: Date | undefined) => {
    if (typeof date !== 'undefined') {
      const toString = new Date(date).toLocaleDateString();
      return toString;
    } else 
    return "---";
  };

  return (
    <>
      <Toolbar />
      <Box>
        <Box sx={{ mt: 3, ml: 2, mr: 2, mb: 1 }} style={BoxStyle}>
          {/* <Image>avatar</Image> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'blue' }}>
              Thông tin chi tiết về khóa học{' '}
            </Typography>
            <div>
              <Button
                variant="contained"
                sx={{
                  width: '165px',
                }}
              >
                Sửa thông tin
              </Button>
            </div>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 2 }}>
            <Table sx={{ width: '50%' }}>
              <TableBody>
              <TableRow>
                  <TableCell sx={CellTable}>Id giáo viên tạo khóa học: </TableCell>
                  <TableCell sx={CellTable}>
                    <b>{courseInfo?.teacherId}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Tên khóa học: </TableCell>
                  <TableCell sx={CellTable}>
                    <b>{courseInfo?.name}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Gía khóa học: </TableCell>
                  <TableCell sx={CellTable}>
                    <b>{courseInfo?.price}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Thời gian tạo khóa học: </TableCell>
                  <TableCell sx={CellTable}>
                    <b>{formatDate(courseInfo?.createdDate)}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Trạng thái:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{statusProcess(courseInfo?.status)}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box style={BoxStyle}>
            <Typography>Số lượng học sinh đăng kí khóa học: {studentCount}</Typography>
            <Typography>Số lượng học sinh hoàn tất khóa học: {studentComplete}</Typography>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={rating}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Đánh giá về khóa học</Typography>
                  </Box>
                  <Divider />
                </>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default CourseDetail;
