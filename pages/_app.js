import { useState } from "react";
import { LoginContext } from "../contexts/LoginContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [userName, setUserName] = useState("");
  const [userID, setUserID] = useState("");
  return <LoginContext.Provider value={{userName, setUserName,userID, setUserID}}><Component {...pageProps} /></LoginContext.Provider> 
}

export default MyApp;
