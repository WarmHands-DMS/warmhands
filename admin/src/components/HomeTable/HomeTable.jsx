import './HomeTable.scss';
import TableBasic from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export const HomeTable = ({ data }) => {
  const rows = data;

  // Remove duplicates while keeping the latest entry
  const uniqueRows = [
    ...new Map(rows.map((item) => [item.title, item])).values(),
  ];

  // Sort unique rows by createdAt in descending order
  uniqueRows.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const formatDateTime = (dateString) => {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Colombo',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date(dateString));
  };

   const capitalizeFirstLetter = (string) => {
     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
   };

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
                  <img src={row.images[0]} alt="" />
                  {row.title}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.city}</TableCell>
              <TableCell className="tableCell">
                {formatDateTime(row.createdAt).split(', ')[0]}
              </TableCell>
              <TableCell className="tableCell">
                {formatDateTime(row.createdAt).split(', ')[1]}
              </TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.isApproved}`}>
                  {capitalizeFirstLetter(row.isApproved)}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableBasic>
    </TableContainer>
  );
};
