import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "./cupon.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import { couponActionName } from "../../redux/actions/couponAction";
const Cupon = () => {
  const [values, setValues] = useState({});
  const [type, setType] = useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(couponActionName());
  }, []);

  const data = useSelector((state) => state.couponReducer.couponData);

  const handlercuponinfo = (e) => {
    values[e.target.name] = e.target.value;
    setValues(values);
    setType(e.target.value);
  };

  const handlercuponinfoSend = (e, id) => {
    e.preventDefault();
    axios
      .post(
        id ? `${keys.API_URI}/coupon/delete` : `${keys.API_URI}/coupon/insert`,
        id
          ? {
              id: id,
            }
          : {
              ...values,
            },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValues({});
        dispatch(couponActionName());
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
        setValues({});
      });
  };
  return (
    <section className={styles.section}>
      <Container>
        <h1 className={styles.title}>COUPON</h1>
        <form
          action=""
          onChange={handlercuponinfo}
          onSubmit={handlercuponinfoSend}
          className={styles.form_block}
        >
          <Row>
            <Col lg={3}>
              <div className={styles.cupon_code_block}>
                <input type="text" placeholder="cupon code" name="code" />
              </div>
            </Col>
            <Col lg={3}>
              <div className={styles.cupon_chacke_block}>
                <select name="type" id="">
                  <option value="1">Discount code</option>
                  <option value="2">Amount code</option>
                  <option value="3">Free delivery Code</option>
                </select>
              </div>
            </Col>
            <Col lg={3}>
              <div className={styles.cupon_count_block}>
                <input
                  type="text"
                  disabled={type == "3" ? true : false}
                  placeholder="sale"
                  name="sale"
                />
              </div>
            </Col>
            <Col lg={3}>
              <div className={styles.cupon_date_block}>
                <input type="date" placeholder="time " name="date" />
              </div>
            </Col>
          </Row>
          <div className={styles.big_block}></div>
          <button type="submit" className={styles.buttopn_send}>
            Send
          </button>
        </form>
        <table className={styles.table}>
          <thead className={styles.theadd}>
            <tr>
              <th>code</th>
              <th>type</th>
              <th>date</th>
              <th>value</th>
              <th>Delete</th>
            </tr>
          </thead>

          {data &&
            data.map((i) => {
              return (
                <tbody className={styles.th_body} key={i.id}>
                  <tr>
                    <td>{i.code}</td>
                    <td>
                      {i.type == "Discount code"
                        ? "Discount code"
                        : i.type == "Amount code"
                        ? "Amount code"
                        : "Free delivery Code"}
                    </td>
                    <td>{i.date}</td>
                    <td>{i.value}</td>
                    <td>
                      <button
                        onClick={(e) => handlercuponinfoSend(e, i.id)}
                        className={styles.button}
                      >
                        Ddlete
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      </Container>
    </section>
  );
};

export default Cupon;
