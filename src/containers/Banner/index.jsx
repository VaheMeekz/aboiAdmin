import React, { useState, useEffect } from "react";
import styles from "./banner.module.css";
import { Container, Col, Row } from "react-bootstrap";
import { bannerInfo } from "../../redux/actions/bannerAction";
import { useDispatch, useSelector } from "react-redux";
import BannerEdit from "./BannerEdit";
import Swal from "sweetalert2";
import axios from "axios";
import { keys } from "../../keys";
const Banner = () => {
  const [value, setValue] = useState({});
  const [img, setImage] = useState();

  let [add, setAdd] = useState(false);
  const dispatch = useDispatch();
  const bannerData = useSelector(
    (state) => state?.BannerinfoReducer.bannerData
  );

  useEffect(() => {
    dispatch(bannerInfo());
  }, []);

  const changeAdd = () => {
    setAdd(!add);
  };

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
        `${keys.API_URI}/slider/insert`,
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
        dispatch(bannerInfo());
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
    <section>
      <Container>
        <button onClick={changeAdd} className={styles.button}>
          Add
        </button>

        {add ? (
          <Col cm={12} md={12} lg={12}>
            <form
              action=""
              className={styles.form}
              onChange={handlerChangeProduct}
              onSubmit={sendHandlerproductEdit}
            >
              <Row>
                <Col sm={12} md={6} lg={4}>
                  <input type="date" name="dateOn" />
                </Col>
                <Col sm={12} md={6} lg={4}>
                  <input type="date" name="dateOff" />
                </Col>
                <Col sm={12} md={6} lg={4}>
                  <div className={styles.image_block}>
                    <input type="file" name="image" className={styles.input} />
                  </div>
                </Col>
              </Row>
              <button type="submit" className={styles.button}>
                send
              </button>
            </form>
          </Col>
        ) : null}
        {bannerData?.map((i) => {
          return (
            <>
              <BannerEdit i={i} id={i.id} />
            </>
          );
        })}
      </Container>
    </section>
  );
};

export default Banner;
