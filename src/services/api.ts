import { AppError } from '@utils/AppError';
import axios from 'axios';

const api = axios.create({
    baseURL: 'http://172.23.140.171:3333',

});

//intercepitando dados a enviar
// api.interceptors.request.use((config) => {
//     return config;
// }, (error) => {
//     return Promise.reject(error)
// }); 

//intercepitando as respostas
api.interceptors.response.use(response => {
        console.log('dados recebidos => ', response.data);
        return response
    }, (error) => {
    if(error.response && error.response.data){
        return Promise.reject(new AppError(error.response.data.message));
    }else{
        return Promise.reject(new AppError('Erro no servidor. Tente novamente mais tarde.'));
    }
}); 

export {api};