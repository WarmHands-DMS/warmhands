import './DataTable.scss';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { AdminAuthContext } from '../../context/AuthContext';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import AddBoxIcon from '@mui/icons-material/AddBox';

export const AdminDataTable = () => {
  const { currentAdmin } = useContext(AdminAuthContext);
  const [data, setData] = useState([]); // State to hold admin data
  const [open, setOpen] = useState(false); // State for view modal visibility
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); // State for delete dialog visibility
  const [selectedAdmin, setSelectedAdmin] = useState(null); // State for selected admin
  const [deleteId, setDeleteId] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
  };
console.log(currentAdmin.isMaster)

const deleteAdmin = async (id) => {
  try {
    const response = await axios.delete(
      `http://localhost:8800/api/admins/delete/${id}`,
      {
        withCredentials: true,
      }
    );

    toast.success(response.data.message || 'Admin removed successfully.', {
      containerId: 'adminTable',
    });

    setData((prevData) => prevData.filter((admin) => admin.id !== id));
  } catch (error) {
    
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message, {
        containerId: 'adminTable',
      });
    } else {
      toast.error('Error deleting admin: ' + error.message, {
        containerId: 'adminTable',
      });
    }
    console.error('Error deleting admin:', error);
  }
};


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/admins');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOpenViewDialog = (admin) => {
    setSelectedAdmin(admin);
    setOpen(true);
  };

  const handleOpenDeleteDialog = (id) => {
    setDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      deleteAdmin(deleteId);
      setDeleteDialogOpen(false);
    }
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 2,
      minWidth: 160,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.avatar || '/no-avatar.png'}
            alt="thumbnail"
            className="cellImage"
          />
          <span>{params.row.fullName}</span>
        </div>
      ),
    },
    { field: 'username', headerName: 'username', flex: 1, minWidth: 120 },
    { field: 'email', headerName: 'Email', flex: 1, minWidth: 180 },
    { field: 'nic', headerName: 'NIC', flex: 1, minWidth: 120 },
    { field: 'department', headerName: 'Department', flex: 1, minWidth: 120 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Register Date', flex: 1, minWidth: 100 },
    {
      field: 'fullControl',
      type: 'boolean',
      headerName: 'Full Control',
      flex: 1 / 2,
      minWidth: 40,
    },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      flex: 1.5,
      minWidth: 150,
      renderCell: (params) => (
        <div className="disaster-buttons">
          <span
            className="view-btn"
            onClick={() => handleOpenViewDialog(params.row)}
          >
            View
          </span>
          <span
            className="delete-btn"
            onClick={() => handleOpenDeleteDialog(params.row.id)}
          >
            Remove
          </span>
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const rows = data.map((item) => ({
    id: item.id,
    avatar: item.avatar || null,
    fullName: item.fullName,
    username: item.username,
    email: item.email,
    mobile: item.mobile,
    nic: item.nic,
    department: item.department,
    date: formatDate(item.createdAt),
    fullControl: item.isMaster
  }));

  const handleClose = () => {
    setOpen(false);
    setSelectedAdmin(null);
  };

  return (
    <div className="datatable scrollbar">
      <div className="header">
        <span className="title">Admins</span>
        {currentAdmin.isMaster && (
          <Link to="/register">
            <span className="add-btn">
              New Admin <AddBoxIcon className="icon" />
            </span>
          </Link>
        )}
      </div>
      <Paper sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 8]}
          checkboxSelection
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Admin Details</DialogTitle>
        <DialogContent>
          {selectedAdmin && (
            <div>
              <img
                src={selectedAdmin.avatar}
                alt={`${selectedAdmin.username} profile`}
                style={{ height: '100%', width: '100%' }}
              />
              <p>
                <strong>Admin ID:</strong> {selectedAdmin.id}
              </p>
              <p>
                <strong>Full Control:</strong>{' '}
                {!selectedAdmin.isMaster ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>Full Name:</strong> {selectedAdmin.fullName}
              </p>
              <p>
                <strong>Email:</strong> {selectedAdmin.email}
              </p>
              <p>
                <strong>Department:</strong> {selectedAdmin.department}
              </p>
              <p>
                <strong>City:</strong> {selectedAdmin.city}
              </p>
              <p>
                <strong>NIC:</strong> {selectedAdmin.nic}
              </p>
              <p>
                <strong>Mobile:</strong> {selectedAdmin.mobile}
              </p>
              <p>
                <strong>Date Registered:</strong> {selectedAdmin.date}
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
            Are you sure you want to delete this admin?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer containerId="adminTable" />
    </div>
  );
};
