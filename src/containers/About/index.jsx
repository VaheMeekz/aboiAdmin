import React, { useState, useEffect } from "react";
import styles from "./about.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getaboutInfo } from "../../redux/actions/aboutAction";
import { Container, Row, Col } from "react-bootstrap";
import AboutEdit from "./AboutEdit";
const About = () => {
  const dispatch = useDispatch();
  const AboutData = useSelector((state) => state.AboutReducer.aboutdata);

  useEffect(() => {
    dispatch(getaboutInfo());
  }, []);

  return (
    <>
      <Container>
        <h1 className={styles.title}>ABOUTE</h1>
        <Row>
          {AboutData !== null
            ? AboutData.map((i) => {
                return <AboutEdit i={i} id={i.id} key={i.id} />;
              })
            : null}
        </Row>
      </Container>
    </>
  );
};

export default About;
