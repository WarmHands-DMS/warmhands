import React, { useContext } from "react";
import { AdminAuthContext } from "../../context/AuthContext";
import "./Navbar.scss"
import { Link, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Logout from '@mui/icons-material/Logout';
import { toast, ToastContainer } from "react-toastify";
import apiReq from "../../lib/apiReq";


export const Navbar = () => {
  const { currentAdmin, updateAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiReq.post('/auth/admin/logout');
      updateAdmin(null);
      navigate(`/`, { state: { toastMessage: 'Admin Logout successfully!' } });
    } catch (error) {
      toast.error('Failed to logout');
      console.log(error);
    }
  };

  // Material Menu
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <div className="nav-wrapper">
        {/* <div className="admin">
          <span>{currentAdmin.username}</span>
          <img src="/no-avatar.png" alt="profile-pic" />
        </div> */}
        <React.Fragment>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div className="admin">
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}
                >
                  <span>{currentAdmin.username}</span>
                  <Avatar sx={{ width: 38, height: 38, objectFit: 'cover' }}>
                    <img
                      src={currentAdmin.avatar || '/no-avatar.png'}
                      alt="profile-pic"
                      style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        objectFit: 'cover',
                      }}
                    />
                  </Avatar>
                </IconButton>
              </Tooltip>
            </div>
          </Box>

          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            slotProps={{
              paper: {
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&::before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Link to="/profile">
              <MenuItem
                onClick={handleClose}
                className="menu-profile"
                style={{ margin: '0 5px 10px 5px', borderRadius: '5px' }}
              >
                <Avatar>
                  <img
                    src={currentAdmin.avatar || '/no-avatar.png'}
                    alt="profile-pic"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '50%',
                    }}
                  />
                </Avatar>
                <span className="profile-text">Profile</span>
              </MenuItem>
            </Link>
            <Divider />
            <MenuItem
              style={{ margin: '10px 5px 0 5px', borderRadius: '5px' }}
              className="menu-logout"
              onClick={handleLogout}
            >
              <ListItemIcon className="icon">
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </React.Fragment>
      </div>
      <ToastContainer />
    </div>
  );
};
