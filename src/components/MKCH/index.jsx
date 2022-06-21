import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import { Container, Col, Row } from "react-bootstrap";
import styles from "./mkch.module.css";
// import { bannerInfo } from "../../redux/actions/bannerAction";
// import { useDispatch } from "react-redux";
const MKCH = ({ image }) => {
  const [img, setImage] = useState();
  const [value, setValue] = useState({});
  const [delet, setDelet] = useState(false);
  const [show, setShow] = useState(false);
  // const dispatch = useDispatch();

  const handlerChangeProduct = async (e) => {
    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = () => {
          resolve(fileReader.result);
        };

        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };
    if (e.target.name === "image") {
      const file = e.target.files[0];
      const base64 = await convertBase64(file);
      setImage(base64);
    } else {
      value[e.target.name] = e.target.value;
    }
    setValue(value);
  };

  const sendHandlerproductEdit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/popup/insert`,

        {
          img: img,
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValue({});
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setValue({});
      });
  };

  const sendHandlerproductDelete = (e) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/popup/delete`,

        {
          id: "1",
        },

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValue({});
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
        setValue({});
      });
  };

  return (
    <>
      <Row>
        <Col lg={6}>
          <div className="mb-5">
            <img src={img} alt="" />
          </div>
          <form
            action=""
            onChange={handlerChangeProduct}
            onSubmit={sendHandlerproductEdit}
          >
            <div className={styles.news_block}>
              {img ? (
                <button onClick={() => setImage()} className={styles.button}>
                  cancle
                </button>
              ) : (
                <div className={styles.image_block}>
                  <input type="file" name="image" className={styles.input} />
                </div>
              )}
              <button type="submit" className={styles.button}>
                send
              </button>
            </div>
          </form>
        </Col>
        <Col lg={6}>
          <div className={styles.img_block}>
            <img src={image?.image} alt="" />
          </div>

          <div className={styles.buttons_block}>
            <div className={styles.status_card}>
              <div className="status-card__icon"></div>
              <div className="status-card__info">
                <button
                  onClick={(e) => {
                    sendHandlerproductDelete(e);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default MKCH;
