import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Typography,
} from '@mui/material';
import { list } from 'firebase/storage';
import { Fragment, useEffect, useState } from 'react';
import _ from 'lodash';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { Affiliate } from '../../components/backend/affiliates/type';
import AffiliateService from '../../services/AffiliateService';

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  listEntities: Affiliate[];
  status: string;
}

function getMessageError(e: any) {
  let message = `${`error:error.errorCommon`}`;
  try {
    if (typeof e === 'string') {
      message = e;
    } else if (e.request.status === 422) {
      // try {
      //   const fieldErrors = e.response.request.response.data_error.errors;
      //   message = Object.keys(fieldErrors)
      //     .map((key) => (isNil(key) || key.trim().length === 0 ? fieldErrors[key] : `${key} : ${fieldErrors[key]}`))
      //     .join(" , ");
      // } catch (e) {}
      message = 'error';
    } else if (e.response.status === 404) {
      // const fieldErrors = e.response.request.response.error;
      // message = Object.keys(fieldErrors)
      //   .map((key) => (isNil(key) || key.trim().length === 0 ? fieldErrors[key] : `${key} : ${fieldErrors[key]}`))
      //   .join(" , ");
      message = 'error';
    } else if (e.request.status === 403 || e.request.status === 401) {
      message = `${`error:error.notHaveAccess`}`;
    } else if (e.response.status === 500) {
      message = e.response.data.error.message;
    }
  } catch (e) {}
  return message;
}

const CustomDialog = (props: CustomDialogProps) => {
  const navigate = useNavigate();
  const { open, onClose, isLoading, setLoading, listEntities, status } = props;
  const [listSuccess, setListSuccess] = useState<Affiliate[]>([]);
  const [listFailed, setListFailed] = useState<{ affiliate: Affiliate; error: string }[]>(
    []
  );

  const [showDetailSuccess, setShowDetailSuccess] = useState<boolean>(false);
  const [showDetailFail, setShowDetailFail] = useState<boolean>(false);

  let success: Affiliate[];
  let failed: { affiliate: Affiliate; error: string }[] = [];

  useEffect(() => {
    if (open && isLoading) {
      setListSuccess([]);
      setListFailed([]);
      success = [];
      failed = [];
      if (listEntities && listEntities.length > 0) {
        updateEntities(0);
      } else {
        setLoading(false);
      }
    }
  }, [open, isLoading]);

  const updateEntities = async (index: number) => {
    if (listEntities && listEntities.length > 0 && index <= listEntities.length - 1) {
      let entity = listEntities[index];
      if (entity && entity.id) {
        let request = {
          id: entity.id,
          status: status,
        };
        try {
          await AffiliateService.updateAffiliateStatus(request);
          success.push(entity);
          console.log('okay?');
        } catch (error) {
          failed.push({ affiliate: entity, error: getMessageError(error) });
          setListFailed(failed);
        } finally {
          setTimeout(() => {
            updateEntities(index + 1);
          }, 200);
        }
      }
    } else {
      setLoading(false);
    }
  };

  const processStatusUpdate = (status: string) => {
    if (status === 'active') {
      return 'Kích hoạt tài khoản affiliate.';
    } else if (status === 'inactive') {
      return 'Tạm dừng tài khoản affiliate.';
    } else if (status === 'deleted') {
      return 'Hủy bỏ tài khoản affiliate.';
    }
  };

  return (
    <Dialog open={open} fullWidth={true} disableEscapeKeyDown={true}>
      <DialogContent>
        <Fragment>
          <Typography variant="h6">
            {isLoading ? 'Đang xử lí thông tin....' : 'Xử lí hoàn tất'}
          </Typography>
        </Fragment>
        <Box marginTop={'16px'}>
          <>
            <Typography>{processStatusUpdate(status)}</Typography>
          </>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()}>Ok</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
