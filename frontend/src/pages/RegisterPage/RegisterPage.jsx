import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import apiReq from "../../lib/apiReq";
import {locations} from "../../lib/LocationData";

export const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    const provinceData = locations.provinces.find((p) => p.name === province);
    setDistricts(provinceData ? provinceData.districts : []);
    setCities([]);
    setSelectedDistrict('');
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    const districtData = districts.find((d) => d.name === district);
    setCities(districtData ? districtData.cities : []);
  };

   const handleEmailChange = (e) => {
     const newEmail = e.target.value;
     setEmail(newEmail);

     
     if (!validateEmail(newEmail)) {
       setEmailError('Invalid email address');
     } else {
       setEmailError('');
     }
   };

  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const formData = new FormData(e.target);
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const email = formData.get('email');
    const password = formData.get("password");
    const address = formData.get("address");
    const province = formData.get("province");
    const district = formData.get("district");
    const city = formData.get("city");
    const nic = formData.get("nic");
    const mobile = formData.get("mobile");

    const avatar = "";

    if (
      !email ||
      !password ||
      !confirmPassword ||
      !fname ||
      !lname ||
      !address ||
      !province ||
      !district ||
      !city ||
      !nic ||
      !mobile
    ) {
      toast.error('Please fill out all fields.');
      return;
    }

    if (emailError) {
      toast.error('Enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      toast.error('Password do not match!');
      return;
    }
    
    try {
      const res = await apiReq.post('/auth/user/register', {
        fname,
        lname,
        email,
        password,
        address,
        province,
        district,
        city,
        nic,
        mobile,
        avatar
      });

       navigate('/signin', { state: { message: 'Registration successful!' } });

    } catch(error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
    
  }

  return (
    <div className="registerPage">
      <ToastContainer />
      <div className="wrapper">
        <div className="form-h">
          <h2>Register</h2>
          <img src="/warmhands-logo.svg" className="logo" />
        </div>
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form scrollbar">
            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="">First Name</label>
                <input type="text" name="fname" placeholder="First Name" />
              </div>
              <div className="input-single">
                <label htmlFor="">Last Name</label>
                <input type="text" name="lname" placeholder="Last Name" />
              </div>
            </div>
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
            <div className="input-single">
              <label htmlFor="">Home Address</label>
              <input type="text" name="address" placeholder="Home-address" />
            </div>
            {/* <div className="input-multi">
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
            </div> */}
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
      </div>
    </div>
  );
}

{/* <div className="registerPage">
         <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
    </div>
    <form>
        <h3>Login Here</h3>


        <label>Email</label>
        <input type="text" placeholder="Email" id="email" />

        <label>Password</label>
        <input type="password" placeholder="Password" id="password" />

        <button>Sign In</button>
        <span>Don't have an account? <span><Link to="/signup">Create Account</Link></span></span>
    </form>
    </div> */}
