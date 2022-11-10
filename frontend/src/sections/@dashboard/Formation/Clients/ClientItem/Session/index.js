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
import useTabs from '../../../../../../hooks/useTabs';
import useSettings from '../../../../../../hooks/useSettings';
import useTable, { getComparator, emptyRows } from '../../../../../../hooks/useTable';
// _mock_
import { _invoices } from '../../../../../../_mock';
// components
import Page from '../../../../../../components/Page';
import Iconify from '../../../../../../components/Iconify';
import Scrollbar from '../../../../../../components/Scrollbar';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../../../../components/table';

// Add session Modal
import Modal from './Modal';

// edit Modal
import EditModal from './EditModal';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'course', label: 'course', align: 'left' },
  { id: 'instructorname', label: 'instructorname', align: 'left' },
  { id: 'place', label: 'place', align: 'left' },
  { id: 'time', label: 'time', align: 'left' },
  { id: 'images', label: 'images', align: 'left' },
  { id: 'action', label: 'action', align: 'left' },
];

// ----------------------------------------------------------------------

export default function Sessions(props) {
  const [sessionsList, setSessionsList] = useState([]);

  const [open, setOpenModal] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);

  const API_END_POINT = 'http://localhost:5000';

  // get all sessions list by client id
  const getAllSessions = () => {
    axios.get(`${API_END_POINT}/sessions/${props.clientId}`).then((res) => setSessionsList(res.data));
  };

  useEffect(() => {
    getAllSessions();
  }, []);

  const theme = useTheme();

  const { themeStretch } = useSettings();

  const navigate = useNavigate();

  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

  const [editedId, setEditedId] = useState();

  const [tableData, setTableData] = useState(_invoices);

  const [filterName, setFilterName] = useState('');

  const [filterService, setFilterService] = useState('all');

  const [filterStartDate, setFilterStartDate] = useState(null);

  const [filterEndDate, setFilterEndDate] = useState(null);

  const { currentTab: filterStatus, onChangeTab: onFilterStatus } = useTabs('all');

  const handleDeleteRows = (selected) => {
    const deleteRows = sessionsList.filter((row) => !selected.includes(row.id));
    setSelected([]);
    setTableData(deleteRows);
  };

  const denseHeight = dense ? 56 : 76;

  const isNotFound =
    (!sessionsList?.length && !!filterName) ||
    (!sessionsList?.length && !!filterStatus) ||
    (!sessionsList?.length && !!filterService) ||
    (!sessionsList?.length && !!filterEndDate) ||
    (!sessionsList?.length && !!filterStartDate);

  // add Session
  const AddSession = (instructorid, course, clientid, instructorname, place, time, images) => {
    axios
      .post(`${API_END_POINT}/sessions/add`, {
        instructorid,
        course,
        clientid,
        instructorname,
        place,
        time,
        images,
      })
      .then((res) => {
        getAllSessions();
      });
  };
  // delete Session
  const deleteSession = (id) => {
    axios.delete(`${API_END_POINT}/sessions/${id}`).then((res) => {
      getAllSessions();
    });
  };
  // edit Employee
  const updateSession = (instructorid, course, clientid, instructorname, place, time, images, id) => {
    axios
      .post(`${API_END_POINT}/sessions/updatesessions/${editedId}`, {
        instructorid,
        course,
        clientid,
        instructorname,
        place,
        time,
        images,
      })
      .then((res) => {
        getAllSessions();
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
          New Session
        </Button>

        <Modal open={open} handleClose={CloseModal} onAddSession={AddSession} />

        <EditModal open={openEdit} handleClose={CloseEditModal} onUpdateSession={updateSession} id={editedId} />

        <Card sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', gap: '10px' }}>
          <Divider />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={sessionsList?.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      sessionsList.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={sessionsList?.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      sessionsList.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {sessionsList?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                    return (
                      <TableRow key={row._id}>
                        <TableCell />
                        <TableCell>{row.course}</TableCell>
                        <TableCell>{row.instructorname}</TableCell>
                        <TableCell>{row.place}</TableCell>
                        <TableCell>{row.time.slice(0, 10)}</TableCell>
                        <TableCell>{row.images}</TableCell>
                        <TableCell>
                          <Iconify
                            icon={'ep:delete'}
                            sx={{ marginRight: '10px', cursor: 'pointer', fontSize: '20px', color: 'error.dark' }}
                            onClick={() => deleteSession(row._id)}
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

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, sessionsList?.length)} />

                  <TableNoData id="check" isNotFound={isNotFound} />
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={sessionsList === undefined ? 0 : sessionsList.length}
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
