import { useState, useEffect } from 'react';

// material ui
import { MenuItem, FormControl, Select, Box, InputLabel } from '@mui/material';

// axios
import axios from 'axios';

export default function SelectInstructor(props) {
  const [instructorValue, setinstructorValue] = useState('');
  const [instructorname, setinstructorname] = useState('');
  const [instructorid, setinstructorid] = useState('');
  const [instructorList, setInstructorList] = useState([]);

  const handleChange = (event) => {
    setinstructorValue(event.target.value);
    props.handlechangeinstructor(event.target.value.split('/')[0], event.target.value.split('/')[1]);
  };

  // get instructors list
  useEffect(() => {
    axios.get(`http://localhost:5000/csfinstructors`).then((result) => setInstructorList(result.data));
  }, []);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">instructor name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={instructorValue}
          label="instructor"
          onChange={handleChange}
        >
          {instructorList.map((instructor) => (
            <MenuItem key={instructor._id} value={`${instructor.firstname} ${instructor.secondname}/${instructor._id}`}>
              {`${instructor.firstname} ${instructor.secondname}`}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
