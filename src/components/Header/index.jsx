import React, { useEffect } from "react";
import styles from "./header.module.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ThemeAction from "../../redux/actions/ThemeAction";

const Header = ({ show, setShow }) => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-light");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-light");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);
  const handleClose = () => setShow(false);

  return (
    <header className={show ? styles.active_header : styles.header}>
      <nav className={styles.layout__content}>
        <i
          className={`fa-solid fa-circle-xmark ${styles.censel_icone}`}
          onClick={handleClose}
        ></i>
        <div className={styles.admin_name_block}>
          <h2>ADMIN PANEL</h2>
        </div>
        <ul className={styles.ul}>
          <li onClick={handleClose} className={styles.sidebar__item}>
            <i className="fa-solid fa-user"></i>
            <Link to="/home" spy={true} smooth={true} duration={500}>
              Home
            </Link>
          </li>
          <li onClick={handleClose} className={styles.sidebar__item}>
            <i className="fa-solid fa-user"></i>
            <Link to="/user" spy={true} smooth={true} duration={500}>
              User
            </Link>
          </li>
          <li onClick={handleClose} className={styles.sidebar__item}>
            <i className="fa-solid fa-user"></i>
            <Link to="/product">Propduct</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-list"></i>
            <Link to="/category">Category</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-image"></i>
            <Link to="/banner">Baner</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-circle-nodes"></i>
            <Link to="/offer">Special Offer</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-address-card"></i>
            <Link to="/about">About</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-clone"></i>

            <Link to="/contact">Conatct</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-solid fa-object-group"></i>
            <Link to="/gift">Gif Card</Link>
          </li>
          {/* <li onClick={handleClose}>
            <i className="fa-solid fa-scale-unbalanced"></i>
            <Link to="/about">Sale Card</Link>
          </li> */}
          <li onClick={handleClose}>
            <i className="fa-solid fa-ticket"></i>
            <Link to="/cupon">Cupon</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-brands fa-first-order"></i>
            <Link to="/order">Order</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-brands fa-first-order"></i>
            <Link to="/black">Black List</Link>
          </li>
          <li onClick={handleClose}>
            <i className="fa-brands fa-first-order"></i>
            <Link to="/delevery">Delevery</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
