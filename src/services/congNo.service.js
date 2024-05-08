import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

const getListChungTuBan = () => {
    return axios.get(`${API_URL}/ctban`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};


const congNoService = {
    getListChungTuBan,
};

export default congNoService;