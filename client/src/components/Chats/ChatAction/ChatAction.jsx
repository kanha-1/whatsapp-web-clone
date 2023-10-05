import React, { useRef, useState } from 'react'
import EmojiPicker from './EmojiPick'
import { Attachments } from './Attachments'
import FieldInput from './FieldInput'
import { ClipLoader } from "react-spinners"
import { SendIcon } from '../../../svg'
import { useDispatch, useSelector } from 'react-redux'
import { sendMessages } from '../../../features/chatSlice'
import SocketContext from '../../../context/SocketContext'

function ChatAction({ socket }) {
    const dispatch = useDispatch()
    const [message, setMessages] = useState('')
    const [showEmoji, setShowEmoji] = useState(false)
    const [loading, setLoading] = useState(false)
    const [showAttachMents, setShowAttachments] = useState(false)
    const { activeConversation, status } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const textRef = useRef()
    const values = {
        message,
        convo_id: activeConversation._id,
        files: [],
        token: user.token
    }
    const onMessageSend = async (e) => {
        e.preventDefault()
        setLoading(true)
        let newMsg = await dispatch(sendMessages(values))
        socket.emit("send message", newMsg.payload)
        setMessages('')
        setLoading(false)
    }
    return (
        <form
            onSubmit={(e) => onMessageSend(e)}
            className='dark:bg-dark_bg_2 h-[60px] w-full flex items-center absolute bottom-0 py-2 select-none px-4'>
            <div className='w-full flex items-center gap-x-2'>
                <ul className='flex gap-x-2'>
                    <EmojiPicker showPicker={showEmoji} setShowPicker={setShowEmoji} setShowAttach={setShowAttachments}
                        message={message} setMessages={setMessages} textRef={textRef} />
                    <Attachments showAttach={showAttachMents} setShowAttach={setShowAttachments} setShowPicker={setShowEmoji} />
                </ul>
                {/* input */}
                <FieldInput message={message} setMessages={setMessages} textRef={textRef} />
                <button
                    disabled={message ? false : true}
                    type='submit' className='btn'>
                    {status === "loading" && loading ? <ClipLoader size={25} color="#E9EDFF" />
                        : <SendIcon className="dark:fill-dark_svg_1 " />
                    }
                </button>
            </div>
        </form>
    )
}

const SocketChatAction = (props) => {
    return (
        <SocketContext.Consumer>
            {(socket) => <ChatAction {...props} socket={socket} />}
        </SocketContext.Consumer>
    )
}

export default SocketChatAction