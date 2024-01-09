import './App.css';
import gptLogo from "./assets/chatgpt.svg"
import addBtn from "./assets/add-30.png"
import msgIcon from "./assets/message.svg"
import home from "./assets/home.svg"
import saved from "./assets/bookmark.svg"
import rocket from "./assets/rocket.svg"
import send from "./assets/send.svg"
import userIcon from "./assets/user-icon.png"
import gptImgLogo from "./assets/chatgptLogo.svg"
import {sendMessage} from "./OpenAi"
import { useEffect, useRef, useState } from 'react';



function App() {
  const msgEnd = useRef(null); 
  const [input, setInput] = useState(""); 
  const [messages, setMessages] = useState([{

    text: "Hi, I am ChatBot from OpenAi", isBot: true, 
  }]); 

  const handleSend = async() => {
    const res = await sendMessage(input); 
    setInput(""); 
    setMessages([...messages, {text: input, isBot: false}, {text: res, isBot: true}]); 
    };

    useEffect( () => {
      msgEnd.current.scrollIntoView(); 
    }, [messages]); 

    const handleEnter = (e) =>  {
      if(e.key === "Enter")
      handleSend(input); 
    };
    const handleQuery = async(e) =>  {
      const res = await sendMessage(e.target.value); 
    setInput(""); 
    setMessages([...messages, {text: input, isBot: false}, {text: res, isBot: true}]); 
    }
    


  return (
    <div className='App'>
      <div className="sideBar">

        <div className="upperSideBar">
          <div className="upperTop"><img src={gptLogo}></img><span>chatGPT</span></div>
          <button className="midBtn" onClick={ () => window.location.reload()}><img src={addBtn} className="addBtn" /><span>New Chat</span></button>        
          
          <div className="upperBtn">
            <button className='query' value={"What is Programming?"} onClick={handleQuery}><img src={msgIcon}></img><span>What is Programming?</span></button>
            <button className='query' value={"How to use an API"} onClick={handleQuery}><img src={msgIcon}></img><span>How to use an API</span></button>
          </div>

        </div>


        <div className="lowerSideBar">
          <div className="listItems"><img src={home}></img>Home</div>
          <div className="listItems"><img src={saved}></img>Saved</div>
          <div className="listItems"><img src={rocket}></img>Upgraded to Pro</div>
        </div>
      </div>

      <div className="main">
        <div className="chats">
          
        {messages?.map( (message, index) => {
                  return <div key={index} className={message.isBot? "chat bot": "chat"}>
                            <img className='chat-img' src={message.isBot?  gptImgLogo: userIcon} />
                            <p className='text'>{message.text}</p>
                        </div>

        })}
        <div ref={msgEnd} />        
        
        </div>



        <div className="chatFooter">
          <div className="inp">
            <input value={input} type='text' placeholder='send a message...' 
            onChange={ (e) => setInput(e.target.value)} onKeyDown={handleEnter} ></input>
            <button className='send' onClick={handleSend}><img src={send} /></button>
          </div>
          <p>ChatGPT can make mistakes. Consider checking important information.</p>
        </div>

      </div>
    </div>
  );
}

export default App;
