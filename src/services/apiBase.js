import axios from 'axios'
import store from '../vuex/index'
import route from '../router/index'
const apiConfig = {
    baseURL: '',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest:[function(data,headers){
        const token = store.state.token || localStorage.getItem('token');
        if(token)
            headers.Authorization = 'Bearer ' + token;
        else
            route.push('/login');
        return data;
    }, function(err){
        return err;
    }],
    transformResponse:[function(response){
        if(response.status === 200){
            return response.data;
        }else
        if (response.status === 500 || response.status === 502 || response.status === 404) {
            //todo
        }
        return response;
    }]
};

const instance  = axios.create(apiConfig);
export default instance;