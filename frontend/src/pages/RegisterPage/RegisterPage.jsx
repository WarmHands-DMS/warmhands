import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import apiReq from "../../lib/apiReq";
import {locations} from "../../lib/LocationData";
import fireVideo from '../../assets/fire.mp4';
import LockIcon from '@mui/icons-material/Lock';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone';
import BadgeIcon from '@mui/icons-material/Badge';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import UploadWidget from '../../components/UploadWidget/UploadWidget';



export const RegisterPage = () => {
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [nic, setNic] = useState('');
  const [mobile, setMobile] = useState('');
  const [avatar, setAvatar] = useState([]);
  
  const [districts, setDistricts] = useState([]);
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [nicError, setNicError] = useState(false);
  const [mobileError, setMobileError] = useState(false);
  const [fnameError, setFnameError] = useState(false);
  const [lnameError, setLnameError] = useState(false);

  const navigate = useNavigate();

  // Location Changes
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

  const handleCityChange = (event) => {
    const city = event.target.value;
    setSelectedCity(city);
  };

  // Email Validation onChange
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
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

  // Validating Input fields
  const handleFnameChange = (e) => {
    setFname(e.target.value);
    setFnameError(false); 
  };

  const handleLnameChange = (e) => {
    setLname(e.target.value);
    setLnameError(false); 
  };

  const handleNicChange = (e) => {
    setNic(e.target.value);
    setNicError(false); // reset validation on change
  };

  const handleMobileChange = (e) => {
    setMobile(e.target.value);
    setMobileError(false); // reset validation on change
  };

  // Password Validation
  const validatePasswordMatch = () => {
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  // State to track the current step
  const [step, setStep] = useState(1);

  const validateStepOne = () => {
    const requiredFields = {
      fname,
      lname,
      address,
      selectedProvince,
      selectedDistrict,
      selectedCity,
      nic,
      mobile,
    };

    for (const [key, value] of Object.entries(requiredFields)) {
      if (!value) {
        toast.error(`Please fill out all the details.`);
        return false;
      }
    }

    const nicRegex = /^[0-9]*v?$/i;
    const nameRegex = /^[A-Za-z\s]+$/;
    const isNicValid = nicRegex.test(nic) && nic.length >= 10 && nic.length <= 12;
    const isMobileValid = mobile.length >= 10 && mobile.length <= 12;
    const isFnameValid = nameRegex.test(fname);
    const isLnameValid = nameRegex.test(lname);

    // Check validation conditions and set errors if either fails
    if (!isNicValid || !isMobileValid || !isFnameValid || !isLnameValid) {
      if (!isNicValid) {
        toast.error(
          "NIC should be 10-12 characters long and contain only numbers and an optional 'v' at the end."
        );
        setNicError(true);
      }
      if (!isMobileValid) {
        toast.error('Mobile Number should be 10-12 characters long.');
        setMobileError(true);
      }

      if (!isFnameValid) {
        toast.error('First name should not contain numbers.');
        setFnameError(true);
      }

      if (!isLnameValid) {
        toast.error('Last name should not contain numbers.');
        setLnameError(true);
      }
      return false;
    }

    return true;
  };

  // Handlers for Next and Previous buttons
  const nextStep = () => {
    if (validateStepOne()) {
      setStep((prevStep) => prevStep + 1);
    }
  };
  const prevStep = () => setStep((prevStep) => prevStep - 1);

  //Passing data to the backend 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.target);
    const fname = formData.get('fname');
    const lname = formData.get('lname');
    const email = formData.get('email');
    const password = formData.get('password');
    const address = formData.get('address');
    const province = formData.get('province');
    const district = formData.get('district');
    const city = formData.get('city');
    const nic = formData.get('nic');
    const mobile = formData.get('mobile');
    const uploadedAvatar = avatar[0]

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
      setIsLoading(false);
      return;
    }

    if (emailError) {
      toast.error('Enter a valid email address.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      toast.error('Password do not match!');
      setIsLoading(false);
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
        uploadedAvatar,
      });

      navigate('/signin', { state: { message: 'Registration successful!' } });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registerPage">
      <ToastContainer />

      <div className="container">
        <div className="form-section">
          <form onSubmit={handleSubmit} className="form">
            {/* First Step */}
            <div className={`form-step ${step === 1 ? 'active' : ''}`}>
              <div className="header">
                <img src="/warmhands-logo.svg" className="logo" />
                <h3>Tell us about yourself!</h3>
              </div>
              <div className="multi-input-2">
                <div className="single-input">
                  <label htmlFor="fname">First Name</label>
                  <div className={`input ${fnameError ? 'input-error' : ''}`}>
                    <PersonIcon className="icon" />
                    <input
                      type="text"
                      name="fname"
                      placeholder="Enter First Name"
                      value={fname}
                      onChange={handleFnameChange}
                    />
                  </div>
                  {fnameError && (
                    <p className="error-text">Invalid First Name</p>
                  )}
                </div>
                <div className="single-input">
                  <label htmlFor="lname">Last Name</label>
                  <div className={`input ${lnameError ? 'input-error' : ''}`}>
                    <PersonIcon className="icon" />
                    <input
                      type="text"
                      name="lname"
                      placeholder="Enter Last Name"
                      value={lname}
                      onChange={handleLnameChange}
                    />
                  </div>
                  {lnameError && (
                    <p className="error-text">Invalid Last Name</p>
                  )}
                </div>
              </div>
              <div className="single-input">
                <label htmlFor="address">Home Address</label>
                <div className="input">
                  <HomeIcon className="icon" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Enter Home Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="multi-input-3">
                <div className="single-input">
                  <label htmlFor="province">Province</label>
                  <div className="input">
                    <select
                      name="province"
                      onChange={handleProvinceChange}
                      value={selectedProvince}
                      style={{
                        color: selectedProvince === '' ? 'grey' : 'black',
                      }}
                    >
                      <option value="" style={{ color: 'grey' }}>
                        select Province
                      </option>
                      {locations.provinces.map((province, index) => (
                        <option
                          key={index}
                          value={province.name}
                          style={{ color: 'black' }}
                        >
                          {province.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="single-input">
                  <label htmlFor="district">District</label>
                  <div className="input">
                    <select
                      name="district"
                      onChange={handleDistrictChange}
                      value={selectedDistrict}
                      disabled={!selectedProvince}
                      style={{
                        color: selectedProvince === '' ? 'grey' : 'black',
                      }}
                    >
                      <option value="" style={{ color: 'grey' }}>
                        Select District
                      </option>
                      {districts.map((district, index) => (
                        <option
                          key={index}
                          value={district.name}
                          style={{ color: 'black' }}
                        >
                          {district.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="single-input">
                  <label htmlFor="city">City</label>
                  <div className="input">
                    <select
                      name="city"
                      disabled={!selectedDistrict}
                      onChange={handleCityChange}
                      value={selectedCity}
                    >
                      <option value="">Select City</option>
                      {cities.map((city, index) => (
                        <option key={index} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="multi-input-2">
                <div className="single-input">
                  <label htmlFor="nic">NIC</label>
                  <div className={`input ${nicError ? 'input-error' : ''}`}>
                    <BadgeIcon className="icon" />
                    <input
                      type="text"
                      name="nic"
                      placeholder="Enter Identity Number"
                      value={nic}
                      onChange={handleNicChange}
                    />
                  </div>
                  {nicError && <p className="error-text">Enter a valid NIC</p>}
                </div>
                <div className="single-input">
                  <label htmlFor="mobile">Mobile Number</label>
                  <div className={`input ${mobileError ? 'input-error' : ''}`}>
                    <PhoneIcon className="icon" />
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Enter Mobile Number"
                      value={mobile}
                      onChange={handleMobileChange}
                    />
                  </div>
                  {mobileError && (
                    <p className="error-text">Enter a valid Mobile</p>
                  )}
                </div>
              </div>

              <button type="button" className="next-btn" onClick={nextStep}>
                <span>Next</span>
                <NavigateNextIcon className="icon" />
              </button>
            </div>

            {/* Second step */}
            <div className={`form-step ${step === 2 ? 'active' : ''}`}>
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

              <div className="single-input">
                <label htmlFor="email">Email</label>
                <div className={`input ${emailError ? 'input-error' : ''}`}>
                  <MailIcon className="icon" />
                  <input
                    type="text"
                    name="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                    // className={emailError ? 'error-border' : ''}
                  />
                </div>
                {emailError && (
                  <p className="error-text">Invalid Email Address</p>
                )}
              </div>
              <div className="single-input">
                <label htmlFor="password">Password</label>
                <div className={`input ${passwordError ? 'input-error' : ''}`}>
                  <LockIcon className="icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      validatePasswordMatch();
                    }}
                    onBlur={validatePasswordMatch}
                  />
                </div>
                {passwordError && (
                  <p className="error-text">Passwords Do no Match!</p>
                )}
              </div>
              <div className="single-input">
                <label htmlFor="password">Confirm Password</label>
                <div className={`input ${passwordError ? 'input-error' : ''}`}>
                  <LockIcon className="icon" />
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password again"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      validatePasswordMatch();
                    }}
                    onBlur={validatePasswordMatch}
                  />
                </div>
                {passwordError && (
                  <p className="error-text">Passwords Do no Match!</p>
                )}
              </div>

              <div className="button-section">
                <button type="button" onClick={prevStep} className="prev-btn">
                  <ArrowBackIcon className="icon" />
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="register-btn"
                >
                  <span>Register</span>
                  <LoginIcon className="icon" />
                </button>
              </div>
            </div>
          </form>
        </div>

        <div className="video-section">
          <video src={fireVideo} autoPlay muted loop></video>
          <div className="video-overlay"></div>

          <div className="text">
            <h2 className="title">
              <span>Together </span><span> We are Stronger</span>
            </h2>
            <p>Be a part of our Community</p>
          </div>

          <div className="button-section">
            <span className="text">Already have an account?</span>
            <Link to={'/signin'}>
              <button className="btn">Sign in</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}