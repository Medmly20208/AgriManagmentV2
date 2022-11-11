import React, { useState, useEffect } from 'react';

// mui
import {
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Box,
  Button,
  Typography,
  Modal,
  Stack,
  Select,
} from '@mui/material';

// axios
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [availabeCourses, setAvailableCourses] = useState([]);

  const [firstname, setfirstname] = useState('');
  const [secondname, setsecondname] = useState('');
  const [field, setfield] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [email, setemail] = useState('');
  const [adress, setadress] = useState('');
  const [city, setcity] = useState('');
  const [coursedocument, setcoursedocument] = useState('');
  const [cv, setcv] = useState('');

  const handleUpdateInstructor = () => {
    props.onEditInstructor(props.id, {
      firstname,
      secondname,
      field,
      phonenumber,
      email,
      adress,
      city,
      coursedocument,
      cv,
    });
    props.handleClose();
  };

  const getAllCourses = () => {
    axios.get('http://localhost:5000/csfcourses').then((res) => setAvailableCourses(res.data));
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack gap={'20px'} flexDirection="row">
          <Stack gap={'20px'}>
            <TextField
              id="outlined-basic"
              label="Type first name"
              variant="outlined"
              value={firstname}
              onChange={(event) => setfirstname(event.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Type second name"
              variant="outlined"
              value={secondname}
              onChange={(event) => setsecondname(event.target.value)}
            />

            <Box>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">field</InputLabel>

                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={field}
                  label="Age"
                  onChange={(event) => setfield(event.target.value)}
                >
                  {availabeCourses.map((element, index) => {
                    return (
                      <MenuItem key={index} value={element.field}>
                        {element.field}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <TextField
              id="outlined-basic"
              label="Type phonenumber"
              variant="outlined"
              value={phonenumber}
              onChange={(event) => setphonenumber(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Type email"
              variant="outlined"
              value={email}
              onChange={(event) => setemail(event.target.value)}
            />
          </Stack>
          <Stack gap={'20px'}>
            <TextField
              id="outlined-basic"
              label="Type adress"
              variant="outlined"
              value={adress}
              onChange={(event) => setadress(event.target.value)}
            />

            <TextField
              id="outlined-basic"
              label="Type city"
              variant="outlined"
              value={city}
              onChange={(event) => setcity(event.target.value)}
            />
            <input type="file" name="course document" onChange={(event) => setcoursedocument(event.target.files[0])} />
            <input type="file" name="CV" onChange={(event) => setcv(event.target.files[0])} />
            <Button onClick={handleUpdateInstructor}>Update Instructor</Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
}
