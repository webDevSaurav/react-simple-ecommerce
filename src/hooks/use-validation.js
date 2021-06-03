import { useState } from "react";

const useValidation = (validationFn) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [enteredValueTouched, setEnteredValueTouched] = useState(false);

  const enteredValueIsValid = validationFn(enteredValue);
  const enteredValueIsInValid = !enteredValueIsValid && enteredValueTouched;

  //handlers
  const enteredValueChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const enteredValueBlurHandler = (state) => {
    setEnteredValueTouched(state);
  };

  const reset = () => {
    setEnteredValue("");
    setEnteredValueTouched(false);
  };

  return {
    enteredValue,
    enteredValueChangeHandler,
    enteredValueBlurHandler,
    enteredValueIsValid,
    enteredValueIsInValid,
    reset,
  };
};

export default useValidation;
