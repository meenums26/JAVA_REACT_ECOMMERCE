import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, totalAmount } = useCart();
  const navigate = useNavigate();

  const sampleProducts = [
    { id: 101, name: 'Wireless Headphones', price: 99.99, imageUrl: 'https://via.placeholder.com/150' },
    { id: 102, name: 'Ergonomic Keyboard', price: 49.99, imageUrl: 'https://via.placeholder.com/150' },
  ];

  const handleCheckout = () => {
    navigate('/orders');
  };

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <button className="btn-primary" onClick={() => navigate('/products')}>
            Browse Products
          </button>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div className="cart-item-card" key={item.id}>
                <img src={item.imageUrl || 'https://via.placeholder.com/80'} alt={item.name} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <button className="btn-remove" onClick={() => removeFromCart(item.id)}>
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* Recommended Products Display Section */}
      <div className="recommended-section">
        <h3>You Might Also Like</h3>
        <div className="product-grid">
          {sampleProducts.map((product) => (
            <div key={product.id} className="mini-product-card">
              <img src={product.imageUrl} alt={product.name} />
              <h4>{product.name}</h4>
              <p>${product.price.toFixed(2)}</p>
              <button className="btn-add-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cart;
