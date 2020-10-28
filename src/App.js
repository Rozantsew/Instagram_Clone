import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";
import ModalComponent from "./components/modal/Modal";
import Post from "./components/post/Post";
import ImageUpload from "./components/imageUpload/ImageUpload";
import { UserContext } from "./context/UserContext";
import InstagramEmbed from "react-instagram-embed";
import {
  PostWrapper,
  GridContainter,
  PostLeftWrapper,
  PostRightWrapper,
} from "./components/postWrapper/PostWrapper";

function App() {
  const { username, user } = useContext(UserContext);
  console.log(user);
  // console.log(user.displayName);
  return (
    <div className="app">
      <div className="app__header">
        <img
          src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
          alt="instagram logo"
        />
        {/*<ImageUpload />*/}
        <ModalComponent />
        {/* <HeaderButtons /> */}
      </div>
      <PostWrapper>
        <PostLeftWrapper>
          <Post />
        </PostLeftWrapper>
        <PostRightWrapper>
          <InstagramEmbed
            url="https://instagr.am/p/Zw9o4/"
            // maxWidth={320}
            hideCaption={false}
            containerTagName="div"
            injectScript
            protocol=""
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
        </PostRightWrapper>
      </PostWrapper>

      {user?.displayName ? (
        <ImageUpload username={user.displayName} />
      ) : (
        <h3>Sorry you need to login to upload</h3>
      )}
    </div>
  );
}

export default App;
