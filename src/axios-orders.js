import axios from 'axios';
const instance = axios.create({
    baseURL : 'https://react-my-burger-5d607.firebaseio.com/'
});

export default instance;