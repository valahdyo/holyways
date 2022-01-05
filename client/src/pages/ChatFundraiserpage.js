import React, { useEffect, useState, useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import { AuthContext } from "../context/AuthContext"
import Chat from "../components/Chat"
import Contact from "../components/Contact"
import NavbarComponent from "../components/Navbar"
import { io } from "socket.io-client"

let socket

export default function ChatFundraiserpage() {
  const [contact, setContact] = useState(null)
  const [contacts, setContacts] = useState([])

  const [messages, setMessages] = useState([])
  const [state] = useContext(AuthContext)

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
      socket.emit("load messages", contact?.id)
    })
    socket.on("connect_error", (err) => {
      console.error(err.message) // not authorized
    })
    loadContacts()
    loadMessages()

    return () => {
      socket.disconnect()
    }
  }, [messages])

  const loadContacts = () => {
    socket.emit("load donor contacts")
    socket.on("donor contacts", (data) => {
      console.log(data)
      // filter just customers which have sent a message
      let dataContacts = data.filter(
        (item) =>
          item.id !== state.user.id &&
          (item.recipientMessage.length > 0 || item.senderMessage.length > 0)
      )

      // manipulate customers to add message property with the newest message
      dataContacts = dataContacts.map((item) => {
        let lastChat = null
        if (item.senderMessage && item.recipientMessage) {
          if (
            item.senderMessage[item.senderMessage.length - 1].id >
            item.recipientMessage[item.recipientMessage.length - 1].id
          ) {
            lastChat = item.senderMessage[item.senderMessage.length - 1].message
          } else {
            lastChat =
              item.recipientMessage[item.recipientMessage.length - 1].message
          }
        }

        return {
          ...item,
          fullName: item.fullName + " - Donor",
          message: lastChat ? lastChat : "Click here to start message",
        }
      })
      setContacts(dataContacts)
    })
  }

  const loadMessages = (value) => {
    // define listener on event "messages"
    socket.on("messages", async (data) => {
      console.log(data)
      // get data messages
      if (data.length > 0) {
        const dataMessages = data.map((item) => ({
          idSender: item.sender.id,
          message: item.message,
        }))
        console.log(dataMessages)
        setMessages(dataMessages)
      }
      const chatMessagesElm = document.getElementById("chat-messages")
      chatMessagesElm.scrollTop = chatMessagesElm?.scrollHeight
    })
  }

  const onClickContact = (data) => {
    setContact(data)
    // emit event load messages
    socket.emit("load messages", data.id)
  }

  const onSendMessage = (e) => {
    // listen only enter key event press
    if (e.key === "Enter") {
      const data = {
        idRecipient: contact.id,
        message: e.target.value,
      }

      //emit event send message
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
              user={state.user}
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
