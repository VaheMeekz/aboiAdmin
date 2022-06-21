import React, { useState } from "react";
import styles from "./order.module.css";

const Orderitem = ({ i, rezult }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <tr className={styles.th_body} onClick={() => setShow(!show)}>
        <td>{i.city}</td>
        <td>{i.street}</td>
        <td>{i.home}</td>
        <td>{i.house}</td>
        <td>{i.name}</td>
        <td>{i.last_name}</td>
        <td>{i.comment?.substring(0, 10)}</td>
        <td>{i.created_at}</td>
        <td>{i.email}</td>
        <td>{i.order_time}</td>
        <td>{i.payment_type}</td>
        <td>{i.phone}</td>
        <td>{i.total_price}</td>
        <td>{i.delivery_price}</td>
      </tr>
      {show
        ? i.checkout_product.length > 0
          ? i?.checkout_product?.map((j) => {
              return (
                <tr className={styles.th_bodys} key={j.id}>
                  <td>{j?.count}</td>
                  <td>{j?.checkout_product_get?.name_am}</td>
                  <td>{j?.checkout_product_get?.image}</td>
                  <td>{j?.checkout_product_get?.price}</td>
                </tr>
              );
            })
          : null
        : null}
    </>
  );
};
export default Orderitem;
