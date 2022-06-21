import React, { useState, useEffect } from "react";
import { Col, Card, Button, Row } from "react-bootstrap";
import styles from "./offer.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import { specialOfferAction } from "../../redux/actions/specialOfferAction";

const Offer = ({
  image,
  title_am,
  title_ru,
  title_en,
  text_am,
  text_ru,
  text_en,
  id,
  addShow,
  addSetShow,
}) => {
  const [value, setValue] = useState({});
  const [img, setImage] = useState();
  const dispatch = useDispatch();
  const [show2, setShow2] = useState(false);

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
  const sendHandlerproductEdit = (e, i) => {
    e.preventDefault();
    axios
      .post(
        i
          ? `${keys.API_URI}/special-offer/delete`
          : `${keys.API_URI}/special-offer/update`,
        i
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
        console.log(response.data);
        dispatch(specialOfferAction());

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
      <Col sm={12} md={6} lg={6} className="mt-5">
        <Card style={{ width: "100%" }}>
          <Card.Img variant="top" src={image} />
          <Card.Body>
            <Card.Title>{title_am.substring(0, 30)}</Card.Title>
            <Card.Text>{text_am.substring(0, 50)}</Card.Text>
            <Button
              variant="primary"
              onClick={() => setShow2(true)}
              className="mt-3 "
            >
              edit
            </Button>
            <Button
              variant="primary"
              onClick={(e) => sendHandlerproductEdit(e, "1")}
              className="mt-3 ms-3"
            >
              delete
            </Button>
            <Button
              variant="primary"
              onClick={(e) => setShow2(false)}
              className="mt-3 ms-3"
            >
              cacle
            </Button>
          </Card.Body>
        </Card>
      </Col>
      {show2 === true ? (
        <form
          action=""
          className={styles.form}
          onChange={handlerChangeProduct}
          onSubmit={sendHandlerproductEdit}
        >
          <div className={styles.img_block}>
            <img src={img ? img : image} alt="" />
            <div className={styles.image_block}>
              <input type="file" name="image" className={styles.inputs} />
            </div>
          </div>
          <Row>
            <Col sm={12} md={6} lg={4}>
              <input
                type="text"
                name="titleHy"
                defaultValue={title_am}
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              {" "}
              <input
                type="text"
                name="titleRu"
                defaultValue={title_ru}
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              {" "}
              <input
                type="text"
                name="titleEn"
                defaultValue={title_en}
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textHy"
                defaultValue={text_am}
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textRu"
                defaultValue={text_ru}
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textEn"
                defaultValue={text_en}
                className={styles.input}
              />
            </Col>
            <div className={styles.button}>
              <button type="submit" className={styles.button_item}>
                edit
              </button>
            </div>
          </Row>
        </form>
      ) : null}
    </>
  );
};
export default Offer;
