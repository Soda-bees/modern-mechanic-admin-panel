import axios from 'axios';

// const baseURL = 'http://192.168.100.199:5000/'
const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const axiosInstance = axios.create({
    baseURL, 
    timeout: 15000,                            
    headers: {
        'Content-Type': 'application/json',      
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            const errorData = {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
                message: error.response.data?.message || 'Something went wrong',
            };
            return Promise.reject(errorData); 
        } else if (error.request) {
            console.error('No Response Received:', error.request);
            return Promise.reject({ message: 'No response from server', request: error.request });
        } else {
            console.error('Request Setup Error:', error.message);
            return Promise.reject({ message: error.message });
        }
    }
);

export { axiosInstance, baseURL };