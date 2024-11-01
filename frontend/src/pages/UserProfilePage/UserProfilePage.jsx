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