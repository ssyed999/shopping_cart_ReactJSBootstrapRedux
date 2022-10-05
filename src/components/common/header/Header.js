import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "../../../Hooks";
import cartIcon from "../../../static/images/cart.svg";
import shopIcon from "../../../static/images/offers/myshoppingkart.png";
import "./Header.css";

const Header = (props) => {
  const { totalCartItems, handleCartClick, isLoggedIn } = props;
  const size = useWindowSize();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
    window.location.reload();
  };
  useEffect(() => {}, [isLoggedIn]);
  return (
    <header className="headerContainer">
      <div
        style={{ position: "relative", textAlign: "center", color: "white" }}
      >
        <img src={shopIcon} alt="your-kart" />
        <div
          style={{
            fontFamily: "cursive",
            position: "absolute",
            top: "50%",
            left: "33%",
            fontSize: "20px",
            transform: "translate(-50%, -50%)",
          }}
        >
          Your-Kart
        </div>
      </div>
      {size.width >= 750 && (
        <div className="rightContainer">
          {isLoggedIn && (
            <Link className="link" to="/products">
              Products
            </Link>
          )}
        </div>
      )}
      <div className="leftContainer">
        {(!isLoggedIn && (
          <Link className="link" to="/">
            SignIn
          </Link>
        )) || (
          <Link className="link" onClick={handleLogout}>
            Signout
          </Link>
        )}
        <Link className="link" to="/signUp">
          Register
        </Link>
        {isLoggedIn && (
          <div className="cartContainer">
            <button onClick={handleCartClick}>
              <img src={cartIcon} alt="cart" />
            </button>
            <span>{totalCartItems} items</span>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
