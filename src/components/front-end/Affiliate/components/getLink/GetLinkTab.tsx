import { Box, Button, Typography } from '@mui/material';
import AddLinkIcon from '@mui/icons-material/AddLink';
import { styled } from '@mui/material/styles';
import { ButtonProps } from '@mui/material/Button';
import { purple, blue } from '@mui/material/colors';
import { useState } from 'react';
import { AffiliateResponse } from '../../../../../services/AffiliateService';
import CreateCoupon from './CreateCoupon';

const GetLinkTab = ({ id, info }) => {
  const [affiliateId, setAffiliateId] = useState<number>(id);
  const [affInfo, setAffInfo] = useState<AffiliateResponse>(info);

  return (
    <Box padding={1} margin={1} border={1}>
      <Typography>
        <AddLinkIcon /> {`Lấy link affiliate: (Mã affiliate của bạn: ${id})`}
      </Typography>
      <Box>
        <Button sx={{ margin: 1 }} variant="contained" color="success">
          Bổ sung thông tin
        </Button>
        <ColorButton sx={{ margin: 1 }} variant="contained">
          Giới thiệu
        </ColorButton>
        <Button sx={{ margin: 1 }} variant="contained">
          Nhóm Facebook
        </Button>
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
      <CreateCoupon id={id}/>
    </Box>
  );
};

export default GetLinkTab;

const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
