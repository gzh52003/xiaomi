import axios from 'axios';


//创建一个新的axios
const request = axios.create({
    baseURL: 'http://localhost:2003/api',

});


// export const nsg = axios.create({
//     baseURL:'http://www.nsg.com'
// });

// axios.get(url,config)
// axios.post(url,data,config)

export default request;