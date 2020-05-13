import axios from 'axios'

import store from './store'

axios.defaults.baseURL =" http://musicapi.leanapp.cn/";

// axios.defaults.baseURL = 'https://music.tryto.cn';

// 拦截器
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么：每次请求前，显示loading
    store.state.isload = true;
    return config;
});

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么：请求到数据之后，隐藏loading
    setTimeout(() => {
        store.state.isload = false;
    }, 800)
    return response;
});

function get(url){
    return new Promise((resolve,reject)=>{
        axios.get(url).then(res=>{
            resolve(res.data)
        }).catch(error=>{
            reject(error)
        })
    })
}

export default get