import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { REGISTER } from "../../queries/UserQueries";
import { useHistory } from "react-router-dom";

const Register = () => {
  const history = useHistory();
  const [regis] = useMutation(REGISTER, {
    onCompleted: async (data) => {
      if (data.register.access_token) {
        localStorage.setItem("access_token", data.register.access_token);
        history.replace("/plants");
      } else {
        console.log(data.register.errorCode, data.register.message);
      }
    },
  });
  const [inputForm, setInputForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const changeInput = (e) => {
    const { name, value } = e.target;

    const newInput = {
      ...inputForm,
      [name]: value,
    };
    setInputForm(newInput);
    console.log(inputForm);
  };

  const submitReg = async (e) => {
    e.preventDefault();
    const { name, email, password } = inputForm;
    await regis({
      variables: {
        name,
        email,
        password,
      },
    });
    console.log("register!");
  };

  return (
    <div className="register">
      <form className="register-form" onSubmit={submitReg}>
        <input
          className="input-form"
          value={inputForm.email}
          name="email"
          onChange={changeInput}
          type="email"
          placeholder="EMAIL"
          required
        />
        <input
          className="input-form"
          value={inputForm.name}
          name="name"
          onChange={changeInput}
          type="text"
          placeholder="USERNAME"
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
        <input className="input-btn" type="submit" value="REGISTER" />
      </form>
    </div>
  );
};

export default Register;
