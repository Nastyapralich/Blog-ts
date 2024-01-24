import { create } from "apisauce";
import { ActivateUserData, SignInUserData, SignUpUserData } from "../../redux/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const signUpUser = (data: SignUpUserData) => {
  return API.post("/auth/users/", data);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const getPosts = () => {
  return API.get("/blog/posts/?limit=12"); // возвращаем 12 постов
};

// const signInUser = (data:SignInUserData) => {
//   return API.post("/auth/users/activation/", data)
// }

const createToken = (data:SignInUserData) => {
  return API.post('/auth/jwt/create', data)
}

const getSinglePost = (id:string) =>{
  return API.get(`/blog/posts/${id}/`)
}

const getUserInfo = (token:string) => {
return API.get('/auth/users/me/', {}, {
  headers:{
    Authorization: `Bearer ${token}`
}})
}

export default { signUpUser,activateUser, getPosts, createToken, getSinglePost, getUserInfo };
