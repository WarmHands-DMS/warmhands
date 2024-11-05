import { AdminAuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

export const AdminProfilePage = () => {
  const { currentAdmin } = useContext(AdminAuthContext);
  

  return (
    <div className="adminProfile">
      <div className="title-main">Profile Information</div>
      <div className="profileImage">
        <img src={currentAdmin.avatar || 'no-avatar.png'} alt="profile-pic" />
        <div className={`${currentAdmin.isMaster ? 'admin' : 'moderator'}`}>
          {currentAdmin.isMaster ? 'ADMIN' : 'MODERATOR'}
        </div>
      </div>

      <div className="profileInfo">
        <div className="detail-title">
          <div className="title">Username</div>
          <div className="title">Full Name</div>
          <div className="title">Department</div>
          <div className="title">Email</div>
          <div className="title">Mobile</div>
          <div className="title">NIC</div>
        </div>
        <div className="detail-info">
          <div className="detail">{currentAdmin.username}</div>
          <div className="detail">{currentAdmin.fullName}</div>
          <div className="detail">{currentAdmin.department}</div>
          <div className="detail">{currentAdmin.email}</div>
          <div className="detail">{currentAdmin.mobile}</div>
          <div className="detail">{currentAdmin.nic}</div>
        </div>
      </div>
    </div>
  );
};
