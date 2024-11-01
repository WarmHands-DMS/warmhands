import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import apiReq from '../../lib/apiReq';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import Logout from '@mui/icons-material/Logout';
import PostAddIcon from '@mui/icons-material/PostAdd';

export const Navbar = () => {
  const [openMobile, setOpenMobile] = useState(false);
  const { updateUser, currentUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await apiReq.post('/auth/user/logout');
      updateUser(null);
      navigate('/');
    } catch (error) {
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

  // Function to determine if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <nav>
      <div className="left">
        <Link to="/" className="nav-logo">
          <img
            className="logo"
            src="/warmhands-logo-full.png"
            alt="logo-warmhands"
          />
        </Link>
      </div>
      <div className="right">
        <div className="nav-links">
          <Link
            className={`link ${isActive('/') ? 'active' : ''}`}
            to="/"
            data-item="Home"
          >
            Home
          </Link>
          <Link
            className={`link ${isActive('/news') ? 'active' : ''}`}
            to="/news"
            data-item="News"
          >
            News
          </Link>
          <Link
            className={`link ${isActive('/map') ? 'active' : ''}`}
            to="/map"
            data-item="Map"
          >
            Map
          </Link>
          <Link
            className={`link ${isActive('/contact') ? 'active' : ''}`}
            to="/contact"
            data-item="Contact"
          >
            Contact
          </Link>
        </div>
        {currentUser ? (
          <div className="user-btn">
            <div className="desktop">
              {/* <div className="user">
                <img
                  src={currentUser.avatar || '/no-avatar.png'}
                  alt="profile-pic"
                />
                <span>{currentUser.fname}</span>
              </div>
              */}
              <Link className="report-btn" to="/report">
                {/* <div className="notification">2</div> */}
                <span>Make Report</span>{' '}
                <span>
                  <PostAddIcon className="icon" />
                </span>
              </Link>

              <React.Fragment>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div className="user-btn">
                    <Tooltip title="Account settings">
                      <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                      >
                        {currentUser.fname}
                        <Avatar sx={{ width: 38, height: 38 }}>
                          <img
                            src={currentUser.avatar || '/no-avatar.png'}
                            alt="profile-pic"
                            style={{
                              width: '100%',
                              height: '100%',
                              borderRadius: '50%',
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
                  <Link to="/profile?tab=profile">
                    <MenuItem
                      onClick={handleClose}
                      className="menu-profile"
                      style={{ margin: '0 5px 10px 5px', borderRadius: '5px' }}
                    >
                      <Avatar>
                        <img
                          src={currentUser.avatar || '/no-avatar.png'}
                          alt="profile-pic"
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                          }}
                        />
                      </Avatar>
                      Profile
                    </MenuItem>
                  </Link>
                  <Link to="/profile?tab=reports">
                    <MenuItem
                      onClick={handleClose}
                      className="menu-reports"
                      style={{ margin: '0 5px 10px 5px', borderRadius: '5px' }}
                    >
                      <Avatar sx={{ width: 32, height: 32 }}>
                        <ViewDayIcon className="icon" />
                      </Avatar>
                      Reports
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
            {/* <div className="mobile">
              <Link to="/profile" className="user">
                <img
                  src={currentUser.avatar || '/no-avatar.png'}
                  alt="profile-pic"
                />
              </Link>
            </div> */}
          </div>
        ) : (
          <div className="nav-btn">
            <Link className="link btn-a signin" to="/signin">
              Sign in
            </Link>
            <Link className="link btn-a register" to="/register">
              Register
            </Link>
          </div>
        )}

        <i
          className={
            openMobile ? 'hide' : 'fa-solid fa-bars fa-xl mobile-menu show'
          }
          style={{
            marginBottom: '8px',
          }}
          onClick={() => setOpenMobile(!openMobile)}
        ></i>
        <i
          className={
            !openMobile
              ? 'hide'
              : 'fa-solid fa-circle-xmark fa-xl mobile-menu show'
          }
          style={{ color: 'white' }}
          onClick={() => setOpenMobile(!openMobile)}
        ></i>
        <div className={openMobile ? 'menu active' : 'menu'}>
          <Link
            to="/"
            className="mob-link"
            onClick={() => setOpenMobile(!openMobile)}
          >
            Home
          </Link>
          <Link
            to="/news"
            className="mob-link"
            onClick={() => setOpenMobile(!openMobile)}
          >
            News
          </Link>
          <Link
            to="/map"
            className="mob-link"
            onClick={() => setOpenMobile(!openMobile)}
          >
            Map
          </Link>
          <Link
            to="/contact"
            className="mob-link"
            onClick={() => setOpenMobile(!openMobile)}
          >
            Contact
          </Link>
          {!currentUser && (
            <>
              <Link
                to="signin"
                className="signin"
                onClick={() => setOpenMobile(!openMobile)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className="register"
                onClick={() => setOpenMobile(!openMobile)}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
