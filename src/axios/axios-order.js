import axios from 'axios';

const instance = axios.create({
    baseURL : 'https://burger-builder-ac7f3.firebaseio.com/'
})

export default instance