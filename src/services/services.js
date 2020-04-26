import Api from './apiMethods'
const baseUrl = '/api/v1/';
const ApiList = {
    refreshToken(data= {}){
        return Api.get(baseUrl+'pub/refresh_token' ,data)
    },
    gis(data={}){
        return Api.get(baseUrl+'gis', data)
    }
}

export default ApiList;