import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LoginContext } from "../contexts/LoginContext";

const Hello = () => {
  const { setThisuser, userID } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {}, [userID]);

  return <div>hello</div>;
};

export default Hello;
