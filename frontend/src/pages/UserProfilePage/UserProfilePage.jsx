import { Link, useNavigate } from 'react-router-dom';
import apiReq from '../../lib/apiReq';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { List } from '../../components/List/List';

export const UserProfilePage = () => {
  const { updateUser, currentUser } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
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

    </div>
  );
};











      // <div className="details">
      //   <div className="wrapper">
      //     <div className="user-info">
      //       <div className="title">
      //         <h2>User Information</h2>
      //       </div>
      //       <div className="info">
      //         <div className="profileImage">
      //           <img
      //             src={currentUser.avatar || 'no-avatar.png'}
      //             alt="profile-pic"
      //           />
      //         </div>
      //         <div className="details">
      //           <div>
      //             Name:{' '}
      //             <span>{currentUser.fname + ' ' + currentUser.lname}</span>
      //           </div>
      //           <div>
      //             E-mail: <span>{currentUser.email}</span>
      //           </div>
      //         </div>
      //         <div className="btn-sec">
      //           <button
      //             className="update"
      //             onClick={() => navigate('/profile/update')}
      //           >
      //             Update
      //           </button>
      //           <button className="logout" onClick={handleLogout}>
      //             Logout
      //           </button>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      // <div className="reports">
      //   <Link className="button" to="/report">
      //     <button>Report New Incident</button>
      //   </Link>
      //   <div className="wrapper">
      //     <div className="title">
      //       <h2>My Reports</h2>
      //       {incidents.length > 2 ? <button>View All</button> : <div></div>}
      //     </div>
      //     <div className="incidents">
      //       {incidents.length > 0 ? (
      //         <List data={incidents} /> // Pass incidents as prop to List component
      //       ) : (
      //         <div className="no-reports">
      //           <img src="/no-reports.svg" alt="No reports yet" />
      //         </div>
      //       )}
      //     </div>
      //   </div>
      // </div>