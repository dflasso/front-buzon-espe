import axios from 'axios';


export const clientBackendHeroko = axios.create({
    baseURL: 'https://buzonespe.herokuapp.com'
});

export const clientBackendHerokoFiles = axios.create({
    baseURL: 'https://buzonespe.herokuapp.com',
    responseType:  'blob'
});