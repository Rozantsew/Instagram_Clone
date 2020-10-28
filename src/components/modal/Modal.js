import React, { useState, useEffect, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import { UserContext } from "../../context/UserContext";
import {
  StyledForm,
  StyledInput,
  LogoWrapper,
  LoginContainer,
} from "./Modal.style";
import { auth } from "../../firebase";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const singUp = (event) => {};

const ModalComponent = (props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const {
    open,
    setOpen,
    openSignIn,
    setOpenSignIn,
    username,
    setUsername,
    password,
    setPassword,
    email,
    setEmail,
    user,
    setUser,
  } = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // user has logged in...

        setUser(authUser);
      } else {
        // user has logged out...

        setUser(null);
      }
    });
    return () => {
      //perform cleanup action
      unsubscribe();
    };
  }, [user, username]);

  const singUp = (event) => {
    event.preventDefault();

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
      })
      .catch((error) => alert(error.message));
  };

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div>
      {/*Modal sign up*/}

      <Modal open={open} onClose={() => setOpen(false)}>
        <div style={modalStyle} className={classes.paper}>
          <StyledForm>
            <LogoWrapper>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
                className="instagram__logo"
              />
            </LogoWrapper>

            <StyledInput
              type="text"
              placeholder="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <StyledInput
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit " onClick={singUp}>
              Sing up
            </Button>
          </StyledForm>
        </div>
      </Modal>
      {/*Modal Login*/}

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div style={modalStyle} className={classes.paper}>
          <StyledForm>
            <LogoWrapper>
              <img
                src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt="instagram logo"
                className="instagram__logo"
              />
            </LogoWrapper>

            <StyledInput
              type="text"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <StyledInput
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit " onClick={signIn}>
              Sign In
            </Button>
          </StyledForm>
        </div>
      </Modal>
      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <LoginContainer>
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </LoginContainer>
      )}
    </div>
  );
};

export default ModalComponent;
