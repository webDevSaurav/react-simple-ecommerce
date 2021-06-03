import React, { useContext, useState } from "react";

import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CheckOut from "../CheckOutForm/CheckOutForm";

const URL =
  "https://react-movies-55a43-default-rtdb.firebaseio.com/orders.json";

const Cart = (props) => {
  const [checkOutState, setCheckOutState] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [isHttpError, setIsHttpError] = useState(false);

  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem(item);
  };

  const onOrderHandler = () => {
    setCheckOutState(true);
  };

  const submitOrder = async (userData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch(URL, {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      });
      setIsSubmitting(false);
      if (!response.ok) {
        throw new Error("Something went wrong.");
      }
      setDidSubmit(true);
    } catch (error) {
      setIsHttpError(error.message);
    }
    cartCtx.clearCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={onOrderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkOutState && (
        <CheckOut onClose={props.onClose} submitOrder={submitOrder} />
      )}
      {!checkOutState && modalActions}
      {isHttpError && <p>{isHttpError}</p>}
    </React.Fragment>
  );

  const isSubmittingModal = <p>Sending Order Data!</p>;

  const isSubmittedModal = <p> Order is Sent. </p>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModal}
      {!isSubmitting && didSubmit && isSubmittedModal}
    </Modal>
  );
};

export default Cart;
