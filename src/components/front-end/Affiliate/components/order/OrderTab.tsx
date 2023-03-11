import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import OrderService, {
  OrderItemCriteria,
  OrderItemRequest,
} from '../../../../../services/OrderService';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import Common from '../../../../../utility/Common';

const OrderTab = ({ id }) => {
  const [orderItem, setOrderItem] = useState<OrderItemRequest[]>([]);

  // Pagination
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  // Criteria
  const [month, setMonth] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [criteria, setCriteria] = useState<OrderItemCriteria>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    OrderService.findOrderItem(criteria).then((res) => {
      if (res.data) {
        setOrderItem(res.data.content);
        setTotalPage(res.data.totalPages);
        setPage(res.data.number + 1);
      }
    });
  }, [criteria]);

  useEffect(() => {
    const criteria1 = {
      limit: limit,
      page: page - 1,
      month: month && month !== 'Tất cả' ? Number(month) : null,
      year: year && year !== 'Tất cả' ? Number(year) : null,
      affiliateId: id,
    } as OrderItemCriteria;
    setCriteria(criteria1);
  }, [limit, page, month, year]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event: SelectChangeEvent) => {
    setMonth(event.target.value);
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography variant="h5">Danh sách đơn hàng</Typography>
      <Box display={'flex'} margin={1} padding={2}>
        <Grid container>
          <Grid item xs={4} marginRight={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Tháng</InputLabel>
              <Select
                fullWidth
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={month}
                label="Tháng"
                onChange={handleMonthChange}
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
                <MenuItem value={'Tất cả'}>Tất cả các tháng</MenuItem>
                {months.map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="demo-select-label">Năm</InputLabel>
              <Select
                fullWidth
                labelId="demo-select-label"
                id="demo-select"
                value={year}
                label="Năm"
                onChange={handleYearChange}
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
                <MenuItem value={'Tất cả'}>Tất cả</MenuItem>
                {getYear().map((item) => {
                  return (
                    <MenuItem value={item.id} key={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        {/* <Button sx={{ marginLeft: 2 }} onClick={handleSearch} variant={'outlined'}>
          Tìm kiếm
        </Button> */}
      </Box>
      <Box>
        <Box sx={{ marginBottom: 2 }}>
          {orderItem.length > 0 ? (
            orderItem.map((item) => {
              return (
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={`panel1a-header-${item.id}`}
                  >
                    <Box display={'flex'} flexDirection="column">
                      <Box display={'flex'}>
                        <FeaturedPlayListIcon />
                        <Typography
                          sx={{ color: 'black', marginLeft: 2 }}
                          variant={'h6'}
                        >{`Id: ${item.id}`}</Typography>
                      </Box>
                      <Typography
                        sx={{ color: 'black', marginLeft: 2 }}
                        variant={'h6'}
                      >{`Giá trị khóa học: ${item.total}`}</Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container>
                      <Grid item xs={5}>
                        <Box marginLeft={2}>
                          <Typography>{`Giá gốc khóa học: ${item.initPrice}`}</Typography>
                          <Typography>{`Sử dụng coupon: ${
                            item.couponCode && item.couponCode !== null ? 'Có' : 'Không'
                          }`}</Typography>
                          <Typography>
                            {item.couponCode && item.couponCode !== null ? (
                              `Mã coupon: ${item.couponCode}`
                            ) : (
                              <></>
                            )}
                          </Typography>
                          <Typography>
                            {item.discount && item.couponCode !== null ? (
                              `Được khuyến mãi: ${item.discount}`
                            ) : (
                              <></>
                            )}
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={5}>
                        <Box>
                          <Typography>{`Học viên mua: ${
                            item.studentName ? item.studentName : '---'
                          }`}</Typography>
                          <Typography>{`Thời gian: ${
                            item.createdDate ? Common.handleDate(item.createdDate) : '---'
                          }`}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })
          ) : (
            <Typography> Không có đơn hàng nào.</Typography>
          )}
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

export default OrderTab;

const months = [
  { id: 1, name: 'Tháng 1' },
  { id: 2, name: 'Tháng 2' },
  { id: 3, name: 'Tháng 3' },
  { id: 4, name: 'Tháng 4' },
  { id: 5, name: 'Tháng 5' },
  { id: 6, name: 'Tháng 6' },
  { id: 7, name: 'Tháng 7' },
  { id: 8, name: 'Tháng 8' },
  { id: 9, name: 'Tháng 9' },
  { id: 10, name: 'Tháng 10' },
  { id: 11, name: 'Tháng 11' },
  { id: 12, name: 'Tháng 12' },
];

const getYear = () => {
  var year = new Date().getFullYear();
  var range = [] as any;
  for (var i = 0; i < 5; i++) {
    range.push({ id: year - i, name: `Năm ${year - i}` });
  }
  return range;
};
