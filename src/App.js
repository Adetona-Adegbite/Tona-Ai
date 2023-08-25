import ChatBox from "./components/ChatBox";
import ChatHistory from "./components/ChatHistory";
import Header from "./components/Header";
import classes from "./App.module.css";
import Chat from "./components/Chat";

function App() {
  return (
    <>
      <Header />
      <div className={classes.main}>
        <ChatHistory />
        <ChatBox />
      </div>
    </>
  );
}

export default App;
