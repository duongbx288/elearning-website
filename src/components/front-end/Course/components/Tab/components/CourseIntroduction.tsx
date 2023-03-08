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
        <Grid item xs={12}>
          <Typography variant="body1">{introduction}</Typography>
        </Grid>
      </Grid>
      <Box>
        <div dangerouslySetInnerHTML={{ __html: description ? description : "" }}></div>
      </Box>
    </>
  );
};

export default CourseIntroduction;
