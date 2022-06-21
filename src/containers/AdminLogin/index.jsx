import React, { useState } from "react";
import styles from "./adminLogin.module.css";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
const Login = () => {
  const [value, setValue] = useState({});
  const naviget = useNavigate();
  const handelgetinfo = (e) => {
    value[e.target.name] = e.target.value;
    setValue(value);
  };
  const handlersendLogpass = (e) => {
    e.preventDefault();

    axios
      .post(`https://abionew.herokuapp.com/api/login-admin`, {
        ...value,
      })
      .then((response) => {
        if (response.data.success) {
          localStorage.setItem(keys.token, response.data.token);
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
          naviget("/home");
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
          timer: 1500,
        });
      });
  };
  return (
    <section>
      <Container>
        <form
          action=""
          className={styles.big_blog_log}
          onChange={handelgetinfo}
          onSubmit={handlersendLogpass}
        >
          <h3>Login for manipulation</h3>
          <div className={styles.login_block}>
            <input type="text" placeholder="Email" name="email" />
          </div>
          <div className={styles.password_block}>
            <input type="password" placeholder="Password" name="password" />
          </div>
          <div className={styles.butt_send}>
            <button type="submit">Login</button>
          </div>
        </form>
      </Container>
    </section>
  );
};

export default Login;
