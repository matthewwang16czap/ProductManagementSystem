import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart, updateCartItem, checkOut } from "../users/usersSlice";
import AddCartComponent from "../products/AddCartComponent";

const CartPage = () => {
  const [discount, setDiscount] = useState(0);
  const [coupon, setCoupon] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { cart, lastActionType, loading, error } = useSelector(
    (state) => state.users
  );
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const newSubtotal =
      cart?.reduce(
        (acc, item) => acc + item.productId.price * item.quantity,
        0
      ) || 0;
    setSubtotal(newSubtotal);
    setTotal(newSubtotal * 1.1 - discount); // Assuming 10% tax
  }, [cart, discount]);

  const handleClose = () => {
    navigate("/products");
  };

  const handleEnterCouponChange = (e) => {
    setCoupon(e.target.value);
  };

  const handleApplyDiscountClick = () => {
    // check coupon validity
    const valid_coupons = { DISCOUNT25: 25 };
    if (valid_coupons[coupon]) {
      setDiscount(valid_coupons[coupon]);
    } else {
      window.alert("invalid coupon");
    }
  };

  if (lastActionType?.includes("users/getCart") && error) {
    return <p>error</p>;
  }

  // if (loading) {
  //   return <p>loading</p>;
  // }

  return (
    <div className="container-fluid p-3" style={{ maxWidth: "600px" }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h5>Cart ({cart?.length})</h5>
        <button className="btn btn-outline-secondary" onClick={handleClose}>
          Close
        </button>
      </header>

      {/* Cart Items */}
      <section className="mb-3">
        <ul className="list-unstyled">
          {cart?.map((item, index) => (
            <li key={index} className="card mb-2 p-2">
              <div className="d-flex text-center">
                <img
                  src={"/" + item.productId.imageUrl}
                  alt={item.productId.name}
                  style={{ width: "6em", height: "6em", objectFit: "cover" }}
                  className="me-3"
                />
                <div className="flex-grow-1">
                  <h6>{item.productId.name}</h6>
                  <AddCartComponent productId={item.productId._id} />
                  <div className="text-muted">${item.productId.price}</div>
                </div>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    dispatch(
                      updateCartItem({
                        productId: item.productId._id,
                        quantity: 0,
                      })
                    )
                  }
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Discount Section */}
      <section className="mb-3">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter Discount"
            onChange={handleEnterCouponChange}
          />
          <button
            className="btn btn-primary"
            onClick={handleApplyDiscountClick}
          >
            Apply
          </button>
        </div>
      </section>

      {/* Summary Section */}
      <section className="card p-3">
        <ul className="list-unstyled mb-0">
          <li className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </li>
          <li className="d-flex justify-content-between">
            <span>Tax</span>
            <span>${(subtotal * 0.1).toFixed(2)}</span>
          </li>
          <li className="d-flex justify-content-between">
            <span>Discount</span>
            <span>-${discount.toFixed(2)}</span>
          </li>
          <li className="d-flex justify-content-between">
            <strong>Estimated Total</strong>
            <strong>${total.toFixed(2)}</strong>
          </li>
        </ul>
      </section>

      {/* Checkout Button */}
      <button
        className="btn btn-primary w-100 mt-3"
        onMouseDown={() => dispatch(checkOut())}
      >
        Continue to checkout
      </button>
    </div>
  );
};

export default CartPage;
