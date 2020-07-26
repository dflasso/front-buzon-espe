import axios from 'axios';


export const clientBackendHeroko = axios.create({
    baseURL: 'https://buzonespe.herokuapp.com'
});