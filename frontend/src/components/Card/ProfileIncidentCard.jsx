import { Link } from 'react-router-dom';
import './Card.scss';
import LongText from './LongText';
import moment from 'moment-timezone';
import DeleteIcon from '@mui/icons-material/Delete';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import { useState } from 'react';


export const ProfileIncidentCard = ({ item, onDelete }) => {
  const timeZone = 'Asia/Colombo';
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(item.id);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  // const deleteIncident = async (id) => {
  //   console.log(id)
  //   try {
  //     await axios.delete(`http://localhost:8800/api/incidents/user/${id}`, {
  //       withCredentials: true,
  //     });
  //     toast.success('Incident Deleted Successfully.', {
  //       containerId: 'incidentCard',
  //     });
  //   } catch (error) {
  //     console.error('Error deleting data:', error);
  //   }
  // };

  const handleDeleteConfirm = () => {
    // deleteIncident(deleteId);
    handleDelete();
    handleClose();
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const displayTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date(item.createdAt));

  // Ensure item.images is defined and is an array with at least one element
  const imageUrl =
    item.images && item.images.length > 0
      ? item.images[0]
      : 'path-to-default-image.png';

  return (
    <div className={`profileIncidentCard ${item.isApproved}`}>
      <div className="incidentDetail">
        <Link to={`/${item.id}`} className="imageContainer">
          <img src={imageUrl} alt="" />
        </Link>
        <div className="textContainer">
          <div className="top">
            <div className="title-section">
              <h3 className="title">
                <Link to={`/${item.id}`}>{item.title}</Link>
              </h3>
              <h5>
                <i
                  className="fa-solid fa-location-dot"
                  style={{ paddingRight: '10px' }}
                ></i>
                {item.city}
              </h5>
            </div>

            <div className="description">
              <LongText description={item.description} />
            </div>
          </div>
          <div className="bottom">
            <span className="date">
              <i className="fa-solid fa-calendar-days"></i>
              <p>
                {displayTime.slice(6, 10) +
                  '-' +
                  displayTime.slice(0, 2) +
                  '-' +
                  displayTime.slice(3, 5)}
              </p>
            </span>
            <span className="time">
              <i className="fa-solid fa-clock"></i>
              <p>{moment.tz(item.createdAt, timeZone).fromNow()}</p>
            </span>
          </div>
        </div>
      </div>

      <div className="btn-section">
        <div>
          <span className={`status ${item.isApproved}`}>
            {capitalizeFirstLetter(item.isApproved)}
          </span>
        </div>
        {item.isApproved !== 'approved' && (
          <DeleteIcon className="icon" onClick={() => handleOpen(item.id)} />
        )}
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this Incident Report?
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
    </div>
  );
};
