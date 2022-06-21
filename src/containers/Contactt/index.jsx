import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getcontactInfo } from "../../redux/actions/contactAction";
import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import styles from "./contact.module.css";
const Contact = () => {
  const [value, setValue] = useState({});
  const dispatch = useDispatch();

  const contactData = useSelector((state) => state.ContactReducer.contactInfo);

  useEffect(() => {
    dispatch(getcontactInfo());
  }, []);

  const handlergetContactinfo = (e) => {
    value[e.target.name] = e.target.value;
    setValue(value);
  };

  const sendHandlerproductEdit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/contact/update`,
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
        setValue({});
        dispatch(getcontactInfo());
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
        <h3 className={styles.title}>CONTACT</h3>
        <form
          action=""
          id="message"
          onChange={handlergetContactinfo}
          onSubmit={sendHandlerproductEdit}
        >
          <Row>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="locationHy"
                placeholder="Location AM"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="locationRu"
                placeholder="Location RU"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="locationEn"
                placeholder="Location EN"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="email"
                placeholder="Email"
                className={styles.input}
              />
            </Col>
            <Col sm={12} md={6} lg={3}>
              <input
                type="text"
                name="work_hours"
                placeholder="Work Hours"
                className={styles.input}
              />
            </Col>
          </Row>
          <button type="submit" className={styles.button}>
            Send
          </button>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
