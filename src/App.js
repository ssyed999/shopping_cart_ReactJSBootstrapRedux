/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Route, Routes, HashRouter as Router } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  handleModalToggle,
  incrementCartItems,
  removeCartItem,
} from "./redux/actions/actions";
import "./App.css";
import Header from "./components/common/header/Header";
import Footer from "./components/common/footer/Footer";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import ProductsPage from "./components/productsPage/ProductsPage";
import Modal from "./components/common/modal/Modal";
import MiniCard from "./components/common/miniCard/MiniCard";

const App = (props) => {
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);
  const [filteredCartItems, setFilteredCartItems] = useState([]);
  const [buyProduct, setBuyProduct] = useState(null);
  const modalToggle = useSelector((state) => state.modalToggle);
  const cartItems = useSelector((state) => state.cartItems) || {};
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const loggedIn = localStorage.getItem("isLoggedIn");
  useEffect(() => {
    setIsLoggedIn(loggedIn);
  }, [loggedIn]);
  const calcTotal = (array, param) => {
    let result = array.reduce(function (cnt, o) {
      return cnt + o[param];
    }, 0);
    return result;
  };

  const uniqueBy = (a, param) => {
    return a.filter(function (item, pos, array) {
      return (
        array
          .map(function (mapItem) {
            return mapItem[param];
          })
          .indexOf(item[param]) === pos
      );
    });
  };

  useEffect(() => {
    setFilteredCartItems(uniqueBy(cartItems, "id"));
    setTotalAmount(calcTotal(cartItems, "price"));
  }, [cartItems]);

  const modalHandler = (e) => {
    e?.preventDefault();
    dispatch(handleModalToggle());
  };

  const handleCheckoutClick = () => {
    modalHandler();
    alert("thank you for shopping with us!");
  };
 
  const decrementHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  useEffect(() => {
    if (buyProduct) {
      dispatch(incrementCartItems(buyProduct));
    }
  }, [buyProduct, dispatch]);

  const incrementHandler = (id, name, price, src) => {
    let itemsObj = {
      id,
      name,
      price,
      src,
    };
    setBuyProduct(itemsObj);
  };

  return (
    <Router>
      <Header
        handleCartClick={modalHandler}
        isLoggedIn={isLoggedIn}
        totalCartItems={cartItems.length}
      />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/signUp" element={<SignUp />} />
      </Routes>
      <aside>
        <Modal
          displayModal={modalToggle}
          closeModal={modalHandler}
          handleCheckoutClick={handleCheckoutClick}
          header={"My Cart"}
          totalPrice={totalAmount}
          totalItems={cartItems.length}
        >
          {cartItems.length > 0 ? (
            <>
              {filteredCartItems.map((item, index) => (
                <MiniCard
                  key={item.id}
                  name={item.name}
                  id={item.id}
                  src={require(`./${item.src}`)}
                  price={item.price}
                  decrementHandler={() => decrementHandler(item.id)}
                  incrementHandler={() =>
                    incrementHandler(item.id, item.name, item.price, item.src)
                  }
                />
              ))}
              <div className="lowestPriceCard">
                <img
                  src={require("./static/images/lowest-price.png")}
                  alt="lowest-price"
                />
                <span>You won't find it cheaper anywhere</span>
              </div>
            </>
          ) : (
            <div className="noItems">
              <div className="title">No items in the cart</div>
              <div>Your favourite items are just a click away</div>
            </div>
          )}
        </Modal>
      </aside>
      <Footer />
    </Router>
  );
};

export default App;
