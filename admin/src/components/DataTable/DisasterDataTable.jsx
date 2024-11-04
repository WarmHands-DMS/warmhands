import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {Link, useLocation} from "react-router-dom"
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';

// Define columns including custom rendering of the 'title' field with an image


export const DisasterDataTable = () => {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // Track row to delete
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const handleOpen = (id) => {
    setDeleteId(id);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const deleteIncident = async (id) => {
    try {
      await axios.delete(
        `http://localhost:8800/api/incidents/admin/${id}`
      );
      setData((prevData) => prevData.filter((item) => item.id !== id));
      toast.success("Incident Deleted Successfully.", {containerId: "disasterTable"})
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

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

  const handleDeleteConfirm = () => {
    if (deleteId !== null) {
      deleteIncident(deleteId);
      handleClose();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/api/incidents');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (location.state?.refresh) {
      fetchData();
    }

    fetchData();
  }, [location.state]);

  // Helper function to capitalize the first letter
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 2, minWidth: 100 },
    { field: 'type', headerName: 'Type', flex: 1 / 3, minWidth: 100 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.firstImage}
            alt="thumbnail"
            className="cellImage"
          />
          <span>{params.row.title}</span>
        </div>
      ),
    },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 120 },
    { field: 'reportedBy', headerName: 'Reported By', flex: 1, minWidth: 120 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 2 / 3,
      minWidth: 100,
      valueGetter: (value, row) => `${row.isApproved}`,
      renderCell: (params) => (
        <div>
          <span className={`status ${params.row.isApproved}`}>
            {capitalizeFirstLetter(params.row.isApproved)}
          </span>
        </div>
      ),
    },
    { field: 'sentEmail',type: "boolean", headerName: 'Email Sent', flex: 1/2, minWidth: 40 },
  ];

  const actionColumn = [
    {
      field: 'action',
      headerName: 'Action',
      flex: 3 / 2,
      minWidth: 150,
      renderCell: (params) => (
        <div className="disaster-buttons">
          <Link to={`/${params.row.id}`}>
            <span
              className="view-btn"
              onClick={(event) => event.stopPropagation()}
            >
              View
            </span>
          </Link>
          <span
            className="delete-btn"
            onClick={(event) => {
              event.stopPropagation();
              handleOpen(params.row.id); // Open dialog
            }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  // Map the fetched data to the format expected by the DataGrid
  const rows = data.map((item) => ({
    id: item.id,
    type: item.type, // Assuming `id` is provided by the API
    title: item.title,
    firstImage: item.images?.[0] || '', // Get the first image from the images array
    city: item.city,
    date: formatDate(item.createdAt),
    time: formatTime(item.createdAt),
    reportedBy: item.user?.fname || '-',
    isApproved: item.isApproved,
    sentEmail: item.sentEmail
  }));

  const paginationModel = { page: 0, pageSize: 10 };

  return (
    <div className="datatable scrollbar">
      <span className="title">Disasters</span>
      <Paper className="paper" sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Disaster Report?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className="dialog-box-first">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} className="dialog-box-second">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer containerId="disasterTable" />
    </div>
  );
};
