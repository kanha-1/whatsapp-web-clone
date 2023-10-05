import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Message from './Message'
import TypingAnim from './TypingAnim'
import FileMessages from './FileMessages'

export default function ChatMessages({ typing }) {
    const { messages } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const endRef = useRef()

    useEffect(() => {
        endRef.current.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <div className='mb-[40px] bg-[url("https://res.cloudinary.com/dmhcnhtng/image/upload/v1677358270/Untitled-1_copy_rpx8yb.jpg")] 
            bg-cover bg-no-repeat'>
            <div className='scrollbar overflow_scrollbar overflow-auto py-2 px-[6%]'>
                {/* messages */}
                {messages && messages.map((message, index) => (
                    <>
                        {message.files.length > 0 ?
                            message.files.map((files) =>
                                <FileMessages
                                    message={message}
                                    key={message._id}
                                    fileMessages={files}
                                    currentUser={user._id === message.sender._id}
                                />
                            )
                            : null}
                        {message.message.length > 0 ? (
                            <Message
                                message={message}
                                key={index}
                                myMessage={user._id === message.sender._id} />
                        ) : null}
                    </>
                ))}
                {typing ? <TypingAnim /> : null}
                <div ref={endRef}></div>
            </div>
        </div>
    )
}
