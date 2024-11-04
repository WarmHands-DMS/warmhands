import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import apiReq from '../../lib/apiReq';
import UploadWidget from '../../components/UploadWidget/UploadWidget';

export const RegisterPage = () => {
  const [avatar, setAvatar] = useState([]);
  const [isMaster, setIsMaster] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const goBack = () => {
    navigate(`/admins`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const fullName = formData.get('fullName');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const username = formData.get('username');
    const department = formData.get('department');
    const email = formData.get('email');
    const nic = formData.get('nic');
    const mobile = formData.get('mobile');
    const uploadedAvatar = avatar[0];

    if (
      !fullName ||
      !password ||
      !confirmPassword ||
      !department ||
      !username ||
      !email ||
      !nic ||
      !mobile
    ) {
      toast.error('Please fill out all fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      toast.error('Password does not match!');
      setIsLoading(false);
      return;
    }

    try {
      const res = await apiReq.post('/auth/admin/register', {
        fullName,
        department,
        email,
        password,
        username,
        nic,
        mobile,
        uploadedAvatar,
        isMaster,
      }, {
        withCredentials: true,
      });

      navigate('/admins', {
        state: { message: 'Admin Registration successful!' },
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage scrollbar">
      <span className="title">Add New Admin</span>
      <form className="adminRegister" onSubmit={handleSubmit}>
        <div className="profileImage">
          <img src={avatar[0] || '/no-avatar.png'} alt="profile-pic" />
          <span>
            <UploadWidget
              uwConfig={{
                cloudName: 'WarmHands',
                uploadPreset: 'WarmHands',
                multiple: false,
                maxImageFileSize: 2000000,
                folder: 'avatars',
              }}
              setState={setAvatar}
            />
          </span>
        </div>
        <div className="form-group-2">
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" placeholder="Enter Full Name" />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" placeholder="Enter Last Name" />
          </div>
        </div>
        <div className="form-group-2">
          <div className="form-group">
            <label>Department</label>
            <input type="text" name="department" placeholder="Enter Full Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" placeholder="Enter Email" />
          </div>
        </div>

        <div className="form-group-2">
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </div>
        <div className="form-group-2">
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="text"
              name="mobile"
              placeholder="Enter Mobile Number"
            />
          </div>
          <div className="form-group">
            <label>NIC</label>
            <input
              type="text"
              name="nic"
              placeholder="Enter National ID Number"
            />
          </div>
        </div>
        <div className="form-group full-control">
          <label>
            <input
              type="checkbox"
              name="isMaster"
              checked={isMaster}
              onChange={(e) => setIsMaster(e.target.checked)}
            />
            Give Full Access Control
          </label>
        </div>
        <div className="email-btns">
          <span onClick={goBack}>Cancel</span>
          <button
            type="submit"
            disabled={isLoading}
            className={isLoading ? 'disabled' : ''}
          >
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};
