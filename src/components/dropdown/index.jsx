import React, { useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import "./dropdown.css";
import { unauthorization } from "../../middleware";

const handlerLogout = (e) => {
  e.preventDefault();
  axios
    .get(
      `https://abionew.herokuapp.com/api/logout`,

      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
        },
      }
    )
    .then((response) => {
      unauthorization();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((error) => {
      Swal.fire({
        position: "top-end",
        icon: "errore",
        title: "something went wrong",
        showConfirmButton: false,
        timer: 1500,
      });
    });
};

const Dropdown = ({ userShow }) => {
  return (
    <section>
      <div className="dropdown">
        <ul
          className={
            userShow ? " dropdown__content_active" : "dropdown__content"
          }
        >
          <li>
            <Link to="#">
              <div className="items_item" onClick={handlerLogout}>
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
                <p className="sign_out">Log Out</p>
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
};

export default Dropdown;
