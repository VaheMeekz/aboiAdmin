import React, { useState, useEffect } from "react";
import { giftCardActionName } from "../../redux/actions/giftCardAction";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./gif.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
const GiftCard = () => {
  const [show, setShow] = useState(false);
  const [image, setImage] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(giftCardActionName());
  }, []);

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
    }
  };

  // send for Gif Card

  const sendHandlerproductEdit = (e, id) => {
    e.preventDefault();
    axios
      .post(
        id !== undefined
          ? `${keys.API_URI}/gift-card/delete`
          : `${keys.API_URI}/gift-card/insert`,
        id !== undefined
          ? {
              id: id,
            }
          : {
              image: image,
            },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setShow(false);
        dispatch(giftCardActionName());
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
        setShow(false);
      });
  };

  const data = useSelector((state) => state.giftCardReducerName.giftcardData);
  return (
    <section>
      <Container>
        <h1 className={styles.title}>GIF CARD</h1>
        <button onClick={() => setShow(!show)} className={styles.add_button}>
          Add
        </button>
        {show ? (
          <form
            action=""
            onChange={handlerChangeProduct}
            onSubmit={sendHandlerproductEdit}
            className={styles.form}
          >
            <Row>
              <Col lg={4}>
                <div className={styles.change_img}>
                  <img src={image ? image : null} alt="" />
                </div>
              </Col>
              <Col lg={4}>
                <div className={styles.image_block}>
                  <input type="file" name="image" className={styles.input} />
                </div>
              </Col>
              <Col lg={4}>
                <button type="submit" className={styles.button}>
                  Send
                </button>
              </Col>
            </Row>
          </form>
        ) : null}
        <Row>
          {data &&
            data.map((i) => {
              return (
                <Col sm={12} md={6} lg={4} key={i.id}>
                  <div className={styles.big_block}>
                    <div className={styles.image_block}>
                      <img src={i.image} alt="" />
                      <div className={styles.delete_block}>
                        <button
                          onClick={(e) => sendHandlerproductEdit(e, i.id)}
                          className={styles.button}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
        </Row>
      </Container>
    </section>
  );
};

export default GiftCard;
