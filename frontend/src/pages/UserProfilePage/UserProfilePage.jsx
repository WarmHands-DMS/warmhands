import { useNavigate } from "react-router-dom"
import { List } from "../../components/List/List"
import apiReq from "../../lib/apiReq"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
// import { Notification } from "../../components/Notifiction/Notification"

export const UserProfilePage = () => {

  const {updateUser, currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      await apiReq.post("/auth/logout")
      updateUser(null)
      navigate("/");
    } catch(error) {
      console.log(error)
    }
  }

  return (
    <div className="userProfilePage">
      <div className="details">
        <div className="wrapper">
          <div className="user-info">
            <div className="title">
              <h2>User Information</h2>
            </div>
            <div className="info">
              <div className="profileImage">
                <img
                  src={currentUser.avatar || 'no-avatar.png'}
                  alt="profile-pic"
                />
              </div>
              <div className="details">
                <div>
                  Name:{' '}
                  <span>{currentUser.fname + ' ' + currentUser.lname}</span>
                </div>
                <div>
                  E-mail: <span>{currentUser.email}</span>
                </div>
              </div>
              <div className="btn-sec">
                <button className="update" onClick={() => navigate('/profile/update')}>
                  Update
                </button>
                <button className="logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="reports">
        <div className="add-button">
          ,<button>Report New Incident</button>
        </div>
        <div className="wrapper">
          <div className="title">
            <h2>My Reports</h2>
            <button>View All</button>
          </div>
          <div className="incidents">
            <List />
          </div>
        </div>
      </div>
    </div>
  );
}
