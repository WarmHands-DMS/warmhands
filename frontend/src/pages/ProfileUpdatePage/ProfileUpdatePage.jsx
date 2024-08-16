import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiReq from '../../lib/apiReq';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/UploadWidget/UploadWidget';


export const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target)

    const {fname, lname, address, province, district, city, mobile} = Object.fromEntries(formData);

    try {
      
      const res = await apiReq.put(`/users/${currentUser.id}`, {
        fname, lname, address, province, district, city, mobile
      })

      updateUser(res.data);
      toast.success("User Updated")
      navigate("/profile");

    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  }


  return (
    <div className="profileUpdatePage">
      <ToastContainer />
      <div className="wrapper">
        <div className="form-h">
          <h2>Update</h2>
        </div>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form">
            

            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">First Name</label>
                <input
                  type="text"
                  name="fname"
                  placeholder="First Name"
                  defaultValue={currentUser.fname}
                />
              </div>
              <div className="input-single">
                <label htmlFor="">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  placeholder="Last Name"
                  defaultValue={currentUser.lname}
                />
              </div>
            </div>

            <div className="input-single">
              <label htmlFor="">Home Address</label>
              <input
                type="text"
                name="address"
                placeholder="Home-address"
                defaultValue={currentUser.address}
              />
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Province</label>
                <input
                  type="text"
                  name="province"
                  placeholder="Province"
                  defaultValue={currentUser.province}
                />
              </div>
              <div className="input-single">
                <label htmlFor="">District</label>
                <input
                  type="text"
                  name="district"
                  placeholder="District"
                  defaultValue={currentUser.district}
                />
              </div>
              <div className="input-single">
                <label htmlFor="">City</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  defaultValue={currentUser.city}
                />
              </div>
            </div>

            <div className="input-single">
              <label htmlFor="">Mobile Number</label>
              <input
                type="number"
                name="mobile"
                placeholder="Mobile Number"
                defaultValue={currentUser.mobile}
              />
            </div>
          </div>

          <div className="btn-sec">
            <button type='submit'>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
