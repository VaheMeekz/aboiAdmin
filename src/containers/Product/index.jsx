import React, { useState, useEffect } from "react";
import styles from "./product.module.css";
import { Container, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { AllProductItems } from "../../redux/actions/productAction";
import EditProd from "./productedit";

const Product = () => {
  const [pageItem, setpageItem] = useState(1);
  const disptach = useDispatch();
  useEffect(() => {
    disptach(AllProductItems(pageItem));
  }, [pageItem]);
  const productData = useSelector((state) => state?.ProductReducer.allProduct);

  let res = [...Array(productData.last_page)];
  console.log(res, "++++++");
  return (
    <section>
      <Container>
        <h1 className={styles.title}>PRODUCT</h1>
        <Table striped bordered hover>
          <thead className={styles.th_head}>
            <tr>
              <th>Code</th>
              <th>Name</th>
              <th>Discount_ht</th>
              <th>Dicoiunt</th>
              <th>Video</th>
              <th>Image</th>
              <th>Category</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {productData
              ? productData?.data?.map((i) => {
                  return <EditProd i={i} id={i.id} key={i.id} />;
                })
              : null}
          </tbody>
        </Table>
        <div className={styles.pagination}>
          <div className={styles.pagination}>
            <div className={styles.pagination_block}>
              {res?.map((i, index) => {
                return (
                  <p
                    onClick={() => setpageItem(index + 1)}
                    key={index}
                    className={
                      productData.current_page == index + 1
                        ? styles.active
                        : null
                    }
                  >
                    {index + 1}
                  </p>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Product;
