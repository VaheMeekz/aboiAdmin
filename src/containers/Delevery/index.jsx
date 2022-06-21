import React, { useState, useEffect } from "react";
import styles from "./delevery.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getdelevery } from "../../redux/actions/deleveryAction";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
import DeleveryEdit from "./DeleveryEdit";
const Delevery = () => {
  const [add, seAdd] = useState(false);
  const [value, setValue] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getdelevery());
  }, []);
  const handelgetinfo = (e) => {
    value[e.target.name] = e.target.value;
    setValue(value);
  };
  const handlersendLogpass = (e) => {
    e.preventDefault();

    axios
      .post(
        `${keys.API_URI}/delivery/insert`,
        {
          ...value,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        if (response.data.success) {
          dispatch(getdelevery());
          setValue({});
          seAdd(false);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
          setValue({});
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

  const data = useSelector((state) => state?.deleveryReducer.delevery);
  return (
    <>
      <section>
        <Container>
          <button onClick={() => seAdd(!add)} className={styles.add_button}>
            ADD
          </button>
          {add ? (
            <form
              action=""
              onChange={handelgetinfo}
              onSubmit={handlersendLogpass}
            >
              <Row>
                <Col sm={12} md={6} lg={4}>
                  <input
                    type="text"
                    name="cityHy"
                    placeholder="City Name Hy"
                    className={styles.input}
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    name="cityRu"
                    placeholder="City Name Ru"
                    className={styles.input}
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    name="cityEn"
                    placeholder="City Name En"
                    className={styles.input}
                  />
                </Col>
                <Col sm={12} md={6} lg={4}>
                  <input
                    type="text"
                    name="priceBig"
                    placeholder="Big price"
                    className={styles.input}
                  />
                </Col>
                <Col sm={12} md={6} lg={4}>
                  <input
                    type="text"
                    name="priceSmall"
                    placeholder="Small price"
                    className={styles.input}
                  />
                </Col>
              </Row>
              <div className={styles.buttons_blog}>
                <button type="submit">Send</button>
              </div>
            </form>
          ) : null}
        </Container>
      </section>
      <section>
        <Container>
          <table className={styles.table}>
            <thead className={styles.theadd}>
              <tr>
                <th>Citiy</th>
                <th>Price Big</th>
                <th>Price Small</th>
                <th>Edit</th>
              </tr>
            </thead>

            {data
              ? data.map((i) => {
                  return (
                    <DeleveryEdit
                      id={i.id}
                      cityEn={i.city_en}
                      cityRu={i.city_ru}
                      cityHy={i.city_am}
                      big={i.price_big}
                      small={i.price_small}
                      key={i.id}
                    />
                  );
                })
              : null}
          </table>
        </Container>
      </section>
    </>
  );
};

export default Delevery;
