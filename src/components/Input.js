import { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";

import classes from "./Input.module.css";
export default function Input(props) {
  const [message, setMessage] = useState("");
  function onChangeHandler(e) {
    setMessage(e.target.value);
  }
  function submitHandler() {
    props.messageSubmit(message);
    setMessage("");
  }
  function keyPressHandler(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      props.messageSubmit(message);
      setMessage("");
    }
  }
  return (
    <div className={classes.input}>
      <div>
        <textarea
          type="text"
          value={message}
          onChange={onChangeHandler}
          placeholder="Send a Message"
          onKeyDown={keyPressHandler}
        />
        <button onClick={submitHandler} disabled={props.disabled}>
          <AiOutlineSend fontSize={20} />
        </button>
      </div>
    </div>
  );
}
