import sumBy from 'lodash/sumBy';
import { useState, useEffect } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Tab,
  Tabs,
  Card,
  Table,
  Stack,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
  TablePagination,
  FormControlLabel,
  TextField,
  InputAdornment,
  TableCell,
  TableRow,
} from '@mui/material';

// axios
import axios from 'axios';

// hooks
import useTabs from '../../../../hooks/useTabs';
import useSettings from '../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../hooks/useTable';

// _mock_
import { _invoices } from '../../../../_mock';

// components
import Page from '../../../../components/Page';
import Iconify from '../../../../components/Iconify';
import Scrollbar from '../../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../components/table';

// Add cousre Modal
import Modal from './Modal';

// edit Modal
import EditModal from './EditModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'Field', label: 'Field', align: 'left' },
  { id: 'Sub-Field', label: 'Sub-Field', align: 'left' },
  { id: 'Action', label: 'Action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function Courses() {
  const [coursesList, setCoursesList] = useState([]);

  const [open, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  // get all courses list
  const getAllCourses = () => {
    axios.get('http://localhost:5000/csfcourses').then((res) => setCoursesList(res.data));
  };

  useEffect(() => {
    getAllCourses();
  }, []);

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,

    //
    selected,
    setSelected,

    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [editedId, setEditedId] = useState();

  const [filterName, setFilterName] = useState('');

  const denseHeight = dense ? 56 : 76;

  const isNotFound = !coursesList?.length;

  // get all matches
  const getAllMatches = (value) => {
    setFilterName(value);
    if (value.trim().length === 0) {
      getAllCourses();
    } else {
      axios.get(`http://localhost:5000/csfcourses/findAllMatchs/${value}`).then((res) => {
        setCoursesList(res.data);
      });
    }
  };

  // add Course
  const AddCourse = (field, subField) => {
    axios
      .post('http://localhost:5000/csfcourses/add', {
        name: field,
        field: subField,
      })
      .then((res) => {
        getAllCourses();
      });
  };

  // delete Course
  const deleteCourse = (id) => {
    axios.delete(`http://localhost:5000/csfcourses/${id}`).then((res) => {
      getAllCourses();
    });
  };

  // edit course
  const updateCourse = (id, editedName, editedField) => {
    axios
      .post(`http://localhost:5000/csfcourses/UpdateCourse/${id}`, {
        name: editedName,
        field: editedField,
      })
      .then((res) => {
        getAllCourses();
      });
  };

  const OpenModal = () => {
    setOpenModal(true);
  };

  const CloseModal = () => {
    setOpenModal(false);
  };

  const OpenEditModal = (id) => {
    setEditedId(id);
    setOpenEdit(true);
  };
  const CloseEditModal = () => setOpenEdit(false);

  return (
    <Page>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Button
          onClick={OpenModal}
          variant="contained"
          startIcon={<Iconify icon={'eva:plus-fill'} />}
          sx={{ marginBottom: '30px' }}
        >
          New Course
        </Button>
        <Modal open={open} handleClose={CloseModal} onAddCourse={AddCourse} />

        <EditModal open={openEdit} handleClose={CloseEditModal} onAddCourse={updateCourse} id={editedId} />

        <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <Divider />
          <TextField
            fullWidth
            value={filterName}
            onChange={(event) => getAllMatches(event.target.value)}
            placeholder="Search client or invoice number..."
            sx={{ width: '80%', marginLeft: '10px' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              ),
            }}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={coursesList?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      coursesList.map((row) => row.id)
                    )
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={coursesList?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      coursesList.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {coursesList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.field}</TableCell>
                        <TableCell>
                          <Iconify
                            icon={'ep:delete'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'error.dark' }}
                            onClick={() => deleteCourse(row._id)}
                          />
                          <Iconify
                            icon={'clarity:edit-solid'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'primary.dark' }}
                            onClick={() => OpenEditModal(row._id)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, coursesList?.length)} />
                 
                  <TableNoData id="check" isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={coursesList === undefined ? 0 : coursesList.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
        </Card>
      </Container>
    </Page>
  );
}

// ----------------------------------------------------------------------
