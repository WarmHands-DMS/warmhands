import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MapWithPinInput } from '../../components/Map/Map';
import { locations } from '../../lib/LocationData'; // Import the locations data

export const IncidentReportPage = () => {
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Handle province change
  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedDistrict('');
    setSelectedCity('');
  };

  // Handle district change
  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedCity('');
  };

  // Handle city change
  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  // Get districts and cities based on selected province and district
  const availableDistricts =
    locations.provinces.find((prov) => prov.name === selectedProvince)
      ?.districts || [];
  const availableCities =
    availableDistricts.find((dist) => dist.name === selectedDistrict)?.cities ||
    [];

  const handlePinChange = (latitude, longitude) => {
    setLat(latitude);
    setLng(longitude);
  };

  return (
    <div className="IncidentReportPage">
      <div className="formContainer scrollbar">
        <h1>Report New Incident</h1>
        <div className="wrapper">
          <form>
            <div className="input-single">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <ReactQuill theme="snow" className="descbox" />
            </div>

            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="province">Province</label>
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
                <label htmlFor="district">District</label>
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={handleDistrictChange}
                  disabled={!selectedProvince}
                >
                  <option value="">Select District</option>
                  {availableDistricts.map((district) => (
                    <option key={district.name} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="input-single">
                <label htmlFor="city">City</label>
                <select
                  name="city"
                  value={selectedCity}
                  onChange={handleCityChange}
                  disabled={!selectedDistrict}
                >
                  <option value="">Select City</option>
                  {availableCities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="input-single">
              <label htmlFor="location">Map Location</label>
              <MapWithPinInput
                onPinChange={handlePinChange}
                height={'400px'}
                width={'100%'}
              />
            </div>

            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="latitude">Latitude</label>
                <input
                  id="latitude"
                  name="latitude"
                  type="text"
                  step="any"
                  value={lat}
                  readOnly
                />
              </div>
              <div className="input-single">
                <label htmlFor="longitude">Longitude</label>
                <input
                  id="longitude"
                  name="longitude"
                  type="text"
                  step="any"
                  value={lng}
                  readOnly
                />
              </div>
            </div>

            <div className="input-multi">
              <div className="input-single">
                <label htmlFor="deaths">Deaths</label>
                <input min={0} id="deaths" name="deaths" type="number" />
              </div>
              <div className="input-single">
                <label htmlFor="casualities">Casualties</label>
                <input
                  min={0}
                  id="casualities"
                  name="casualities"
                  type="number"
                />
              </div>
            </div>
            <div className="btn-sec">
              <button className="sendButton">Report</button>
            </div>
          </form>
        </div>
      </div>
      <div className="sideContainer"></div>
    </div>
  );
};
