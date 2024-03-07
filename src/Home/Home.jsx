import axios from "axios";
import React, { useEffect, useState } from "react";
import "./Home.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../Redux/ProductsSlice";
import { Link } from "react-router-dom";
import { addToCart } from "../Redux/cartSlice";

export default function Home() {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.productsReducer);
  console.log(data);

  const isLoading = useSelector((state) => state.productsReducer.isLoading);

  const [products, setProducts] = useState([]);
  async function getProductsWithPagenation(page, limit) {
    let { data } = await axios.get(
      `https://elgendystore-1.onrender.com/getWithPageAndLimit?page=${page}&limit=${limit}`
    );

    console.log(data.pageProducts);
    setProducts(data.pageProducts);
  }
  useEffect(() => {
    dispatch(getAllProducts({ page: 1, limit: 22 }));
  }, [dispatch]);
  // useEffect(() => {
  //   getProductsWithPagenation(1, 22);
  // }, []);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };
  return (
    <>
      <div className="container py-5 my-5">
        <div className="row gy-3">
          {isLoading ? (
            <i className="fa fa-spin fa-spinner fa-3x"></i>
          ) : (
            <>
              {data.data.pageProducts?.map((prd) => {
                return (
                  <div className="col-md-3" key={prd._id}>
                    <div className="product">
                      <img
                        src={prd.cloudinary_url}
                        className="img-fluid img-style w-100"
                        alt={prd.productName}
                      />
                      <div className="detailsIcon">
                        <Link to={`/products/${prd._id}`}>
                          <i className="fa-regular fa-eye"></i>
                        </Link>
                      </div>

                      <div className="discount">- {prd.discount}%</div>
                      <div className="product-details">
                        <button
                          className="cartBtn"
                          onClick={() => {
                            handleAddToCart(prd);
                          }}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <h3>Product Name: {prd.productName}</h3>
                      <p>Quantity : {prd.stock}</p>
                      <p className="price">
                        {prd.priceAfterDiscount} EGP
                        <span>{prd.finalPrice}EGP</span>
                      </p>
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>
    </>
  );
}
