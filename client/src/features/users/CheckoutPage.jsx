import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCart, updateCartItem } from '../users/usersSlice';
import "bootstrap/dist/css/bootstrap.min.css";

const CheckOutPage = () => {
  const [discount, setDiscount] = useState(0);
  const [value, setValue] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
    const newSubtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setSubtotal(newSubtotal);
    setTotal(newSubtotal * 1.1 - discount); // Assuming 10% tax
  }, [dispatch, cart, discount]);

  const handleClose = () => {
    navigate('/products');
  };

  const handleChange = (e) => {
    const inputValue = Number(e.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
      setValue(inputValue);
    } else {
      alert('Discount input is not valid');
    }
  };

  const handleClick = () => {
    setDiscount(value);
  };

  const handleQuantity = (item, value) => {
    const product = {
      product: item.product,
      quantity: item.quantity + value,
    };
    dispatch(updateCartItem(product));
  };

  const deleteItem = (item) => {
    const product = {
      product: item.product,
      quantity: 0,
    };
    dispatch(updateCartItem(product));
  };

  return (
    <div className="container-fluid p-3" style={{ maxWidth: '600px' }}>
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center mb-3">
        <h5>Cart ({cart.length})</h5>
        <button className="btn btn-outline-secondary" onClick={handleClose}>Close</button>
      </header>

      {/* Cart Items */}
      <section className="mb-3">
        <ul className="list-unstyled">
          {cart.map((item, index) => (
            <li key={index} className="card mb-2 p-2">
              <div className="d-flex align-items-center">
                <img src={item.product.imageUrl} alt={item.product.name} style={{ width: '60px', height: '60px', objectFit: 'cover' }} className="me-3" />
                <div className="flex-grow-1">
                  <h6>{item.product.name}</h6>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-outline-secondary btn-sm me-2" onClick={() => handleQuantity(item, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="btn btn-outline-secondary btn-sm ms-2" onClick={() => handleQuantity(item, 1)}>+</button>
                  </div>
                  <div className="text-muted">${item.product.price}</div>
                </div>
                <button className="btn btn-danger btn-sm" onClick={() => deleteItem(item)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Discount Section */}
      <section className="mb-3">
        <div className="input-group">
          <input type="number" className="form-control" placeholder="Enter Discount" onChange={handleChange} />
          <button className="btn btn-primary" onClick={handleClick}>Apply</button>
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
      <button className="btn btn-primary w-100 mt-3">Continue to checkout</button>
    </div>
  );
};

export default CheckOutPage;
