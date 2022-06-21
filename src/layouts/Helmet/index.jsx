import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Header, ThemeMenu, Drowpdown } from "../../components";
import { Helmet } from "react-helmet";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import "./helmet.css";
import ThemeAction from "../../redux/actions/ThemeAction";
import { ReactComponent as Nlo } from "../../svg/us.svg";
import { keys } from "../../keys";
import { ReactComponent as Logo } from "../../svg/log.svg";
const HelmetLayout = ({ children, title, metaDescription }) => {
  const [show, setShow] = useState(false);
  const [userShow, setUserShow] = useState(false);

  const handleShow = () => setShow(!show);
  const handlerUserSettings = () => {
    setUserShow(!userShow);
  };
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    const themeClass = localStorage.getItem("themeMode", "theme-mode-dark");

    const colorClass = localStorage.getItem("colorMode", "theme-mode-dark");

    dispatch(ThemeAction.setMode(themeClass));

    dispatch(ThemeAction.setColor(colorClass));
  }, [dispatch]);

  if (localStorage.getItem(keys.token)) {
    return (
      <>
        <Helmet>
          {title && <title>{title}</title>}
          {metaDescription && (
            <meta name="description" content={metaDescription} />
          )}
        </Helmet>
        <div className={`layout ${themeReducer.mode} ${themeReducer.color}`}>
          <Container fluid>
            <div className="layout__content">
              <div className="layout__content_bord" onClick={handleShow}>
                <i className="fa-solid fa-border-all"></i>
                <p>DashBord</p>
              </div>
              <div className="topnav__search">
                {/* <input type="text" placeholder="Search here..." /> */}
                {/* <i className="fa-solid fa-magnifying-glass"></i> */}
                <Logo />
              </div>

              <div className="topnav__right-item">
                <i
                  className="fa-solid fa-person-rifle custom_user"
                  onClick={handlerUserSettings}
                ></i>
                <Drowpdown userShow={userShow} />
              </div>
              <ThemeMenu />
            </div>
          </Container>
          <div
            style={{
              display: "flex",
              width: "100%",
              margin: "10px 0",
              minHeight: "100vh",
              paddingBottom: "30px",
            }}
          >
            <Header
              show={show}
              setShow={setShow}
              className={`layout ${themeReducer.mode} ${themeReducer.color}`}
            />
            <div className="aaa">{children}</div>
          </div>
        </div>
      </>
    );
  }
};
HelmetLayout.defaultProps = {
  title: "",
  metaDescription: "",
};
HelmetLayout.propTypes = {
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
  metaDescription: PropTypes.string,
};
export default HelmetLayout;
