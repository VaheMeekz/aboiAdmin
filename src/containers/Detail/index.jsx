import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Container, Row, Col } from "react-bootstrap";
import { statisticData } from "../../redux/actions/statisticaAction";
import styles from "./detail.module.css";
const Detail = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const productsData = useSelector(
    (state) => state?.statisticReducer.statisticData
  );

  useEffect(() => {
    dispatch(statisticData());
  }, []);

  console.log(productsData?.products, "..0.0.0.0.0.0");
  let x = [];

  if (id == 1) {
    x.push(productsData?.coupon_use);
  } else if (id == 2) {
    x.push(productsData?.month_orders);
  } else if (id == 3) {
    x.push(productsData?.users);
  } else if (id == 5) {
    x.push(productsData?.products);
  } else {
    window.location.href = "/order";
  }

  console.log(x, "0111");
  return (
    <Container>
      {id == 1 ? (
        <Row>
          <h4 className={styles.title}> Information from Coupon</h4>
          {x.length > 0 ? (
            x[0]?.map((i, index) => {
              return (
                <>
                  <Col key={index}>
                    <div className={styles.coupon_block}>
                      <p>code-{i?.coupon}</p>
                      <p>count-{i?.count}</p>
                    </div>
                  </Col>
                </>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </Row>
      ) : null}
      {id == 2 ? (
        <Row>
          <h4 className={styles.title}> Information from Mount Order</h4>
          {x.length > 0 ? (
            x[0]?.map((i, index) => {
              return (
                <>
                  <Col key={index}>
                    <div className={styles.coupon_block}>
                      <p>name - {i?.name_am}</p>
                      <p>code - {i?.code}</p>
                      {/* <p>order count-{i.count}</p> */}
                    </div>
                  </Col>
                </>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </Row>
      ) : null}
      {id == 3 ? (
        <Row>
          <h4 className={styles.title}> Information from Active Users</h4>
          {x.length > 0 ? (
            x[0]?.map((i, index) => {
              return (
                <>
                  <Col className="mb-4" key={index}>
                    <div className={styles.coupon_block}>
                      <p>email - {i?.email}</p>
                      <p>name - {i?.name}</p>
                      <p>count - {i?.count}</p>
                    </div>
                  </Col>
                </>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </Row>
      ) : id == 5 ? (
        <Row>
          <h4 className={styles.title}> Information from Active Users</h4>
          {x.length > 0 ? (
            x[0]?.map((i, index) => {
              return (
                <>
                  <Col className="mb-4" key={index}>
                    <div className={styles.coupon_block}>
                      <div className={styles.img_blog}>
                        <img src={i?.image} alt="" />
                      </div>
                      <p>code-{i?.code}</p>
                      <p>name-{i?.name_am}</p>
                      <p>name-{i?.price}</p>
                    </div>
                  </Col>
                </>
              );
            })
          ) : (
            <p>loading...</p>
          )}
        </Row>
      ) : null}
    </Container>
  );
};

export default Detail;
