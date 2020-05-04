import Api from './apiMethods'
const baseUrl = '/api/v1/';
const services = {
    refreshToken(data= {}){
        return Api.get(baseUrl+'pub/refresh_token' ,data)
    },
    gis(data={}){
        return Api.get(baseUrl+'gis', data)
    },
    hostgroup(data={}){
        return Api.get(baseUrl+'setting/hostgroup', data);
    },
    realtime(data){
        return Api.get(baseUrl+'realtime?type=hostgroup_overview', data)
    },
    status(data){
        return Api.get(baseUrl+'setting/function/status', data);
    },
    menus(data){
        return Api.get(baseUrl+'menus',data);
    }
}

export default services;