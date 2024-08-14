import { useNavigate } from "react-router-dom"
import { List } from "../../components/List/List"
import apiReq from "../../lib/apiReq"
// import { Notification } from "../../components/Notifiction/Notification"

export const UserProfilePage = () => {

  const navigate = useNavigate();

  const handleLogout = async() => {
    try {
      const res = apiReq.post("/auth/logout")
      localStorage.removeItem("user");
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
              <button>Update Profile</button>
            </div>
            <div className="info">
              <div className="profileImage">
                <img src="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="profile-pic" />
                <span>Edit</span>
              </div>
              <span>Username: <span>Navindu Virajitha</span></span>
              <span>E-mail: <span>navinduvirajitha@gmail.com</span></span>            
              <button className="logout" onClick={handleLogout}>Logout</button>
            </div>
          </div>
          <div className="user-reports">
            <div className="title">
              <h2>My Reports</h2>
              <button>Report Incident</button>
            </div>
            <List />
          </div>
        </div>
      </div>
      <div className="notifications">
        <div className="wrapper">
          {/* <Notification /> */}
        </div>
      </div>
    </div>
  )
}
