import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { specialOfferAction } from "../../redux/actions/specialOfferAction";
import styles from "./offer.module.css";
import Offer from "./OfferEdit";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import axios from "axios";
const SpecialOffer = () => {
  const [addShow, addSetShow] = useState(false);
  const [value, setValue] = useState({});
  const [img, setImage] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(specialOfferAction());
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
    } else {
      value[e.target.name] = e.target.value;
    }
    setValue(value);
  };
  const sendHandlerproductEdit = (e, i) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/special-offer/insert`,
        {
          ...value,
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
        dispatch(specialOfferAction());
        addSetShow(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        setValue({});
      });
  };
  const data = useSelector((state) => state.SpecialOfferReducer.offer);
  return (
    <Container>
      <h3 className={styles.title}>SPECIAL OFFER</h3>
      <button onClick={() => addSetShow(true)} className={styles.button_add}>
        ADD
      </button>
      {addShow ? (
        <form
          action=""
          className={styles.form}
          onChange={handlerChangeProduct}
          onSubmit={sendHandlerproductEdit}
        >
          <div className={styles.img_block}>
            <img src={img} alt="" />
            <div className={styles.image_block}>
              <input type="file" name="image" className={styles.inputs} />
            </div>
          </div>
          <Row>
            <Col sm={12} md={6} lg={4}>
              <input
                type="text"
                name="titleHy"
                placeholder="Title AM"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <input
                type="text"
                name="titleRu"
                placeholder="Title Ru"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <input
                type="text"
                name="titleEn"
                placeholder="Title En"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textHy"
                className={styles.input}
                placeholder="Text AM"
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textRu"
                className={styles.input}
                placeholder="Text AM"
              />
            </Col>
            <Col sm={12} md={6} lg={4}>
              <textarea
                type="text"
                name="textEn"
                className={styles.input}
                placeholder="Text AM"
              />
            </Col>
            <div className={styles.button}>
              <button type="submit" className={styles.button_item}>
                add
              </button>
              <button
                onClick={() => addSetShow(false)}
                className={styles.button_item}
              >
                cancel
              </button>
            </div>
          </Row>
        </form>
      ) : null}
      <Row>
        {data
          ? data.map((i) => {
              return (
                <Offer
                  image={i.image}
                  title_am={i.title_am}
                  title_ru={i.title_ru}
                  title_en={i.title_en}
                  text_am={i.text_am}
                  text_ru={i.text_ru}
                  text_en={i.text_en}
                  id={i.id}
                  key={i.id}
                />
              );
            })
          : null}
      </Row>
    </Container>
  );
};

export default SpecialOffer;
