import React, { useEffect, useState, useContext } from "react"
import { useParams } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import NavbarComponent from "../components/Navbar"
import { Container, Row, Col } from "react-bootstrap"
import { io } from "socket.io-client"
import Contact from "../components/Contact"
import Chat from "../components/Chat"

let socket

export default function ChatDonorpage() {
  const [state] = useContext(AuthContext)
  const idFund = useParams()

  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([])

  const [messages, setMessages] = useState([])

  useEffect(() => {
    socket = io("http://localhost:5000", {
      auth: {
        token: localStorage.getItem("accessToken"),
      },
      query: {
        id: state.user.id,
      },
    })

    socket.on("new message", () => {
      console.log("contact", contact)
      console.log("triggered", contact?.id)
      socket.emit("load messages", contact?.id)
    })

    loadContact()
    loadMessages()
    return () => {
      socket.disconnect()
    }
  }, [messages])

  const loadContact = () => {
    socket.emit("load fundraiser contact", idFund)
    socket.on("fundraiser contact", async (data) => {
      const dataContact = {
        ...data,
        fullName: data.fullName + " - Fundraiser",
        message:
          messages.length > 0
            ? messages[messages.length - 1].message
            : "Click here to start message",
      }
      setContacts([dataContact])

      // let recipientLastChat = null
      // let senderLastChat = null
      // let lastChat = null
      // if (data.recipientMessage) {
      //   recipientLastChat = data.recipientMessage.filter(
      //     (item) => item.idSender == state.user.id
      //   )
      // }
      // console.log(recipientLastChat)
      // if (data.senderMessage) {
      //   senderLastChat = data.senderMessage.filter(
      //     (item) => item.idRecipient === state.user.id
      //   )
      // }
      // console.log(senderLastChat)
      // if (senderLastChat && recipientLastChat) {
      //   if (
      //     senderLastChat[senderLastChat.length - 1]?.id >
      //     recipientLastChat[recipientLastChat.length - 1]?.id
      //   ) {
      //     lastChat = senderLastChat[senderLastChat.length - 1]?.message
      //   } else {
      //     lastChat = recipientLastChat[recipientLastChat.length - 1]?.message
      //   }
      // }
      // // manipulate data to add message property with the newest message
      // const dataContact = {
      //   ...data,
      //   message: lastChat ? lastChat : "Click here to start message",
      // }
    })
  }
  const onClickContact = (data) => {
    setContact(data)

    socket.emit("load messages", data.id)
  }

  const loadMessages = () => {
    socket.on("messages", async (data) => {
      console.log(data)

      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }))
        setMessages(dataMessages)
      }
      const chatMessagesElm = document.getElementById("chat-messages")
      chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
    })
  }
  const onSendMessage = (e) => {
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      }

      socket.emit("send message", data)
      e.target.value = ""
    }
  }

  return (
    <>
      <NavbarComponent />
      <Container fluid style={{ height: "89.5vh" }}>
        <Row>
          <Col
            md={3}
            style={{ height: "89.5vh" }}
            className="px-3 border-end border-dark overflow-auto"
          >
            <Contact
              dataContact={contacts}
              clickContact={onClickContact}
              contact={contact}
            />
          </Col>
          <Col md={9} style={{ maxHeight: "89.5vh" }} className="px-0">
            <Chat
              contact={contact}
              messages={messages}
              user={state.user}
              sendMessage={onSendMessage}
            />
          </Col>
        </Row>
      </Container>
    </>
  )
}
