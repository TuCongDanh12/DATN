import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

const getListDonBanHang = () => {
    return axios.get(`${API_URL}/don-ban-hang`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getDonBanHang = ({ id }) => {
    return axios.get(`${API_URL}/don-ban-hang/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postDonBanHang = ({ values }) => {
    return axios.post(`${API_URL}/don-ban-hang`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};


const banHangService = {
    getListDonBanHang,
    getDonBanHang,
    postDonBanHang,
};

export default banHangService;