import React, { useState, createContext } from "react";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState("");

  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };
