import axios from 'axios'
/*解决后端返回数据中的大数字问题*/
import JSONbig from 'json-bigint'

const request = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
    // 定义后端返回的原始数据的处理
    // 参数 data 就是后端返回的原始数据（未经处理的 JSON 格式字符串）
    transformResponse: [function (data) {
        // Do whatever you want to transform the data
        // console.log(data)

        // 后端返回的数据可能不是 JSON 格式字符串
        // 如果不是的话，那么 JSONbig.parse 调用就会报错
        // 所以我们使用 try-catch 来捕获异常，处理异常的发生
        try {
            // 如果转换成功，则直接把结果返回
            return JSONbig.parse(data)
        } catch (err) {
            console.log('转换失败', err)
            // 如果转换失败了，则进入这里
            // 我们在这里把数据原封不动的直接返回给请求使用
            return data
        }

        // axios 默认在内部使用 JSON.parse 来转换处理原始数据
        // return JSON.parse(data)
    }]
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    const token = window.sessionStorage.getItem('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
});

// 添加响应拦截器
request.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
});

export default request