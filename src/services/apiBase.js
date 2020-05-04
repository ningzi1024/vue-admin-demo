import axios from 'axios'
import store from '../store/index'
import route from '../router/index'
import cache from '../utils/cache'

const dev = process.env.NOOD_ENV==="development";
console.log(process.env.NODE_ENV,dev);
const apiConfig = {
    baseURL: '',
    timeout: 10000,
    headers:{
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    transformRequest:[function(data,headers){
        const token = store.state.token || cache.token;
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
        if(typeof response === 'string'){
            try {
                response = JSON.parse(response);
            }catch (e) {
                console.log('解析失败');
            }
        }

        if(response.status && response.status === 200){
            return response;
        }else
        if (response.status && response.status === 500 || response.status === 502 || response.status === 404) {
            this.$message({
                type: "error",
                showClose: true,
                message: '网络异常，请稍后重试！'
            })
        }else{
            return response;
        }
    }]
};

const instance  = axios.create(apiConfig);
export default instance;