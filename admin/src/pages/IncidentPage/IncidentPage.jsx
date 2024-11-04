import { Slider } from '../../components/Slider/Slider';
import { Map } from '../../components/Map/Map';
import { useLoaderData, useNavigate } from 'react-router-dom';
import domPurify from 'dompurify';
import { useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export const IncidentPage = () => {
 const initialIncident = useLoaderData();; // Fetch incident data
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);
  const [rejectPopupOpen, setRejectPopupOpen] = useState(false);
  const navigate = useNavigate();
  const [incident, setIncident] = useState(initialIncident);

 

  // Format the date/time
  const displayTime = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  }).format(new Date(incident.createdAt));

  // Open and close dialog functions
  const handleOpenEmailPopup = () => setEmailPopupOpen(true);
  const handleCloseEmailPopup = () => setEmailPopupOpen(false);
  const handleOpenRejectPopup = () => setRejectPopupOpen(true);
  const handleCloseRejectPopup = () => setRejectPopupOpen(false);

  const handleConfirm = async () => {
    if (incident.isApproved === 'approved') {
      toast.success('Incident already approved!', {
        containerId: 'incident',
      });
      handleCloseEmailPopup();
      return true;
    } else {
    try {
      await axios.put(
        `http://localhost:8800/api/incidents/${incident.id}/approve`
      );
      setIncident((prev) => ({ ...prev, isApproved: 'approved' }));
      toast.success('Incident approved successfully!', {
        containerId: 'incident',
      }); // Show success toast
      handleCloseEmailPopup();
    } catch (error) {
      toast.error('Failed to approve incident.'); // Show error toast
      console.error(error);
    }
  }};

  const handleReject = async () => {
    try {
      await axios.put(
        `http://localhost:8800/api/incidents/${incident.id}/reject`
      );
      setIncident((prev) => ({ ...prev, isApproved: 'rejected' }));
      toast.success('Incident rejected successfully!', {
        containerId: 'incident',
      }); // Show success toast
      handleCloseRejectPopup();
    } catch (error) {
      toast.error('Failed to reject incident.'); // Show error toast
      console.error(error);
    }
  };

  const handleSend = () => {
    if (incident.isApproved === "approved") {
      navigate(`/${incident.id}/send-emails`, {
        state: { toastMessage: 'Incident already approved!' },
      });
    } else {
      handleConfirm();
    navigate(`/${incident.id}/send-emails`, {
      state: { toastMessage: 'Incident approved successfully!' },
    });
  }};

  return (
    <div className="incidentPage">
      <div className="top">
        <div className="details">
          <div className="wrapper">
            <Slider images={incident.images} />
            <div className="info">
              <div className="top">
                <div className="disasterInfo">
                  <h1>{incident.title}</h1>
                  <h4>
                    <i
                      className="fa-solid fa-location-dot"
                      style={{ paddingRight: '10px' }}
                    ></i>
                    {incident.city}
                  </h4>
                  <h5>
                    <i
                      className="fa-solid fa-calendar-days"
                      style={{ paddingRight: '10px' }}
                    ></i>
                    {displayTime.slice(6, 10) +
                      '-' +
                      displayTime.slice(0, 2) +
                      '-' +
                      displayTime.slice(3, 5)}
                  </h5>
                  <h5>
                    <i
                      className="fa-solid fa-clock"
                      style={{ paddingRight: '10px' }}
                    ></i>
                    {displayTime.slice(12, 17)} {displayTime.slice(21, 23)}
                  </h5>
                </div>
                {incident.user && (
                  <div className="userInfo">
                    <div>
                      <p>Reported By</p>
                      <img
                        src={incident.user.avatar || '/no-avatar.png'}
                        alt="user"
                      />
                      <span>{incident.user.fname || '-'}</span>
                    </div>
                  </div>
                )}
              </div>
              <div
                className="bottom"
                dangerouslySetInnerHTML={{
                  __html: domPurify.sanitize(incident.description),
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <div className="location">
              <p className="title">Location</p>
              <div className="mapContainer">
                <Map
                  items={[incident]}
                  zoom={14}
                  latitude={incident.latitude}
                  longitude={incident.longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <span
          className={`reject-btn ${
            incident.isApproved === 'rejected' ? 'rejected-btn' : ''
          }`}
          onClick={handleOpenRejectPopup}
        >
          {incident.isApproved === 'rejected' ? 'Rejected' : 'Reject'}
        </span>
        <span
          className={`confirm-btn ${
            incident.isApproved === 'approved' ? 'confirmed-btn' : ''
          }`}
          onClick={handleOpenEmailPopup}
        >
          {incident.isApproved === 'approved' ? (
            <>
              Confirmed <CheckCircleIcon style={{ fontSize: 20 }} />
            </>
          ) : (
            'Confirm'
          )}
        </span>
      </div>

      {/* Confirmation Dialog for Sending Emails */}
      <Dialog open={emailPopupOpen} onClose={handleCloseEmailPopup}>
        <DialogTitle>Confirm and Send Emails</DialogTitle>
        <DialogContent>
          Are you sure you want to send emails to users in {incident.city}?
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCloseEmailPopup}>Cancel</Button>
          <div>
            <Button onClick={handleConfirm}>Confirm Only</Button>
            <Button onClick={handleSend}>Send Emails</Button>
          </div>
        </DialogActions>
      </Dialog>

      {/* rejection Dialog for Sending Emails */}
      <Dialog open={rejectPopupOpen} onClose={handleCloseRejectPopup}>
        <DialogTitle>Reject Incident</DialogTitle>
        <DialogContent>
          Are you sure you want to reject this incident?
        </DialogContent>
        <DialogActions style={{ justifyContent: 'space-between' }}>
          <Button onClick={handleCloseRejectPopup}>Cancel</Button>
          <div>
            <Button onClick={handleReject}>Reject</Button>
          </div>
        </DialogActions>
      </Dialog>
      <ToastContainer containerId="incident" />
    </div>
  );
};
