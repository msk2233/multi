import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5050",
    withCredentials: true,
  });

//mock API
let API_URL = 'http://localhost:5050';
   export function callApi(endpoint:any, method = 'GET', body:any) {
       return axios({
           method,
           url: `${API_URL}/${endpoint}`,
           data: body
       }).catch(err => {
           console.log(err);
       });
}
  
  export default axiosInstance;