import { produtosApi } from ".";


export async function login(user: string, password: string) {
  return produtosApi
    .post("/login", { user, password }, { withCredentials: true })
    .then((res) => res.data);
}

export async function logout() {
  return produtosApi
    .post("/logout", {}, { withCredentials: true })
    .then((res) => res.data);
}

export async function getSession() {
  return produtosApi
    .get("/session", { withCredentials: true })
    .then((res) => res.data);
}
