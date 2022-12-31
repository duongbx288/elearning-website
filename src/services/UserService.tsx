import axios from 'axios';

export type UserInfo = {
    id?: number;
    userId?: number;
    username?: string;
    studentId?: number;
    teacherId?: number;
    affiliateId?: number;
    status?: string;
}

class UserService {

    getUserInfoByUsername(username: string) {
        return axios.get(`/api/login/username=${username}`);
    }
}

export default new UserService();
