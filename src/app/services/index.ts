import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://crochedat.zeabur.app/v1",
    withCredentials: true,
    /*baseURL: "https://crochedat-back.onrender.com/v1",*/
});