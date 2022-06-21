import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  About,
  Category,
  Product,
  Banner,
  Contact,
  User,
  Cupon,
  Login,
  GifCard,
  BlackList,
  SpecialOffer,
  Delevery,
  Order,
  Detail,
} from "./containers";
import { HelmetLayout } from "./layouts";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { keys } from "./keys";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Home />
            </HelmetLayout>
          }
        />
        <Route
          path="/about"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <About />
            </HelmetLayout>
          }
        />
        <Route
          path="/category"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Category />
            </HelmetLayout>
          }
        />
        <Route
          path="/product"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Product />
            </HelmetLayout>
          }
        />
        <Route
          path="/banner"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Banner />
            </HelmetLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Contact />
            </HelmetLayout>
          }
        />
        <Route
          path="/user"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <User />
            </HelmetLayout>
          }
        />
        <Route
          path="/cupon"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Cupon />
            </HelmetLayout>
          }
        />

        <Route
          path="/gift"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <GifCard />
            </HelmetLayout>
          }
        />

        <Route
          path="/black"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <BlackList />
            </HelmetLayout>
          }
        />

        <Route
          path="/offer"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <SpecialOffer />
            </HelmetLayout>
          }
        />
        <Route
          path="/delevery"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Delevery />
            </HelmetLayout>
          }
        />
        <Route
          path="/order"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Order />
            </HelmetLayout>
          }
        />
        <Route
          path="/detail/:id"
          element={
            <HelmetLayout title="Home" metaDescription="home page for shop">
              <Detail />
            </HelmetLayout>
          }
        />

        <Route
          path="/"
          element={
            localStorage.getItem(keys.token) ? (
              <HelmetLayout title="Home" metaDescription="home page for shop">
                <Home />
              </HelmetLayout>
            ) : (
              <Login />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
