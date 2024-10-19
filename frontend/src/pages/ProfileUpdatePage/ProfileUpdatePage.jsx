import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiReq from '../../lib/apiReq';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import UploadWidget from '../../components/UploadWidget/UploadWidget';
import { locations } from '../../lib/LocationData';


export const ProfileUpdatePage = () => {
  const { currentUser, updateUser } = useContext(AuthContext);
  const [avatar, setAvatar] = useState([]);

   const [selectedProvince, setSelectedProvince] = useState(currentUser.province || '');
  const [selectedDistrict, setSelectedDistrict] = useState(currentUser.district || '');
  const [selectedCity, setSelectedCity] = useState(currentUser.city || '');

  const navigate = useNavigate();

  useEffect(() => {
    if (selectedProvince) {
      const province = locations.provinces.find(prov => prov.name === selectedProvince);
      if (province && !province.districts.find(district => district.name === selectedDistrict)) {
        setSelectedDistrict('');
      }
    }
  }, [selectedProvince]);


  useEffect(() => {
    if (selectedDistrict) {
      const province = locations.provinces.find(prov => prov.name === selectedProvince);
      const district = province?.districts.find(dist => dist.name === selectedDistrict);
      if (district && !district.cities.includes(selectedCity)) {
        setSelectedCity('');
      }
    }
  }, [selectedDistrict]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { fname, lname, address, mobile } = Object.fromEntries(formData);

    try {
      const res = await apiReq.put(`/users/${currentUser.id}`, {
        fname,
        lname,
        address,
        province: selectedProvince,
        district: selectedDistrict,
        city: selectedCity,
        mobile,
        avatar: avatar[0],
      });

      updateUser(res.data);
      toast.success('User Updated');
      navigate('/profile');
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    setSelectedCity('');
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedCity('');
  };


  return (
    <div className="profileUpdatePage">
      <ToastContainer />
      <div className="wrapper">
        <div className="form-h">
          <h2>Update</h2>
          <div className="close">
            <Link to="/profile">
              <i className="fa-solid fa-xl fa-xmark"></i>
            </Link>
          </div>
        </div>
        <div className="profileImage">
          <div className="profileImage">
            <img src={avatar[0] || currentUser.avatar || '/no-avatar.png'} alt="profile-pic" />
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
        </div>
        <form className="update-form" onSubmit={handleSubmit}>
          <div className="form scrollbar">
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
                <label>Province</label>
                <select
                  name="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">Select Province</option>
                  {locations.provinces.map((province) => (
                    <option key={province.name} value={province.name}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="input-single">
                <label>District</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                >
                  <option value="">Select District</option>
                  {selectedProvince &&
                    locations.provinces
                      .find((prov) => prov.name === selectedProvince)
                      .districts.map((district) => (
                        <option key={district.name} value={district.name}>
                          {district.name}
                        </option>
                      ))}
                </select>
              </div>
              <div className="input-single">
                <label>City</label>
                <select
                  name="city"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select City</option>
                  {selectedDistrict &&
                    locations.provinces
                      .find((prov) => prov.name === selectedProvince)
                      .districts.find((dist) => dist.name === selectedDistrict)
                      .cities.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                </select>
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
            <button type="submit">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
};
