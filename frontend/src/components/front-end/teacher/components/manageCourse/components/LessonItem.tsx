import { Box, Typography, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useState } from "react"
import { LessonRequest } from "../../../../../../services/LessonService"
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const LessonItem = ({ lesson }) => {

    const [info, setInfo] = useState<LessonRequest>(lesson);

    const [open, setOpen] = useState<boolean>(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const handleRemoveLesson = () => {};

    const handleOpenDialog = () => {};

    return (
        <Box
        padding={1}
        margin={1}
        display={'flex'}
        justifyContent={'space-between'}
        sx={{ border: '1px solid black' }}
      >
        <Box>
          <Typography noWrap>Tên bài học: {info.name}</Typography>
          <Typography noWrap>Link video dạy: {info.videoLink}</Typography>
          {/* <Typography>Nội dung bài học: {item.content}</Typography> */}
          <Typography noWrap>Giới thiệu bài học: {info.introduction}</Typography>
          <Typography>
            Cho phép học thử: {info.locked === '0' ? 'Có' : 'Không'}
          </Typography>
        </Box>
        <Box>
          <IconButton onClick={handleOpenDialog}>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton onClick={handleRemoveLesson}>
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </Box>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle></DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions></DialogActions>
          </Dialog>;
      </Box>
    )

}