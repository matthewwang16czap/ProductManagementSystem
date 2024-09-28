import { useSelector, useDispatch } from "react-redux";
import { useEffect,useState } from "react";
import { getUser, updateCartItem } from "../users/usersSlice";
import { getProduct, updateProduct } from "./productsSlice";
import { useNavigate, useParams } from "react-router-dom";

function ProductDetailsPage() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    dispatch(getProduct(productId));
  }, [dispatch, productId]);

  const handleAddProduct = () => {
    // user slice
    dispatch(updateCartItem({ ...product, quantity: productQuantityInput }));
  };

  //
  const [isInput, setIsInput] = useState(ture);
  const [inputValue, setInputValue] = useState(null);

  const handleClick = () => {
    setIsInput(false);
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (user.role === "admin") {
      dispatch(
        updateCartItem({ product: lastActionPayload, quantity: inputValue })
      );
    } else {
      lastActionPayload.description = inputValue;
      dispatch(updateProduct(inputValue));
      navigate("/products/create");
    }
    setIsInput(true);
  };

  const styles = {
    container: {
      display: "flex",
      flexWrap: "wrap",
      width: "100%",
    },
    left: {
      flex: 1,
      maxWidth: "50%",
      padding: "10px",
    },
    right: {
      flex: 1,
      maxWidth: "50%",
      padding: "20px",
      backgroundColor: "#f8f9fa",
    },
    img: {
      width: "100%",
      height: "auto",
    },
    category: {
      color: "gray",
      fontSize: "0.9rem",
    },
    name: {
      color: "black",
      fontWeight: "bold",
    },
    price: {
      color: "#333",
      margin: "10px 0",
    },
    outOfStock: {
      color: "red",
      fontWeight: "bold",
    },
    description: {
      fontSize: "1rem",
      color: "#333",
    },
    button: {
      backgroundColor: "purple",
      color: "white",
      border: "none",
      padding: "10px 20px",
      marginTop: "10px",
      cursor: "pointer",
    },
    input: {
      marginTop: "10px",
      padding: "5px",
      width: "80%",
    },
    responsive: {
      "@media (max-width: 768px)": {
        left: {
          maxWidth: "100%",
          flex: "100%",
        },
        right: {
          maxWidth: "100%",
          flex: "100%",
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <img
          style={styles.img}
          src={lastActionPayload.imageUrl}
          alt={lastActionPayload.name}
        />
      </div>

      <div style={styles.right}>
        <span style={styles.category}>{lastActionPayload.category}</span>
        <h4 style={styles.name}>{lastActionPayload.name}</h4>
        <div>
          <h4 style={styles.price}>${lastActionPayload.price}</h4>
          {lastActionPayload.stock <= 0 && (
            <span style={styles.outOfStock}>out of stock</span>
          )}
        </div>
        <p style={styles.description}>{lastActionPayload.description}</p>
        <div>
          <button style={styles.button} onClick={handleAddProduct}>
            Add To Cart
          </button>
          {isInput ? (
            <button style={styles.button} onClick={handleClick}>
              {user.role === "admin" ? "Edit" : inputValue}
            </button>
          ) : (
            <div>
              <input
                style={styles.input}
                value={inputValue}
                onChange={(e) => handleChange(e)}
              />
              <button style={styles.button} onClick={handleSubmit}>
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductDetailsPage;
