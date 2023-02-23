import axios from 'axios';

export type UserInfo = {
    id?: number;
    // userId?: number;
    username?: string;
    studentId?: number;
    teacherId?: number;
    affiliateId?: number;
    status?: string;
    email?: string;
    password?: string;
    roles?: string;
}



class UserService {

    getUserInfoByUsername(username: string) {
        return axios.get(`/api/login/client/username=${username}`);
    }


    saveUserInfo = (userInfo : UserInfo) => {
        return axios.post(`/api/accounts/create`, userInfo).catch(function (error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log(error.response.data);
              console.log(error.response.status);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log('Error', error.message);
            }
          });
    }

}

export default new UserService();
