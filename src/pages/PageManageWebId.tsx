import { Button, Typography, Box, Toolbar } from '@mui/material';
import { useHistory } from 'react-router-dom';
import PageListByWebId from '../components/old/pages/PageWebsite';
import { ToolbarStyle } from '../styles/style';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const PageManageWebId: React.FC = () => {
  const history = useHistory();
  return (
    <div>
      <Toolbar variant="dense" style={ToolbarStyle}>
        <Button
          onClick={() => history.goBack()}
          variant="text"
          sx={{
            color: '#637381',
            fontSize: '14px',
            textTransform: 'none',
          }}
        >
          <ArrowBackIosNewIcon sx={{ fontSize: '14px', mr: '5px' }} />
          Quay lại
        </Button>
      </Toolbar>
      <Box sx={{ m: 5 }}>
        <Typography variant="h5" color="blue">
          {' '}
          Thông tin website{' '}
        </Typography>
        <PageListByWebId />
      </Box>
    </div>
  );
};

export default PageManageWebId;
