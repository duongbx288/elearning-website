import { Box, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CourseRequest } from "../../../../../services/CourseService";


const FindCourses = () => {

    const [limit, setLimit] = useState<number>(5);
    const [page, setPage] = useState<number>(0);
    const [typeId, setTypeId] = useState<number[]| null>();
    const [name, setName] = useState<string | null>();

    const [courses, setCourses] = useState<CourseRequest[]>([]);

    useEffect(() => {

    }, [])

    const handleNameInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    }

    return (
        <Box>
            <Box>
                <TextField value={name} ></TextField>
            </Box>
        </Box>
    )
}

export default FindCourses;