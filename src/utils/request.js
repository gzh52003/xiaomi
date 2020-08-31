//二次封装axios
import axios from 'axios';


//创建一个新的axios
const request = axios.create({
    baseURL: 'http://localhost:2003/api', //基础路径
    // timeout: 3000 //请求时间超过3s;如果3s后都没有响应，就断开连接
    //工作后请求需要带token过去，token如果不设置是没有响应的
    //headers:{'Authorization':'asdasdfasdfgasdfgasd'}
    withCredentials: true
    //跨域（验证码）
});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request; //将封装好的request导出