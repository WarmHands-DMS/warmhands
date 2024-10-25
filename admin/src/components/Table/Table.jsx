import './Table.scss';
import TableBasic from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const Table = () => {
  const rows = [
    {
      id: '66db2b535dff8cec5b9f6d73',
      type: 'Flood',
      title: 'Ratnapura Flash Flood',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Ratnapura',
      date: '2024-09-06',
      time: '09:48 PM',
      status: 'Rejected',
    },
    {
      id: '66db232ec431f916b0a7113b',
      type: 'Cyclone',
      title: 'Cyclone Roanu Impact',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Galle',
      date: '2024-09-06',
      time: '09:13 PM',
      status: 'Pending',
    },
    {
      id: '66db2394c431f916b0a7113d',
      type: 'Fire',
      title: 'Batticaloa Coastal Fire',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Batticaloa',
      date: '2024-09-06',
      time: '09:15 PM',
      status: 'Rejected',
    },
    {
      id: '66db23f2c431f916b0a7113f',
      type: 'Landslide',
      title: 'Kegalle Mudslide',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Kegalle',
      date: '2024-09-06',
      time: '09:17 PM',
      status: 'Approved',
    },
    {
      id: '66db2a1a5dff8cec5b9f6d6e',
      type: 'Cyclone',
      title: 'Trincomalee Windstorm',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Trincomalee',
      date: '2024-09-06',
      time: '09:43 PM',
      status: 'Pending',
    },
    {
      id: '66db2ab65dff8cec5b9f6d70',
      type: 'Tsunami',
      title: 'Jaffna Peninsula Tsunami',
      img: 'https://res.cloudinary.com/warmhands/image/upload/v1725636586/incidents/ujpgldesyaieg4p0eq46.jpg',
      city: 'Jaffna',
      date: '2024-09-06',
      time: '09:46 PM',
      status: 'Approved',
    },
  ];

  // Remove duplicates based on title
  const uniqueRows = [
    ...new Map(rows.map((item) => [item.title, item])).values(),
  ];

  return (
    <TableContainer component={Paper} className="table">
      <TableBasic sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell head">Disaster ID</TableCell>
            <TableCell className="tableCell head">Type</TableCell>
            <TableCell className="tableCell head">Title</TableCell>
            <TableCell className="tableCell head">City</TableCell>
            <TableCell className="tableCell head">Date</TableCell>
            <TableCell className="tableCell head">Time</TableCell>
            <TableCell className="tableCell head">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {uniqueRows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">{row.type}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" />
                  {row.title}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.time}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableBasic>
    </TableContainer>
  );
};
