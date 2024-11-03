import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
// import { toast, ToastContainer } from 'react-toastify';
import { Link } from 'react-router-dom';

export const EmailDataTable = () => {
  const [data, setData] = useState([]); 
  const [open, setOpen] = useState(false); // State for view modal visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog visibility
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user
  // const [deleteId, setDeleteId] = useState(null); // Track user to delete

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Colombo',
      hour12: true,
    });
  };

  // const deleteUser = async (id) => {
  //   try {
  //     await axios.delete(`http://localhost:8800/api/users/admin/${id}`);
  //     setData((prevData) => prevData.filter((user) => user.id !== id));
  //     toast.success('User removed successfully.', {
  //       containerId: 'userTable',
  //     });
  //   } catch (error) {
  //     console.error('Error deleting user:', error);
  //   }
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const emails = await axios.get(
          'http://localhost:8800/api/emails'
        );
        const allEmails = emails.data;
        setData(allEmails);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // const handleOpenViewDialog = (user) => {
  //   setSelectedUser(user);
  //   setOpen(true);
  // };

  // const handleOpenDeleteDialog = (id) => {
  //   setDeleteId(id);
  //   setDeleteDialogOpen(true);
  // };

  // const handleDeleteConfirm = () => {
  //   if (deleteId !== null) {
  //     deleteUser(deleteId);
  //     setDeleteDialogOpen(false);
  //   }
  // };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 3 / 2, minWidth: 100 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 3,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          {/* <img
            src={params.row.firstImage || '/no-avatar.png'}
            alt="thumbnail"
            className="cellImage"
          /> */}
          <span>{params.row.title}</span>
        </div>
      ),
    },
    {
      field: 'userCount',
      headerName: 'Received User Count',
      flex: 1,
      minWidth: 100,
    },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 120 },
    { field: 'sentById', headerName: 'Sent By', flex: 3 / 2, minWidth: 120 },
    {
      field: 'incidentId',
      headerName: 'Incident',
      flex: 3 / 2,
      minWidth: 120,
      renderCell: (params) => (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
        >
          <span>
            <Link to={`/${params.row.incidentId}`}>
              {params.row.incidentId}
            </Link>
          </span>
        </div>
      ),
    },
  ];

  // const actionColumn = [
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     flex: 1.5,
  //     minWidth: 150,
  //     renderCell: (params) => (
  //       <div className="disaster-buttons">
  //         <span
  //           className="view-btn"
  //           onClick={() => handleOpenViewDialog(params.row)}
  //         >
  //           View
  //         </span>
  //         <span
  //           className="delete-btn"
  //           onClick={() => handleOpenDeleteDialog(params.row.id)}
  //         >
  //           Remove
  //         </span>
  //       </div>
  //     ),
  //   },
  // ];

  const paginationModel = { page: 0, pageSize: 8 };

  const rows = data.map((item) => ({
    id: item.id,
    title: item.title,
    userCount: item.userCount,
    city: item.city,
    sentById: item.sentById,
    incidentId: item.incidentId,
    date: formatDate(item.createdAt),
    time: formatTime(item.createdAt),
  }));

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="datatable">
      <span className="title">Users</span>
      <Paper sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          // columns={columns.concat(actionColumn)}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 8]}
          checkboxSelection
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>User Details</DialogTitle>
        <DialogContent>
          {selectedUser && (
            <div>
              <img
                src={selectedUser.avatar}
                alt={`${selectedUser.fname} profile`}
                style={{ height: '100%', width: '100%' }}
              />
              <p>
                <strong>User ID:</strong> {selectedUser.id}
              </p>
              <p>
                <strong>First Name:</strong> {selectedUser.fname}
              </p>
              <p>
                <strong>Last Name:</strong> {selectedUser.lname}
              </p>
              <p>
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedUser.mobile}
              </p>
              <p>
                <strong>NIC:</strong> {selectedUser.nic}
              </p>
              <p>
                <strong>Address:</strong> {selectedUser.address}
              </p>
              <p>
                <strong>City:</strong> {selectedUser.city}
              </p>
              <p>
                <strong>District:</strong> {selectedUser.district}
              </p>
              <p>
                <strong>Province:</strong> {selectedUser.province}
              </p>
              <p>
                <strong>Date Created:</strong> {selectedUser.date}
              </p>
              <p>
                <strong>Time Created:</strong> {selectedUser.time}
              </p>
              <p>
                <strong>Incidents Reported:</strong>{' '}
                {selectedUser.incidentCount || 0}
              </p>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button  color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* <ToastContainer containerId="userTable" /> */}
    </div>
  );
};
