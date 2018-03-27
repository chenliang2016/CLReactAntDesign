/**
 * Created by cl on 2016/10/20.
 */
import fetch from 'isomorphic-fetch';

const fetchUtil = {};

fetchUtil.post = async (url,params) => {
    try {

        const token =  sessionStorage.getItem('token');
        let headers = {};
        if (token != undefined){
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer "+token,
            }
        }else{
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(params)
        });
        let data = await response.json();
        if (response.status === 200) {
            if (data.success){
                return data.data;
            }else{
                throw new Error(data.msg);
            }
        } else {
            throw new Error(response.status);
        }
    } catch (e) {
        throw new Error("网络请求异常");
    }
};

fetchUtil.get = async (url) => {
    try {

        const token =  sessionStorage.getItem('token');
        let headers = {};
        if (token != undefined){
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization":"Bearer "+token,
            }
        }else{
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        let response = await fetch(url, {
            method: 'GET',
            headers: headers,
        });
        let data = await response.json();
        if (response.status === 200) {
            if (data.success){
                return data.data;
            }else{
                throw new Error(data.msg);
            }
        } else {
            throw new Error(response.status);
        }
    } catch (e) {
        throw new Error("网络请求异常");
    }
};

fetchUtil.requestZhenDe = (apiUrl,params,method) => {
		let data = {
			url:apiUrl,
			params:params
		}

        let requestUrl = "";
        if (method == "get"){
            requestUrl = "/api/zhende/common/get";
        }else if (method == "post"){
            requestUrl = "/api/zhende/common/post";
        }

		return fetchUtil.post(requestUrl,data)
}

export default fetchUtil;
