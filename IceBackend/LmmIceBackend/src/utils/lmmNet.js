import axios from 'axios';
import { Feedback } from '@icedesign/base';

import { createHashHistory } from 'history';
const hashHistory = createHashHistory();

const lmmNet = {};

lmmNet.get = async (url,params) => {
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

        var instance = axios.create({
            params:params,
            timeout: 1000,
            headers: headers,
        });

        let lmmNetPost = new Promise((resolve,reject) => {
            instance
            .get(url)
            .then((response) => {
                if (response.status == 200){
                    if (response.data.success){
                        resolve(response.data.data);
                    }else{
                        Feedback.toast.error(response.data.msg);
                        reject(response.data.msg);
                    }
                }else if(response.status == 401){
                    hashHistory.replace('/login');
                }else{
                    Feedback.toast.error('网络异常');
                }
            })
            .catch((error) => {
              console.log(error);
              hashHistory.replace('/login');
            });
        })
        return lmmNetPost;
    } catch (e) {
        throw new Error("网络请求异常");
        hashHistory.replace('/login');
    }
};

lmmNet.post = async (url,params) => {
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

        var instance = axios.create({
            timeout: 1000,
            headers: headers,
        });

        let lmmNetPost = new Promise((resolve,reject) => {
            instance
            .post(url,params)
            .then((response) => {
                if (response.status == 200){
                    if (response.data.success){
                        resolve(response.data.data);
                    }else{
                        Feedback.toast.error(response.data.msg);
                        reject(response.data.msg);
                    }
                }else if(response.status == 401){
                    hashHistory.replace('/login');
                }else{
                    Feedback.toast.error('网络异常');
                }
            })
            .catch((error) => {
              console.log(error);
              hashHistory.replace('/login');
            });
        })
        return lmmNetPost;
    } catch (e) {
        throw new Error("网络请求异常");
        hashHistory.replace('/login');
    }
};

export default lmmNet;