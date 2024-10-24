import './DataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Define columns including custom rendering of the 'title' field with an image


export const DataTable = () => {
  const [data, setData] = useState([]);

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
        const response = await axios.get('http://localhost:8800/api/incidents');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { field: 'id', headerName: 'ID', flex: 2, minWidth: 100 },
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
    { field: 'district', headerName: 'District', flex: 1, minWidth: 100 },
    { field: 'province', headerName: 'Province', flex: 1, minWidth: 100 },
    { field: 'date', headerName: 'Date', flex: 1, minWidth: 120 },
    { field: 'time', headerName: 'Time', flex: 1, minWidth: 120 },
    {
      field: 'status',
      headerName: 'Status',
      flex: 1,
      minWidth: 150,
      valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
      renderCell: (params) => (
        <span
          className={`status ${params.row.isApproved}`}
        >
          {params.row.isApproved ? 'Approved' : 'Pending'}
        </span>
      ),
    },
  ];

  const paginationModel = { page: 0, pageSize: 9 };

  // Map the fetched data to the format expected by the DataGrid
  const rows = data.map((item) => ({
    id: item.id, // Assuming `id` is provided by the API
    title: item.title,
    firstImage: item.images?.[0] || '', // Get the first image from the images array
    city: item.city,
    district: item.district,
    province: item.province,
    date: formatDate(item.createdAt),
    time: formatTime(item.createdAt),
    isApproved: item.isApproved,
  }));

  return (
    <div className="datatable">
      <span className="title">Disasters</span>
      <Paper sx={{ height: '100%', width: '100%', marginTop: '10px' }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{ pagination: { paginationModel } }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          autoHeight
          sx={{ border: 0 }}
        />
      </Paper>
    </div>
  );
};
