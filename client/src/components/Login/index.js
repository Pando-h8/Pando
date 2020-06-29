import React, { useState } from "react";
import "./Form.css";
import { useMutation } from "@apollo/react-hooks";
import { LOGIN } from "../../queries/UserQueries";
import { useHistory } from "react-router-dom";

const Login = () => {
  const history = useHistory();
  const [login] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      if (data.login.access_token) {
        localStorage.setItem("access_token", data.login.access_token);
        history.replace("/plants");
      } else {
        console.log(data.login.errorCode, data.login.message);
      }
    },
  });
  const [inputForm, setInputForm] = useState({
    email: "",
    password: "",
  });

  const submitLogin = async (e) => {
    e.preventDefault();
    const { email, password } = inputForm;
    await login({
      variables: {
        email,
        password,
      },
    });
  };

  const changeInput = (e) => {
    const { name, value } = e.target;

    const newInput = {
      ...inputForm,
      [name]: value,
    };

    setInputForm(newInput);
    console.log(inputForm);
  };

  return (
    <div className="login">
      <form className="login-form" onSubmit={submitLogin}>
        <input
          className="input-form"
          value={inputForm.name}
          name="email"
          onChange={changeInput}
          type="email"
          placeholder="EMAIL"
          required
        />
        <input
          className="input-form"
          value={inputForm.password}
          name="password"
          onChange={changeInput}
          type="password"
          placeholder="PASSWORD"
          required
        />
        <input className="input-btn" type="submit" value="LOGIN" />
      </form>
    </div>
  );
};

export default Login;
