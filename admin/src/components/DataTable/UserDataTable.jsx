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
} from '@mui/material';

export const UserDataTable = () => {
  const [data, setData] = useState([]); // State to hold user data
  const [open, setOpen] = useState(false); // State for modal visibility
  const [selectedUser, setSelectedUser] = useState(null); // State for selected user

  // Function to format date as 'MM/DD/YYYY'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { timeZone: 'Asia/Colombo' });
  };

  // Function to format time as 'hh:mm AM/PM'
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      timeZone: 'Asia/Colombo',
      hour12: true,
    });
  };

  // Fetch user data and incidents from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch users
        const userResponse = await axios.get('http://localhost:8800/api/users');
        const users = userResponse.data;

        // Fetch incidents
        const incidentResponse = await axios.get(
          'http://localhost:8800/api/incidents'
        );
        const allIncidents = incidentResponse.data;

        // Map users to include their incident counts
        const usersWithIncidentCounts = users.map((user) => {
          // Filter incidents by userId
          const userIncidents = allIncidents.filter(
            (incident) => incident.userId === user.id
          );
          return { ...user, incidentCount: userIncidents.length }; // Add incident count to user
        });

        setData(usersWithIncidentCounts);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Log fetched data for debugging
  console.log(data);

  // Column definitions for DataGrid
  const columns = [
    { field: 'id', headerName: 'ID', flex: 1, minWidth: 100 },
    {
      field: 'fullName',
      headerName: 'Full Name',
      flex: 2,
      minWidth: 160,
      valueGetter: (value, row) => `${row.fname || ''} ${row.lname || ''}`,
      renderCell: (params) => (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={params.row.avatar || '/no-avatar.png'} // Fallback for avatar
            alt="thumbnail"
            className="cellImage"
          />
          <span>{`${params.row.fname} ${params.row.lname}`}</span>
        </div>
      ),
    },
    { field: 'email', headerName: 'Email', flex: 2, minWidth: 200 },
    { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 120 },
    { field: 'nic', headerName: 'NIC', flex: 1, minWidth: 120 },
    { field: 'address', headerName: 'Address', flex: 2, minWidth: 250 },
    { field: 'city', headerName: 'City', flex: 1, minWidth: 100 },
    { field: 'province', headerName: 'Province', flex: 1, minWidth: 100 },
    {
      field: 'incidentCount',
      headerName: 'Incidents Reported',
      flex: 1/2,
      minWidth: 80,
    }, // New column for incident count
  ];

  // Action column for viewing and deleting users
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
            onClick={(event) => {
              event.stopPropagation(); // Prevent event from bubbling up
              setSelectedUser(params.row); // Set the selected user
              setOpen(true); // Open the modal
            }}
          >
            View
          </span>
          <span
            className="delete-btn"
            onClick={(event) => {
              event.stopPropagation();
              // Logic for deletion can be implemented here
            }}
          >
            Delete
          </span>
        </div>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 12 }; // Pagination settings

  // Map the fetched data to the format expected by the DataGrid
  const rows = data.map((item) => ({
    id: item.id,
    avatar: item.avatar || null, // Use avatar or fallback to null
    fname: item.fname, // Access fname directly
    lname: item.lname, // Access lname directly
    email: item.email,
    mobile: item.mobile,
    nic: item.nic,
    district: item.district,
    address: item.address,
    city: item.city,
    province: item.province,
    date: formatDate(item.createdAt), // Format date
    time: formatTime(item.createdAt), // Format time
    incidentCount: item.incidentCount || 0, // Include incident count (default to 0 if not available)
  }));

  // Close modal and clear selected user
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
          columns={columns.concat(actionColumn)} // Combine columns with action column
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 12]}
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
              <div className="profile-image">
                <img
                  src={selectedUser.avatar}
                  alt={`${selectedUser.fname} profile`}
                  style={{ height: '100%', width: '100%' }}
                />
              </div>
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
    </div>
  );
};
