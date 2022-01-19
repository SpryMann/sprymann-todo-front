import React, { useState, useContext, useEffect } from "react";
import { Context } from "./../";
import { signIn, signUp } from "../http/auth";

const Form = () => {
  const { user } = useContext(Context);
  const [mode, setMode] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    user.isAuthorizedEver ? setMode("signin") : setMode("signup");
  }, [user.isLogged]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { usr, psd } = event.target;
    if (mode === "signup") {
      signUp(usr.value, psd.value)
        .then((data) => {
          setErrorMsg("");
          setUsername("");
          setPassword("");
          setMode("signin");
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
    } else if (mode === "signin") {
      signIn(usr.value, psd.value)
        .then((data) => {
          setErrorMsg("");
          setUsername("");
          setPassword("");
          localStorage.setItem("user", data.token);
          localStorage.setItem("authorizedEver", true);
          user.setIsLogged(true);
        })
        .catch((err) => {
          setErrorMsg(err.response.data.message);
        });
    }
  };

  return (
    <div className="authorization">
      <h2 className="authorization__title">
        {mode === "signup" ? "Регистрация" : "Авторизация"}
      </h2>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p className="error">{errorMsg}</p>
        <div className="input-control">
          <label>Логин:</label>
          <input
            name="usr"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-control">
          <label>Пароль:</label>
          <input
            name="psd"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {mode === "signup" ? (
          <p>
            Уже есть аккаунт?{" "}
            <span onClick={() => setMode("signin")}>Авторизуйся</span>
          </p>
        ) : (
          <p>
            Еще нет аккаунта?{" "}
            <span onClick={() => setMode("signup")}>Зарегистрируйся</span>
          </p>
        )}
        <button className="btn">
          {mode === "signup" ? "Зарегистрироваться" : "Авторизоваться"}
        </button>
      </form>
    </div>
  );
};

export default Form;
