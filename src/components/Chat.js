import classes from "./Chat.module.css";
export default function Chat(props) {
  return (
    <div className={classes.chatBox}>
      <p>{props.message}</p>
    </div>
  );
}
