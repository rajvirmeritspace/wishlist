import React, { useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Hello = () => {
  const { setThisuser, userID } = useContext(LoginContext);
  const router = useRouter();

  useEffect(() => {
    const getUserFromToken = async () => {
      const token = localStorage.getItem("token");
      await axios
        .get(`https://graph.facebook.com/me?access_token=${token}`)
        .then((response) => {
          setThisuser(response.data.name);
        });
    };
    getUserFromToken();
    router.push(`/${userID}`);
  }, [userID]);

  return <div>hello</div>;
};

export default Hello;
