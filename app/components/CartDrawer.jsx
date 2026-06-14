"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0
});

export function useCart(initialItem) {
  const [items, setItems] = useState(initialItem ? [{ ...initialItem, quantity: 1 }] : []);

  function addItem(product, size = "M") {
    setItems((current) => {
      const existing = current.find((item) => item.id === product.id && item.size === size);
      if (existing) {
        return current.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...current,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
          quantity: 1
        }
      ];
    });
  }

  function updateQuantity(id, size, change) {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id && item.size === size
            ? { ...item, quantity: Math.max(1, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function removeItem(id, size) {
    setItems((current) => current.filter((item) => !(item.id === id && item.size === size)));
  }

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return { items, addItem, updateQuantity, removeItem, subtotal, count };
}

export function CartButton({ count, onClick }) {
  return (
    <button className="iconButton" type="button" onClick={onClick} aria-label="Open cart">
      <span className="cartCount" aria-hidden="true">{count}</span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M6.5 8.5H17.5L18.5 21H5.5L6.5 8.5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8.5V6.75C9 5.09 10.34 3.75 12 3.75C13.66 3.75 15 5.09 15 6.75V8.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </button>
  );
}

export function CartDrawer({ isOpen, onClose, cart }) {
  return (
    <>
      <div className={`cartOverlay ${isOpen ? "isOpen" : ""}`} onClick={onClose} />
      <aside className={`cartDrawer ${isOpen ? "isOpen" : ""}`} aria-hidden={!isOpen}>
        <div className="cartHeader">
          <div>
            <p className="eyebrow">Private Cart</p>
            <h2>Selected Artifacts</h2>
          </div>
          <button className="iconButton" type="button" onClick={onClose} aria-label="Close cart">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="cartItems">
          {cart.items.length === 0 ? (
            <div className="emptyCart">
              <p>Your archive is empty.</p>
              <span>Choose a piece from the collection to begin.</span>
            </div>
          ) : (
            cart.items.map((item) => (
              <article className="cartItem" key={`${item.id}-${item.size}`}>
                <div className="cartImage">
                  <Image src={item.image} alt="" width={180} height={120} />
                </div>
                <div className="cartDetails">
                  <div>
                    <h3>{item.name}</h3>
                    <p>Size {item.size} / {currency.format(item.price)}</p>
                  </div>
                  <div className="cartControls">
                    <div className="quantityControl" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" onClick={() => cart.updateQuantity(item.id, item.size, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => cart.updateQuantity(item.id, item.size, 1)}>+</button>
                    </div>
                    <button className="removeButton" type="button" onClick={() => cart.removeItem(item.id, item.size)}>
                      Remove
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>

        <div className="cartFooter">
          <div className="subtotal">
            <span>Subtotal</span>
            <strong>{currency.format(cart.subtotal)}</strong>
          </div>
          <button className="primaryAction" type="button">Checkout</button>
          <p>Secure checkout opens in the next release.</p>
        </div>
      </aside>
    </>
  );
}

export { currency };
