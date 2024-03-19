import axios from "axios";
import request from "../api/axious";
// import authHeader from "./auth-header";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/don-mua-hang`;

const getListDonMuahang = () => {
  return axios.get(`${API_URL}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// const login = (phoneNumber, password) => {
//   return axios
//     .post(`${API_URL}/login`, {
//       phoneNumber, password
//     })
//     .then((response) => {
//       if (response.data.accessToken) {
//         localStorage.setItem("user", JSON.stringify(response.data));
//       }

//       return response.data;
//     });
// };

// const logout = () => {
//   return axios.post(`${API_URL}/logout`,
//       {
//       },
//       {
//           headers: authHeader()
//       },
//   );
// };

const muahangService = {
  getListDonMuahang,
};

export default muahangService;
