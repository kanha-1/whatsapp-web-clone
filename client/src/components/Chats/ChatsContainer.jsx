import React, { useEffect } from 'react'
import ChatHeader from './Chatheader/ChatHeader'
import ChatMessages from './Messages/ChatMessages'
import { useDispatch, useSelector } from 'react-redux'
import { getConversationMessages } from '../../features/chatSlice'
import { ChatAction } from './ChatAction'
// import { getConvoId } from '../../utils/getUserId'
import { checkOnlineStatus } from '../../utils/getUserId'
import FilePreview from './Preview/Files/FilePreview'

function ChatsContainer({ onlineUsers, typing }) {

    const dispatch = useDispatch()
    const { activeConversation, files } = useSelector((state) => state.chat)
    const { user } = useSelector((state) => state.user)
    const values = {
        token: user.token,
        convo_id: activeConversation?._id
    }

    useEffect(() => {
        if (activeConversation?._id) {
            dispatch(getConversationMessages(values))
        }
    }, [activeConversation])

    return (
        <div className='relative w-full h-[97%] border-l dark:border-l-dark_border_2  select-none overflow-hidden'>
            <div>
                <ChatHeader typing={typing} online={checkOnlineStatus(onlineUsers, user, activeConversation.users)} />
                {files.length > 0 ?
                    <FilePreview />
                    :
                    <>
                        <ChatMessages typing={typing} />
                        <ChatAction />
                    </>
                }

            </div>
        </div>
    )
}

export default ChatsContainer