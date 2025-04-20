import React from "react";
import { useState, useContext } from "react";
import "./Chat.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from "@chatscope/chat-ui-kit-react";
import { DarkModeContext } from "../context/DarkModeContext";

const API_KEY = "";

const systemMessage = {
  //  Explain things like you're talking to a software professional with 5 years of experience.
  role: "system",
  content:
    "Sos Finvy, un asistente virtual de la plataforma Finverse. Esta plataforma sirve para que los usuarios puedan aprender de finanzas de manera interactiva. Está dividida por niveles de lo mas basico a lo mas avanzado. Cualquier cosa que te pregunte sobre algo que no tenga que ver con la pagina, me gustaria que des una respuesta intentando relacionar lo que el usuario te pregunta con Finverse.",
};

export function Chat(props) {

  const { darkMode } = useContext(DarkModeContext);

  const [messages, setMessages] = useState([
    {
      message:
        "Hola, Soy <strong>Finvy</strong>! Puedes consultarme lo que quieras sobre <strong>Finverse</strong>!",
      sentTime: "just now",
      sender: "ChatGPT",
      direction: "incoming",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: "outgoing",
      sender: "user",
    };

    const newMessages = [...messages, newMessage];

    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) {
    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message };
    });

    const apiRequestBody = {
      model: "gpt-3.5-turbo",
      messages: [systemMessage, ...apiMessages],
    };

    await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRequestBody),
    })
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        console.log(data);
        setMessages([
          ...chatMessages,
          {
            message: data.choices[0].message.content,
            sender: "ChatGPT",
            direction: "incoming",
          },
        ]);
        setIsTyping(false);
      });
  }

  return (
    <>
      <div className="chat-bg">
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
          <MainContainer>
            <ChatContainer>
              <MessageList
                scrollBehavior="smooth"
                typingIndicator={
                  isTyping ? (
                    <TypingIndicator content="Finvy está escribiendo" />
                  ) : null
                }
              >
                {messages.map((message, i) => {
                  console.log(message);
                  return (
                    <Message
                      key={i}
                      model={{
                        message: message.message,
                        sentTime: message.sentTime,
                        sender: message.sender,
                        direction: message.direction,
                      }}
                      className={
                        message.direction === "outgoing"
                          ? "message-outgoing"
                          : "message-incoming"
                      }
                      style={{
                        marginTop: "20px",
                        borderRadius: "0 10px",
                      }}
                    />
                  );
                })}
              </MessageList>
              <MessageInput
                placeholder="Escribe tu mensaje aquí"
                onSend={handleSend}
                className="message-input"
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
}
