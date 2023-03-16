import { Box, Typography, Pagination, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import CouponService, { CouponRequest } from '../../../../../services/CouponService';
import Common from '../../../../../utility/Common';

const CouponManage = ({ id, info }) => {
  const [coupons, setCoupons] = useState<CouponRequest[]>([]);
  // Pagination
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  console.log(coupons);

  useEffect(() => {
    CouponService.getCouponByAff(id, limit, page - 1).then((res) => {
      if (res.data) {
        console.log(res.data);
        setCoupons(res.data.content);
        setTotalPage(res.data.totalPages);
        setPage(res.data.number + 1);
      }
    });
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <Box display={'flex'} flexDirection={'column'}>
      <Typography variant="h5">Danh sách coupon</Typography>
      <Box display={'flex'} margin={1} padding={2}>
        {coupons && coupons.length > 0 ? (
          <Grid container>
              {coupons.map((item) => {
                return (
                  <Grid item xs={12}>
                    <Box boxShadow={3} margin={1} padding={1}>

                      <Typography>Mã coupon: {item.couponCode}</Typography>
                      <Typography>{`Thời gian tạo: ${item.createdDate && item.createdDate != null ? Common.handleDate(item.createdDate): '----'}`}</Typography>
                      <Typography>Có thể sử dụng : {item.useTime && item.useTime > 0 ? 'Không'  : 'Có'}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            <Pagination
              count={totalPage}
              page={page}
              onChange={handlePageChange}
            ></Pagination>
          </Grid>
        ) : (
          <Typography>Không có coupons</Typography>
        )}
      </Box>
    </Box>
  );
};

export default CouponManage;
