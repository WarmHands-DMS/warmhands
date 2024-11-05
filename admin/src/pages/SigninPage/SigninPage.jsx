import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import apiReq from '../../lib/apiReq';
import { AdminAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AdminPanelIcon from '@mui/icons-material/AdminPanelSettings';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';

export const SigninPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateAdmin } = useContext(AdminAuthContext);
  const navigate = useNavigate();

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const username = formData.get('username');
    const password = formData.get('password');

    if (!username || !password) {
      toast.error('Please fill out all fields.');
      return;
    }

    try {
      const res = await apiReq.post('/auth/admin/signin', {
        username,
        password,
      });

      updateAdmin(res.data);
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="signinPage">
      <div className="overlay"></div>
      <div className="container">
        <div className="header-section">
          {/* <video src={floodVideo} autoPlay muted loop></video> */}
          {/* <div className="video-overlay"></div> */}

          {/* <div className="text">
            <h2 className="title">
              <span>Together</span> <span>We are Stronger</span>
            </h2>
            <p>The Power of Community</p>
          </div> */}

          {/* <div className="button-section">
            <span className="text">Don&apos;t have an account?</span>
            <link to={'/register'}>
              <button className="btn">Register</button>
            </link>
          </div> */}
          <div className="header">
            <img src="/warmhands-logo-full.png" className="logo" />
          </div>
        </div>

        <div className="form-section">
          <h3>Welcome Back!</h3>
          <form onSubmit={handleSubmit} className="form">
            <div className="single-input">
              <label htmlFor="username">Username</label>
              <div className="input">
                <AdminPanelIcon className="icon" />
                <input
                  type="username"
                  name="username"
                  placeholder="Enter Admin Username"
                />
              </div>
            </div>
            <div className="single-input">
              <label htmlFor="password">Password</label>
              <div className="input">
                <LockIcon className="icon" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <button type="submit" disabled={isLoading} className="signin-btn">
              <span>Sign in</span>
              <LoginIcon className="icon" />
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};



  /* <div className="wrapper">
        <div className="form-h">
          <h2>Sign in</h2>
          <img src="/warmhands-logo.svg" className="logo" />
        </div>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form">
            <div className="input">
              <label htmlFor="">Username</label>
              <input type="username" name="username" placeholder="username" />
            </div>
            <div className="input">
              <label htmlFor="">Password</label>
              <input type="password" name="password" placeholder="Password" />
            </div>
          </div>

          <div className="btn-sec">
            <button disabled={isLoading}>Sign in</button>
          </div>
        </form>
      </div> */
