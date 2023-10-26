import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Sidebar } from '../components/Sidebar'
import { getConversation, updateMessagesNconversation } from '../features/chatSlice'
import { MainWelcome, ChatsContainer } from '../components/Chats'
import SocketContext from '../context/SocketContext'
import VideoCallMain from '../components/Chats/VideoCall/VideoCallMain'

function Home({ socket }) {

  const [typing, setTyping] = useState(false)
  const [onlineUsers, setOnlineUsers] = useState([])
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.user)
  const { activeConversation } = useSelector((state) => state.chat)

  // join user into socket io

  useEffect(() => {
    if (user?.token) {
      dispatch(getConversation(user.token))
    }
    socket.emit("join", user._id)
    socket.on("get-online-users", (users) => {
      setOnlineUsers(users)
    })
  }, [user])

  // listening message socket
  useEffect(() => {
    // this is receive message event
    socket.on("recive message", (message) => {
      dispatch(updateMessagesNconversation(message))
    })
    // typing eveng 
    socket.on("typing", () => setTyping(true))
    socket.on("stop typing", () => setTyping(false))
  }, [])

  return (
    <>
      <div className='h-screen dark:bg-dark_bg_1 flex items-center justfy-center  overflow-hidden'>
        <div className="container h-screen flex">
          <Sidebar onlineUsers={onlineUsers} />
          {activeConversation._id ? <ChatsContainer onlineUsers={onlineUsers} typing={typing} /> : <MainWelcome />}
        </div>
      </div>

      {/* video call */}
      {/* <VideoCallMain /> */}
    </>
  )
}

const SocketHome = (props) => {
  return (
    <SocketContext.Consumer>
      {(socket) => <Home {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}
export default SocketHome