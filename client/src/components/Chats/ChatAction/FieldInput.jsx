import React, { useState } from 'react'
import SocketContext from "../../../context/SocketContext"
import { useSelector } from 'react-redux'

function FieldInput({ message, setMessages, textRef, socket }) {
  const [typing, setTyping] = useState(false)
  const { activeConversation } = useSelector((state) => state.chat)
  const onChangeHandel = (e) => {
    setMessages(e.target.value)
    if (!typing) {
      setTyping(true)
      socket.emit('typing', activeConversation._id)
    }
    let lastTyping = new Date().getTime()
    let timer = 2000
    setTimeout(() => {
      let timeNow = new Date().getTime()
      let timeDiff = timeNow - lastTyping
      if (timeDiff >= timer && typing) {
        socket.emit('stop typing', activeConversation._id)
        setTyping(false)
      }
    }, timer);
  }

  return (
    <div className='w-full'>
      <input type="text"
        className='dark:bg-dark_hover_1 dark:text-dark_text_1 outline-none h-[45px] w-full flex-1 rounded-lg pl-4'
        placeholder='Type A message'
        value={message}
        onChange={onChangeHandel}
        ref={textRef}
      />
    </div>
  )
}
const fieldWIthSocket = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <FieldInput {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
export default fieldWIthSocket