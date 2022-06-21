import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userActionData } from "../../redux/actions/usersActoion";
import { Container } from "react-bootstrap";
import styles from "./user.module.css";
import EditUser from "./userEdit";
const User = () => {
  const [pageItem, setpageItem] = useState(1);

  // const [blackList, setBlackList] = useState(false);
  // // const [getblackList, setGetBalackList] = useState({});
  // const [curentdata, setCurentData] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActionData(pageItem));
  }, [pageItem]);

  const data = useSelector((state) => state.userReducerData.userData);
  let res = [...Array(data?.last_page)];

  return (
    <section>
      <Container>
        <h1 className={styles.title}>USER</h1>
        <table id="style-3">
          <thead className={styles.theadd}>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Delete</th>
              <th>Add Balck List</th>
            </tr>
          </thead>
          {data &&
            data.data?.map((i) => {
              return <EditUser i={i} key={i.id} />;
            })}
        </table>
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
    </section>
  );
};

export default User;
