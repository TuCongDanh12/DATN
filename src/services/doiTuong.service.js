import axios from "axios";

const API_URL = `${process.env.REACT_APP_SERVER_URL}`;

const getListSupplier = () => {
    return axios.get(`${API_URL}/supplier`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getSupplier = ({ id }) => {
    return axios.get(`${API_URL}/supplier/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postSupplier = ({ values }) => {
    return axios.post(`${API_URL}/supplier`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};




const getListSupplierGroup = () => {
    return axios.get(`${API_URL}/supplier-group`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getSupplierGroup = ({ id }) => {
    return axios.get(`${API_URL}/supplier-group/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postSupplierGroup = ({ values }) => {
    return axios.post(`${API_URL}/supplier-group`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const doiTuongService = {
    getListSupplier,
    getSupplier,
    postSupplier,
    getListSupplierGroup,
    getSupplierGroup,
    postSupplierGroup,
};

export default doiTuongService;