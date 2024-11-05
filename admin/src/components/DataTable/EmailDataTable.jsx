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
import { Link } from 'react-router-dom';

export const EmailDataTable = () => {
  const [data, setData] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false); 
  const [selectedEmail, setSelectedEmail] = useState(null);

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

  const handleOpenViewDialog = (email) => {
    setSelectedEmail(email);
    setOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 3 / 2, minWidth: 100 },
    {
      field: 'title',
      headerName: 'Title',
      flex: 3,
      minWidth: 150,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span>{params.row.title}</span>
        </div>
      ),
    },
    {
      field: 'userCount',
      headerName: 'Sent Users',
      flex: 1/3,
      minWidth: 100,
    },
    { field: 'city', headerName: 'City', flex: 2/31, minWidth: 120 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 120 },
    { field: 'sentBy', headerName: 'Sent By', flex: 1/3, minWidth: 120 },
    {
      field: 'incidentId',
      headerName: 'Incident',
      flex: 3 / 2,
      minWidth: 160,
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
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 10 };

  const rows = data.map((item) => ({
    id: item.id,
    title: item.title,
    userCount: item.userCount,
    city: item.city,
    sentBy: item.sentBy.username,
    incidentId: item.incidentId,
    date: formatDate(item.createdAt),
    time: formatTime(item.createdAt),
    message: item.message
  }));

  const handleClose = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  return (
    <div className="datatable scrollbar">
      <span className="title">Emails</span>
      <Paper sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns.concat(actionColumn)}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 8]}
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Email Details</DialogTitle>
        <DialogContent>
          {selectedEmail && (
            <div className="viewBox">
              <p>
                <strong>Email ID:</strong> {selectedEmail.id}
              </p>
              <p>
                <strong>Title:</strong> {selectedEmail.title}
              </p>
              <p>
                <strong>City:</strong> {selectedEmail.city}
              </p>
              <p>
                <strong>Sent to:</strong> {selectedEmail.userCount}
              </p>
              <p>
                <strong>Sent by:</strong> {selectedEmail.sentBy}
              </p>
              <p>
                <strong>Sent Date:</strong> {selectedEmail.date}
              </p>
              <p>
                <strong>Sent Time:</strong> {selectedEmail.time}
              </p>
              <p>
                <strong>Message:</strong>
                <div>{selectedEmail.message}</div>
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
          <Button color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
