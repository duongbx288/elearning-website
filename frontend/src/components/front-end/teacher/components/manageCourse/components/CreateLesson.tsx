import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { Lesson, LessonRequest } from '../../../../../../services/LessonService';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReactQuill from 'react-quill';

const LessonInfo = ({ setCLesson, lesson }) => {
  const temp = {} as LessonRequest;
  const [newLesson, setNewLesson] = useState<LessonRequest[]>(lesson ? lesson : []);

  const [open, setOpen] = useState<boolean>(false);

  const [selected, setSelected] = useState<LessonRequest>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = () => {
    setCLesson(newLesson);
  };


  const handleAddLesson = () => {
    const newOne = {
      name: '',
      videoLink: '',
      content: '',
      introduction: '',
      locked: '1',
      lessonNumber: String(newLesson.length + 1),
    } as LessonRequest;
    setNewLesson((prev) => [...prev, newOne]);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => ({
      ...prev,
      name: event.target.value,
    }));
  };

  const handleChangeVideoLink = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => ({
      ...prev,
      videoLink: event.target.value,
    }));
  };

  const handleChangeIntroduction = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected((prev) => ({
      ...prev,
      introduction: event.target.value,
    }));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, false] }],
      [{ font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
  ];



  const handleChangeLocked = (event: SelectChangeEvent) => {
    setSelected((prev) => ({
      ...prev,
      locked: event.target.value,
    }));
  };

  const handleChangeContent = (value) => {
    setSelected((prev) => ({
      ...prev,
      content: value 
    }))
  }

  const handleRemoveLesson = (lessonNum) => {
    const tempLessons = newLesson.filter((item) => item.lessonNumber !== lessonNum);
    const newTemp = tempLessons.map((item, index) => {
      return {
        ...item,
        lessonNumber: String(index + 1),
      } as LessonRequest;
    });
    setNewLesson(newTemp);
  };

  const handleOpenDialog = (lessonNum) => {
    const tempLesson = newLesson.find((item) => item.lessonNumber === lessonNum);
    if (tempLesson) {
      setSelected(tempLesson);
      setOpen(true);
    }
  };

  const handleSaveLessonInfo = () => {
    const updatedList = newLesson.map((item) => {
      if (item.lessonNumber === selected.lessonNumber) {
        return selected;
      }
      return item;
    });
    setNewLesson(updatedList);
    handleClose();
  };


  return (
    <Box>
      <Box display={'flex'} justifyContent={'space-between'}>
        <Typography>Danh sách bài học</Typography>
        <Box>
          <Button variant={'contained'} sx={{ marginRight: 2 }} onClick={handleAddLesson}>
            Thêm bài học
          </Button>
          <Button variant={'outlined'} onClick={handleSave}>
            Lưu thông tin
          </Button>
        </Box>
      </Box>
      <Box display={'flex'} flexDirection={'column'}>
        {newLesson.map((item) => {
          return (
            <Box
              padding={1}
              margin={1}
              display={'flex'}
              justifyContent={'space-between'}
              sx={{ border: '1px solid black' }}
            >
              <Box>
                <Typography noWrap>{`Bài ${item.lessonNumber}`}: {item.name}</Typography>
                <Typography noWrap>Link video dạy: {item.videoLink}</Typography>
                {/* <Typography>Nội dung bài học: {item.content}</Typography> */}
                <Typography noWrap>Giới thiệu bài học: {item.introduction}</Typography>
                <Typography>
                  Cho phép học thử: {item.locked === '0' ? 'Có' : 'Không'}
                </Typography>
              </Box>
              <Box>
                <IconButton onClick={() => handleOpenDialog(item.lessonNumber)}>
                  <CreateOutlinedIcon />
                </IconButton>
                <IconButton onClick={() => handleRemoveLesson(item.lessonNumber)}>
                  <DeleteOutlineOutlinedIcon />
                </IconButton>
              </Box>
            </Box>
          );
        })}
      </Box>
      <Dialog open={open} onClose={handleClose} maxWidth={false}>
        <DialogTitle sx={{ width: '1000px'}}>Thông tin bài học</DialogTitle>
        <DialogContentText marginLeft={1} paddingLeft={2}>
          <Typography sx={{ color: '#000000', fontSize: '20px' }}></Typography>
        </DialogContentText>
        <DialogContent>
          <Box display={'flex'} >
            <TextField
              value={selected.name}
              label="Tên bài học"
              variant="standard"
              onChange={handleChangeName}
              sx={{ marginBottom: 2, marginRight: 3}}
            ></TextField>
            <TextField
              value={selected.videoLink}
              label="Link video"
              variant="standard"
              onChange={handleChangeVideoLink}
              sx={{ marginBottom: 2, marginRight: 3 }}
            ></TextField>
            <TextField
              value={selected.introduction}
              label="Giới thiệu"
              variant="standard"
              onChange={handleChangeIntroduction}
              sx={{ marginBottom: 2 }}
            ></TextField>
          </Box>
          <Box display={'flex'} justifyContent={'space-between'}>
          <FormControl sx={{ width: '200px' }}>
              <InputLabel id="demo-simple-select-label">Cho phép học thử</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selected.locked ? selected.locked : '0'}
                label="Cho phép học thử"
                onChange={handleChangeLocked}
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
                <MenuItem value={'0'} key={'0'}>
                  {'Có'}
                </MenuItem>
                <MenuItem value={'1'} key={'1'}>
                  {'Không'}
                </MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Divider sx={{ margin: 1}}/>
          <Grid container maxWidth={'1000px'}>
          <Grid item xs={6} padding={1}>
              <Typography>Mô tả bài học</Typography>
              <ReactQuill
                theme="snow"
                modules={modules}
                formats={formats}
                value={selected.content}
                onChange={(e) => setSelected((prev) => ({
                  ...prev,
                  content: e 
                })) }
                key={'baihoc'}
                placeholder={'Mô tả bài học'}
              />
            </Grid>
            <Grid item xs={6} padding={1}>
              <Typography>Preview:</Typography>
              <Box border={'1px solid gray'} padding={1}>
                <div dangerouslySetInnerHTML={{ __html: selected.content ? selected.content : '' }}></div>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveLessonInfo}>Lưu thông tin</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default LessonInfo;

  // Text Editor

