/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./ProductsPage.css";
import Dropdown from "../common/dropdown/Dropdown";
import ProductCard from "../common/productCard/ProductCard";
import FilterBar from "../common/filterbar/FilterBar";
import { useWindowSize } from "../../Hooks";
import { useAxios } from "../../Hooks";
import Toast from "../common/toast/Toast";
import { incrementCartItems } from "../../redux/actions/actions";

const ProductsPage = () => {
  const size = useWindowSize();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(null);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(null);
  const [buyProduct, setBuyProduct] = useState(null);
  const [open, setOpen] = React.useState(false);
  const { response: categories = [] } = useAxios({ url: "/categories" });
  const { response: products = [] } = useAxios({ url: "/products" });
  const [productsList, setProductsList] = useState(products);
  console.log(products);
  const { response: buyNowProductResponse } = useAxios({
    url: "/posts",
  });

  // useEffect(() => {}, [dispatch]);
  // useEffect(() => {
  //   setProductsList(products);
  // }, [products]);

  const handleSearch = (e, id) => {
    let searchInput = e.target.value;
    if (searchInput.length >= 2) {
      const filteredProducts = productsList.filter((product) => {
        return product.name.toLowerCase().includes(searchInput.toLowerCase());
      });
      setProductsList(filteredProducts);
    } else {
      setProductsList(products);
    }
  };

  useEffect(() => {
    if (Array.isArray(categories) && Array.isArray(products)) {
      if (categories.length > 0 && products.length > 0) {
        let sortedCategories = sortByKey(categories, "order");
        sortedCategories = sortedCategories.filter((item) => item.order > 0);
        handleCategoryClick(sortedCategories[0].id);
        setValue(sortedCategories[0].name);
      }
    }
  }, [categories, products]);

  const handleChange = (id, val) => {
    handleCategoryClick(id);
    setValue(val);
    setShow(false);
  };

  const handleToggle = (e) => {
    e.target.focus();
    setShow((prev) => !prev);
  };

  const sortByKey = (array, key) => {
    return array.sort((a, b) => {
      console.log("a,bkey", a[key], b[key]);
      let x = a[key];
      let y = b[key];
      return x < y ? -1 : x > y ? 1 : 0;
    });
  };

  const handleCategoryClick = (id) => {
    setActiveTab(id);
    let filteredProducts = products.filter((item) => item.category === id);
    setProductsList(filteredProducts);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (buyProduct) {
      dispatch(incrementCartItems(buyProduct));
    }
  }, [buyProduct]);

  const buyNowHandler = (id, name, price, src) => {
    let itemsObj = {
      id,
      name,
      price,
      src,
    };
    setBuyProduct(itemsObj);
    setOpen(true);
  };

  return Array.isArray(categories) && Array.isArray(productsList) ? (
    categories.length > 0 && (
      <>
        <div className="form-outline">
          <input
            type="text"
            id="formControlLg"
            className="form-control form-control-lg"
            placeholder="search for products"
            onChange={(id) => handleSearch(id)}
          />
        </div>
        <section className="productContainer">
          {size.width < 750 ? (
            <Dropdown
              show={show}
              value={value}
              handleToggle={handleToggle}
              handleChange={handleChange}
              DropdownList={sortByKey(categories, "order")}
            />
          ) : (
            <div className="filterContainer">
              <FilterBar
                categories={sortByKey(categories, "order")}
                handleClick={handleCategoryClick}
                activeTab={activeTab}
              />
            </div>
          )}

          <div className="productListContainer">
            {productsList.length ? (
              productsList.map((item) => (
                <ProductCard
                  key={item.id}
                  src={require(`../../${item.imageURL}`)}
                  title={item.name}
                  price={item.price}
                  description={item.description}
                  buyNowHandler={() =>
                    buyNowHandler(item.id, item.name, item.price, item.imageURL)
                  }
                />
              ))
            ) : (
              <div>No products found</div>
            )}
          </div>
          <Toast
            open={open}
            handleClose={handleClose}
            response={buyNowProductResponse?.responseMessage}
          />
        </section>
      </>
    )
  ) : (
    <div>Loading...</div>
  );
};

export default ProductsPage;
