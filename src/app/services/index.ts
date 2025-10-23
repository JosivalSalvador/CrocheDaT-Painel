import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://back-8atrh3x8.b4a.run/v1",
    withCredentials: true,
    /*baseURL: "https://crochedat-back.onrender.com/v1",*/
});