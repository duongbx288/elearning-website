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
  Tooltip
} from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';
import Toolbar from '../../../layout/Toolbar';
import React, { FC, useEffect, useMemo, useState } from 'react';
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table';
import { BoxStyle, CellTable, LinkStyle } from '../../../styles/style';
import { MRT_Localization_VI } from 'material-react-table/locales/vi';
import StudentCourseService from '../../../services/StudentCourseService';
import { Order } from './type';
import OrderService from '../../../services/OrderService';

interface CustomerState {
  id: number;
}

type OrderItem = {
    orderId?: number;
    courseId?: number;
    initPrice?: number;
    total?: number;
}

const OrderDetail = () => {
  const location = useLocation();
  const orderId = location.state as CustomerState;
  const history = useHistory();

  const [orderInfo, setOrderInfo] = useState<Order>();
  const [data, setData] = useState<OrderItem[]>([]);

  useEffect(() => {
    OrderService.getById(orderId.id).then((response) => {
      if (response.data) {
        console.log(response);
        setOrderInfo(response.data);
      }
      OrderService.getOrderItemByOrderId(orderId.id).then((res) => {
        console.log(res);
        setData(res.data);
        return;
      });
    });
  }, []);

  const handleDetailClick = (orderId: number | undefined) => () => {
    const id = orderId;
    history.push({
      pathname: '/course/detail/' + id,
      state: { id: id },
    });
  };

  const columns = useMemo<MRT_ColumnDef<OrderItem>[]>(
    () => [
      {
        accessorKey: 'courseId',
        header: 'Id khóa học',
        Cell: ({ row, cell }) => {
          const id = row.original.courseId;
          return (
            <Tooltip title={'Chi tiết khóa học'}>
              <Typography onClick={handleDetailClick(id)} sx={LinkStyle}>
                {String(cell.getValue())}
              </Typography>
            </Tooltip>
          );
        },
      },
      {
        accessorKey: 'orderId',
        header: 'Id đơn hàng',
      },
      {
        accessorKey: 'total',
        header: 'Gía khóa học',
      },
    ],
    []
  );

  const formatDate = (date: string) => {
    const toString = new Date(date).toLocaleDateString();
    return toString;
  };

  return (
    <>
      <Toolbar />
      <Box>
        <Box sx={{ mt: 3, ml: 2, mr: 2, mb: 1 }} style={BoxStyle}>
          {/* <Image>avatar</Image> */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'blue' }}>
              Thông tin về đơn hàng{' '}
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
                  <TableCell sx={CellTable}>Mã người dùng mua đơn:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{orderInfo?.userId}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Tổng tiền đơn hàng:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{orderInfo?.total}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Id người phân phối hỗ trợ đơn hàng</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{orderInfo?.affiliateId}</b>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={CellTable}>Trạng thái đơn hàng:</TableCell>
                  <TableCell sx={CellTable}>
                    <b>{orderInfo?.status}</b>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
        </Box>

        <Box sx={{ padding: 2 }}>
          <MaterialReactTable
            columns={columns}
            data={data}
            localization={MRT_Localization_VI}
            renderTopToolbar={({ table }) => {
              return (
                <>
                  <Box sx={{ padding: 2 }}>
                    <Typography>Các khóa học đã mua</Typography>
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

export default OrderDetail;
