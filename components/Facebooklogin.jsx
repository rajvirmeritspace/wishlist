import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { useRouter } from "next/router";
import { useContext } from "react";
import { LoginContext } from "../contexts/LoginContext";
import axios from "axios";

const Facebooklogin = () => {
  const router = useRouter();
  const { setUserName } = useContext(LoginContext);

  const responseFacebook = async (response) => {
    localStorage.setItem("token", response.accessToken);
    setUserName(response.name);
    if (response) {
      axios.post("https://hellowishlist.herokuapp.com/api/user/signup", {
        name: response.name,
        userID: response.userID,
      });
      router.push(`/${response.userID}`);
    }
  };

  return (
    <FacebookLogin
      appId="391797443133201"
      callback={responseFacebook}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>Login with Facebook</button>
      )}
    />
  );
};

export default Facebooklogin;
