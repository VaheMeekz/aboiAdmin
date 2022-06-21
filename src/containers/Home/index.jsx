import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { StatusCard } from "../../components";
import Chart from "react-apexcharts";
import { useDispatch, useSelector } from "react-redux";
import { MKCH } from "../../components";
import axios from "axios";
import { keys } from "../../keys";
import "./home.css";
import { unauthorization } from "../../middleware";
import { statisticData } from "../../redux/actions/statisticaAction";
import { Link } from "react-router-dom";
let a = [];
a.push(20);
let categories = [];
categories.push("dektember");
const chartOptions = {
  series: [
    {
      type: "column",
      name: "Online Customers",
      data: a,
    },
    // {
    //   type: "column",
    //   name: "Store Customers",
    //   data: [40, 30, 70, 80, 40, 16, 40, 20, 51, 10],
    // },
  ],
  options: {
    color: ["#6ab04c", "#2980b9"],
    chart: {
      background: "transparent",
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories,
    },
    legend: {
      position: "left",
    },

    grid: {
      show: true,
    },
  },
};

const Home = () => {
  const themeReducer = useSelector((state) => state.ThemeReducer);
  const mainData = useSelector((state) => state.statisticReducer.statisticData);
  const data = useSelector((state) => state.statisticReducer.data);
  const [show, setShow] = useState(false);
  const [img, setImage] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statisticData());
    axios
      .get(`${keys.API_URI}/popup`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(keys.token)}`,
        },
      })
      .then((resp) => {
        setImage(resp.data.data);
      })
      .catch((error) => {
        unauthorization();
      });
  }, []);

  console.log(data, "8888");

  return (
    <Container className="contaner_arm">
      <Row>
        <Col lg={6}>
          <Row>
            {data?.map((item, index) => (
              <Col lg={6} key={index}>
                <Link to={"/detail/" + item.id} className="mainLink">
                  <StatusCard
                    icon={item.icon}
                    count={item.count}
                    title={item.title}
                  />
                </Link>
              </Col>
            ))}
          </Row>
        </Col>
        <Col lg={6}>
          <div className="card ">
            <Chart
              options={
                themeReducer === "theme-mode-dark"
                  ? {
                      ...chartOptions.options,
                      theme: { mode: "dark" },
                    }
                  : {
                      ...chartOptions.options,
                      theme: { mode: "light" },
                    }
              }
              series={chartOptions.series}
              type="area"
              height="300px"
            />
          </div>
        </Col>
        <Col lg={12}>
          <MKCH show={show} setShow={setShow} image={img} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
