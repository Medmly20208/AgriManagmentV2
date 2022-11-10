import React, { useState } from 'react';

// material ui
import { TextField, Box, Button, Modal, Stack } from '@mui/material';

// REACT ROUTER
import { useParams } from 'react-router';

// select instructor
import SelectInstructor from './SelectInstructor';

// select course

import SelectCourse from './SelectCourse';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [instructorid, setInstructorId] = useState('');
  const [instructorname, setinstructorname] = useState('');
  const [course, setcourse] = useState('');
  const [place, setPlace] = useState('');
  const [images, setImages] = useState('');
  const [time, setTime] = useState('');

  const params = useParams();

  const handleAddSession = () => {
    props.onAddSession(instructorid, course, params.id, instructorname, place, time, images);
    props.handleClose();
  };

  const handlechangeinstructor = (instructorname, instructorid) => {
    setinstructorname(instructorname);
    setInstructorId(instructorid);
  };

  const handlecoursechange = (coursename) => {
    setcourse(coursename);
  };
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack flexDirection={'row'} gap={'10px'}>
          <Stack gap={'20px'}>
            <SelectInstructor
              instructorname={instructorname}
              instructorid={instructorid}
              handlechangeinstructor={handlechangeinstructor}
            />

            <SelectCourse handlecoursechange={handlecoursechange} coursename={course} />
          </Stack>
          <Stack gap={'20px'}>
            <TextField
              id="outlined-basic"
              label="Type time"
              variant="outlined"
              value={time}
              onChange={(event) => setTime(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Type images"
              variant="outlined"
              value={images}
              onChange={(event) => setImages(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Type place"
              variant="outlined"
              value={place}
              onChange={(event) => setPlace(event.target.value)}
            />
          </Stack>
        </Stack>
        <Button onClick={handleAddSession}>Add Session</Button>
      </Box>
    </Modal>
  );
}
