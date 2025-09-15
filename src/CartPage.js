import React from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import './CartPage.css';

export default function CartPage() {
  const { cartItems = [], removeFromCart } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + (parseFloat(item.price) || 0),
    0
  );

  return (
    <div className="cart-container">
      <div className="cart-box">
        <h2 className="cart-title">🛒 Your Shopping Cart</h2>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={item.id || index} className="cart-item">
                  <img
                    src={item.image || "/place_holder.webp"}
                    alt={item.name}
                    className="cart-image"
                  />
                  <div className="cart-details">
                    <h3 className="cart-name">{item.name}</h3>
                    <p className="cart-price">Rs {parseFloat(item.price).toFixed(2)}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="cart-remove-button"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <p className="cart-total">Total: Rs {totalPrice.toFixed(2)}</p>
              <div className="cart-actions">
                <Link to="/" className="cart-button cart-continue">
                  Continue Shopping
                </Link>
                <button className="cart-button cart-checkout">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
