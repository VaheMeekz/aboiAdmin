import React, { useState } from "react";
import { Container, Col } from "react-bootstrap";
import styles from "./user.module.css";
import Swal from "sweetalert2";
import axios from "axios";
import { keys } from "../../keys";
import { useDispatch, useSelector } from "react-redux";
import { userActionData } from "../../redux/actions/usersActoion";
const EditUser = ({ i }) => {
  const [blackList, setBlackList] = useState(false);
  const [getblackList, setGetBalackList] = useState({});
  const [curentdata, setCurentData] = useState({});

  const handlerGetBlackList = (e) => {
    getblackList[e.target.name] = e.target.value;
    setGetBalackList(getblackList);
  };
  const dispatch = useDispatch();

  const handlerDelete = (id) => {
    axios
      .post(
        `${keys.API_URI}/user/delete`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        dispatch(userActionData());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handlerAddBalcList = (e) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/black-list/insert`,
        {
          ...getblackList,
          id: curentdata.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setBlackList(false);
        setGetBalackList({});
        setCurentData({});
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };
  return (
    <>
      <tbody>
        <tr className={styles.th_body}>
          <td>{i.name}</td>
          <td>{i.email}</td>
          <td>{i.phone}</td>
          <td>
            <div className={styles.item_block}>
              <button
                onClick={() => handlerDelete(i.id)}
                className={styles.button}
              >
                Ddlete
              </button>
            </div>
          </td>
          <td>
            <button
              onClick={() => {
                setBlackList(true);
                setCurentData({
                  id: i.id,
                  phone: i.phone,
                  adress: i.email,
                });
              }}
              className={styles.button}
            >
              add bllack list
            </button>
          </td>
        </tr>
        <tr>
          <td colSpan={5} rowSpan={5}>
            {blackList ? (
              <>
                <div className={styles.line}>
                  <i class="fa-solid fa-arrow-down-long"></i>
                </div>
                <form
                  action=""
                  onChange={handlerGetBlackList}
                  onSubmit={handlerAddBalcList}
                  className={styles.form_edit}
                >
                  <select name="phone_address" id="" className={styles.select}>
                    <option value="">usersetings</option>
                    <option value={curentdata.phone}>{curentdata.phone}</option>
                    <option value={curentdata.adress}>
                      {curentdata.adress}
                    </option>
                  </select>
                  <select name="type" id="" className={styles.select}>
                    <option value="">for what?</option>
                    <option value="մի ընդունեք պատվերներ">
                      dont add order
                    </option>
                    <option value="մի առաքեք">dont delevry</option>
                    <option value="նախապաես զանգահարեք">call</option>
                  </select>
                  <button type="submit" className={styles.button}>
                    Add
                  </button>
                  <button
                    onClick={() => setBlackList(false)}
                    className={styles.buttons}
                  >
                    Close
                  </button>
                </form>
              </>
            ) : null}
          </td>
        </tr>
      </tbody>
    </>
  );
};

export default EditUser;
