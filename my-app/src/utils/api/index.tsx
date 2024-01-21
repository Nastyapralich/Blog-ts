import { create } from "apisauce";
import {
  ActivateUserData,
  SignInData,
  SignUpUserData,
} from "../../redux/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const getPosts = () => {
  return API.get("/blog/posts/?limit=12"); // возвращаем 12 постов
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const getSinglePost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const createToken = (data: SignInData) => {
  return API.post(`/auth/jwt/create/`, data);
};

const getUserInfo = (token: string) => {
  return API.get(
    `/auth/users/me/`,
    {},
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export default {
  signUpUser,
  getPosts,
  activateUser,
  getSinglePost,
  createToken,
  getUserInfo,
};

// const api = create({
//   baseURL: "https://api.kinopoisk.dev/",
//   headers: {
//    "X-API-KEY": 'E2QYT1X-DJN4CDF-JRXF6KG-2VVE2V1'
//   }
// })

// const testApi = () => {
//   return api.get("v1.4/list?page=1&limit=5")
// }
