import { Link, useLocation, useNavigate } from 'react-router-dom';
import apiReq from '../../lib/apiReq';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { List } from '../../components/List/List';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import LogoutIcon from '@mui/icons-material/Logout';

export const UserProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('profile');

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

  useEffect(() => {
    const fetchIncidents = async () => {
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
    };
    fetchIncidents();
  }, [currentUser.id]);

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
              <label htmlFor="logout" className="logout">
                <LogoutIcon className="icon" />
                <span className="topic">Log out</span>
              </label>
              <div className="indicator"></div>
            </div>
          </div>
        </div>
        <div className="tab-content">
          {activeTab === 'profile' && (
            <div className="profile text">
              <div className="title">Profile</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                repellat neque maxime natus aspernatur consectetur reprehenderit
                quibusdam fugit optio exercitationem eligendi error sequi
                voluptates, placeat temporibus omnis iste alias qui.
              </p>
            </div>
          )}
          {activeTab === 'reports' && (
            <div className="reports text">
              <div className="title">Reports</div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat
                repellat neque maxime natus aspernatur consectetur reprehenderit
                quibusdam fugit optio exercitationem eligendi error sequi
                voluptates, placeat temporibus omnis iste alias qui.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};











      // <div classNameName="details">
      //   <div classNameName="wrapper">
      //     <div classNameName="user-info">
      //       <div classNameName="title">
      //         <h2>User InhtmlFormation</h2>
      //       </div>
      //       <div classNameName="info">
      //         <div classNameName="profileImage">
      //           <img
      //             src={currentUser.avatar || 'no-avatar.png'}
      //             alt="profile-pic"
      //           />
      //         </div>
      //         <div classNameName="details">
      //           <div>
      //             Name:{' '}
      //             <span>{currentUser.fname + ' ' + currentUser.lname}</span>
      //           </div>
      //           <div>
      //             E-mail: <span>{currentUser.email}</span>
      //           </div>
      //         </div>
      //         <div classNameName="btn-sec">
      //           <button
      //             classNameName="update"
      //             onClick={() => navigate('/profile/update')}
      //           >
      //             Update
      //           </button>
      //           <button classNameName="logout" onClick={handleLogout}>
      //             Logout
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // <div classNameName="reports">
      //   <Link classNameName="button" to="/report">
      //     <button>Report New Incident</button>
      //   </Link>
      //   <div classNameName="wrapper">
      //     <div classNameName="title">
      //       <h2>My Reports</h2>
      //       {incidents.length > 2 ? <button>View All</button> : <div></div>}
      //     </div>
      //     <div classNameName="incidents">
      //       {incidents.length > 0 ? (
      //         <List data={incidents} /> // Pass incidents as prop to List component
      //       ) : (
      //         <div classNameName="no-reports">
      //           <img src="/no-reports.svg" alt="No reports yet" />
      //         </div>
      //       )}
      //     </div>
      //   </div>
      // </div>