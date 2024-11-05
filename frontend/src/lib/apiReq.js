import axios from "axios";

const apiReq = axios.create({
  baseURL: 'https://54.226.226.243:8800/api',
  withCredentials: true,
});

export default apiReq;
