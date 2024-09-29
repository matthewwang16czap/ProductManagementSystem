import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getUser, updateCartItem } from "../users/usersSlice";
import AddCartComponent from "./AddCartComponent";
import { getProduct, updateProduct } from "./productsSlice";
import { useNavigate, useLocation, useParams, Link } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();
  const [productImageView, setProductImageView] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useSelector((state) => state.products);
  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.users);

  useEffect(() => {
    // get user and product details
    dispatch(getUser());
    dispatch(getProduct({ productId }));
  }, [dispatch, productId]);

  useEffect(() => {
    console.log(product);
  }, [product]);

  useEffect(() => {
    if (productId) {
      // get file from product if update
      setProductImageView("/" + product?.imageUrl);
    }
  }, [product, productId]);

  return (
    <div className="product-detail-page text-center">
      <h1 className="mb-3">Product Detail</h1>
      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 mb-3">
          <img
            src={productImageView}
            className="img-fluid"
            alt="productImage"
            style={{ maxWidth: "90%", maxHeight: "50vh" }}
          />
        </div>
        <div className="col mb-3" style={{ wordWrap: "break-word" }}>
          <h6 style={{ color: "grey" }}>{product?.category}</h6>
          <h2 style={{ color: "black" }}>{product?.name}</h2>
          <pre style={{ color: "black" }}>{product?.description}</pre>
          <h3 style={{ color: "black" }}>$ {product?.price}</h3>
          <h5 style={{ color: "red" }}>remaining: {product?.stock}</h5>
          {user?.role === "admin" ? (
            <button type="button" className="btn btn-light">
              <Link to={location.pathname + "/edit"}>edit</Link>
            </button>
          ) : (
            <AddCartComponent productId={productId} />
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductDetailsPage;
