import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://crochedat-back.osc-fr1.scalingo.io/v1",
    withCredentials: true,
    /*baseURL: "https://crochedat-back.onrender.com/v1",*/
});