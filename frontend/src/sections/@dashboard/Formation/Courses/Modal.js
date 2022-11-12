import React, { useState } from 'react';

// mui
import { TextField, Box, Button, Typography, Modal, Stack } from '@mui/material';

// function to check if string fields are empty,contains just spaces or not
import isStringFieldsEmpty from '../../../../utils/isStringFieldsEmpty';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};

export default function BasicModal(props) {
  const [Field, setField] = useState('');
  const [SubField, setSubField] = useState('');
  const [isEmptyRequiredField, setisEmptyRequiredField] = useState(false);

  const handleAddCourse = () => {
    setisEmptyRequiredField(false);
    if (isStringFieldsEmpty(Field, SubField)) {
      setisEmptyRequiredField(true);
    } else {
      props.onAddCourse(Field, SubField);
      props.handleClose();
    }
  };

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack gap={'20px'}>
          <TextField
            id="outlined-basic"
            label="Type Name"
            variant="outlined"
            value={Field}
            required
            onChange={(event) => setField(event.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Type Sub-Field"
            variant="outlined"
            value={SubField}
            required
            onChange={(event) => setSubField(event.target.value)}
          />
          <Button onClick={handleAddCourse}>Add Course</Button>
        </Stack>
        {isEmptyRequiredField && <Typography color="red">*Required Fields Are Empty</Typography>}
      </Box>
    </Modal>
  );
}
