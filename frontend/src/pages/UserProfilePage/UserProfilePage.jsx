import * as React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiReq from '../../lib/apiReq';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ProfileIncidentList } from '../../components/List/ProfileIncidentList';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import LogoutIcon from '@mui/icons-material/Logout';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export const UserProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

  // Material
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tab = searchParams.get('tab');
    if (tab) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleTabChange = (event) => {
    setActiveTab(event.target.id);
  };

  const handleLogout = async () => {
    try {
      await apiReq.post('/auth/user/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChangeSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formJson = Object.fromEntries(formData.entries());

    const currentPassword = formJson.currentPassword;
    const newPassword = formJson.newPassword;
    const confirmNewPassword = formJson.confirmNewPassword;

    // Check if the new passwords match
    if (newPassword !== confirmNewPassword) {
      toast.error('New passwords do not match.', {
        containerId: 'profilePage',
      });
      return;
    }

    try {
      // Send request to backend
      const response = await apiReq.put(
        `/users/password-change/${currentUser.id}`,
        {
          currentPassword,
          newPassword,
        }
      );

      if (response.status === 200) {
        toast.success('Password changed successfully!', {
          containerId: 'profilePage',
        });
        handleClose();
      } else {
        toast.error(response.data.message || 'Failed to change password.', {
          containerId: 'profilePage',
        });
      }
    } catch (error) {
      console.error('Error changing password:', error);
      const errorMessage =
        error.response?.data?.message ||
        'An error occurred while changing the password.';
      toast.error(errorMessage, { containerId: 'profilePage' });
    }
  };

   

 
    const fetchIncidents = React.useCallback(async () => {
      try {
        const response = await apiReq.get(
          'http://localhost:8800/api/incidents'
        );
        // Filter incidents by userId
        const userIncidents = response.data.filter(
          (incident) => incident.userId === currentUser.id
        );
        setIncidents(userIncidents);
      } catch (error) {
        console.log(error);
      }
    }, [currentUser.id]);
   


  const handleDeleteIncident = async (id) => {
    console.log(id);
    try {
      await axios.delete(`http://localhost:8800/api/incidents/user/${id}`, {
        withCredentials: true,
      });
      toast.success('Incident Deleted Successfully.', {
        containerId: 'profilePage',
      });
      fetchIncidents();
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

   useEffect(() => {
    fetchIncidents();
  }, [fetchIncidents]);

  return (
    <div className="userProfilePage">
      <div className="wrapper">
        <div className="container">
          <div className="content">
            <input
              type="radio"
              name="indicator"
              id="profile"
              checked={activeTab === 'profile'}
              onChange={handleTabChange}
            />
            <input
              type="radio"
              name="indicator"
              id="reports"
              checked={activeTab === 'reports'}
              onChange={handleTabChange}
            />
            <div className="profile-summary">
              <div className="profileImage">
                <img
                  src={currentUser.avatar || 'no-avatar.png'}
                  alt="profile-pic"
                />
              </div>
              <span className="name">{currentUser.fname}</span>
              <span className="name">{currentUser.lname}</span>
              <span className="info" style={{ marginTop: '6px' }}>
                {currentUser.mobile}
              </span>
              <span className="info">{currentUser.city + ', Sri Lanka'}</span>
            </div>
            <div className="list">
              <label
                htmlFor="profile"
                className={
                  activeTab === 'profile' ? 'profile disable' : 'profile'
                }
              >
                <AccountBoxIcon className="icon" />
                <span className="topic">Profile</span>
              </label>
              <label
                htmlFor="reports"
                className={
                  activeTab === 'reports' ? 'reports disable' : 'reports'
                }
              >
                <ViewDayIcon className="icon" />
                <span className="topic">My Reports</span>
              </label>
              <label htmlFor="logout" className="logout" onClick={handleLogout}>
                <LogoutIcon className="icon" />
                <span className="topic">Log out</span>
              </label>
              <div className="indicator"></div>
            </div>
          </div>
        </div>
        <div className="tab-content scrollbar">
          {activeTab === 'profile' && (
            <div className="profile text">
              <div className="title-main">Profile Information</div>
              <div className="profileImage">
                <img
                  src={currentUser.avatar || 'no-avatar.png'}
                  alt="profile-pic"
                />
              </div>
              <div className="profileInfo">
                <div className="detail-title">
                  <div className="title">Full Name</div>
                  <div className="title">Home Address</div>
                  <div className="title">Email</div>
                  <div className="title">Mobile</div>
                  <div className="title">NIC</div>
                  <div className="title">City</div>
                  <div className="title">District</div>
                  <div className="title">Province</div>
                </div>
                <div className="detail-info">
                  <div className="detail">
                    {currentUser.fname + ' ' + currentUser.lname}
                  </div>
                  <div className="detail">{currentUser.address}</div>
                  <div className="detail">{currentUser.email}</div>
                  <div className="detail">{currentUser.mobile}</div>
                  <div className="detail">{currentUser.nic}</div>
                  <div className="detail">{currentUser.city}</div>
                  <div className="detail">{currentUser.district}</div>
                  <div className="detail">{currentUser.province}</div>
                </div>
              </div>
              <div className="btn-sec">
                <button
                  className="update"
                  onClick={() => navigate('/profile/update')}
                >
                  Edit Profile
                </button>
                {/* <button className="password">
                   Change Password
                 </button> */}
                <React.Fragment>
                  <Button
                    className="password"
                    variant="outlined"
                    onClick={handleClickOpen}
                  >
                    Change Password
                  </Button>
                  <Dialog
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                      component: 'form',
                      onSubmit: handlePasswordChangeSubmit,
                    }}
                  >
                    <DialogTitle>Change Your Password</DialogTitle>
                    <DialogContent>
                      <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        required
                        margin="dense"
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                      />
                      <TextField
                        required
                        margin="dense"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        label="Confirm New Password"
                        type="password"
                        fullWidth
                        variant="standard"
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleClose}>Cancel</Button>
                      <Button type="submit">Change</Button>
                    </DialogActions>
                  </Dialog>
                </React.Fragment>
              </div>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="reports text">
              <div className="title-section">
                <div className="title-main">My Reports</div>
                <Link to="/report">
                  <span className="add-btn">
                    Add <AddBoxIcon className="icon" />
                  </span>
                </Link>
              </div>
              {incidents.length > 0 ? (
                <div className="reported scrollbar">
                  <ProfileIncidentList data={incidents} onDelete={handleDeleteIncident}/>
                </div>
              ) : (
                <div className="no-reports">
                  <div>Report and Save Others from Disasters</div>
                  <img src="/no-reports.svg" alt="No reports yet" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <ToastContainer containerId="profilePage" />
    </div>
  );
};

