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
  Grid,
  Select,
  MenuItem,
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import Toolbar from '../../layout/Toolbar';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { BoxStyle, CellTable } from '../../styles/style';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import StudentCourseService from '../../services/StudentCourseService';
import TeacherService from '../../services/TeacherService';
import { Teacher } from './type';
import CourseService, { CourseRequest } from '../../services/CourseService';
import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';

interface CustomerState {
  id: number;
}

export type Course = {
  id?: number;
  name?: string;
  price?: number | string;
  status?: string;
  description?: string;
  introduction?: string;
  createdAt?: string;
  boughtCount?: number;
};

const TeacherDetail = () => {
  const location = useLocation();
  const teacherId = location.state as CustomerState;
  const history = useHistory();

  const [teacherInfo, setTeacherInfo] = useState<Teacher>();
  const [data, setData] = useState<Course[]>([]);
  const [month, setMonth] = useState<number>(1);
  const [monthData, setMonthData] = useState<Course[]>([]);
  const [countMonth, setCountMonth] = useState<number>(0);

  useEffect(() => {
    TeacherService.getTeacherById(teacherId.id).then((response) => {
      if (response.data) {
        setTeacherInfo(response.data);
      }
      CourseService.getByTeacherId(teacherId.id).then((res2) => {
        if (res2.data) {
          setData(res2.data);
          console.log(res2);
        }
      });
    });
  }, []);

  useEffect(() => {
    CourseService.getCourseSoldAtAnyMonth(teacherId.id, month, 2022, 200).then((res) => {
      console.log(res.data);
      setMonthData(res.data.courseChosenMonth);
      setCountMonth(res.data.countChosenMonth);
    });
  }, [month]);

  const handleChange = (event) => {
    setMonth(event.target.value);
  }

  const statusProcess = (status: any) => {
    if (String(status) === 'active') {
      return <Chip color="success" size={'small'} label={'Hoạt động'} />;
    } else if (String(status) === 'inactive') {
      return <Chip color="warning" size={'small'} label={'Tạm ngừng'} />;
    } else if (String(status) === 'deleted') {
      return <Chip color="error" size={'small'} label={'Đã xóa'} />;
    } else return;
  };

  const columns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 50,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'name',
        header: 'Tên',
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'price',
        header: 'Gía',
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => {
          return statusProcess(cell.getValue());
        },
      },
      {
        accessorKey: 'description',
        header: 'Mô tả',
        size: 300,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Tạo ngày',
        size: 200,
        Cell: ({ cell }) => {
          const date = String(cell.getValue());
          const toString = new Date(date).toLocaleDateString();
          return (
            <Typography>
              {String(toString) === 'Invalid Date' ? '---' : String(toString)}
            </Typography>
          );
        },
      },
    ],
    []
  );

  const monthColumns = useMemo<MRT_ColumnDef<Course>[]>(
    () => [
      {
        accessorKey: 'id',
        header: 'id',
        size: 50,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'boughtCount',
        header: 'Số lượng được mua',
        size: 100
      },
      {
        accessorKey: 'name',
        header: 'Tên',
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'price',
        header: 'Gía',
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'status',
        header: 'Trạng thái ',
        size: 200,
        Cell: ({ cell }) => {
          return statusProcess(cell.getValue());
        },
      },
      {
        accessorKey: 'description',
        header: 'Mô tả',
        size: 300,
        muiTableHeadCellProps: {
          align: 'left',
        },
        muiTableBodyCellProps: {
          align: 'left',
        },
      },
      {
        accessorKey: 'createdAt',
        header: 'Tạo ngày',
        size: 200,
        Cell: ({ cell }) => {
          const date = String(cell.getValue());
          const toString = new Date(date).toLocaleDateString();
          return (
            <Typography>
              {String(toString) === 'Invalid Date' ? '---' : String(toString)}
            </Typography>
          );
        },
      },
    ],
    []
  );


  const formatDate = (date: string) => {
    const toString = new Date(date).toLocaleDateString();
    return toString;
  };

  const createChart = () => {
    const option = {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: ['Tháng 1', 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      },
      yaxis: {
        show: false,
      },
      title: {
        text: 'Số khóa học được mua trong năm',
        align: 'center',
        margin: 10,
        style: {
          fontSize: '15px',
          fontFamily: 'Montserrat'
        },
      },
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    } as ApexOptions;
    const info = {
      series: [
        {
          name: 'Đã hoàn tất',
          data: [1,2,3,4,5,6,7,8,9,10,11,12],
        },
      ],
      animations: {
        enabled: true,
        easing: 'easeinout',
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    };

    return (
      <Chart
        options={option}
        series={info.series}
        type={'bar'}
        animations={info.animations}
      ></Chart>
    );
  };

  return (
    <>
      <Toolbar />
      <Box>
        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Box sx={{ mt: 3, ml: 2, mr: 2, mb: 1 }} style={BoxStyle}>
              {/* <Image>avatar</Image> */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ color: 'blue' }}>
                  Thông tin chi tiết về giáo viên{' '}
                </Typography>
                <div>
                  <Button
                    variant="contained"
                    sx={{
                      width: '165px',
                    }}
                    // onClick={() =>
                    //   history.push({
                    //     pathname: '/teacher/update/' + websiteInfo.id,
                    //     state: { detail: websiteInfo },
                    //   })
                    // }
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
                      <TableCell sx={CellTable}>Tên giáo viên: </TableCell>
                      <TableCell sx={CellTable}>
                        <b>{teacherInfo?.name}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Thành phố: </TableCell>
                      <TableCell sx={CellTable}>
                        <b>{teacherInfo?.city}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Địa chỉ:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{teacherInfo?.address}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Email:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{teacherInfo?.email}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Trạng thái:</TableCell>
                      <TableCell sx={CellTable}>
                        {statusProcess(teacherInfo?.status)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Ngày sinh:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{formatDate(String(teacherInfo?.birthDate))}</b>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell sx={CellTable}>Chức danh:</TableCell>
                      <TableCell sx={CellTable}>
                        <b>{teacherInfo?.title}</b>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={5}>
            <Box sx={{ mt: 3, mr: 2, mb: 1 }} style={BoxStyle}>
                {createChart()}
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Các khóa học đã tạo</Typography>
                  </Box>
                  <Divider />
                </>
              );
            }}
          />
        </Box>
        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={monthColumns}
            data={monthData}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Các khóa học được mua nhiều trong tháng</Typography>
                  </Box>
                  <Divider />
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={month}
                    onChange={handleChange}
                    sx={{ margin: "2px"}}
                    margin={'dense'}
                  >
                    <MenuItem value={1}>Tháng 1</MenuItem>
                    <MenuItem value={2}>Tháng 2</MenuItem>
                    <MenuItem value={3}>Tháng 3</MenuItem>
                    <MenuItem value={4}>Tháng 4</MenuItem>
                    <MenuItem value={5}>Tháng 5</MenuItem>
                    <MenuItem value={6}>Tháng 6</MenuItem>
                    <MenuItem value={7}>Tháng 7</MenuItem>
                    <MenuItem value={8}>Tháng 8</MenuItem>
                    <MenuItem value={9}>Tháng 9</MenuItem>
                    <MenuItem value={10}>Tháng 10</MenuItem>
                    <MenuItem value={11}>Tháng 11</MenuItem>
                    <MenuItem value={12}>Tháng 12</MenuItem>
                  </Select>
                </>
              );
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default TeacherDetail;
