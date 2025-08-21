import axios from "axios";


export const produtosApi = axios.create({
    baseURL: "https://crochedat.up.railway.app/v1",
    /*baseURL: "https://crochedat-back.onrender.com/v1",*/
});