import axios from 'axios'
import router from './router/index.js'
// http request 拦截器
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://192.168.191.1:3000'

axios.interceptors.request.use(
    config => {
        if (localStorage.getItem('jwtToken')) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.common['Authorization'] = localStorage.getItem('jwtToken');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        console.log('响应成功了....')
        return response;
    },
    error => {
        console.log('响应失败了....')
        console.log(error.response.status);
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    //store.commit(types.LOGOUT);
                    
                    localStorage.removeItem('jwtToken');
                    localStorage.removeItem('username');
                    localStorage.removeItem('weixin');
                    localStorage.removeItem('phone');
                    router.currentRoute.path !== 'mine' &&
                    router.replace({
                        path: 'mine',
                        query: {redirect: router.currentRoute.fullPath}
                    });
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });

export default axios