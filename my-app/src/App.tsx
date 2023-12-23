import { useState } from "react";
import "./App.css";
import Burger from "./components/burger";
import Button, { ButtonType } from "./components/button";
import Input from "./components/input/input";
import Title from "./components/title/title";
import UserName from "./components/username/uersname";
import Post, { PostCardSize } from "./components/postCard/card";
import SignUp from "./pages/sigUp/signUp";
import RegistrationConfirmation from "./pages/registrationConfirmation/registrationConfirmation";
import SignIn from "./pages/signIn/signIn";
import Success from "./pages/success/success";
import SelectedPost from "./pages/selectedPost/selectedPost";
import CardList from "./components/cardList/cardList";
import AllPosts from "./pages/allPosts/allPosts";


function App() {
  return (
<SignIn/>
  );
}

export default App;
