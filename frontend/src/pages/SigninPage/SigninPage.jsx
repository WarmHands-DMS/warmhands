import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import apiReq from "../../lib/apiReq";
import { AuthContext } from "../../context/AuthContext";
import floodVideo from "../../assets/flood.mp4";
import MailLockIcon from '@mui/icons-material/MailLock';
import LockIcon from '@mui/icons-material/Lock';
import LoginIcon from '@mui/icons-material/Login';

export const SigninPage = () => {
     const [isLoading, setIsLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();

    const {updateUser} = useContext(AuthContext);

    useEffect(() => {
      if (location.state?.message) {
        toast.success(location.state.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.target);
        const email = formData.get('email');
        const password = formData.get('password');

        if (
            !email ||
            !password
        ) {
            toast.error('Please fill out all fields.');
            return;
        }

        

        try {
            const res = await apiReq.post('/auth/user/signin',
              {
                email,
                password,
              },
            );
            
            updateUser(res.data);
            navigate('/')

        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
        };

    return (
      <div className="signinPage">

        <div className="container">
          <div className="video-section">
            <video src={floodVideo} autoPlay muted loop></video>
            <div className="video-overlay"></div>

            <div className="text">
              <h2 className="title">
                <span>Together</span> <span>We are Stronger</span>
              </h2>
              <p>The Power of Community</p>
            </div>

            <div className="button-section">
              <span className="text">Don&apos;t have an account?</span>
              <Link to={'/register'}>
                <button className="btn">Register</button>
              </Link>
            </div>
          </div>

          <div className="form-section">
            <div className="header">
              <img src="/warmhands-logo.svg" className="logo" />
              <h3>Welcome Back!</h3>
            </div>
            <form onSubmit={handleSubmit} className="form">
              <div className="single-input">
                <label htmlFor="email">Email</label>
                <div className="input">
                  <MailLockIcon className="icon" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter Email"
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
}


{
  /* <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Province</label>
                <input type="text" name="province" placeholder="Province" />
              </div>
              <div className="input-single">
                <label htmlFor="">District</label>
                <input type="text" name="district" placeholder="District" />
              </div>
              <div className="input-single">
                <label htmlFor="">City</label>
                <input type="text" name="city" placeholder="City" />
              </div>
            </div> */
}

{
  /* <div className="wrapper">
        <div className="form-h">
          <h2>Register</h2>
          <img src="/warmhands-logo.svg" className="logo" />
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form scrollbar">
            
            <div className="input-single">
              <label htmlFor="">Email</label>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                className={emailError ? 'error-border' : ''}
              />
              <div className="error-message">
                {emailError && <span>{emailError}</span>}
              </div>
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={validatePasswordMatch}
                  className={passwordError ? 'error-border' : ''}
                />
              </div>
              <div className="input-single">
                <label htmlFor="">Confirm Password</label>
                <input
                  type="password"
                  name="password"
                  placeholder="Re-Type Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={validatePasswordMatch}
                  className={passwordError ? 'error-border' : ''}
                />
                <div className="error-message">
                  {passwordError && <span>{passwordError}</span>}
                </div>
              </div>
            </div>
            
            
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">Province</label>
                <select
                  name="province"
                  onChange={handleProvinceChange}
                  value={selectedProvince}
                >
                  <option value="">select Province</option>
                  {locations.provinces.map((province, index) => (
                    <option key={index} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-single">
                <label htmlFor="">District</label>
                <select
                  name="district"
                  onChange={handleDistrictChange}
                  value={selectedDistrict}
                  disabled={!selectedProvince}
                >
                  <option value="">Select District</option>
                  {districts.map((district, index) => (
                    <option key={index} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-single">
                <label htmlFor="">City</label>
                <select name="city" disabled={!selectedDistrict}>
                  <option value="">Select City</option>
                  {cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">NIC</label>
                <input type="text" name="nic" placeholder="NIC" />
              </div>
              <div className="input-single">
                <label htmlFor="">Mobile Number</label>
                <input
                  type="number"
                  name="mobile"
                  placeholder="Mobile Number"
                />
              </div>
            </div>
          </div>

          <div className="btn-sec">
            <button>Register</button>
            <span>
              Already have an account?{' '}
              <span>
                <Link to="/signin">Sign in</Link>
              </span>
            </span>
          </div>
        </form>
      </div> */
}