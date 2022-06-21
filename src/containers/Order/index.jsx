import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { orderDataAction, searchedData } from "../../redux/actions/orderAction";
// import { Accordion, Table, Col } from "react-bootstrap";
import Orderitem from "./Orderitem";
// import jsPDF from "jspdf";
import styles from "./order.module.css";
import axios from "axios";
import { keys } from "../../keys";
import Swal from "sweetalert2";
import { unauthorization } from "../../middleware";

const Order = () => {
  const [search, setSearch] = useState({});
  const [rezult, setRezult] = useState();
  const [clear, setClear] = useState(false);
  const [pageItem, setpageItem] = useState(1);

  const dispatch = useDispatch();

  const data = useSelector((state) => state.orderDataReducer.orderata);

  useEffect(() => {
    dispatch(orderDataAction(pageItem));
  }, [pageItem, clear]);

  let res = [...Array(data?.last_page)];

  console.log(data, "new data darta");

  const handlerinfoChnage = (e) => {
    setSearch(e.target.value);
  };

  const sendSearchinfo = (e) => {
    e.preventDefault();
    axios
      .get(`${keys.API_URI}/orders/search`, {
        params: {
          search: !clear ? search : "cancel",
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
        },
      })
      .then((response) => {
        console.log(response.data, "-");
        dispatch(searchedData(response.data));
        setSearch({});
        document.getElementById("inp").valuen = "";
        setClear(false);
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your work has been saved",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        // unauthorization();
      });
  };

  const handlerDownload = () => {
    axios.post(`https://abionew.herokuapp.com/api/export`).then(function (res) {
      var ua = window.navigator.userAgent;
      var msie = ua.indexOf("MSIE ");
      var txtArea1;
      var sa;

      if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
        // If Internet Explorer
        txtArea1.document.open("txt/html", "replace");
        txtArea1.document.write(res.data);
        txtArea1.document.close();
        txtArea1.focus();
        sa = txtArea1.document.execCommand(
          "SaveAs",
          true,
          "Say Thanks to Sumit.xls"
        );
      } //other browser not tested on IE 11
      else
        sa = window.open(
          "data:application/vnd.ms-excel," + encodeURIComponent(res.data)
        );

      return sa;
    });
  };

  console.log(rezult, "55555");

  return (
    <Container>
      <h1 className={styles.title}>ORDER</h1>
      <div className={styles.big_block}>
        <div className={styles.search_inp}>
          <form
            action=""
            onChange={handlerinfoChnage}
            onSubmit={sendSearchinfo}
          >
            <input type="text" placeholder="search" name="search" id="inp" />
            <button type="submit" className={styles.search_icon}>
              <i className={`fa-solid fa-magnifying-glass `}></i>
            </button>
          </form>
          <button
            className={styles.censel_icon}
            onClick={(e) => {
              setClear(true);
              sendSearchinfo(e);
            }}
          >
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <p onClick={handlerDownload} className={styles.load}>
          Dowunload
        </p>
      </div>
      <div style={{ overflowX: "auto" }} className={styles.scrolls}>
        <table id="style-3">
          <thead className={styles.theadd}>
            <tr>
              <th>city</th>
              <th>street</th>
              <th>Home</th>
              <th>hose</th>
              <th>name</th>
              <th>last_name</th>
              <th>description</th>
              <th>create</th>
              <th>email</th>
              <th>order_time</th>
              <th>payment_ype</th>
              <th>phone</th>
              <th>Total Priice</th>
              <th>Delivery</th>
            </tr>
          </thead>
          <tbody>
            {data
              ? data.data?.map((i) => {
                  return <Orderitem i={i} rezult={i} key={i.id} />;
                })
              : "not found"}
          </tbody>
        </table>
      </div>
      <div className={styles.pagination}>
        <div className={styles.pagination_block}>
          {res?.map((i, index) => {
            return (
              <p
                onClick={() => setpageItem(index + 1)}
                key={index}
                className={
                  data?.current_page == index + 1 ? styles.active : null
                }
              >
                {index + 1}
              </p>
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default Order;
