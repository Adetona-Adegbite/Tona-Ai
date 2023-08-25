import { useEffect, useRef, useState } from "react";
import classes from "./ChatBox.module.css";
import Input from "./Input";
const apiKey = process.env.REACT_APP_API_KEY;
export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [info, setInfo] = useState(
    "Send a message to start your conversation!"
  );
  const [disabled, setDisabled] = useState(false);
  const messagesRef = useRef(null); // Reference to the message container

  useEffect(() => {
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [messages]);
  async function messageHandler(message) {
    setMessages((oldMessages) => {
      return [...oldMessages, message];
    });
    setDisabled(true);

    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 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" ,
          },
          body: JSON.stringify({
            messages: [{ role: "user", content: message }],
            max_tokens: 50,
            temperature: 0.7,
            model: "gpt-3.5-turbo",
          }),
        }
      );

      const data = await response.json();
      const botMessage = await data.choices[0].message.content;
      // console.log(data.choices[0].message.content);
      setMessages((oldMessages) => [...oldMessages, botMessage]);
      setDisabled(false);
    } catch (error) {
      console.error("Error sending message:", error);
      setDisabled(false);
    }
  }
  return (
    <div className={classes.chats}>
      <div className={classes.box} ref={messagesRef}>
        {messages.length > 0 ? (
          messages.map((message, index) => {
            const messageClass =
              index % 2 === 0 ? classes.evenMessage : classes.oddMessage;

            return (
              <div key={index} className={`${classes.chatBox} ${messageClass}`}>
                <p>{message}</p>
              </div>
            );
          })
        ) : (
          <p className={classes.info}>{info}</p>
        )}
      </div>
      <Input messageSubmit={messageHandler} disabled={disabled} />
    </div>
  );
}
