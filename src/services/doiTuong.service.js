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




const getListCustomerGroup = () => {
    return axios.get(`${API_URL}/customer-group`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getCustomerGroup = ({ id }) => {
    return axios.get(`${API_URL}/customer-group/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postCustomerGroup = ({ values }) => {
    return axios.post(`${API_URL}/customer-group`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};




const getListCustomer = () => {
    return axios.get(`${API_URL}/customer`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getCustomer = ({ id }) => {
    return axios.get(`${API_URL}/customer/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postCustomer = ({ values }) => {
    return axios.post(`${API_URL}/customer`,
        {
            ...values,
            "status": "ACTIVE",
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};









const getListProductGroup = () => {
    return axios.get(`${API_URL}/product-group`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getProductGroup = ({ id }) => {
    return axios.get(`${API_URL}/product-group/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postProductGroup = ({ values }) => {
    return axios.post(`${API_URL}/product-group`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};




const getListProduct = () => {
    return axios.get(`${API_URL}/product`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getProduct = ({ id }) => {
    return axios.get(`${API_URL}/product/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postProduct = ({ values }) => {
    return axios.post(`${API_URL}/product`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};






const getListBankAccount = () => {
    return axios.get(`${API_URL}/bank-account`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const getBankAccount = ({ id }) => {
    return axios.get(`${API_URL}/bank-account/${id}`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};

const postBankAccount = ({ values }) => {
    return axios.post(`${API_URL}/bank-account`,
        {
            ...values
        },
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};






const getListAccountant = () => {
    return axios.get(`${API_URL}/employee/accountant`,
        {
            headers: {
                "Content-Type": "application/json",
            }
        });
};





const getListSalesperson = () => {
    return axios.get(`${API_URL}/employee/salesperson`,
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

    getListCustomerGroup,
    getCustomerGroup,
    postCustomerGroup,

    getListCustomer,
    getCustomer,
    postCustomer,

    getListProductGroup,
    getProductGroup,
    postProductGroup,

    getListProduct,
    getProduct,
    postProduct,

    getListBankAccount,
    getBankAccount,
    postBankAccount,

    getListAccountant,

    getListSalesperson,
};

export default doiTuongService;