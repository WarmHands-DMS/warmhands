import { useContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import apiReq from '../../lib/apiReq';
import { AdminAuthContext } from '../../context/AuthContext';
import './SigninPage.scss';
import { useNavigate } from 'react-router-dom';

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
      <div className="wrapper">
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
      </div>
      <ToastContainer/>
    </div>
  );
};
