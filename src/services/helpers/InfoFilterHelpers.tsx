import { Chip } from "@mui/material";

export const processStatus = (status: any) => {
    if (String(status) === 'active') {
        return <Chip color="success" size={'small'} label={'Hoạt động'} />;
      } else if (String(status) === 'inactive') {
        return <Chip color="warning" size={'small'} label={'Tạm ngừng'} />;
      } else if (String(status) === 'deleted') {
        return <Chip color="error" size={'small'} label={'Đã xóa'} />;
      } else return;
}