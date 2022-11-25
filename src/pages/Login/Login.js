import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import Message from "../../components/Message/Message";
import fetchApi from "../../utils/fetch";
import { handleChange } from "../../utils/handleChange";
import showMessage from "../../utils/showMessage";
import ConfigApi from "../../configApi";

function Login() {
  const [loginInformation, setLoginInformation] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState({ show: false, text: "", status: "" });

  const navigate = useNavigate();

  async function makeLogin() {
    const validateEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // ^ Regex extraído da seguinte fonte: https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript

    function validatePassword(password) {
      if (password.length < 8 || password === password.toLowerCase()) {
        return false;
      }

      return true;
    }

    const validEmail = validateEmail.test(loginInformation.email);
    const validPassword = validatePassword(loginInformation.password);

    if (!validEmail || !validPassword) {
      return showMessage(
        setMessage,
        "Email ou senha em formato incorreto.",
        "error"
      );
    } else if (ConfigApi.IS_API_MOCK) {
      localStorage.setItem("user", JSON.stringify(ConfigApi.user));
      localStorage.setItem("token", JSON.stringify(ConfigApi.testToken));
      navigate("/");
    }

    const options = {
      method: "POST",
      body: JSON.stringify(loginInformation),
    };

    if (!ConfigApi.IS_API_MOCK) {
      const {
        user,
        message: apiMessage,
        token,
      } = await fetchApi(ConfigApi.url + "/login", options);
      if (apiMessage === "Login efetuado com sucesso!") {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
        navigate("/");      
      } else {
        showMessage(setMessage, apiMessage, "error");
      }
    }
  }

  return (
    <main data-testid="login-id">
      {message.show && (
        <Message addClass={message.status}>{message.text}</Message>
      )}
      <form>
        <label htmlFor="email">
          Email:
          <input
            className="form-input"
            id="email"
            name="email"
            data-testid="email-id"
            type="text"
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            className="form-input"
            id="password"
            data-testid="password-id"
            name="password"
            type="password"
            onChange={(e) => handleChange(e, setLoginInformation)}
          />
        </label>
        <Button
          addClassName="form-button"
          dataTestId="login-button-id"
          onClickFunction={makeLogin}
        >
          Entrar
        </Button>
      </form>
    </main>
  );
}

export default Login;
