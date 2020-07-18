const axios = require('axios');

const axiosClient = () => {
    // const token = sessionStorage.getItem('token');
    // const token = process.env.TEST_TOKEN;
    return axios.create(
        {
            baseURL: 'https://localhost:5004',
            timeout: 30000,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}`
            },
        }
    );
};

export default axiosClient;