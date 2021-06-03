import { useRef, useState } from "react";
import classes from "./CheckOutForm.module.css";

const isEmpty = (value) => value.trim() !== "";
const isFiveChars = (value) => value.trim().length === 5;

const Checkout = (props) => {
  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postcodeInputRef = useRef();
  const cityInputRef = useRef();

  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    postalCode: true,
    city: true,
  });

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInputRef.current.value;
    const street = streetInputRef.current.value;
    const postCode = postcodeInputRef.current.value;
    const city = cityInputRef.current.value;

    const enteredNameIsValid = isEmpty(name);
    const enteredStreetIsValid = isEmpty(street);
    const enteredCityIsValid = isEmpty(city);
    const enteredPostCodeIsValid = isFiveChars(postCode);

    setFormInputsValidity({
      name: enteredNameIsValid,
      street: enteredStreetIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostCodeIsValid,
    });

    const formIsValid =
      enteredNameIsValid &&
      enteredStreetIsValid &&
      enteredCityIsValid &&
      enteredPostCodeIsValid;

    if (!formIsValid) {
      return;
    }

    props.submitOrder({ name, street, postCode, city });
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? "" : classes.invalid
        }`}
      >
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please Enter a valid name!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? "" : classes.invalid
        }`}
      >
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please Enter a valid street!</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.postalCode ? "" : classes.invalid
        }`}
      >
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postcodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please Enter a valid postal code!</p>
        )}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? "" : classes.invalid
        }`}
      >
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please Enter a valid city!</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onClose}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
