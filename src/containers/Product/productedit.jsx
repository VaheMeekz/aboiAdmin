import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import styles from "./product.module.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { keys } from "../../keys";
import { AllCategryItems } from "../../redux/actions/categoryAction";
import { AllProductItems } from "../../redux/actions/productAction";
import { categorySelectAction } from "../../redux/actions/categorySelectAction";
import Swal from "sweetalert2";

// window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

// let token = document.head.querySelector('meta[name="csrf-token"]');
// window.axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
const EditProd = ({ i, id }) => {
  const [showEdit, setShowEdit] = useState(false);
  const [value, setValue] = useState({});
  const [img, setImage] = useState();
  const [img2, setImage2] = useState();
  const [img3, setImage3] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (showEdit == true) {
      dispatch(categorySelectAction());
    }
  }, [showEdit]);

  // const data = useSelector((state) => state?.CategoryReducer.allCategory);
  const categorySelect = useSelector(
    (state) => state?.CategorySelectReducer.categorySelect
  );

  console.log(i, "++++");
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

    value[e.target.name] = e.target.value;
    setValue(value);

    const file = e.target.files ? e.target.files[0] : null;
    const base64 = file !== null && (await convertBase64(file));
    switch (e.target.name) {
      case "img":
        return setImage(base64);
      case "img2":
        return setImage2(base64);
      case "img3":
        return setImage3(base64);

      default:
        return;
    }
  };
  const sendHandlerproductEdit = (e) => {
    e.preventDefault();
    axios
      .post(
        `${keys.API_URI}/product/update`,
        {
          ...value,
          id: id,
          img: img,
          img3: img3,
          img2: img2,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
          },
        }
      )
      .then((response) => {
        setValue({});
        dispatch(AllProductItems());

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

  return (
    <>
      <tr className={styles.tr_item}>
        <td>{i?.code}</td>
        <td>{i?.name_am}</td>
        <td>{i?.sale_ht !== null ? i?.sale_ht : 0}</td>
        <td>{i?.discount}</td>
        <td>{`vidio`}</td>
        <td>
          {img?.length > 0 ? (
            <img src={img} alt="" className={styles.img} />
          ) : (
            <img src={i?.image} alt="" className={styles.img} />
          )}
        </td>
        <td>{i?.category_id}</td>
        <td>
          <button
            onClick={() => setShowEdit(!showEdit)}
            className={styles.edit_button}
          >
            edit {showEdit ? "-" : "+"}
          </button>
        </td>
      </tr>

      {showEdit ? (
        <tr
          className={
            showEdit ? styles.edit_big_block_active : styles.edit_big_block
          }
        >
          <td colSpan={8} className={styles.td_form}>
            <form
              action=""
              className={styles.form}
              onChange={handlerChangeProduct}
              onSubmit={sendHandlerproductEdit}
            >
              <Row>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="nameHy"
                    defaultValue={i?.name_am ? i?.name_am : null}
                    name="ProductNameHy"
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="nameRu"
                    defaultValue={i?.name_ru ? i?.name_ru : null}
                    name="ProductNameRu"
                  />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="nameEn"
                    defaultValue={i?.name_en ? i?.name_en : null}
                    name="ProductNameEn"
                  />
                </Col>
              </Row>
              <Row>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <input type="file" name="img" className={styles.input} />
                  </div>
                </Col>
                <Col lg={4}>
                  <input type="text" placeholder="Vidio Url" name="video" />
                </Col>
                <Col lg={4}>
                  <input
                    type="text"
                    placeholder="discount"
                    name="discount"
                    // disabled={i?.sale_ht === null ? false : true}
                  />
                </Col>
              </Row>
              <Row
                style={{
                  alignItems: "center",
                }}
              >
                <Col lg={4}>
                  <select name="category" id="" className={styles.selectMain}>
                    {categorySelect
                      ? categorySelect.map((i) => {
                          return (
                            <>
                              <option
                                value={i.id}
                                selected={id === i.id ? true : false}
                                key={i.id}
                              >
                                {i.name_am}
                              </option>
                              {i.parent_category
                                ? i.parent_category.map((j) => {
                                    return (
                                      <option
                                        key={j.id}
                                        value={j.id}
                                        selected={id === i.id ? true : false}
                                      >
                                        --{j.name_am}
                                      </option>
                                    );
                                  })
                                : null}
                            </>
                          );
                        })
                      : null}
                  </select>
                </Col>
                <Col lg={4}>
                  <div className={styles.gabarit_block}>
                    <lable>big</lable>
                    <input type="radio" name="size" value="big" />
                    <lable>small</lable>
                    <input type="radio" name="size" value="small" />
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <input type="file" name="img2" className={styles.input} />
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <input type="file" name="img3" className={styles.input} />
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <textarea
                      type="text"
                      name="textHy"
                      className={styles.input}
                      placeholder="description"
                    ></textarea>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <textarea
                      type="text"
                      name="textRu"
                      className={styles.input}
                      placeholder="description"
                    ></textarea>
                  </div>
                </Col>
                <Col lg={4}>
                  <div className={styles.image_block}>
                    <textarea
                      type="text"
                      name="textEn"
                      className={styles.input}
                      placeholder="description"
                    ></textarea>
                  </div>
                </Col>
                <Col lg={4}>
                  <button
                    className={styles.button}
                    onClick={() => setShowEdit(false)}
                  >
                    Cancel
                  </button>
                </Col>
                <Col lg={4}>
                  <button type="submit" className={styles.button}>
                    Send
                  </button>
                </Col>
              </Row>
            </form>
          </td>
        </tr>
      ) : null}
    </>
  );
};

export default EditProd;
