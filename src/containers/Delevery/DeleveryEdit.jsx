import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./delevery.module.css";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import axios from "axios";
import { keys } from "../../keys";
import { getdelevery } from "../../redux/actions/deleveryAction";
const DeleveryEdit = ({ id, cityEn, cityRu, cityHy, big, small }) => {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState({});
  const [delet, setdelet] = useState(false);
  const dispatch = useDispatch();

  const handelgetinfo = (e) => {
    value[e.target.name] = e.target.value;
    setValue(value);
  };
  const handlersendLogpass = (e) => {
    e.preventDefault();
    axios
      .post(
        delet
          ? `${keys.API_URI}/delivery/delete`
          : `${keys.API_URI}/delivery/update`,
        delet
          ? {
              id: id,
            }
          : {
              ...value,
              id: id,
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
          setdelet(false);
          setShow(false);

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1000,
          });
        } else {
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
          title: error,
          text: "Something went wrong!",
          timer: 1500,
        });
      });
  };

  return (
    <>
      <tbody>
        <tr className={styles.th_body}>
          <td>{cityHy}</td>
          <td>{big}</td>
          <td>{small}</td>
          <td>
            <button
              onClick={() => setShow(!show)}
              className={styles.edit_button}
            >
              {!show ? "Edit" : "Close"}
            </button>
          </td>
        </tr>

        {show ? (
          <tr className={styles.tr_form}>
            <td colSpan={4}>
              <form
                action=""
                onChange={handelgetinfo}
                onSubmit={handlersendLogpass}
              >
                <Row>
                  <Col lg={6}>
                    <input
                      type="text"
                      name="cityHy"
                      defaultValue={cityEn}
                      className={styles.input}
                    />
                  </Col>

                  <Col lg={6}>
                    <input
                      type="text"
                      name="priceSmall"
                      defaultValue={small}
                      className={styles.input}
                    />
                  </Col>
                  <Col lg={6}>
                    <input
                      type="text"
                      name="cityEn"
                      defaultValue={cityHy}
                      className={styles.input}
                    />
                  </Col>
                  <Col lg={6}>
                    <input
                      type="text"
                      name="priceBig"
                      defaultValue={big}
                      className={styles.input}
                    />
                  </Col>
                  <Col lg={6}>
                    <input
                      type="text"
                      name="cityRu"
                      defaultValue={cityRu}
                      className={styles.input}
                    />
                  </Col>
                </Row>
                <div className={styles.buttons_blog}>
                  <button type="submit">Send</button>
                  <button onClick={() => setdelet(true)}>Delete</button>
                </div>
              </form>
            </td>
          </tr>
        ) : null}
      </tbody>
    </>
  );
};

export default DeleveryEdit;
