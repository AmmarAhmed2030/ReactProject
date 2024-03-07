import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ProductDetails.css";
export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://elgendystore-1.onrender.com/getProduct/${id}`
        );
        setProduct(response.data.foundProduct);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();

    // Cleanup function if needed
    return () => {
      // Any cleanup code here
    };
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="container py-5 my-5">
      <div className="row prdContainer">
        <div className="col-md-4 ">
          <img
            src={product.cloudinary_url}
            alt=""
            className="img-fluid prdImage d-block mx-auto"
          />
        </div>
        <div className="col-md-8 py-5 details">
          <div className="row">
            <h1 className="prdName py-2">
              Product Name : {product.productName}
            </h1>
            <h4 className="smallDetails">Price : {product.finalPrice}</h4>
            <h4 className="smallDetails">Discount : {product.discount}</h4>
            <h4 className="smallDetails">
              Price After Discount : {product.priceAfterDiscount}
            </h4>
            <div className="row btns">
              <Link to={"/cart"} className="w-50">
                <button className="btn btn-dark text-white  my-2 py-3">
                  Add To Cart
                </button>
              </Link>

              <Link to={"/"} className=" w-50">
                <button className="btn btn-danger text-white   my-2 py-3">
                  Back To Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
