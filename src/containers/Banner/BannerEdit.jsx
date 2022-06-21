import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./banner.module.css";
import { Col, Row } from "react-bootstrap";
import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import { bannerInfo } from "../../redux/actions/bannerAction";
const BannerEdit = ({ i, id, mainAdd }) => {
  const [value, setValue] = useState({});
  const [img, setImage] = useState();
  const [show, setShow] = useState(false);

  let [deletes, setdelete] = useState();

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

  const sendHandlerproductEdit = (e, l) => {
    e.preventDefault();
    axios
      .post(
        l !== undefined
          ? `${keys.API_URI}/slider/delete`
          : mainAdd == true
          ? `${keys.API_URI}/slider/insert`
          : `${keys.API_URI}/slider/update`,
        mainAdd == true
          ? {
              ...value,
              image: img,
            }
          : deletes == true
          ? {
              id: id,
            }
          : {
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
        dispatch(bannerInfo());
        setdelete(false);
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
      {i !== "Data is Empty" ? (
        <>
          <div className={styles.item_block}>
            <div className={styles.img_block}>
              <img src={img?.length > 0 ? img : i.image} alt="" />
            </div>

            <div className={styles.buttons_block}>
              <p>{i.date_on}</p>
              <h4>{i.date_off}</h4>
              <button className={styles.button} onClick={() => setShow(!show)}>
                Edit
              </button>
              <button
                className={styles.buttons}
                onClick={(e) => sendHandlerproductEdit(e, "1")}
              >
                delete
              </button>
            </div>
          </div>
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
                    <input
                      type="date"
                      name="dateOn"
                      defaultValue={i?.date_on}
                    />
                  </Col>
                  <Col sm={12} md={6} lg={4}>
                    <input
                      type="date"
                      name="dateOff"
                      defaultValue={i?.date_off}
                    />
                  </Col>
                  <Col sm={12} md={6} lg={4}>
                    <div className={styles.image_block}>
                      <input
                        type="file"
                        name="image"
                        className={styles.input}
                      />
                    </div>
                  </Col>
                </Row>
                <button type="submit" className={styles.button}>
                  Edit
                </button>
              </form>
            </Col>
          ) : null}
        </>
      ) : null}
    </>
  );
};

export default BannerEdit;
