import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./modal.module.css";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AllCategryItems } from "../../redux/actions/categoryAction";
import Swal from "sweetalert2";
import { keys } from "../../keys";
const AddModal = (props) => {
  const [values, setValues] = useState({});
  const dispatch = useDispatch();
  const handlerGetValue = (e) => {
    values[e.target.name] = e.target.value;
    setValues(values);
  };
  const handlerSendValues = (e) => {
    e.preventDefault();
    axios
      .post(
        props.category === 1 && props.edit === true
          ? `${keys.API_URI}/category/update`
          : props.deleteid
          ? `${keys.API_URI}/category/delete`
          : `${keys.API_URI}/category/insert`,
        props.category === 1 && props.edit === true
          ? {
              ...values,
              parentId: props.id,
            }
          : props.deleteid
          ? {
              parentId: props.deleteid,
            }
          : props.addSub
          ? {
              ...values,
              parentId: props.addSub,
            }
          : {
              ...values,
              parentId: "",
            },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValues({});
        dispatch(AllCategryItems());
        props.onHide();
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
      });
  };

  return (
    <section>
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.category === 1
              ? "edit Category"
              : props.addSub
              ? "New Sub Category"
              : "New Category"}
          </Modal.Title>
        </Modal.Header>
        <form action="" onChange={handlerGetValue} onSubmit={handlerSendValues}>
          <Modal.Body>
            {props.item !== null && props.category === 1 ? (
              <div className={styles.input_block}>
                <input
                  type="text"
                  name="nameEditHy"
                  value={values.hy}
                  defaultValue={props.item.name_am}
                  placeholder="Hayeren"
                />
                <input
                  type="text"
                  name="nameEditRu"
                  value={values.ru}
                  defaultValue={props.item.name_ru}
                  placeholder="Hayeren"
                />
                <input
                  type="text"
                  name="nameEditEn"
                  value={values.en}
                  defaultValue={props.item.name_en}
                  placeholder="Hayeren"
                />
              </div>
            ) : props.deleteid ? (
              <button>yes</button>
            ) : (
              <div className={styles.input_block}>
                <input
                  type="text"
                  name="nameHy"
                  value={values.hy}
                  placeholder="Hayeren"
                />
                <input
                  type="text"
                  name="nameRu"
                  value={values.ru}
                  placeholder="Hayeren"
                />
                <input
                  type="text"
                  name="nameEn"
                  value={values.en}
                  placeholder="Hayeren"
                />
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={props.onHide}>Close</Button>
            <Button type="submit">
              {props.category === 1 ? "edit" : props.deleteid ? "yes" : "Send"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </section>
  );
};

export default AddModal;
