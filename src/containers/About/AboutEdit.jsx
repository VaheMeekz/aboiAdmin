import React, { useState } from "react";
import styles from "./about.module.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getaboutInfo } from "../../redux/actions/aboutAction";

import { keys } from "../../keys";
import Swal from "sweetalert2";
const AboutEdit = ({ i, id }) => {
  const [value, setValue] = useState({});
  const [img, setImage] = useState();
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

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
        `${keys.API_URI}/about/update`,
        {
          ...value,
          id: id,
          image: img,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValue({});
        dispatch(getaboutInfo());
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
      <Col sm={12} md={6} lg={6} mb={3} className="mb-5">
        <div className={styles.img_block}>
          <img src={img?.length > 0 ? img : i.image} alt="" />
        </div>
      </Col>
      <Col sm={12} md={6} lg={6} mb={3} className="mb-5">
        <div className={styles.tetx_block}>
          <h4>{i.title_am}</h4>
          <p>{i.description_am}</p>
          <button
            className={styles.edit_items_button}
            onClick={() => setShow(!show)}
          >
            Edit
          </button>
        </div>
      </Col>

      {show ? (
        <Col cm={12} md={12} lg={12}>
          <form
            action=""
            className={styles.form}
            onChange={handlerChangeProduct}
            onSubmit={sendHandlerproductEdit}
          >
            <Row>
              <Col sm={12} md={6} lg={4}>
                <p>Title_am</p>

                <textarea
                  name="titleHy"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.title_am}
                  className={styles.textarea}
                />
              </Col>
              <Col sm={12} md={6} lg={4}>
                <p>Title_ru</p>

                <textarea
                  name="titleRu"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.title_ru}
                  className={styles.textarea}
                />
              </Col>
              <Col sm={12} md={6} lg={4}>
                <p>Title_en</p>

                <textarea
                  name="titleEn"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.title_en}
                  className={styles.textarea}
                />
              </Col>
              <Col sm={12} md={6} lg={4}>
                <textarea
                  name="descriptionHy"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.description_am}
                  className={styles.textarea}
                ></textarea>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <textarea
                  name="descriptionRu"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.description_ru}
                  className={styles.textarea}
                ></textarea>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <textarea
                  name="descriptionEn"
                  id=""
                  cols="30"
                  rows="10"
                  defaultValue={i.description_en}
                  className={styles.textarea}
                ></textarea>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.image_block}>
                  <input type="file" name="image" className={styles.input} />
                </div>
              </Col>
              <Col sm={12} md={6} lg={6}>
                <div className={styles.send_button_block}>
                  <button type="submit" className={styles.send_items_button}>
                    Send
                  </button>
                </div>
              </Col>
            </Row>
          </form>
        </Col>
      ) : null}
    </>
  );
};

export default AboutEdit;
