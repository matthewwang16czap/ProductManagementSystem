import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getCart, updateCartItem } from "../users/usersSlice";

function AddCartComponent({ productId }) {
  const { user, cart, lastActionType, loading, error } = useSelector(
    (state) => state.users
  );
  const cartItem = useSelector((state) =>
    state.users.cart?.find((item) => item.productId._id === productId)
  );
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(cartItem?.quantity || 0);

  useEffect(() => {
    setQuantity(cartItem?.quantity || 0);
  }, [cartItem]);

  useEffect(() => {
    if (!error && lastActionType?.includes("users/updateCartItem")) {
      dispatch(getCart());
    }
    console.log(cart);
  });

  const deleteQuantity = () => {
    dispatch(updateCartItem({ productId, quantity: quantity - 1 }));
  };

  const addQuantity = () => {
    dispatch(updateCartItem({ productId, quantity: quantity + 1 }));
  };

  const handleBlur = () => {
    // Dispatch the action to update the cart when the input loses focus
    dispatch(updateCartItem({ productId, quantity: Number(quantity) }));
  };

  const handleChange = (e) => {
    // Update local state as the user types
    setQuantity(e.target.value);
  };

  if (!user || user.role === "admin") {
    return (
      <button type="button" className="btn btn-secondary" disabled>
        become a customer to add to cart
      </button>
    );
  }

  if (loading) {
    return <p>loading...</p>;
  }

  return (
    <div className="input-group mb-3">
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon-left"
        onMouseDown={deleteQuantity}
      >
        -
      </button>
      <input
        type="text"
        className="form-control"
        placeholder=""
        aria-label="Example text with button addon"
        aria-describedby="input-between-button"
        min="0"
        step="1"
        value={quantity}
        onChange={handleChange} // Update the local state on every change
        onBlur={handleBlur} // Dispatch the update when the user leaves the input field
      />
      <button
        className="btn btn-outline-secondary"
        type="button"
        id="button-addon-right"
        onMouseDown={addQuantity}
      >
        +
      </button>
    </div>
  );
}

AddCartComponent.propTypes = {
  productId: PropTypes.string.isRequired,
}

export default AddCartComponent;
