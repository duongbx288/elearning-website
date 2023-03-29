import axios from 'axios';

export type TypeRequest = {
    id?: number;
    name?: string;
    cateImg?: string;
}

export type TypeResponse = {
    id: number;
    name: string;
}

class TypeService {

    getAllType = () => {
        return axios.get(`/api/type/`);
    };

    getTypeById = (id: number) => {
        return axios.get(`/api/type/${id}`);
    }

}

export default new TypeService();