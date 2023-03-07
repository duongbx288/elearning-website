import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useContext, useState } from 'react';
import { CartContext } from '../../../../../context/CartContext';
import { CourseRequest } from '../../../../../services/CourseService';
import { numberWithCommas } from '../../../../../services/helpers/NumberFormat';

import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

import ShareIcon from '@mui/icons-material/Share';
import RedeemIcon from '@mui/icons-material/Redeem';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { useNavigate } from 'react-router-dom';

export interface PurchaseCardProps {
  info: CourseRequest | undefined;
}

const PurchaseCard = ({ info }: PurchaseCardProps) => {

  // Doc o COOKIE

  const navigate = useNavigate();
  const cartContext = useContext(CartContext).cartInfo;

  const [openCart, setOpenCart] = useState<boolean>(false);
  const [openShare, setOpenShare] = useState<boolean>(false);
  const [selected, setSelected] = useState<any>();
  const [userInfo, setUserInfo] = useState<any>();

  useEffect(() => {
    let info = localStorage.getItem('user-info') || sessionStorage.getItem('user-info');
    if (info) {
      setUserInfo(JSON.parse(info));
    }
  }, []);

  const handleOpenCart = () => {
    setOpenCart(true);
  };

  const handleCloseCart = () => {
    setOpenCart(false);
  };

  useEffect(() => {}, []);

  const addToCart = (item) => {
    cartContext.addToCart(item);
    return;
  };

  const removeItem = (item) => {
    cartContext.removeItem(item);
    // setSelected();
    return;
  };

  const checkUserCourse = (info) => {
    if (info && userInfo && userInfo?.listCourses) {
      const existCourse = userInfo?.listCourses.find((item) => item === info.id);
      if (existCourse) return true;
      else return false;
    } return false;
  }

  const handleAddCourseButton = () => {
    if (checkUserCourse(info)) {
      return (
        <Button
          fullWidth
          variant="contained"
          color={'success'}
          sx={{ padding: 2, fontSize: '16px', mt: 1, mb: 2 }}
          onClick={() => {
            navigate('/student-page/' + userInfo.studentId);
          }}
        >
          Vào khóa học
        </Button>
      );
    } else if (!cartContext.checkExistItem(info)) {
      return (
        <Button
          fullWidth
          variant="contained"
          color={'success'}
          sx={{ padding: 2, fontSize: '16px', mt: 1, mb: 2 }}
          onClick={() => {
            addToCart(info);
          }}
        >
          Thêm vào giỏ hàng
        </Button>
      );
    } else
      return (
        <Button
          fullWidth
          sx={{ padding: 2, fontSize: '16px', mt: 1, mb: 2 }}
          onClick={() => {
            setSelected(info);
            setOpenCart(true);
          }}
          variant="contained"
          color="error"
        >
          Xóa khỏi giỏ hàng
        </Button>
      );
  };

  return (
    <>
      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={600}>
            {info?.price ? numberWithCommas(info?.price) : 0} đ
          </Typography>
          {handleAddCourseButton()}
          <Button fullWidth variant="contained">
            Thêm vào danh sách yêu thích
          </Button>
          <Divider />
          <Box padding={2} marginTop={1}>
            <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
              <AccessTimeIcon />
              &nbsp; Thời lượng:{' '}
            </Typography>
            <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
              <PlayCircleIcon />
              &nbsp; Giáo trình:{' '}
            </Typography>
            <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
              <AllInclusiveIcon />
              &nbsp; Sở hữu khóa học trọn đời
            </Typography>
            <Typography sx={{ fontSize: '13px', mb: 0.5 }}>
              <EmojiEventsIcon />
              &nbsp; Cấp chứng nhận hoàn thành
            </Typography>
          </Box>
          <Grid container display={'flex'} justifyContent={'space-between'}>
            <Grid
              item
              xs={3.5}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              sx={{ cursor: 'pointer', background: '#eeeee4', borderRadius: '2px' }}
              padding={1}
              onClick={() => setOpenShare(true)}
            >
              <ShareIcon />
              <Typography sx={{ fontSize: '13px' }}>Chia sẻ</Typography>
            </Grid>
            <Grid
              item
              xs={3.5}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              sx={{ cursor: 'pointer', background: '#eeeee4', borderRadius: '2px' }}
              padding={1}
            >
              <RedeemIcon />
              <Typography sx={{ fontSize: '13px' }}>Tặng bạn bè</Typography>
            </Grid>
            <Grid
              item
              xs={3.5}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
              sx={{ cursor: 'pointer', background: '#eeeee4', borderRadius: '2px' }}
              padding={1}
            >
              <LoyaltyIcon />
              <Typography sx={{ fontSize: '13px' }}>Mã giảm giá</Typography>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions></CardActions>
      </Card>
      <Dialog
        open={openCart}
        onClose={handleCloseCart}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth={'lg'}
      >
        <DialogTitle></DialogTitle>
        <DialogContent>Bạn có muốn bỏ khóa học này khỏi giỏ hàng không ?</DialogContent>
        <DialogActions>
          <Button color={'primary'} variant={'outlined'} onClick={handleCloseCart}>
            Không
          </Button>
          <Button
            color={'error'}
            variant={'contained'}
            onClick={() => {
              setOpenCart(false);
              removeItem(selected);
            }}
          >
            Có
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={openShare}
        onClose={() => setOpenShare(false)}
        aria-labelledby="alert-dialog-share-title"
        aria-describedby="alert-dialog-share-description"
      >
        <DialogTitle>Chia sẻ khóa học</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column' }}>
          <TextField variant="filled" value={window.location.href}></TextField>
          <Divider />
          <Button
            variant={'outlined'}
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
            }}
            sx={{ mt: 1 }}
          >
            Copy link
          </Button>
        </DialogContent>
        <DialogActions>
          <Button
            color={'primary'}
            variant={'outlined'}
            onClick={() => setOpenShare(false)}
          >
            Đóng
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default PurchaseCard;
