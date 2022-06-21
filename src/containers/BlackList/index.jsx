import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getblackListAction } from "../../redux/actions/blacListAction";
import { Container, Row } from "react-bootstrap";
import styles from "./blackList.module.css";
import axios from "axios";
import Swal from "sweetalert2";
import { keys } from "../../keys";
const BlackList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getblackListAction());
  }, []);

  const data = useSelector((state) => state.blackListReducer.black);
  const handlerDelete = (id) => {
    axios
      .post(
        `${keys.API_URI}/black-list/delete`,
        {
          id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        dispatch(getblackListAction());
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1000,
        });
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <section>
      <Container>
        <h1 className={styles.title}>BLACK LIST</h1>
        <Row>
          <table className={styles.table}>
            <thead>
              <tr className={styles.theadd}>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Delete</th>
              </tr>
            </thead>

            {data &&
              data.map((i) => {
                return (
                  <tbody key={i.id}>
                    <tr className={styles.th_body}>
                      <td>{i.phone_address}</td>
                      <td>{i.type}</td>
                      <td>{i.user_id}</td>
                      <td>
                        <button
                          onClick={() => handlerDelete(i.id)}
                          className={styles.button}
                        >
                          Delet
                        </button>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
          </table>
        </Row>
      </Container>
    </section>
  );
};

export default BlackList;
