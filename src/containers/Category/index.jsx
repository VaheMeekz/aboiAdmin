import React, { useState, useEffect } from "react";
import styles from "./category.module.css";
import { Container } from "react-bootstrap";
import { AddModal } from "../../components";
import { useSelector, useDispatch } from "react-redux";
import { AllCategryItems } from "../../redux/actions/categoryAction";

const Category = () => {
  const disptach = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [modalShows, setModalShows] = useState(false);
  const [modalShowc, setModalShowc] = useState(false);
  const data = useSelector((state) => state?.CategoryReducer.allCategory);
  const [transport, setTransport] = useState(null);
  const [edit, setEdit] = useState(false);
  const [editid, setEdtitId] = useState();
  const [deleteid, setDeleteId] = useState();
  const [addSub, setAddSub] = useState(null);
  const [addSubTog, setAddSubTog] = useState(false);
  const [pageItem, setpageItem] = useState(1);

  useEffect(() => {
    disptach(AllCategryItems(pageItem));
  }, [pageItem]);

  let res = [...Array(data?.last_page)];

  return (
    <section>
      <Container>
        <button
          variant="primary"
          onClick={() => setModalShow(true)}
          className={styles.add_category}
        >
          Add CAtegory
        </button>
        <AddModal
          show={
            addSubTog ? modalShowc : deleteid || edit ? modalShows : modalShow
          }
          onHide={
            addSubTog
              ? () => {
                  setModalShowc(false);
                  setAddSubTog(false);
                }
              : deleteid || edit
              ? () => {
                  setModalShows(false);
                  setEdit(false);
                  setDeleteId(false);
                  setModalShowc(false);
                }
              : () => {
                  setModalShow(false);
                  setEdit(false);
                  setDeleteId(false);
                  setModalShowc(false);
                }
          }
          item={edit && transport ? transport : null}
          category={edit ? 1 : null}
          edit={edit ? edit : null}
          id={edit ? editid : null}
          deleteid={deleteid ? deleteid : null}
          addSub={addSubTog ? addSub : null}
        />
      </Container>

      <Container
        style={{
          width: "100% !important",
        }}
      >
        {data.data
          ? data.data.map((i) => {
              return (
                <div key={i.id} className={styles.item_block}>
                  <div className={styles.category_item_block}>
                    <div className={styles.category_name}>
                      {/* <div> */}
                      <p>{i.name_am}</p>
                      {/* </div> */}
                      <div className={styles.name_button}>
                        <div>
                          <button
                            onClick={() => {
                              setEdit(true);
                              setModalShows(true);
                              setTransport(i);
                              setEdtitId(i.id);
                            }}
                          >
                            Edit
                          </button>
                        </div>
                        <div>
                          <button
                            onClick={() => {
                              setDeleteId(i.id);
                              setModalShows(true);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                        <div>
                          <button
                            variant="primary"
                            onClick={() => {
                              setModalShowc(true);
                              setAddSub(i.id);
                              setAddSubTog(true);
                            }}
                          >
                            <i className="fa fa-plus"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={styles.sub_item_big_block}>
                    <hr />
                    {i.parent_category?.map((j) => {
                      return (
                        <div className={styles.sub_item_block} key={j.id}>
                          <p>{j.name_am}</p>
                          <div className={styles.button_sub}>
                            <button
                              onClick={() => {
                                setEdit(true);
                                setModalShows(true);
                                setTransport(j);
                                setEdtitId(j.id);
                              }}
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => {
                                setDeleteId(j.id);
                                setModalShows(true);
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          : null}
        <div className={styles.pagination}>
          <div className={styles.pagination_block}>
            {res?.map((i, index) => {
              return (
                <p
                  onClick={() => setpageItem(index + 1)}
                  key={index}
                  className={
                    data.current_page == index + 1 ? styles.active : null
                  }
                >
                  {index + 1}
                </p>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
};
export default Category;
