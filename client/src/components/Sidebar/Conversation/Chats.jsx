import React from 'react'
import { dateHandler } from '../../../utils/date'
import { useDispatch, useSelector } from 'react-redux'
import { openOrCreateAConversation } from '../../../features/chatSlice'
import { getConvoId, getConvoName, getConvoPicture } from '../../../utils/getUserId'
import { Capitalize } from '../../../utils/strings'
import SocketContext from '../../../context/SocketContext'

function Chats({ chats, socket, status }) {

    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { activeConversation } = useSelector((state) => state.chat)
    const values = {
        receiver_id: getConvoId(user, chats.users),
        token: user.token
    }
    const openConversation = async () => {
        let newConvo = await dispatch(openOrCreateAConversation(values))
        socket.emit('join conversation', newConvo.payload._id)
    }
    return (
        <li title={chats.recentMessage?.message} onClick={() => openConversation()}
            className={`list-none h-[72px] dark:bg-dark_bg_1 hover:dark:bg-dark_bg_2 cursor-pointer dark:text-dark_text_1 px-[10px]
            ${chats._id === activeConversation._id ? "dark:bg-dark_hover_1" : ""}`}>
            <div className='relative w-full flex items-center justify-between py-[10px]'>
                {/* left */}
                <div className='flex items-center gap-x-3'>
                    <div className={`relative min-w-[50px] max-w-[50px] h-[50px] rounded-full overflow-hidden ${status ? "online" : ""}`}>
                        <img src={getConvoPicture(user, chats.users)} alt="pictures-user" className='w-full h-full object-cover' />
                    </div>
                    {/* conversation name */}
                    <div className='w-full flex flex-col'>
                        <h1 className='font-bold flex items-center gap-x-2'>
                            {Capitalize(getConvoName(user, chats.users))}
                        </h1>
                        <div>
                            <div className='flex items-center gap-x-1 dark:text-dark_text_2'>
                                <div className='flex-1 items-center gap-x-1 dark:text-dark_text_2 '>
                                    <p>{chats.recentMessage?.message.length > 30 ?
                                        `${chats?.recentMessage?.message.substring(0, 30)} ...`
                                        : chats.recentMessage?.message}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* right */}
                <div className='flex flex-col gap-y-4 items-end text-xs'>
                    <span className='dark:text-dark_text_2'>
                        {dateHandler(chats.recentMessage?.createdAt)}
                    </span>
                </div>
            </div>
            <div className='ml-16 border-b dark:border-b-dark_border_1'></div>
        </li>
    )
}
const SocketChats = (props) => {
    return (
        <SocketContext.Consumer>
            {(socket) => <Chats {...props} socket={socket} />}
        </SocketContext.Consumer>
    )
}

export default SocketChats