import { useState, useEffect } from 'react';

// material ui
import { MenuItem, FormControl, Select, Box, InputLabel } from '@mui/material';

// axios
import axios from 'axios';

export default function SelectInstructor(props) {
  const [coursesList, setCoursesList] = useState([]);

  const handleChange = (event) => {
    props.handlecoursechange(event.target.value);
  };

  // get courses list
  useEffect(() => {
    axios.get(`http://localhost:5000/csfcourses`).then((result) => setCoursesList(result.data));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">course name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.course}
          label="instructor"
          onChange={handleChange}
        >
          {coursesList.map((course) => (
            <MenuItem key={course._id} value={course.field}>
              {course.field}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
