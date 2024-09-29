import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import {
  useNavigate,
  useLocation,
  useParams,
  Navigate,
} from "react-router-dom";
import { getCart, updateCartItem } from "../users/usersSlice";

function AddCartComponent({productId}) {
  const {
    cart,
    lastActionType,
    lastActionPayload,
    loading,
    error,
  } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [itemQuantity, updateItemQuantity] = useState(0);

  useEffect(() => {
    updateItemQuantity(cart?.reduce((acc, item) => acc += item.quantity, 0));
  }, [cart])

  const deleteQuantity = () => {
    if (itemQuantity >= 0) updateItemQuantity(itemQuantity - 1);
  }

  const addQuantity = () => {
    updateItemQuantity(itemQuantity + 1);
  }

  if (error || !cart) {
    return (<button type="button" className="btn btn-secondary">Login</button>)
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
        value={itemQuantity}
        onChange={() => dispatch(updateCartItem({productId, quantity: itemQuantity}))}
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

export default AddCartComponent;
