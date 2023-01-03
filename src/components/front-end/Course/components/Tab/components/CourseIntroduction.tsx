import { Typography } from '@mui/material';

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
      
      <Typography variant="body2">{introduction}</Typography>
      <Typography variant="body2">{description}</Typography>

    </>
  );
};

export default CourseIntroduction;
