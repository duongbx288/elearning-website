import { Box, Grid, Typography } from '@mui/material';

export type Info = {
  info?: string;
};

interface CourseInfo {
  courseId: number;
  description: string | null | undefined;
  introduction: string | null | undefined;
}

const CourseIntroduction: React.FC<CourseInfo> = ({
  courseId,
  description,
  introduction,
}: CourseInfo) => {

  return (
    <>
      <Grid container>
        <Grid item xs={12} sx={{ marginBottom: 3}}>
          <Typography variant="body1">{introduction && introduction != null ? introduction : "Khóa học không có giới thiệu"}</Typography>
        </Grid>
      </Grid>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: description && description !== null ? description : "Không có mô tả về khóa học" }}></div>
      </Box>
    </>
  );
};

export default CourseIntroduction;
