import axios from 'axios'
import store from '../store/index'
import route from '../router/index'

const dev = process.env.NOOD_ENV==='development';
console.log(dev);
const apiConfig = {
    baseURL: '',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest:[function(data,headers){
        const token = store.state.token || localStorage.getItem('token');
        // if(dev)
            headers['x-custom-authtoken'] = 'MjFmNzg2YWFlN2FlZmEzOWEzNDA3MjIwOGI2NWYwNTU=';
        if(token)
            headers.Authorization = 'Bearer ' + token;
        else
            route.push('/login');
        return data;
    }, function(err){
        return err;
    }],
    transformResponse:[function(response){
        if(typeof response === 'string')
                response = JSON.parse(response);      
        if(response.status === 200){
            console.log(response);
        }else
        if (response.status === 500 || response.status === 502 || response.status === 404) {
            //todo
            return response;
        }
        return response;
    }]
};

const instance  = axios.create(apiConfig);
export default instance;