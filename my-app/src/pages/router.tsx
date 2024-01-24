import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AllPosts from "./allPosts/allPosts";
import SignUp from "./sigUp/signUp";
import RegistrationConfirmation from "./registrationConfirmation/registrationConfirmation";
import SignIn from "./signIn/signIn";
import Header from "../components/header/header";
import SelectedPost from "./selectedPost/selectedPost";
import { useDispatch, useSelector } from "react-redux";
import { AuthSelectors, getUserInf } from "../redux/reducers/authSlice";
// import FavouritePosts from "./favouritePosts/favouritePosts";

export enum RoutesList {
  AllPosts = "/",
  SignUp = "/sign-up",
  SignIn = "/sign-in",
  RegistrationConfirmation = "/activate/:uid/:token",
  FavouritePosts = "/favourite-posts",
  SelectedPost = "/post/:id",
  Default = "*",
}

const Router = () => {



  const dispatch = useDispatch()

  const isLoggedIn = useSelector(AuthSelectors.getLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserInf());
    }
  }, [isLoggedIn]);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesList.AllPosts} element={<Header />}>
          <Route path={RoutesList.AllPosts} element={<AllPosts />} />
          <Route path={RoutesList.SignUp} element={!isLoggedIn ? <SignUp /> : <Navigate to={RoutesList.AllPosts} />} />
          <Route path={RoutesList.SignIn} element={<SignIn />} />
          <Route
            path={RoutesList.SelectedPost}
            element={<SelectedPost/>}
          />
          <Route
            path={RoutesList.RegistrationConfirmation}
            element={<RegistrationConfirmation />}
          />
          <Route
            path={RoutesList.Default}
            element={<Navigate to={RoutesList.AllPosts} />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
