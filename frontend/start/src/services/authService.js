const { default: http } = require("./httpService");

export async function signUpApi(data) {
  return http.post("/user/signup", data).then(({ data }) => data.data);
}

export async function signInApi(data) {
  return http.post("/user/signin", data).then(({ data }) => data.data);
}

export async function getUserApi() {
  return http.get("/user/profile").then(({ data }) => data.data);
}
